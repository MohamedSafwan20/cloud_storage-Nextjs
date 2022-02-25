import multer from "multer";
import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import connectToDb from "../../../config/db";
import AuthService from "../../../services/authService";
import FileService from "../../../services/fileService";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const handler = nextConnect({
  onError(error, req, res: any) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.use(upload.single("file"));

handler.post(async (req: any, res: NextApiResponse) => {
  try {
    const userId = AuthService.isUserAuthenticated(
      req.headers.authorization?.split(" ")[1]
    );

    if (userId === false) {
      return res.status(200).json({ status: 0, message: "Unauthorized" });
    }

    await connectToDb();

    const fileRes = await FileService.addFile(
      { name: req.file.originalname, type: "file", path: req.headers.path },
      userId as string
    );

    if (fileRes)
      return res
        .status(201)
        .json({ status: 1, message: "File Successfully added" });
    else
      return res
        .status(200)
        .json({ status: 0, message: "File already exists" });
  } catch (_err) {
    res.status(200).json({ status: 0, message: "Server Error" });
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
