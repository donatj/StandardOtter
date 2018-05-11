"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractController_1 = require("./AbstractController");
var StdoutErrController = /** @class */ (function (_super) {
    __extends(StdoutErrController, _super);
    function StdoutErrController() {
        var _this = _super.call(this, document.createElement('div'), "stdout-err") || this;
        _this.outtextarea = document.createElement('textarea');
        _this.errtextarea = document.createElement('textarea');
        _this.outtextarea.readOnly = true;
        _this.errtextarea.readOnly = true;
        _this.outtextarea.classList.add('-stdout');
        _this.errtextarea.classList.add('-stderr');
        _this.container.appendChild(_this.outtextarea);
        _this.container.appendChild(_this.errtextarea);
        return _this;
    }
    StdoutErrController.prototype.set = function (out, err, status) {
        this.outtextarea.value = out;
        this.errtextarea.value = err;
        this.container.classList.toggle('-error', status !== 0);
        if (this.errtextarea.value === "") {
            this.errtextarea.style.display = 'none';
        }
        else {
            this.errtextarea.style.display = '';
        }
    };
    return StdoutErrController;
}(AbstractController_1.AbstractBaseController));
exports.StdoutErrController = StdoutErrController;
