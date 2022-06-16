install: #клонирование репозитория
	npm ci
gendiff: #run project
	node bin/gendiff.js
lint:
	npx eslint .
