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

export {
  generateJwt,
  refresh,
  getExtensionFromFilename,
  downloadFromPublicDirectory,
};
