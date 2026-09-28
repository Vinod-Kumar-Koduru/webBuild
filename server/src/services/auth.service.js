import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { generateToken } from "../utils/jwt.utils.js";

export const register = async (name, email, password) => {
  const existing = await User.findOne({ email }); // if user already present then return true
  //if user already there then throw errordd
  if (existing) {
    const error = new Error("Email already registered.");
    error.statusCode = 409;
    throw error;
  }
  //create encrpt password 10 times
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });

  //return object with token and user details
  const token = generateToken(user);

  return {
    token,
    user: { id: user._id, email: user.email, name: user.name },
  };
};

/**login with email and password  
 *email,password -> find user in database 
 |-> if not found return error -> if found check password compartion
 |-> if password not correct throw Error ->
 |-> is password correct then generate the token -> return token,userdetails*/
export const emailLogin = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }
  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user);

  return {
    token,
    user: { id: user._id, email: user.email, name: user.name },
  };
};

//get user details funcation

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin,
  };
};
