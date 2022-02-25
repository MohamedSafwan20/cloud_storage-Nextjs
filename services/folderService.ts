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
      if (
        Object.values(item).includes(data.name) &&
        Object.values(item).includes(data.path)
      ) {
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
      });

      user.save();

      return true;
    }
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
}
