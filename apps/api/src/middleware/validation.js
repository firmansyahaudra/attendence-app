const jwt = require("jsonwebtoken");

module.exports = {
  validateToken: (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
      return res.status(401).send({ success: false, message: "Unauthorized: Missing token" });
    }

    try {
      const decoded = jwt.verify(req.token, process.env.SCRT_TKN);
      req.user = decoded;
      console.log(req.user);
      next();
    } catch (error) {
      return res.status(401).send({ success: false, message: "Unauthorized: Invalid token" });
    }
  },

  authorizeHR: (req, res, next) => {
    if (req.user.role !== "HR") {
      return res.status(400).send({ success: false, message: "Forbidden: Insufficient permissions" });
    }
    next();
  },

  authorizeEmployee: (req, res, next) => {
    if (req.user.role !== "Employee") {
      return res.status(400).send({ success: false, message: "Forbidden: Insufficient permissions" });
    }
    next();
  },
};













