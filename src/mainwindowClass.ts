/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { app, protocol, BrowserWindow, Menu, ipcMain, dialog } from "electron";
const fs = require("fs");
const fsPromises = fs.promises;
import { readdir } from "fs/promises";
const path = require("path");
const getDefaultDirectorySubfolders = (parentDir) => {
  return fs.readdirSync(parentDir).filter(function (file) {
    return fs.statSync(parentDir + "/" + file).isDirectory();
  });
};
const readFilesInaDirectory = async (parentDir, directories) => {
  const mainArray: any = [];
  for (const directory of directories) {
    const x = await listDir(parentDir + "\\" + directory);
    mainArray.push({ trait: directory, filesdata: x });
  }
  return mainArray;
};
async function listDir(dirPath) {
  try {
    const files = await readdir(dirPath);
    let filesdata: any = [];
    files.forEach((file) => {
      let x: any = {};
      x.name = path.parse(file).name;
      x.svg = fs.readFileSync(dirPath + "\\" + file).toString();
      filesdata.push(x);
    });
    return filesdata;
  } catch (err) {
    console.error("Error occured while reading directory!", err);
  }
}

export default {
  getDefaultDirectorySubfolders,
  readFilesInaDirectory,
};
