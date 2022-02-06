import { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "../config/db";

const withDbConnection = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    let dbError = false;

    await connectToDb().catch(() => {
      dbError = true;
    });

    if (dbError) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return handler(req, res);
  };
};

export default withDbConnection;
