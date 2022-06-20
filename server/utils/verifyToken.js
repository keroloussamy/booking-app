import jwt from "jsonwebtoken";
import { createCustomError } from "./custom-error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createCustomError("You are not authenticated!", 401));
  }

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
    if (err) return next(createCustomError("Token is not valid!", 403));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id === req.params.id || req.user.isAdmin) { //If the right user or admin
      next();
    } else {
      return next(createCustomError("You are not authorized!", 403));
    }
  });
};

//The next here is the next function in the chain of middleware, like getUsers, AddHotels etc.
export const verifyAdmin = (req, res, next) => {
  //Here you are calling the verifyToken function, and sending to it a next function to call it when it's done.
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next(); //This's the next function that comes to verifyAdmin. The getUsers, AddHotels etc.
    } else {
      return next(createCustomError("You are not authorized!", 403));
    }
  });
};
