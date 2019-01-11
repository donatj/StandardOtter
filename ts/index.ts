import { CommandController } from "./Controllers/CommandController";
import { ResizeController } from "./Controllers/HorizontalResizer";
import { StdinController } from "./Controllers/StdinController";
import { StdoutErrController } from "./Controllers/StdoutErrController";

(() => {
	const body = document.querySelector('body');
	if (!body) {
		throw new Error("aint got no body");
	}

	console.log("here");
	const stdinC = new StdinController();

	const stdoutC = new StdoutErrController();

	const hrC = new ResizeController(stdinC, stdoutC);

	const cC = new CommandController();

	const spawnSync = require('child_process').spawnSync;

	stdinC.addChangeListener((s : string)=> {
		const cmdData = s.split(' ').filter((x) => x != '');

		const result = spawnSync(cmdData.shift(), cmdData, {input: s});

		console.log(result);

		stdoutC.set(
			result.stdout, result.stderr, result.status,
		);

		document.title = `Standard Otter - Exit Code: ${result.status}`;
	});

	hrC.attach(body);
	cC.attach(body);
})();
