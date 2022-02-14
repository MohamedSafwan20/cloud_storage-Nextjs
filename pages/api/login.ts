import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import withDbConnection from "../../backend/middlewares/main";
import User from "../../backend/models/User";
import { generateJwt } from "../../utils/utils";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(req.body);

  try {
    const user = await User.findOne({
      email: data.email,
    });

    if (user === null) {
      res.status(200).json({
        status: 0,
        message: "User not found!",
      });
      return;
    }

    if (bcrypt.compareSync(data.password, user.password)) {
      const token = generateJwt(user._id);

      res.status(200).json({
        status: 1,
        auth_token: token,
      });
    } else {
      res.status(200).json({
        status: 0,
        message: "Password is incorrect!",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      status: 0,
      message: "Server Error",
    });
  }
}

export default withDbConnection(handler);
