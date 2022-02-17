import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import IUser from "../models/IUser";
import User from "../models/User";

type LoginRes = {
  data: IUser | null;
};

type VerifyRes = {
  id: string;
};

class AuthService {
  public static async register(
    email: string,
    password: string
  ): Promise<IUser> {
    const user = await User.create({
      email,
      password: bcrypt.hashSync(password, 10),
    });

    return user;
  }

  public static async login(
    email: string,
    password: string
  ): Promise<LoginRes | null> {
    const user = await User.findOne({
      email,
    });

    if (user === null) return null;

    if (bcrypt.compareSync(password, user.password)) {
      return {
        data: user,
      };
    } else {
      return {
        data: null,
      };
    }
  }

  public static async isUserAuthenticated(
    token: string | undefined
  ): Promise<boolean> {
    try {
      if (token === undefined) return false;

      const formattedToken = token.split("=")[1];
      const data = jwt.verify(
        formattedToken,
        process.env.JWT_SECRET!!
      ) as VerifyRes;

      return data.id ? true : false;
    } catch (_err) {
      return false;
    }
  }
}

export default AuthService;
