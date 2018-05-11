import { AbstractBaseController } from "./AbstractController";

export class StdoutErrController extends AbstractBaseController {

	protected outtextarea = document.createElement('textarea');
	protected errtextarea = document.createElement('textarea');

	constructor() {
		super(document.createElement('div'), "stdout-err");

		this.outtextarea.readOnly = true;
		this.errtextarea.readOnly = true;

		this.outtextarea.classList.add('-stdout');
		this.errtextarea.classList.add('-stderr');

		this.container.appendChild(this.outtextarea);
		this.container.appendChild(this.errtextarea);
	}

	public set(out: string, err: string, status: number) {
		this.outtextarea.value = out;
		this.errtextarea.value = err;

		this.container.classList.toggle('-error', status !== 0);

		if(this.errtextarea.value === "") {
			this.errtextarea.style.display = 'none';
		}else{
			this.errtextarea.style.display = '';
		}
	}
}