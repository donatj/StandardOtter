.PHONY: build
build: css/screen.css
	npm install
	./node_modules/.bin/tsc

.PHONY: clean
clean:
	rm -rf js css release

.PHONY: run
run: build
	./node_modules/.bin/electron .

.PHONY: lint
lint:
	./node_modules/.bin/tslint -c tslint.json 'ts/**/*.ts'

.PHONY: fix
fix:
	./node_modules/.bin/tslint -c tslint.json 'ts/**/*.ts' --fix

css/screen.css: scss/screen.scss
	compass compile

.PHONY: release
release: build
	./node_modules/.bin/electron-packager . "Standard Otter" --platform=darwin --darwinDarkModeSupport --icon=StandardOtter.icns --overwrite --out=release --arch=x64
	tar -cvf - "release/Standard Otter-darwin-x64" | gzip > release/standard-otter-darwin-x64.tar.gz
