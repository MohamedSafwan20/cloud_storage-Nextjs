import IFavorite from "./IFavorite";
import IFileOrFolder from "./IFileOrFolder";

export default interface IUser {
  id: string;
  email: string;
  password: string;
  filesAndFolders: [IFileOrFolder];
  favorites: [IFavorite];
}
