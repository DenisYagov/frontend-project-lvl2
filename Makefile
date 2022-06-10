install: #клонирование репозитория
	npm ci
gendiff: #run project
	node bin/gendiff
lint:
	npx eslint .
