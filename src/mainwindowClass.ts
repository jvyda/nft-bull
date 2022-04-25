/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { app, protocol, BrowserWindow, Menu, ipcMain, dialog } from 'electron'
const fs = require('fs')
export default {
	createMenu() {

		const menu = Menu.buildFromTemplate([
			{
				label: 'Menu',
				submenu: [
					// 	{
					// 		label: 'Home',
					// 		click() {
					// 			console.log("Navigate to Home");
					// 		}

					// 	},
					// 	{
					// 		label: 'About',

					// 		click() {
					// 			console.log("Navigate to About");
					// 		}
					// 	},
					{
						label: 'Exit',
						click() {
							app.quit()
						}
					}
				]
			}
		])
		Menu.setApplicationMenu(menu);
	},
	getDefaultDirectorySubfolders(path) {
		return fs.readdirSync(path).filter(function (file) {
			return fs.statSync(path + '/' + file).isDirectory();
		});
	}
}