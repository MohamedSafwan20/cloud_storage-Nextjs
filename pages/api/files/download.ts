import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import {
  withDbConnection,
  withJwtVerification,
} from "../../../middlewares/main";
import NetworkService from "../../../services/networkService";
import fs from "fs";
import { dirname } from "path";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(req.body);

  try {
    var filePath = path.join(
      dirname(require.main?.filename!!),
      "/public/uploads/",
      data.filename
    );
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
      "Content-Length": stat.size,
      "Content-Disposition": `attachment; filename=${data.filename}`,
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.on("open", function () {
      // This just pipes the read stream to the response object (which goes to the client)
      readStream.pipe(res);
    });

    readStream.on("error", function (err) {
      res.end(err);
    });
  } catch (_err) {
    console.log(_err);
    res.status(200).json({ status: 0, message: "Server Error" });
  }
}

export default withDbConnection(withJwtVerification(handler));
