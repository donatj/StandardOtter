import child_process = require('child_process');
import { setupData } from './main';

export class MainController {

	private timeout = 0;

	constructor(
		public editor: monaco.editor.IStandaloneCodeEditor,
		public setupData: setupData,
		
		private container: HTMLElement,
		private cmd: HTMLInputElement,
		private stdOut: HTMLTextAreaElement,
		private stdErr: HTMLTextAreaElement
	) {
		editor.onDidChangeModelContent((e) => {
			clearTimeout(this.timeout);
			this.container.classList.toggle("outofsync", true);

			this.timeout = window.setTimeout(()=>{
				this.container.classList.toggle("outofsync", false);
				this.doExec();
			}, 700);
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
			this.container.classList.toggle("error", true);

			document.title = `Standard Otter: Exit Code: ${result.status}`;
		} else {
			this.container.classList.toggle("error", false);

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