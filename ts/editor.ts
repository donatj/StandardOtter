import { MainController } from "./MainController";

export function init(editor: monaco.editor.IStandaloneCodeEditor) {
	new MainController(
		editor,
		document.querySelector('.container') as HTMLInputElement,
		document.getElementById('cmd') as HTMLInputElement,
		document.getElementById('output') as HTMLTextAreaElement,
		document.getElementById('error') as HTMLTextAreaElement,
	);
};
