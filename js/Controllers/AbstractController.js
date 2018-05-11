"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractBaseController = /** @class */ (function () {
    function AbstractBaseController(container, name) {
        this.container = container;
        this.name = name;
        container.classList.add(name + "--controller");
    }
    AbstractBaseController.prototype.attach = function (elm) {
        elm.appendChild(this.container);
    };
    AbstractBaseController.prototype.getContainer = function () {
        return this.container;
    };
    return AbstractBaseController;
}());
exports.AbstractBaseController = AbstractBaseController;
