import type { NextApiRequest, NextApiResponse } from "next";
import withDbConnection from "../../middlewares/main";
import AuthService from "../../services/authService";
import { generateJwt } from "../../utils/utils";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(req.body);

  try {
    const user = await AuthService.register(data.email, data.password);

    if (user.id) {
      const token = generateJwt(user.id);

      res.status(201).json({
        status: 1,
        auth_token: token,
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
