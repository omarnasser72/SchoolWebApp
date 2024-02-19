import bcrypt from "bcrypt";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { validationResult } from "express-validator";

export const updateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const currentUser = await User.findById(req.query.id);
    if (!currentUser) next(createError(400, "User doesn't exist!"));

    if (req.body.role !== "superAdmin" && req.body.role !== "schoolAdmin")
      return next(createError(400, "invalid role."));
    if (req.body.role === "schoolAdmin" && !req.body.schoolId)
      return next(
        createError(
          400,
          "You've to enter schoolId if you're role is school admin."
        )
      );

    const usernameExist = await User.findOne({
      _id: { $ne: currentUser._id },
      username: req.body.username,
    });
    if (usernameExist) next(createError(403, "Username already exists!"));

    if (req.body.role && currentUser.role !== req.body.role)
      next(createError(400, "You can't change the role."));

    const updatedUser = await User.findByIdAndUpdate(
      req.query.id,
      {
        $set: {
          ...req.body,
          password: bcrypt.hashSync(req.body.password, 10),
        },
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    if (req.query.id) {
      const user = await User.findById(req.query.id);
      if (!user) return next(createError(400, "User doesn't exist !"));
      res.status(200).json(user);
    } else {
      const users = await User.find();
      if (!users) return next(createError(400, "There are no Users. "));
      res.status(200).json(users);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.query.id);
    if (!user) return next(createError(400, "User doesn't exist !"));
    await User.findByIdAndDelete(req.query.id);
    res.status(200).json(`${user.username} has deleted successfully.`);
  } catch (error) {
    next(error);
  }
};
