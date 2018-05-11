"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.listeners = new Set();
    }
    EventEmitter.prototype.add = function (callback) {
        this.listeners.add(callback);
    };
    EventEmitter.prototype.trigger = function (event) {
        this.listeners.forEach(function (fn) { return fn(event); });
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
