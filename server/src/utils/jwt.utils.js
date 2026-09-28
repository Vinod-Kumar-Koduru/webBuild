import jwt from "jsonwebtoken";

// This funcation used to create a token for when user create
export const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

// check the token is verifying that user credantials
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
