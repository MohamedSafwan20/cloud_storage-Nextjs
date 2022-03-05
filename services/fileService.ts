import fs from "fs";
import path from "path";
import connectToDb from "../config/db";
import IFileOrFolder from "../models/IFileOrFolder";
import User from "../models/User";
import AuthService from "./authService";

type FileReq = {
  name: string;
  type: string;
  path: string;
  size: number;
};

export default class FileService {
  public static async addFile(data: FileReq, userId: string): Promise<boolean> {
    const user = await User.findById(userId);

    let fileExists = false;

    // Algorithm for checking if folder exists
    user.filesAndFolders.some((item: any) => {
      if (item.name === data.name && item.path === data.path) {
        fileExists = true;
        return true;
      } else {
        fileExists = false;
      }
    });

    if (fileExists) {
      return false;
    } else {
      user.filesAndFolders.push({
        path: data.path,
        type: data.type,
        name: data.name,
        size: data.size,
      });

      user.save();

      return true;
    }
  }

  public static async deleteFileFromDb(
    fileId: string,
    userId: string
  ): Promise<boolean> {
    const res = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { filesAndFolders: { _id: fileId } } },
      { new: true }
    );

    if (res._id) return true;

    return false;
  }

  public static deleteFileFromLocalDirectory(filepath: string): boolean {
    try {
      var file = path.join(require("path").resolve("./"), filepath);
      fs.unlinkSync(file);

      return true;
    } catch (_err) {
      return false;
    }
  }

  public static async getAllFiles(
    token: string
  ): Promise<Array<IFileOrFolder>> {
    const userId = AuthService.isUserAuthenticated(token);

    if (userId === false) {
      return [];
    }

    await connectToDb();

    const user = await User.findById(userId);

    return user.filesAndFolders.filter((item: any) => item.type === "file");
  }

  public static async getFile(fileId: string, userId: string) {
    const user = await User.findById(userId);

    const file = await user.filesAndFolders.find((item: any) => {
      return item.type === "file" && item._id.toString() === fileId;
    });

    return file;
  }
}
