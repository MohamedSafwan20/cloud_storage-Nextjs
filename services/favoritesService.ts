import IFavorite from "../models/IFavorite";
import IFileOrFolder from "../models/IFileOrFolder";
import User from "../models/User";

export default class FavoritesService {
  public static async addToFavorites({
    userId,
    id,
  }: {
    userId: string;
    id: string;
  }): Promise<boolean> {
    try {
      const user = await User.findById(userId);

      user.favorites.push({
        data_id: id,
      });

      user.save();

      return true;
    } catch (_err) {
      return false;
    }
  }

  public static async getAllFavorites(
    userId: string
  ): Promise<Array<IFavorite>> {
    const user = await User.findById(userId);

    return user.favorites;
  }

  public static async getAllFavoriteFolders({
    userId,
  }: {
    userId: string;
  }): Promise<Array<IFavorite>> {
    const user = await User.findById(userId);

    const favoritesIds = user.favorites.map(
      (favorite: IFavorite) => favorite.data_id
    );

    return user.filesAndFolders.filter((folder: IFileOrFolder) =>
      favoritesIds.includes(folder._id)
    );
  }
}
