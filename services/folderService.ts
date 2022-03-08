import connectToDb from "../config/db";
import IFileOrFolder from "../models/IFileOrFolder";
import User from "../models/User";
import AuthService from "./authService";

export default class FolderService {
  public static async addFolder(
    data: IFileOrFolder,
    userId: string
  ): Promise<boolean> {
    const user = await User.findById(userId);

    let folderExists = false;

    // Algorithm for checking if folder exists
    user.filesAndFolders.some((item: any) => {
      if (item.name === data.name && item.path === data.path) {
        folderExists = true;
        return true;
      } else {
        folderExists = false;
      }
    });

    if (folderExists) {
      return false;
    } else {
      user.filesAndFolders.push({
        path: data.path,
        type: data.type,
        name: data.name,
        size: 0,
      });

      user.save();

      return true;
    }
  }

  public static async deleteFolder(
    folderName: string,
    folderPath: string,
    userId: string
  ): Promise<boolean> {
    const res = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { filesAndFolders: { name: folderName, path: folderPath } } },
      { new: true }
    );

    if (res._id) {
      const path = folderPath + folderName;

      const deleteRes = await User.updateMany(
        { _id: userId },
        {
          $pull: {
            filesAndFolders: { path: { $regex: "^" + path, $options: "i" } },
          },
        },
        { new: true }
      );

      return true;
    }

    return false;
  }

  public static async getAllFolders(
    token: string
  ): Promise<Array<IFileOrFolder>> {
    const userId = AuthService.isUserAuthenticated(token);

    if (userId === false) {
      return [];
    }

    await connectToDb();

    const user = await User.findById(userId);

    return user.filesAndFolders.filter((item: any) => item.type === "folder");
  }

  public static async getFoldersOfPath(
    userId: string,
    path: string
  ): Promise<Array<IFileOrFolder>> {
    const user = await User.findById(userId);

    return user.filesAndFolders.filter((item: any) => {
      return item.path === path && item.type === "folder";
    });
  }

  public static async getFoldersAndFilesOfPath(
    userId: string,
    path: string
  ): Promise<Array<IFileOrFolder>> {
    const user = await User.findById(userId);

    return user.filesAndFolders.filter((item: any) => {
      return item.path === path;
    });
  }
}
