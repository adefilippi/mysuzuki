<?php

declare(strict_types=1);

/**
 * Config:
 *
 * Map every relationship config nodes.
 * PLATFORM_ENVIRONMENT_MAP_ALL = 1
 *
 * Rewrite relationship database node, indexing by scheme.
 * PLATFORM_ENVIRONMENT_MAP_DATABASE_REWRITE = 1
 *
 * Replace single element non associative array by the element (to avoid the _0_)
 * PLATFORM_ENVIRONMENT_MAP_FIX_ARRAY = 1
 */

if (getenv('PLATFORM_ENVIRONMENT_TEST') == 1) {
    putenv("PLATFORM_APPLICATION=1");
    putenv("PLATFORM_PROJECT_ENTROPY=1");
    $data = base64_encode("{\"rabbitmq\":[{\"password\":\"guest\",\"ip\":\"246.0.129.2\",\"scheme\":\"amqp\",\"port\":5672,\"host\":\"rabbitmq.internal\",\"username\":\"guest\"}],\"redis\":[{\"host\":\"248.0.65.198\",\"scheme\":\"redis\",\"port\":6379}],\"cache\":[{\"host\":\"248.0.65.198\",\"scheme\":\"memcached\",\"port\":11211}],\"solr\":[{\"path\":\"solr\",\"host\":\"248.0.65.197\",\"scheme\":\"solr\",\"port\":8080}],\"elasticsearch\":[{\"host\":\"248.0.65.198\",\"scheme\":\"http\",\"port\":\"9200\"}],\"database\":[{\"host\":\"database.internal\",\"ip\":\"246.0.97.91\",\"password\":\"\",\"path\":\"main\",\"port\":3306,\"query\":{\"is_master\":true},\"scheme\":\"mysql\",\"username\":\"user\"},{\"username\":\"main\",\"password\":\"main\",\"host\":\"248.0.65.196\",\"query\":{\"is_master\":true},\"path\":\"main\",\"scheme\":\"pgsql\",\"port\":5432},{\"scheme\":\"mongodb\",\"path\":\"main\",\"port\":27017,\"query\":{\"is_master\":true},\"rel\":\"mongodb\",\"password\":\"main\",\"username\":\"main\",\"ip\":\"123.123.123.123\",\"host\":\"database.internal\"},{\"scheme\":\"http\",\"ip\":\"246.0.161.240\",\"host\":\"influx.internal\",\"port\":8086}]}");
    putenv("PLATFORM_RELATIONSHIPS=$data");
    putenv("PLATFORM_ENVIRONMENT_MAP_DEBUG=1");
    putenv("PLATFORM_ENVIRONMENT_MAP_ALL=1");
    putenv("PLATFORM_ENVIRONMENT_MAP_DATABASE_REWRITE=1");
    putenv("PLATFORM_ENVIRONMENT_MAP_FIX_ARRAY=1");
}

if (getenv('PLATFORM_ENVIRONMENT_MAP_ALL')) {
    mapAllRelationships();
}

mapPlatformShEnvironment();

function mapAllRelationships(): void
{
    if (!getenv('PLATFORM_RELATIONSHIPS')) {
        return;
    }
    $relationships = json_decode(base64_decode(getenv('PLATFORM_RELATIONSHIPS'), true), true);
    if (getenv('PLATFORM_ENVIRONMENT_MAP_DATABASE_REWRITE')) {
        rewriteDatabaseConfig($relationships);
    }
    if (getenv('PLATFORM_ENVIRONMENT_MAP_FIX_ARRAY')) {
        fixArray($relationships);
    }
    composeRelationShipKey($relationships);
}

function rewriteDatabaseConfig(&$data)
{
    if (!isset($data['database'])) {
        return;
    }
    $databases = [];
    // map by scheme
    foreach ($data['database'] as $idx => $value) {
        if (!isset($databases[$value['scheme']])) {
            $databases[$value['scheme']] = [];
        }
        $databases[$value['scheme']][] = $value;
    }
    $data['database'] = &$databases;
}

