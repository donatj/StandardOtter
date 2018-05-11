import { StdinController } from "./Controllers/StdinController";
import { ResizeController } from "./Controllers/HorizontalResizer";
import { StdoutErrController } from "./Controllers/StdoutErrController";
import { CommandController } from "./Controllers/CommandController";

(() => {
	const body = document.querySelector('body');
	if (!body) {
		throw new Error("aint got no body");
	}

	console.log("here");
	let stdinC = new StdinController();

	let stdoutC = new StdoutErrController();

	let hrC = new ResizeController(stdinC, stdoutC)

	let cC = new CommandController();

	var spawnSync = require('child_process').spawnSync;

	stdinC.addChangeListener((s)=>{
		var cmdData = "php".split(' ').filter(function (x) { return x != ''; });
		
		var result = spawnSync(cmdData.shift(), cmdData, {input: s});

		console.log(result);

		stdoutC.set(
			result.stdout, result.stderr, result.status
		)

		document.title = `Standard Otter - Exit Code: ${result.status}`;
	})
	

	hrC.attach(body);
	cC.attach(body);
})();