SYMFONY_MAX_DEPRECATED ?= 500
SSH_PATH ?= ~/.ssh/id_rsa

export FPM_UID = $(shell id -u)
export FPM_GID = $(shell id -g)

install: install-dev
install-dev: prepare-dev build up dbdrop fixtures

.PHONY: prepare-dev build-service build db dbmigrate genmigrate composeri \
		test reqs cs \
		x-php x-fpm x-nginx x-db \
		x-node up stop logs ps

prepare-dev: stop
	@echo "Local environment/generating..."
	@docker-compose build

build-service:
	@docker-compose build --no-cache $(filter-out $@,$(MAKECMDGOALS))

build: composeri

## doctrine / SF helpers
db:
	@echo "Database/creating..."
	@docker-compose run --rm --user="$(shell id -u):$(shell id -g)" build-php bin/console doctrine:schema:create -vvv
dbmigrate:
	@echo "Database/Migrating..."
	@docker-compose  run --rm --user="$(shell id -u):$(shell id -g)" build-php bin/console doctrine:migrations:migrate --no-interaction --env=dev
dbdrop:
	@echo "Database/dropping..."
	@docker-compose  run --rm --user="$(shell id -u):$(shell id -g)" \
    	build-php \
    	bin/console  doctrine:query:sql "DROP TABLE IF EXISTS doctrine_migration_versions"
	@docker-compose  run --rm --user="$(shell id -u):$(shell id -g)" build-php bin/console doctrine:schema:drop --force
genmigrate:
	@echo "Migration/generating..."
	@docker-compose  run --rm --user="$(shell id -u):$(shell id -g)" build-php bin/console doctrine:migrations:generate
diffmigrate:
	@echo "Migration/generating..."
	@docker-compose  run --rm --user="$(shell id -u):$(shell id -g)" \
	build-php \
	bin/console doctrine:migrations:diff --env=dev
dbupdate:
	@echo "Database/Migrating..."
	@docker-compose  run --rm --user="$(shell id -u):$(shell id -g)" build-php bin/console doctrine:schema:update --force --env=dev
composeri:
	@echo "Composer/Install..."
	@docker-compose  run --rm --user="$(shell id -u):$(shell id -g)" build-php composer install
fixtures: dbupdate
	@echo "Install fixtures..."
	@docker-compose  run --rm --user="$(shell id -u):$(shell id -g)" build-php bin/console hautelook:fixtures:load --quiet --no-interaction

## QA
cs:
	@docker-compose run --rm --user="$(shell id -u):$(shell id -g)" build-php php-cs-fixer fix ./src --dry-run --verbose --rules=@Symfony
prepare-env:
	@docker-compose run --rm --user="$(shell id -u):$(shell id -g)" build-php bin/prepare-env test
behat:
	@docker-compose run --rm --user="$(shell id -u):$(shell id -g)" build-php vendor/bin/behat --no-interaction --colors
phpunit:
	@docker-compose run --rm --user="$(shell id -u):$(shell id -g)" build-php bin/phpunit --no-coverage --colors
phpunit-report:
	@docker-compose run --rm --user="$(shell id -u):$(shell id -g)" build-php phpdbg -qrr ./bin/phpunit --coverage-html=reports
phpstan:
	@docker-compose run --rm --user="$(shell id -u):$(shell id -g)" build-php phpstan analyse src --memory-limit=-1 --level 5
security-check:
	@docker-compose run --rm --user="$(shell id -u):$(shell id -g)" build-php symfony check:security --dir ./

## CI
ci-test-quality: ci-test-install prepare-env behat phpstan phpunit-report security-check
ci-test-install:
	@docker-compose run --rm --user="$(shell id -u):$(shell id -g)" build-php \
	 composer install --no-interaction --prefer-dist --optimize-autoloader
	@docker-compose run --rm --user="$(shell id -u):$(shell id -g)" build-php \
	 php-cs-fixer fix --config=.php-cs-fixer.dist.php --dry-run --verbose || return 0

## Docker compose
x-php:
	@docker-compose run  --rm --user="$(shell id -u):$(shell id -g)" build-php sh
x-fpm:
	@docker-compose exec php-fpm sh
x-nginx:
	@docker-compose exec nginx sh
x-db:
	@docker-compose exec mysql bash
up:
	@docker-compose up -d
stop:
	@docker-compose stop
logs:
	@docker-compose logs -f $(filter-out $@,$(MAKECMDGOALS))
ps:
	@docker-compose ps

kill:
	@docker-compose kill
	@docker-compose down --volumes --remove-orphans
#Misc
clean:
	@echo "Project/cleaning..."
	@docker-compose run --rm build-php rm -rf \
	 var/cache var/logs var/sessions vendor public/bundles
	@docker-compose down
