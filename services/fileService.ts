import connectToDb from "../config/db";
import IFileOrFolder from "../models/IFileOrFolder";
import User from "../models/User";
import AuthService from "./authService";

type FileReq = {
  name: string;
  type: string;
  path: string;
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
      });

      user.save();

      return true;
    }
  }

  public static async deleteFile(
    folderName: string,
    userId: string
  ): Promise<boolean> {
    const res = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { filesAndFolders: { name: folderName } } },
      { new: true }
    );

    if (res._id) return true;

    return false;
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
}
