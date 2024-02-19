import jwt from "jsonwebtoken";
import { createError } from "./error.js";
const jwtRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/;

export const createToken = (user) => {
  let accessToken;
  if (user.schoolId) {
    accessToken = jwt.sign(
      { id: user._id, role: user.role, schoolId: user.schoolId },
      process.env.JWT
    );
  } else {
    accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT);
  }
  return accessToken;
};

export const verifyUser = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies["accessToken"], process.env.JWT);
    //console.log("decoded: ", decoded);
    if (!decoded) next(createError(403, "invalid token."));
    if (decoded.id === req.query.id) next();
    else
      next(createError(403, "You're id doesn't match with the requested one."));
  } catch (error) {
    next(error);
  }
};

export const verifySuperAdmin = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies["accessToken"], process.env.JWT);
    //console.log("decoded: ", decoded);
    if (!decoded) next(createError(403, "invalid token."));
    if (decoded.role === "superAdmin") next();
    else next(createError(403, "unauthorized super admin."));
  } catch (error) {
    next(error);
  }
};

export const verifySchoolAdmin = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies["accessToken"], process.env.JWT);
    console.log("decoded: ", decoded);
    if (!decoded) next(createError(403, "invalid token."));
    if (decoded.role !== "schoolAdmin")
      next(createError(403, "You're not schoolAdmin."));
    if (!req.body.schoolId) req.body.schoolId = decoded.schoolId;
    console.log("req.body: ", req.body);
    console.log("req.query: ", req.query);
    if (
      decoded.schoolId !== req.body.schoolId &&
      decoded.schoolId !== req.query.schoolId
    )
      next(createError(403, "unauthorized  schoolAdmin."));
    next();
  } catch (error) {
    next(error);
  }
};
