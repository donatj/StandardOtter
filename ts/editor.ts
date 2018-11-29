import { MainController } from "./MainController";
import { setupData } from "./main";

export function init(editor: monaco.editor.IStandaloneCodeEditor, setupData: setupData) {
	new MainController(
		editor, setupData,
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

	applyTheme(setupData.darkMode);

};
