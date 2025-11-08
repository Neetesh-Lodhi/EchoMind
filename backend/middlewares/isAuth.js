import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Not authorized, please login again",
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("isAuth Error:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default isAuth;
