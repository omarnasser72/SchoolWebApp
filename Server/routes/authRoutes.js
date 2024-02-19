import Express from "express";
import { login, signup } from "../Controllers/AuthController.js";
import { body } from "express-validator";
const router = Express.Router();

//SIGNUP
router.post(
  "/signup",
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
    .isLength({ min: 4 })
    .withMessage("Please, enter password with at least 4 characters."),
  body("role")
    .isString()
    .withMessage("Please, enter valid role.")
    .isLength({ min: 10, max: 11 })
    .withMessage("You have to select role superAdmin or schoolAdmin."),
  signup
);

//LOGIN
router.post(
  "/login",
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
  login
);

//LOGOUT
//router.get("/logout")

export default router;
