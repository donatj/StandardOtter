"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StdinController_1 = require("./Controllers/StdinController");
var HorizontalResizer_1 = require("./Controllers/HorizontalResizer");
var StdoutErrController_1 = require("./Controllers/StdoutErrController");
var CommandController_1 = require("./Controllers/CommandController");
(function () {
    var body = document.querySelector('body');
    if (!body) {
        throw new Error("aint got no body");
    }
    console.log("here");
    var stdinC = new StdinController_1.StdinController();
    var stdoutC = new StdoutErrController_1.StdoutErrController();
    var hrC = new HorizontalResizer_1.ResizeController(stdinC, stdoutC);
    var cC = new CommandController_1.CommandController();
    var spawnSync = require('child_process').spawnSync;
    stdinC.addChangeListener(function (s) {
        var cmdData = "php".split(' ').filter(function (x) { return x != ''; });
        var result = spawnSync(cmdData.shift(), cmdData, { input: s });
        console.log(result);
        stdoutC.set(result.stdout, result.stderr, result.status);
        document.title = "Standard Otter - Exit Code: " + result.status;
    });
    hrC.attach(body);
    cC.attach(body);
})();
