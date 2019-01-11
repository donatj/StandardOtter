import { WindowSetupData } from "./main";
import { MainController } from "./MainController";
// import electron = require('electron');

export let mc : MainController|null = null;

export function init(editor: monaco.editor.IStandaloneCodeEditor, setup: WindowSetupData) {
	mc = new MainController(
		editor, setup,
		document.querySelector('.container') as HTMLInputElement,
		document.getElementById('cmd') as HTMLInputElement,
		document.getElementById('output') as HTMLTextAreaElement,
		document.getElementById('error') as HTMLTextAreaElement,
	);

	function applyTheme(dark: boolean) {
		document.body.classList.toggle('theme-dark', dark);

		if (dark) {
			monaco.editor.setTheme("vs-dark");
		} else {
			monaco.editor.setTheme("vs");
		}
	}

	applyTheme(setup.darkMode);

	// electron.systemPreferences.subscribeNotification(
	// 	'AppleInterfaceThemeChangedNotification',
	// 	function theThemeHasChanged() {
	// 		applyTheme(electron.systemPreferences.isDarkMode())
	// 	}
	// )
}
