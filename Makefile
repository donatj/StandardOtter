VERSION=$(shell < package.json jq -r .version)

.PHONY: build
build: css/screen.css
	npm ci
	npx rollup -c rollup.config.mjs

.PHONY: clean
clean:
	rm -rf js css release

.PHONY: run
run: build
	npx electron .

.PHONY: lint
lint:
	npx eslint --config eslint.config.mjs 'ts/**/*.ts'

.PHONY: fix
fix:
	npx eslint --config eslint.config.mjs 'ts/**/*.ts' --fix

css/screen.css: scss/screen.scss
	npx sass scss/screen.scss:css/screen.css

.PHONY: arm64
arm64: build
	npx electron-packager . "Standard Otter" --platform=darwin --darwinDarkModeSupport --icon=StandardOtter.icns --overwrite --out=release --arch=arm64
	tar -cvf - "release/Standard Otter-darwin-arm64" | xz -c - > release/standard-otter-darwin-arm64.$(VERSION).tar.xz

.PHONY: x64
x64: build
	npx electron-packager . "Standard Otter" --platform=darwin --darwinDarkModeSupport --icon=StandardOtter.icns --overwrite --out=release --arch=x64
	tar -cvf - "release/Standard Otter-darwin-x64" | xz -c - > release/standard-otter-darwin-x64.$(VERSION).tar.xz

.PHONY: release
release: arm64 x64
