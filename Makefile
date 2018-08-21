.PHONY: build
build:
	npm install
	./node_modules/.bin/tsc
	compass compile

.PHONY: run
run: build
	./node_modules/.bin/electron .

.PHONY: lint
lint:
	./node_modules/.bin/tslint -c tslint.json 'ts/**/*.ts' --fix

.PHONY: release
release: build
	./node_modules/.bin/electron-packager . "Standard Otter" --platform=darwin --icon=nw.icns --overwrite --out=release --arch=x64
	tar -cvf - "release/Standard Otter-darwin-x64" | gzip > release/standard-otter-darwin-x64.tar.gz
