import type { NextApiRequest, NextApiResponse } from "next";
import {
  withDbConnection,
  withJwtVerification,
} from "../../../middlewares/main";
import User from "../../../models/User";
import FolderService from "../../../services/folderService";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) {
  const data = JSON.parse(req.body);

  try {
    const user = await User.findById(userId);

    const folderRes = await FolderService.addFolder(data, userId);

    if (folderRes) {
      res.status(200).json({ status: 1 });
      return;
    } else {
      res.status(200).json({
        status: 0,
        message: "Folder already exists",
      });
      return;
    }
  } catch (_err) {
    res.status(200).json({ status: 0, message: "Server Error" });
  }
}

export default withDbConnection(withJwtVerification(handler));
