import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//import { createCustomError } from "../utils/custom-error.js";


export const register = async (req, res, next) => {
  // To hash the password. https://github.com/dcodeIO/bcrypt.js
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newUser = new User({
    ...req.body,
    password: hash,
  });

  await newUser.save();
  res.status(200).json({ msg: "User has been created successfully."});
}

export const login = async (req, res, next) => {
  const user = await User.findOne({ email : req.body.email });

  if (!user) {
    return res.status(401).send({ msg: "Invalid email or password" }); // or return next(createCustomError("Invalid email or password", 401))
    //You can use send/json methods but you have to send inside them json object. it's wrong to just send like this `send(invalid email or password)`
  }

  const isPasswordValid = await bcrypt.compare(req.body.password , user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ msg: "Invalid email or password" });
  }

  const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_TOKEN_SECRET);

  const { password, isAdmin, ...otherDetails } = user._doc;
  res.cookie("access_token", token, { httpOnly: true })
     .status(200).json({ details: { ...otherDetails }, isAdmin });
}