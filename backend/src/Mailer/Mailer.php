<?php

namespace App\Mailer;

use App\Soap\Client\SmartFocusClient;
use Sentry\SentryBundle\SentrySymfonyClient;

/**
 * @author svianney <vianney@widop.com>
 */
class Mailer
{
    const SOAP_METHOD = 'sendObject';
    const UID_KEY = 'EMAIL';
    const DEFAULT_SYNCHRO = 'NOTHING';

    /** @var SentrySymfonyClient */
    private $sentry;

    /** @var SmartFocusClient */
    private $client;

    /** @var array */
    private $keys;

    /**
     * @param SmartFocusClient $client
     * @param array $smartFocusKeys
     * @param SentrySymfonyClient $sentry
     */
    public function __construct(SmartFocusClient $client, array $smartFocusKeys, SentrySymfonyClient $sentry = null)
    {
        $this->client = $client;
        $this->keys = $smartFocusKeys;
        $this->sentry = $sentry;
    }

    /**
     * @param        $template
     * @param string $to
     * @param array  $vars
     * @param array  $opts
     *
     * @return mixed|string
     */
    public function sendEmail($template, string $to, array $vars = [], array $opts = [])
    {
        if(!isset($this->keys[$template])) {
            throw new \RuntimeException('This template key doesn\'t exist.');
        }

        $date = (new \DateTime())->modify('+30 seconds');
        $date->setTimezone(new \DateTimeZone('Europe/Paris'));

        $keys = $this->keys[$template];

        $params = [
            "sendObject" => [
                "arg0" => [
                    'uidkey'         => self::UID_KEY,
                    'synchrotype'    => $opts['synchro_type'] ?? self::DEFAULT_SYNCHRO,
                    'random'         => $keys['random'],
                    'encrypt'        => $keys['encrypt'],
                    'email'          => $to,
                    'notificationId' => 123,
                    'senddate'       => $opts['send_date'] ?? $date->format('c'),
                    'content'        => $this->cleanVars($opts['content'] ?? []),
                    'dyn'            => $this->cleanVars($vars),
                ]
            ]
        ];

        return $this->request(
            self::SOAP_METHOD,
            $params
        );
    }

    /**
     * @param $vars
     * @return array
     */
    private function cleanVars($vars)
    {
        $result = [];

        foreach ($vars as $key => $value) {
            if (!is_string($value)) {
                continue;
            }

            $result[] = [
                'key'   => $key,
                'value' => $value,
            ];
        }

        return $result;
    }

    /**
     * @param $method
     * @param $params
     *
     * @return mixed|string
     */
    final protected function request($method, $params)
    {
        try {
            $response = $this->client->create()->__soapCall($method, $params);
        } catch (\Exception $e) {
            if ($this->sentry !== null) {
                $this->sentry->captureException($e, $params);
            }
            return false;
        }

        return $response;
    }
}
