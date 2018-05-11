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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractController_1 = require("./AbstractController");
var ResizeController = /** @class */ (function (_super) {
    __extends(ResizeController, _super);
    function ResizeController(left, right, options) {
        if (options === void 0) { options = null; }
        var _this = _super.call(this, document.createElement('div'), 'horizontal-resize') || this;
        _this.left = left;
        _this.right = right;
        _this.grabber = document.createElement('div');
        _this.options = {
            width: 5,
        };
        _this.options = __assign({}, _this.options, options);
        _this.grabber.classList.add("grabber");
        _this.container.appendChild(_this.grabber);
        left.attach(_this.container);
        right.attach(_this.container);
        left.getContainer().style.gridRow = "1";
        left.getContainer().style.gridColumn = "1";
        _this.grabber.style.gridRow = "1";
        _this.grabber.style.gridColumn = "2";
        right.getContainer().style.gridRow = "1";
        right.getContainer().style.gridColumn = "3";
        _this.grabber.addEventListener('mousedown', _this.down.bind(_this));
        _this.mouseupbind = _this.up.bind(_this);
        _this.movebind = _this.move.bind(_this);
        return _this;
    }
    ResizeController.prototype.down = function (e) {
        e.preventDefault();
        this.grabber.classList.add("-resizing");
        document.documentElement.style.cursor = 'ew-resize';
        this.container.addEventListener('mousemove', this.movebind);
        window.addEventListener('mouseup', this.mouseupbind);
    };
    ResizeController.prototype.move = function (e) {
        var rect = this.container.getBoundingClientRect();
        // console.log();
        var pos = (e.clientX - rect.left) - (this.options.width / 2);
        this.container.style.gridTemplateColumns = pos + "px " + this.options.width + "px";
    };
    ResizeController.prototype.up = function () {
        this.container.removeEventListener('mousemove', this.movebind);
        window.removeEventListener('mouseup', this.mouseupbind);
        document.documentElement.style.cursor = '';
        this.grabber.classList.remove("-resizing");
    };
    return ResizeController;
}(AbstractController_1.AbstractBaseController));
exports.ResizeController = ResizeController;
