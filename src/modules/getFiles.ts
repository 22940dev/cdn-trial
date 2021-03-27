import { Request, Response } from "express";
import { readdir, stat } from "fs/promises";
import path from "path";
import { errorHandler } from "../utils/errorHandler";
import { generateHtml } from "./generateFileHtml";

export const getFiles = async (
  directory: string,
  fileList: string[]
): Promise<string[]> => {
  try {
    const files = await readdir(directory);
    for (const file of files) {
      const fileStat = await stat(path.join(directory, file));
      if (fileStat.isDirectory()) {
        fileList = await getFiles(path.join(directory, file), fileList);
      } else {
        fileList.push(path.join(directory, file));
      }
    }
    return fileList;
  } catch (error) {
    errorHandler("get files", error);
    return [];
  }
};

export const parseFileList = (files: string[]): string[] => {
  try {
    files.forEach((file, index) => {
      const split = file.split(/\\|\//);
      const targetIndex = split.indexOf("assets");
      const newSplit = split.slice(targetIndex);
      const newPath = newSplit.join("/").replace("assets", "content");
      files[index] = newPath;
    });
    return files;
  } catch (error) {
    errorHandler("parse files", error);
    return [];
  }
};

export const getFilesRoute = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const rawFileList = await getFiles(path.join(__dirname + "/../assets"), []);
    const parsedFileList = parseFileList(rawFileList);
    const finalHtml = generateHtml(parsedFileList);
    res.send(finalHtml);
  } catch (error) {
    errorHandler("files route", error);
    res.status(500).send("An unknown error has occured!");
  }
};
