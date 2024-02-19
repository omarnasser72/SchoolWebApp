import Express from "express";
import { body } from "express-validator";
import {
  createSchool,
  deleteSchool,
  getSchools,
  updateSchool,
} from "../Controllers/SchoolController.js";
import { verifySuperAdmin, verifyUser } from "../utils/jwt.js";
const router = Express.Router();

//CREATE
router.post(
  "/",
  verifySuperAdmin,
  body("name")
    .isString()
    .withMessage("Please, Enter valid school name.")
    .isLength({ min: 3, max: 12 })
    .withMessage(
      "Please, enter school name with at least 4 characters and at most 15 characters."
    ),
  createSchool
);

//READ ONE SCHOOL USING ID OR ALL SCHOOLS
router.get("/", verifyUser, getSchools);

//UPDATE
router.put(
  "/",
  verifySuperAdmin,
  body("name")
    .isString()
    .withMessage("Please, Enter valid name.")
    .isLength({ min: 3, max: 12 })
    .withMessage(
      "Please, enter name with at least 4 characters and at most 15 characters."
    ),
  updateSchool
);

//DELETE
router.delete("/", verifySuperAdmin, deleteSchool);

export default router;
