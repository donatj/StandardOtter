import child_process = require('child_process');

export class MainController {

	private timeout = 0;

	constructor(
		public editor: monaco.editor.IStandaloneCodeEditor,
		private container: HTMLElement,
		private cmd: HTMLInputElement,
		private stdOut: HTMLTextAreaElement,
		private stdErr: HTMLTextAreaElement
	) {
		editor.onDidChangeModelContent((e) => {
			clearTimeout(this.timeout);
			this.timeout = window.setTimeout(this.doExec.bind(this), 700);
		});

		window.addEventListener('resize', () => {
			editor.layout();
		});
	}

	private doExec() {
		const result = this.execute(this.cmd.value, this.editor.getValue());

		const stdout = (result.stdout || "").toString();
		const stderr = (result.stderr || "").toString();

		this.stdOut.textContent = stdout;
		this.stdErr.textContent = stderr;

		this.container.classList.toggle("noerror", stderr == "");

		if (result.status > 0) {
			this.stdOut.style.background = '#fee';
			this.stdErr.style.background = '#fee';

			document.title = `Standard Otter: Exit Code: ${result.status}`;
		} else {
			this.stdOut.style.background = '';
			this.stdErr.style.background = '';

			document.title = 'Standard Otter: OK';
		}

		if (result.status !== null) {
			this.cmd.style.background = '';
		} else {
			this.cmd.style.background = '#fee';
		}
	}

	private execute(cmd: string, input: string) {
		const cmdData = cmd.split(' ').filter((x) => x != '');

		const result = child_process.spawnSync(
			cmdData.shift() || "cat",
			cmdData,
			{ input },
		);

		return result;
	}

}