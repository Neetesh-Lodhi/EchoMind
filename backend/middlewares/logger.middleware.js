const loggerMiddleware = (req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);

  next(); // move to next middleware / route
};

module.exports = loggerMiddleware;
