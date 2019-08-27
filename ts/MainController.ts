import child_process = require('child_process');
import { WindowSetupData } from './main';

interface CmdOutput {
	stdout: string;
	stderr: string;

	status: number;
}

export class MainController {

	private timeout = 0;

	constructor(
		public editor: monaco.editor.IStandaloneCodeEditor,
		public setup: WindowSetupData,

		private container: HTMLElement,
		private cmd: HTMLInputElement,
		private stdOut: HTMLTextAreaElement,
		private stdErr: HTMLTextAreaElement,
	) {
		editor.onDidChangeModelContent((e) => {
			clearTimeout(this.timeout);
			this.container.classList.toggle("outofsync", true);

			this.timeout = window.setTimeout(() => {
				this.container.classList.toggle("outofsync", false);
				this.doExec();
			}, 700);
		});

		window.addEventListener('resize', () => {
			editor.layout();
		});
	}

	private async doExec() {
		const result = await this.execute(this.cmd.value, this.editor.getValue());

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

	private async execute(cmd: string, input: string, timeout: number = 5000) {
		const cmdData = cmd.split(' ').filter((x) => x != '');

		return new Promise<CmdOutput>((resolve, reject) => {
			const process = child_process.spawn(
				cmdData.shift() || "cat",
				cmdData,
			);

			process.on('exit', (status) => {
				resolve({
					stderr: (process.stderr.read() || '').toString(),
					stdout: (process.stdout.read() || '').toString(),

					status: status !== null ? status : 255,
				});
			});

			process.stdin.write(input);
			process.stdin.end();
		});
	}

}