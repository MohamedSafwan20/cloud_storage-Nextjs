import type { NextApiRequest, NextApiResponse } from "next";
import {
  withDbConnection,
  withJwtVerification,
} from "../../../middlewares/main";
import FileService from "../../../services/fileService";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) {
  const data = JSON.parse(req.body);

  try {
    const fileRes = await FileService.getFile(data.fileId, userId);

    if (fileRes !== undefined) {
      res.status(200).json({ status: 1, filename: fileRes.name });
      return;
    } else {
      res.status(200).json({
        status: 0,
        message: "File not found",
      });
      return;
    }
  } catch (_err) {
    res.status(200).json({ status: 0, message: "Server Error" });
  }
}

export default withDbConnection(withJwtVerification(handler));
