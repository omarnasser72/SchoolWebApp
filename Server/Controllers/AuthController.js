import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import { validationResult } from "express-validator";
import { createToken } from "../utils/jwt.js";

export const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.body.role !== "schoolAdmin" && req.body.role !== "superAdmin")
      return next(createError(403, "Invalid role."));
    if (req.body.role === "schoolAdmin" && !req.body.schoolId)
      return next(createError(403, "You've to enter school id."));
    if (req.body.role === "superAdmin" && req.body.schoolId)
      return next(
        createError(406, "You've to remove school id as you're super admin.")
      );

    const usernameExist = await User.findOne({ username: req.body.username });

    if (usernameExist)
      return next(createError(403, "Username already exists."));
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(400, "User doesn't exist!"));

    const { password } = req.body;

    if (!bcrypt.compareSync(password, user.password))
      return next(createError(400, "Wrong Password!"));

    const accessToken = createToken(user);

    res
      .status(200)
      .cookie("accessToken", accessToken)
      .json({
        success: "true",
        message: `${user.username} successfully logged in which is ${user.role}.`,
        id: `${user.id}`,
      });
  } catch (error) {
    next(error);
  }
};
