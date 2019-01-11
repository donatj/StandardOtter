import { app, BrowserWindow, Menu, /* shell, */ MenuItemConstructorOptions, remote } from 'electron';
import * as path from 'path';
import * as url from 'url';
// import * as fs from 'fs';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;


function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		width: 600,
		height: 730,
		minHeight: 500,
		minWidth: 600
	});

	let currentWin : BrowserWindow = win;

	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname,  '../index.html'),
		protocol: 'file:',
		slashes: true
	}))

	var template : MenuItemConstructorOptions[] = [
		{
			label: "Application",
			submenu: [
				{ label: "About Application", /*selector: "orderFrontStandardAboutPanel:"*/ },
				{ label: "Toggle Developer Tools", accelerator: "CommandOrControl+Alt+I", click: () => currentWin.webContents.toggleDevTools() },
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
				{ label: "Quit", accelerator: "Command+Q", click: function () { app.quit(); } }
			]
		},
		{
			label: "File",
			submenu: [
				{ label: "New", accelerator: "CmdOrCtrl+N", click: createWindow },
				{ label: "Close Window", accelerator: "CmdOrCtrl+W", click: () => {
					remote.getCurrentWindow().close();
				} }
			]
		}, {
			label: "Edit",
			submenu: [
				{ label: "Undo", accelerator: "CmdOrCtrl+Z", /* selector: "undo:" */ },
				{ label: "Redo", accelerator: "Shift+CmdOrCtrl+Z",/*  selector: "redo:" */ },
				{ type: "separator" },
				{ label: "Cut", accelerator: "CmdOrCtrl+X", /* selector: "cut:" */ },
				{ label: "Copy", accelerator: "CmdOrCtrl+C", /* selector: "copy:" */ },
				{ label: "Paste", accelerator: "CmdOrCtrl+V", /* selector: "paste:" */ },
				{ label: "Select All", accelerator: "CmdOrCtrl+A", /* selector: "selectAll:" */ }
			]
		}
	];

	Menu.setApplicationMenu(Menu.buildFromTemplate(template));

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

// app.on('before-quit', () => {
//   fs.writeFileSync(PREF_FILE, JSON.stringify(SETTINGS));
// })

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.