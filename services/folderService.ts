import User from "../models/User";

type FolderData = {
  path: string;
  name: string;
  type: string;
};

export default class FolderService {
  public static async addFolder(
    data: FolderData,
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
}
