import { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "../config/db";
import AuthService from "../services/authService";

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

const withJwtVerification = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = await AuthService.isUserAuthenticated(
      req.headers.authorization?.split(" ")[1]
    );

    if (!userId) {
      return res.status(401).send({
        error: "Unauthorized",
        status: 0,
      });
    }

    return handler(req, res, userId);
  };
};

export { withDbConnection, withJwtVerification };
