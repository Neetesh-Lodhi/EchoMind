import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const AdminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized. Please login." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check admin role or email
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ success: false, message: "Admin access denied" });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("AdminAuth Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Admin authorization failed" });
  }
};

export default AdminAuth;
