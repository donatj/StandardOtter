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
var EventEmitter_1 = require("../EventEmitter");
var StdinController = /** @class */ (function (_super) {
    __extends(StdinController, _super);
    function StdinController(timeout) {
        if (timeout === void 0) { timeout = 1000; }
        var _this = _super.call(this, document.createElement('div'), "stdin") || this;
        _this.timeout = timeout;
        _this.changeEmitter = new EventEmitter_1.EventEmitter();
        _this.last = "";
        _this.textarea = document.createElement('textarea');
        _this.to = 0;
        _this.container.appendChild(_this.textarea);
        _this.textarea.addEventListener("change", _this.change.bind(_this));
        _this.textarea.addEventListener("keyup", _this.change.bind(_this));
        _this.changeEmitter.add(function (e) {
            console.log(e);
        });
        return _this;
    }
    StdinController.prototype.addChangeListener = function (listener) {
        this.changeEmitter.add(listener);
    };
    StdinController.prototype.change = function () {
        var _this = this;
        clearTimeout(this.to);
        this.to = window.setTimeout(function () {
            if (_this.textarea.value !== _this.last) {
                _this.changeEmitter.trigger(_this.textarea.value);
            }
            _this.last = _this.textarea.value;
        }, this.timeout);
    };
    return StdinController;
}(AbstractController_1.AbstractBaseController));
exports.StdinController = StdinController;
