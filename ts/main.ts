import { app, BrowserWindow, Menu, MenuItemConstructorOptions, nativeTheme } from 'electron';
// import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// let win: BrowserWindow | null = null;

export interface WindowSetupData {
	darkMode: boolean;
}

const windows: BrowserWindow[] = [];

nativeTheme.addListener(
	'updated',
	function theThemeHasChanged() {
		for (const w of windows) {
			w.webContents.send('alter', {
				darkMode: nativeTheme.shouldUseDarkColors,
			} as WindowSetupData);
		}
	},
);

function createWindow() {
	// Create the browser window.
	let win: BrowserWindow | null = new BrowserWindow({
		height: 600,
		width: 800,

		minHeight: 500,
		minWidth: 500,

		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		},
	});

	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, '../index.html'),
		protocol: 'file:',
		slashes: true,
	}));

	const template: MenuItemConstructorOptions[] = [
		{
			label: app.name,
			submenu: [
				{ role: 'about' },
				{ type: 'separator' },
				{ role: 'toggleDevTools' },
				{ type: 'separator' },
				{ role: 'services', submenu: [] },
				{ type: 'separator' },
				{ role: 'hide' },
				{ role: 'hideOthers' },
				{ role: 'unhide' },
				{ type: 'separator' },
				{ role: 'quit' },
			],
		},
		{
			label: "File",
			submenu: [
				{ label: 'New', accelerator: "CmdOrCtrl+N", click: () => { createWindow(); } },
				{ type: 'separator' },
				{
					label: 'Close Window',

					accelerator: 'CmdOrCtrl+W',
					click: (item, w) => {
						if (w) { w.close(); }
					},
				},
			],
		},
		{ role: "editMenu" },
		{ role: "windowMenu" },
	];

	Menu.setApplicationMenu(Menu.buildFromTemplate(template));

	win.webContents.on('did-finish-load', () => {
		if (!win) { return; }

		win.webContents.send('setup', {
			darkMode: nativeTheme.shouldUseDarkColors,
		} as WindowSetupData);
	});

	// Emitted when the window is closed.
	win.on('closed', () => {
		if (win) {
			const index = windows.indexOf(win);
			if (index > -1) {
				windows.splice(index, 1);
			}
		}
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null;
	});

	windows.push(win);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// app.on('before-quit', () => {
//   fs.writeFileSync(PREF_FILE, JSON.stringify(SETTINGS));
// })

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (windows.length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.