import jwt from "jsonwebtoken";

const generateJwt = (userId: string) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET!!
  );
};

export { generateJwt };
