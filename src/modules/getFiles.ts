import { Request, Response } from "express";
import { readdir, stat } from "fs/promises";
import path from "path";
import { generateHtml } from "./generateFileHtml";

export const getFiles = async (
  directory: string,
  fileList: string[]
): Promise<string[]> => {
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
};

export const parseFileList = (files: string[]): string[] => {
  files.forEach((file, index) => {
    const split = file.split(/\\|\//);
    const targetIndex = split.indexOf("assets");
    const newSplit = split.slice(targetIndex);
    const newPath = newSplit.join("/").replace("assets", "content");
    files[index] = newPath;
  });
  return files;
};

export const getFilesRoute = async (
  _: Request,
  res: Response
): Promise<void> => {
  const rawFileList = await getFiles(path.join(__dirname + "/../assets"), []);
  const parsedFileList = parseFileList(rawFileList);
  const finalHtml = generateHtml(parsedFileList);
  res.send(finalHtml);
};
