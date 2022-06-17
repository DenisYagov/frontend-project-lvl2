install: #клонирование репозитория
	npm ci
gendiff: #run project
	node bin/gendiff.js
lint:
	npx eslint .
test: 
	NODE_OPTIONS=--experimental-vm-modules npx jest
