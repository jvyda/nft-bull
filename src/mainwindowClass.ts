/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { app, protocol, BrowserWindow, Menu, ipcMain, dialog } from 'electron'
const fs = require('fs')
const fsPromises = fs.promises;
import { readdir } from 'fs/promises';
const path = require('path');
// export default {
	const createMenu =()=> {

		const menu = Menu.buildFromTemplate([
			{
				label: 'Menu',
				submenu: []
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
		const mainArray:any = []

		
			
		  
			for (const directory of directories) {
				
				const x = await listDir(parentDir + '\\' +directory)
				mainArray.push({trait: directory, filesdata:x})
				// mainArray.filesdata=x
				
			}
		  
			return mainArray
		  





		// directories.forEach(async (directory) => {
		// 	// let getfiles = getFilesAsArray(parentDir,directory)
		// 	// console.log(getfiles)
		// 	mainArray.push({trait: directory, filesdata:[]})
		// 	const x = await listDir(parentDir + '\\' +directory)
		// 	mainArray.filesdata=x
		// 	// console.log(mainArray)
		// });
		// // mainArray.push({"one": "two"})
		// console.log(mainArray)
	}
	async function listDir(dirPath) {
		try {
			const files = await readdir(dirPath);
			let filesdata:any = []
			files.forEach(file=>{
				let x:any = {}
				x.name = path.parse(file).name
				x.svg = fs.readFileSync(dirPath+'\\'+file).toString();
				filesdata.push(x)
			})
			return filesdata
			// fsPromises.readdirSync(dirPath).filter(function (file) {
			// 	return fs.statSync(dirPath+'/'+file).isDirectory();
			//   });
		//   return fsPromises.readdir(dirPath).filter(function (file) {
		// 		return fs.statSync(dirPath+'/'+file).isDirectory();
		// 	  });
		// return fsPromises.readdir(dirPath)
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
				const fileData = fs.readFileSync(filepath);
				const itemobj: any = {};
				itemobj.name =path.basename(dirPath+'\\'+dirName+'\\'+file)
				itemobj.svg = fileData.toString()
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