import type { NextApiRequest, NextApiResponse } from "next";
import withDbConnection from "../../backend/middlewares/main";
import AuthService from "../../services/authService";
import { generateJwt } from "../../utils/utils";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(req.body);
  const auth = new AuthService();

  try {
    const user = await auth.login(data.email, data.password);

    if (user === null) {
      res.status(200).json({
        status: 0,
        message: "User not found!",
      });
      return;
    }

    if (user.data !== null) {
      const token = generateJwt(user.data.id);

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
