import type { WindowSetupData } from "./main";
import { MainController } from "./MainController";
// const { systemPreferences } = require('electron')

function applyTheme(dark: boolean) {
	if (dark) {
		monaco.editor.setTheme("vs-dark");
	} else {
		monaco.editor.setTheme("vs");
	}
}

export let mc: MainController | null = null;

export function init(editor: monaco.editor.IStandaloneCodeEditor, setup: WindowSetupData) {
	mc = new MainController(
		editor, setup,
		document.querySelector('.container') as HTMLInputElement,
		document.getElementById('cmd') as HTMLInputElement,
		document.getElementById('output') as HTMLTextAreaElement,
		document.getElementById('error') as HTMLTextAreaElement,
	);

	applyTheme(setup.darkMode);
}

export function alter(setup: WindowSetupData) {
	applyTheme(setup.darkMode);
}
