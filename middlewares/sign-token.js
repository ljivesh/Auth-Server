import jwt from "jsonwebtoken";

export const signToken = (payload, expiresIn = "2h") => {
  const secretKey = process.env.SECRET_KEY;
  return jwt.sign(payload, secretKey, { expiresIn });
};
