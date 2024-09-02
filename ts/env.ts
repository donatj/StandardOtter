import { spawnSync } from "child_process";
import { existsSync } from "fs";

export function getSystemEnvVars(): { [key: string]: string } {
	const zshrcExists = existsSync(process.env.HOME + '/.zshrc');

	const command = zshrcExists ? 'source ~/.zshrc && printenv' : 'printenv';

	const ret = spawnSync('/bin/zsh', ['--login', '-c', command], { encoding: 'utf-8', timeout: 5000 });
	if (ret.error) {
		throw ret.error;
	}

	let out: { [key: string]: string } = {};
	if (ret.stdout) {
		const lines = ret.stdout.toString().split('\n')
		for (const line of lines) {
			const [key, ...rest] = line.split('=');
			const value = rest.join('=');

			if (key === '' || key === '_') {
				continue;
			}

			out[key] = value;
		}
	}

	return out;
}
