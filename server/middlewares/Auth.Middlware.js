import jwt from "jsonwebtoken";
import User from "../models/User.js";

const SECRET = process.env.JWT_SECRET;

export const authinticate = async (req, res, next) => {
  let token;
  // if (req.session && req.session.token) next(); كملها

  // Check for token in Authorization header first
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // Else, check for token in cookies
  else if (req.cookies.access_token) {
    token = req.cookies.access_token;
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, SECRET);

    // Attach user to the request object (excluding password)
    req.user = await User.findById(decoded.sub).select("-password");

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }
    console.log(`User authenticated successfully.`);

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // protect middleware must have run first to attach req.user
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: Your role (${req.user.role}) is not authorized to access this resource.`,
      });
    }
    next();
  };
};

export const protectWithSession = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res
    .status(401)
    .json({ message: "Not authorized, no active session." });
};
