import User from "../models/User.js";
import { createCustomError } from "../utils/custom-error.js";

export const updateUser = async (req, res, next) => {
  const { id: userID } = req.params;
  const updatedUser = await User.findByIdAndUpdate(userID, req.body, { new: true, runValidators: true });
  if (!updatedUser) {
    return next(createCustomError(`User With this id: ${userID} doesn't exist.`, 404))
  }
  res.status(200).json(updatedUser);
};

export const deleteUser = async (req, res, next) => {
  const { id: userID } = req.params;
  const user = await User.findByIdAndDelete(userID);
  if (!user) {
    return next(createCustomError(`User With this id: ${userID} doesn't exist.`, 404))
  }
  res.status(200).json("User has been deleted.");
};

export const getUser = async (req, res, next) => {
  const { id: userID } = req.params;
  const user = await User.findById(userID);

  if (!user) {
    return next(createCustomError(`User With this id: ${userID} doesn't exist.`, 404))
  }
  res.status(200).json(user);
};

export const getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
};