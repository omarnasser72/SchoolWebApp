import Express from "express";
import { body } from "express-validator";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../Controllers/UserController.js";
import {
  verifySchoolAdmin,
  verifySuperAdmin,
  verifyUser,
} from "../utils/jwt.js";
const router = Express.Router();

//GET ONE USER USING ID OR ALL USERS
router.get("/", verifySuperAdmin, getUser);

//UPDATE USER
router.put(
  "/",
  verifySuperAdmin,
  body("username")
    .isString()
    .withMessage("Please, enter valid username.")
    .isLength({ min: 3, max: 15 })
    .withMessage(
      "Please, enter username with at least 3 characters and at most 15 characters."
    ),
  body("password")
    .isString()
    .withMessage("Please, enter valid password.")
    .isLength({ min: 4, max: 15 })
    .withMessage(
      "Please, enter password with at least 4 characters and at most 15 characters."
    ),
  body("role")
    .isString()
    .withMessage("Please, enter valid role.")
    .isLength({ min: 10, max: 11 })
    .withMessage("You have to select role superAdmin or schoolAdmin."),

  updateUser
);

//UPDATE USER'S OWN ACCOUNT
router.put(
  "/updateMyAccount",
  verifyUser,
  body("username")
    .isString()
    .withMessage("Please, enter valid username.")
    .isLength({ min: 3, max: 15 })
    .withMessage(
      "Please, enter username with at least 3 characters and at most 15 characters."
    ),
  body("password")
    .isString()
    .withMessage("Please, enter valid password.")
    .isLength({ min: 4, max: 15 })
    .withMessage(
      "Please, enter password with at least 4 characters and at most 15 characters."
    ),
  body("role")
    .isString()
    .withMessage("Please, enter valid role.")
    .isLength({ min: 10, max: 11 })
    .withMessage("You have to select role superAdmin or schoolAdmin."),
  updateUser
);

//DELETE USER
router.delete("/", verifySuperAdmin, deleteUser);

export default router;
