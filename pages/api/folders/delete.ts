import type { NextApiRequest, NextApiResponse } from "next";
import {
  withDbConnection,
  withJwtVerification,
} from "../../../middlewares/main";
import FolderService from "../../../services/folderService";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) {
  const data = JSON.parse(req.body);

  try {
    const folderRes = await FolderService.deleteFolder(data.folderName, userId);

    if (folderRes) {
      res.status(200).json({ status: 1 });
      return;
    } else {
      res.status(200).json({
        status: 0,
        message: "Couldn't delete folder",
      });
      return;
    }
  } catch (_err) {
    res.status(200).json({ status: 0, message: "Server Error" });
  }
}

export default withDbConnection(withJwtVerification(handler));
