import jwt from "jsonwebtoken";

const generateJwt = (userId: string) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET!!
  );
};

const refresh = () => window.location.reload();

const getExtensionFromFilename = (filename: string) =>
  filename.substring(filename.lastIndexOf(".") + 1);

const downloadFromPublicDirectory = (filename: string) => {
  const a = document.createElement("a");
  a.href = `/uploads/${filename}`;
  a.download = filename;
  a.click();
  a.remove();
};

const formatBytes = (bytes: number, precision = 2): string => {
  if (bytes == 0) return "0 B";

  const base = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(base));

  return (
    parseFloat((bytes / Math.pow(base, i)).toFixed(precision)) + " " + sizes[i]
  );
};

export {
  generateJwt,
  refresh,
  getExtensionFromFilename,
  downloadFromPublicDirectory,
  formatBytes,
};
