VERSION=$(shell < package.json jq -r .version)

.PHONY: build
build: css/screen.css
	npm ci
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
	npx sass scss/screen.scss:css/screen.css

.PHONY: release
release: build
	./node_modules/.bin/electron-packager . "Standard Otter" --platform=darwin --darwinDarkModeSupport --icon=StandardOtter.icns --overwrite --out=release --arch=arm64
	tar -cvf - "release/Standard Otter-darwin-arm64" | xz -c - > release/standard-otter-darwin-arm64.$(VERSION).tar.xz

	./node_modules/.bin/electron-packager . "Standard Otter" --platform=darwin --darwinDarkModeSupport --icon=StandardOtter.icns --overwrite --out=release --arch=x64
	tar -cvf - "release/Standard Otter-darwin-x64" | xz -c - > release/standard-otter-darwin-x64.$(VERSION).tar.xz
