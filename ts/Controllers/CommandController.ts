import { AbstractBaseController } from "./AbstractController";

export class CommandController extends AbstractBaseController {

	private command = document.createElement('input');

	constructor() {
		super(document.createElement('div'), 'command');
		this.container.appendChild(this.command);
	}
}
