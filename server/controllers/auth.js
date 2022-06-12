import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res, next) => {
  // To hash the password. https://github.com/dcodeIO/bcrypt.js
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newUser = new User({
    ...req.body,
    password: hash,
  });

  await newUser.save();
  res.status(200).send("User has been created successfully.");
}

export const login = async (req, res, next) => {
  const user = await User.findOne({ email : req.body.email });

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(req.body.password , user.password);

  if (!isPasswordValid) {
    return res.status(401).send("Invalid email or password");
  }

  const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_TOKEN_SECRET);

  // res.header("auth-token", token).send(token);

  const { password, isAdmin, ...otherDetails } = user._doc;
  res.cookie("access_token", token, { httpOnly: true })
     .status(200).json({ details: { ...otherDetails }, isAdmin });
}