import type { NextApiRequest, NextApiResponse } from "next";
import withDbConnection from "../../backend/middlewares/main";
import User from "../../backend/models/User";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(req.body);

  try {
    const user = await User.create(data);

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
