import * as authService from "../services/auth.service.js";

export const registerUser = async (request, response, next) => {
  try {
    const { name, password, email } = request.body;

    if (!name || !password || !email) {
      return response.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }
    if (password.length < 6) {
      return response.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }
    const result = await authService.register(name, email, password);
    return response.status(201).json({ success: true, data: result });
  } catch (error) {
    if (error.statusCode)
      return response.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    next(error);
  }
};

export const loginUser = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    const result = await authService.emailLogin(email, password);
    return response.status(200).json({ success: true, data: result });
  } catch (error) {
    if (error.statusCode)
      return response
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    next(error);
  }
};

export const getMe = async (request, response, next) => {
  try {
    const user = await authService.getUserProfile(request.user._id);
    return response.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const logout = (request, response) => {
  return response.json({
    success: true,
    data: { message: "Logged out successfully" },
  });
};
