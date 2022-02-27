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

export { generateJwt, refresh, getExtensionFromFilename };
