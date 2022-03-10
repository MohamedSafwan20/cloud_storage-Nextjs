import IFavorite from "../models/IFavorite";
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
}
