'use strict'
/* eslint-disable */
import { app, protocol, BrowserWindow, ipcMain, ipcRenderer, dialog } from 'electron'
// import process from 'process';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require("path")
const url = require('url');
// const path = require('path');
// const fs = require('fs');


const Store = require('electron-store');

const store = new Store();

store.set('unicorn', null);
console.log(store.get('unicorn'));


import mainwindowClass from './mainwindowClass'
mainwindowClass.createMenu()



// function createSplashWindow() {
// 	// Create the browser window.
// 	const mainWindow = new BrowserWindow({
// 	  width: 800,
// 	  height: 600,
// 	  webPreferences: {
// 		 preload: path.join(__dirname, 'preload.js')
// 	   }
// 	})
// 	// and load the index.html of the app.
// 	mainWindow.loadFile('splash.html')
// 	mainWindow.center();
// 	// Open the DevTools.  
//    // mainWindow.webContents.openDevTools()
//   }

 



// createSplashWindow()
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } }
])
let mainWindow;
async function createWindow() {

	// var splash = new BrowserWindow({
	// 	width: 500, 
	// 	height: 300, 
	// 	// transparent: true, 
	// 	frame: false, 
	// 	alwaysOnTop: true 
	// });

	// splash.loadURL(url.format({
	// 	pathname : path.join(__dirname,'src/splash.html'),
	// 	protocol:'file',
	// 	slashes:true
	//   }))
	// splash.loadFile('./splash.html');
	// splash.loadURL('https://github.com')
	// splash.loadURL(path.join(__dirname,'./splash.html'));
	// splash.loadURL('app://./splash.html');
	
	// splash.center()
// console.log(path.join(__dirname,'./src/splash.html'));
// console.log(__dirname)

// console.log(`path: ${process.cwd()}`);

	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 800,
		show: false,
		frame: true,
		autoHideMenuBar: true,
		backgroundColor: '#383b43',
		titleBarStyle: "hiddenInset",
		webPreferences: {

			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			nodeIntegration: true,
			contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
		}
	})

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
		if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
	} else {
		createProtocol('app')
		// Load the index.html when not in development
		mainWindow.loadURL('app://./index.html')
	}
	// setTimeout(function () {
	// 	// splash.close();
	// 	// mainWindow.maximize();
	// 	mainWindow.show();
	//   }, 5000);

	  mainWindow.once('ready-to-show', () => {
		mainWindow.show()
		mainWindow.focus();
	  })
}

// Quit when all windows are closed. 
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools
		try {
			await installExtension(VUEJS_DEVTOOLS)
		} catch (e) {
			// console.error('Vue Devtools failed to install:', e.toString())
		}
	}
	createWindow()
})



ipcMain.on('defaultDirectory:unset', (event, log) => {
	dialog.showOpenDialog({
		title: 'Select Project Path',
		properties: ['openDirectory']
	}).then(result => {
		// console.log('mainWindow')
		event.sender.send('defaultDirectory:set', result);
		// console.log({ result: result, subdirectories: mainwindowClass.getDefaultDirectorySubfolders(result.filePaths[0]) })
		mainwindowClass.getDefaultDirectorySubfolders(result.filePaths[0]);
		// console.log(result)
		// console.log(result.filePaths[0])
		mainwindowClass.readFilesInaDirectory(result.filePaths[0], mainwindowClass.getDefaultDirectorySubfolders(result.filePaths[0]) )


		// mainWindow.webContents.on("did-finish-load", () => {
		// 	mainWindow.webContents.send("load:project", { 'SAVED': 'File Saved' });
		// });



		// callback(result.filePaths)
	}).catch(err => {
		console.log(err)
	})
})



// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', (data) => {
			if (data === 'graceful-exit') {
				app.quit()
			}
		})
	} else {
		process.on('SIGTERM', () => {
			app.quit()
		})
	}
}
