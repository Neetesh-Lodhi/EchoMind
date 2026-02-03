const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  // fake validation for demo
  if (token !== "mysecrettoken") {
    return res.status(403).json({ message: "Invalid Token" });
  }

  next();
};

module.exports = authMiddleware;
