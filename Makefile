.PHONY: install build run start test clean

install:
	npm install

build:
	npm run build

run:
	npm run dev

start:
	npm run start

test:
	npm run test

clean:
	rm -rf dist node_modules coverage
