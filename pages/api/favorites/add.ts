import type { NextApiRequest, NextApiResponse } from "next";
import {
  withDbConnection,
  withJwtVerification,
} from "../../../middlewares/main";
import FavoritesService from "../../../services/favoritesService";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) {
  const { id } = JSON.parse(req.body);

  try {
    const favRes = await FavoritesService.addToFavorites({ userId, id });

    if (favRes) {
      res.status(200).json({ status: 1 });
      return;
    } else {
      res.status(200).json({
        status: 0,
        message: "Couldn't add to favorites",
      });
      return;
    }
  } catch (_err) {
    res.status(200).json({ status: 0, message: "Server Error" });
  }
}

export default withDbConnection(withJwtVerification(handler));
