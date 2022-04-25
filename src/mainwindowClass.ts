/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { app, protocol, BrowserWindow, Menu, ipcMain, dialog } from 'electron'
const fs = require('fs')
const fsPromises = fs.promises;
const path = require('path');
// export default {
	const createMenu =()=> {

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
	}
	const getDefaultDirectorySubfolders = (parentDir)=> {

			return fs.readdirSync(parentDir).filter(function (file) {
			  return fs.statSync(parentDir+'/'+file).isDirectory();
			});
		
	}
	const  readFilesInaDirectory = async(parentDir, directories) =>{
		let mainArray:any = []
		directories.forEach(async (directory) => {
			// let getfiles = getFilesAsArray(parentDir,directory)
			// console.log(getfiles)
			const x = await listDir(parentDir + '\\' +directory)
			console.log(x)
			// console.log(obj.filesdata)
		});
		// mainArray.push({"one": "two"})
		// console.log(mainArray)
	}
	async function listDir(dirPath) {
		try {
			console.log(dirPath)
		  return fsPromises.readdir(dirPath);
		} catch (err) {
		  console.error('Error occured while reading directory!', err);
		}
	  }

	const getFilesAsArray = (dirPath:string, dirName:string) => {

		let obj: any = {};
		obj.trait = dirName
		obj.filesdata = []
		

		fs.readdir(dirPath+'\\'+dirName, function (err, files) {
			//handling error
			if (err) {
				// return console.log('Unable to scan directory: ' + err);
			} 
			
			files.forEach(file =>{
				const filepath = dirPath+'\\'+dirName+'\\'+file
				const fileData = fs.readFileSync(filepath.toString());
				const itemobj: any = {};
				itemobj.name =path.basename(dirPath+'\\'+dirName+'\\'+file)
				itemobj.svg = fileData
				obj.filesdata.push(itemobj)
			})
		});
		return obj;

	}
// }
export default{
	createMenu,
	getDefaultDirectorySubfolders,
	readFilesInaDirectory,
	getFilesAsArray
}