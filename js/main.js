"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = __importStar(require("path"));
var url = __importStar(require("url"));
// import * as fs from 'fs';
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var win;
function createWindow() {
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        width: 600,
        height: 730,
        minHeight: 500,
        minWidth: 600
    });
    var currentWin = win;
    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
    }));
    var template = [
        {
            label: "Application",
            submenu: [
                { label: "About Application", },
                { label: "Toggle Developer Tools", accelerator: "CommandOrControl+Alt+I", click: function () { return currentWin.webContents.toggleDevTools(); } },
                //   { label: "Preferences", submenu: [
                //     {
                //       label: "Settings",
                //       accelerator: "CmdOrCtrl+,",
                //       click: () => {
                //         shell.openItem( global.FILE_PREFS, {}, function() {
                //           throw new Error(JSON.stringify(Array.from(arguments)));
                //         });
                //       }
                //     }
                //   ]},
                { type: "separator" },
                { label: "Quit", accelerator: "Command+Q", click: function () { electron_1.app.quit(); } }
            ]
        },
        {
            label: "File",
            submenu: [
                { label: "New", accelerator: "CmdOrCtrl+N", click: createWindow },
            ]
        }, {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", },
                { label: "Copy", accelerator: "CmdOrCtrl+C", },
                { label: "Paste", accelerator: "CmdOrCtrl+V", },
                { label: "Select All", accelerator: "CmdOrCtrl+A", }
            ]
        }
    ];
    electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(template));
    // Emitted when the window is closed.
    win.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// app.on('before-quit', () => {
//   fs.writeFileSync(PREF_FILE, JSON.stringify(SETTINGS));
// })
electron_1.app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
