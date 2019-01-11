import { EventEmitter, Listener } from "../EventEmitter";
import { AbstractBaseController } from "./AbstractController";

export class StdinController extends AbstractBaseController {

	protected changeEmitter = new EventEmitter<string>();

	protected last = "";

	protected textarea = document.createElement('textarea');

	constructor(public timeout = 1000) {
		super(document.createElement('div'), "stdin");

		this.container.appendChild(this.textarea);

		this.textarea.addEventListener("change", this.change.bind(this));
		this.textarea.addEventListener("keyup", this.change.bind(this));

		this.changeEmitter.add(
			(e) => {
				console.log(e);
			},
		);
	}

	public addChangeListener(listener : Listener<string>) {
		this.changeEmitter.add(listener);
	}

	private to: number = 0;

	private change() {
		clearTimeout(this.to);

		this.to = window.setTimeout(() => {
			if (this.textarea.value !== this.last) {
				this.changeEmitter.trigger(this.textarea.value);
			}

			this.last = this.textarea.value;
		}, this.timeout);
	}
}
