const fs = require("fs");

export default class NetworkService {
  public static downloadFromLocalDirectory = async (filename: string) => {
    const path = process.env.UPLOAD_PATH + "/" + filename;
    var file = await fs.readFile(path);
    return file;
  };
}
