install: #клонирование репозитория
	npm ci
gendiff: #run project
	node bin/gendiff.js
lint:
	npx eslint src/ bin/
test_install:
	npm i jest
test: 
	NODE_OPTIONS=--experimental-vm-modules npx jest
