import type { NextApiRequest, NextApiResponse } from "next";
import withDbConnection from "../../../middlewares/main";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(req.body);

  try {
  } catch (_err) {}
}

export default withDbConnection(handler);
