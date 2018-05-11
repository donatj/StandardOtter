import { AbstractBaseController } from "./AbstractController";

interface ResizerOptions {
	width: number
}

export class ResizeController extends AbstractBaseController {

	protected grabber = document.createElement('div');

	private options: ResizerOptions = {
		width: 5,
	}

	private mouseupbind: any;
	private movebind: any;

	constructor(protected left: AbstractBaseController, protected right: AbstractBaseController, options: ResizerOptions|null = null) {
		super(document.createElement('div'), 'horizontal-resize');

		this.options = { ...this.options, ...options };

		this.grabber.classList.add("grabber");

		this.container.appendChild(this.grabber);
		left.attach(this.container);
		right.attach(this.container);

		left.getContainer().style.gridRow = "1";
		left.getContainer().style.gridColumn = "1";
		this.grabber.style.gridRow = "1";
		this.grabber.style.gridColumn = "2";
		right.getContainer().style.gridRow = "1";
		right.getContainer().style.gridColumn = "3";


		this.grabber.addEventListener('mousedown', this.down.bind(this));

		this.mouseupbind = this.up.bind(this);
		this.movebind = this.move.bind(this);
	}

	private down(e: MouseEvent) {
		e.preventDefault()
		this.grabber.classList.add("-resizing");

		document.documentElement.style.cursor = 'ew-resize';

		this.container.addEventListener('mousemove', this.movebind);
		window.addEventListener('mouseup', this.mouseupbind);
	}

	private move(e: MouseEvent) {
		let rect = this.container.getBoundingClientRect();
		// console.log();
		let pos = (e.clientX - rect.left) - (this.options.width / 2);
		this.container.style.gridTemplateColumns = `${pos}px ${this.options.width}px`;
	}

	private up() {
		this.container.removeEventListener('mousemove', this.movebind);
		window.removeEventListener('mouseup', this.mouseupbind);

		document.documentElement.style.cursor = '';
		this.grabber.classList.remove("-resizing");
	}

}