function fixArray(&$array)
{
    if (!is_array($array)) {
        return $array;
    }
    if (count($array) === 1 && array_key_exists(0, $array)) {
        return $array[0];
    }
    foreach (array_keys($array) as $key) {
        $array[$key] = fixArray($array[$key]);
    }
    return $array;
}
function composeRelationShipKey(&$data, array $pieces = [])
{
    if (!is_array($data)) {
        $_SERVER[$key = implode('_', $pieces)] = $data;
        if (getenv('PLATFORM_ENVIRONMENT_MAP_DEBUG')) {
            echo sprintf("%s=%s\n", $key, $data);
        }
        return;
    }
    foreach ($data as $subName => $subData) {
        $names = $pieces;
        $names[] = is_numeric($subName) ? $subName : strtoupper($subName);
        if (!is_array($data)) {
            $_SERVER[$key = implode('_', $names)] = $subData;
            echo sprintf("%s=%s\n", $key, $subData);
        } else {
            composeRelationShipKey($subData, $names);
        }
    }
}
/**
 * Map Platform.Sh environment variables to the values Symfony Flex expects.
 *
 * This is wrapped up into a function to avoid executing code in the global
 * namespace.
 */
function mapPlatformShEnvironment() : void
{
    // If this env var is not set then we're not on a Platform.sh
    // environment or in the build hook, so don't try to do anything.
    if (!getenv('PLATFORM_APPLICATION')) {
        return;
    }
    // Set the application secret if it's not already set.
    if (!isset($_SERVER['APP_SECRET']) && getenv('PLATFORM_PROJECT_ENTROPY')) {
        $_SERVER['APP_SECRET'] =   getenv('PLATFORM_PROJECT_ENTROPY');
    }
    // Default to production. You can override this value by setting
    // `env:APP_ENV` as a project variable, or by adding it to the
    // .platform.app.yaml variables block.
    $_SERVER['APP_ENV'] = $_SERVER['APP_ENV'] ?? (getenv('APP_ENV') ?: null) ?? 'prod';
    if (!isset($_SERVER['DATABASE_URL']) && !getenv('PLATFORM_ENVIRONMENT_MAP_ALL')) {
        mapPlatformShDatabase();
    }
}

function mapPlatformShDatabase() : void
{
    $dbRelationshipName = 'database';
    // Set the DATABASE_URL for Doctrine, if necessary.
    # "mysql://root@127.0.0.1:3306/symfony?charset=utf8mb4&serverVersion=5.7";
    if (getenv('PLATFORM_RELATIONSHIPS')) {
        $relationships = json_decode(base64_decode(getenv('PLATFORM_RELATIONSHIPS'), true), true);
        if (isset($relationships[$dbRelationshipName])) {
            foreach ($relationships[$dbRelationshipName] as $endpoint) {
                if (empty($endpoint['query']['is_master'])) {
                    continue;
                }
                $dbUrl = sprintf(
                    '%s://%s:%s@%s:%d/%s',
                    $endpoint['scheme'],
                    $endpoint['username'],
                    $endpoint['password'],
                    $endpoint['host'],
                    $endpoint['port'],
                    $endpoint['path']
                );
                switch ($endpoint['scheme']) {
                    case 'mysql':
                        // Defaults to the latest MariaDB version
                        $dbUrl .= '?charset=utf8mb4&serverVersion=mariadb-10.2.12';
                        break;
                    case 'pgsql':
                        // Postgres 9.6 is the latest supported version on Platform.sh
                        $dbUrl .= '?serverVersion=9.6';
                }
                $_SERVER['DATABASE_URL'] = $dbUrl;
                return;
            }
        }
    }
    // Hack the Doctrine URL to be syntactically valid in a build hook, even
    // though it shouldn't be used.
    $dbUrl = sprintf(
        '%s://%s:%s@%s:%s/%s?charset=utf8mb4&serverVersion=10.2',
        'mysql',
        '',
        '',
        'localhost',
        3306,
        ''
    );
    $_SERVER['DATABASE_URL'] = $dbUrl;
}
