import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import withDbConnection from "../../middlewares/main";

const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

function handler(req: NextApiRequest, res: NextApiResponse) {
  User.findById("61ffa998133aa8fbe28dee9d", (err: any, kittens: any) => {
    console.log(err);
    console.log(kittens);
  });

  res.status(200).json({ name: "John Doe" });
}

export default withDbConnection(handler);
