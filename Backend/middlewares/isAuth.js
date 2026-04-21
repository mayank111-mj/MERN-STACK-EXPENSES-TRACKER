const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];

  if (!token) {
    res.status(401);
    return next(new Error("Authentication token missing"));
  }

  jwt.verify(token, "JWT_SECRET_KEY", (err, decoded) => {
    if (err) {
      res.status(401);
      return next(new Error("Invalid or expired token"));
    }

    req.user = decoded.id;
    next();
  });
};

module.exports = isAuth;
