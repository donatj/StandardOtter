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

			this.timeout = window.setTimeout(async () => {
				await this.doExec();
				this.container.classList.toggle("outofsync", false);
			}, 700);
		});

		window.addEventListener('resize', () => {
			editor.layout();
		});
	}

	private async doExec() {
		try {
			const result = await this.execute(this.cmd.value, this.editor.getValue());

			const stdout = (result.stdout || "").toString();
			const stderr = (result.stderr || "").toString();

			this.displayResults(
				stdout,
				stderr,
				result.status > 0 ? `Exit Code: ${result.status}` : "OK",
				result.status > 0
			);
		} catch (e) {
			if (!(e instanceof Error)) {
				throw e;
			}

			this.displayResults(
				'',
				`standard otter runtime error: ${e.message}`,
				'Runtime Error',
				true
			)
		}
	}

	private displayResults(stdout: string, stderr: string, title: string, error: boolean) {
		this.stdOut.textContent = stdout;
		this.stdErr.textContent = stderr;

		this.container.classList.toggle("noerror", stderr == "");
		this.container.classList.toggle("error", error);

		document.title = `Standard Otter: ${title}`;

		if (!error) {
			this.cmd.style.background = '';
		} else {
			this.cmd.style.background = '#fee';
		}
	}

	private async execute(cmd: string, input: string, timeout: number = 5000) {
		const cmdData = cmd.split(' ').filter((x) => x != '');

		const process = child_process.spawn(
			cmdData.shift() || "cat",
			cmdData,
		);

		return new Promise<CmdOutput>((resolve, reject) => {
			const to = setTimeout(() => {
				process.kill();
				reject(new Error("Timeout"));
			}, timeout);

			process.on('exit', (status) => {
				clearTimeout(to);

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
