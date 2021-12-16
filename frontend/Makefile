
DOCKER_COMPOSE  = docker-compose

EXEC_JS         = $(DOCKER_COMPOSE) run --rm node

NPM            = $(EXEC_JS) npm

##
## Project
## -------
##

build:
	@$(DOCKER_COMPOSE) pull --parallel --quiet --ignore-pull-failures 2> /dev/null
	$(DOCKER_COMPOSE) build --pull
kill:
	$(DOCKER_COMPOSE) kill
	$(DOCKER_COMPOSE) down --volumes --remove-orphans

install:
install: .env build node_modules start ## Install and start the project

reset: ## Stop and start a fresh install of the project
reset: kill install

start: ## Start the project
	$(DOCKER_COMPOSE) up -d --remove-orphans --no-recreate

stop: ## Stop the project
	$(DOCKER_COMPOSE) stop

restart: ## restart containers
restart: stop start

clean: ## Stop the project and remove generated files
clean: kill
	rm -rf .env node_modules

.PHONY: build kill install reset start stop clean no-docker

##
## Utils
## -----
##

.PHONY: watch

node_modules: package-lock.json
	$(NPM) install
	@touch -c node_modules

package-lock.json: package.json
	$(NPM) upgrade

.env: .env.dist
	@if [ -f .env ]; \
	then\
		echo '\033[1;41m/!\ The .env.dist file has changed. Please check your .env file (this message will not be displayed again).\033[0m';\
		touch .env;\
		exit 1;\
	else\
		echo cp .env.dist .env;\
		cp .env.dist .env;\
	fi

.DEFAULT_GOAL := help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
.PHONY: help
