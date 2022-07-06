
install: install-deps
	npx simple-git-hooks
install-deps: #клонирование репозитория
	npm ci
gendiff: #run project
	node bin/gendiff.js
lint:
	npx eslint ./
test_install:
	npm i jest
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
test-coverage:
	npm test -- --coverage --coverageProvider=v8