import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import withDbConnection from "../../backend/middlewares/main";
import User from "../../backend/models/User";
import AuthService from "../../services/authService";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(req.body);
  const auth = new AuthService();

  try {
    const user = await auth.register(data.email, data.password);

    if (user.id) {
      res.status(201).json({
        status: 1,
      });
    } else {
      res.status(200).json({
        status: 0,
        message: "Something went wrong",
      });
    }
  } catch (err: any) {
    if (err.code === 11000) {
      res.status(200).json({
        status: 0,
        message: "Email already exists",
      });
    } else {
      res.status(500).json({
        status: 0,
        message: "Server Error",
      });
    }
  }
}

export default withDbConnection(handler);
