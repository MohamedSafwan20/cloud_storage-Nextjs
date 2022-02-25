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

export { generateJwt, refresh };
