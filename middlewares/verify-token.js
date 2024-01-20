import jwt from "jsonwebtoken";

// Middleware to verify a JWT token
export const verifyToken = (req, res, next) => {
  //   const token = req.header('Authorization');

  //read the authToken from cookie
  //   const token = req.cookies.authToken;
  // console.log("token", token);
  // console.log("token", token);
  const secretKey = process.env.SECRET_KEY;

  //extract token from Authorization header that contains bearer token
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ type: 'FAIL', message: "Access denied. No token provided." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ type: 'FAIL', message: "Invalid token." });
    }

    req.user = decoded; // Set the decoded user information in the request object
    next();
  });
};
