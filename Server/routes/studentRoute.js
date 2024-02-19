import Express from "express";
import { body } from "express-validator";
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../Controllers/StudentController.js";
import { verifySchoolAdmin } from "../utils/jwt.js";
const router = Express.Router();

//CREATE Student
router.post(
  `/`,
  verifySchoolAdmin,
  body("name")
    .isString()
    .withMessage("Please, enter a valid name.")
    .isLength({ min: 3, max: 15 })
    .withMessage(
      "Please, enter username with at least 3 characters and at most 15 characters."
    ),
  body("classroomId")
    .isString()
    .withMessage("Please, enter valid classroomId.")
    .isLength({ min: 1, max: 128 })
    .withMessage(
      "classroomId has to be at least 1 character and at most 128 characters."
    ),
  body("schoolId")
    .isString()
    .withMessage("Please, enter valid schoolId.")
    .isLength({ min: 1, max: 128 })
    .withMessage(
      "schoolId has to be at least 1 character and at most 128 characters."
    ),
  createStudent
);

//READ ONE Student USING ID OR ALL Students
router.get(`/`, verifySchoolAdmin, getStudents);

//UPDATE
router.put(
  "/",
  verifySchoolAdmin,
  body("name")
    .isString()
    .withMessage("Please, enter a valid name.")
    .isLength({ min: 3, max: 15 })
    .withMessage(
      "Please, enter username with at least 3 characters and at most 15 characters."
    ),
  body("classroomId")
    .isString()
    .withMessage("Please, enter valid classroomId.")
    .isLength({ min: 1, max: 128 })
    .withMessage(
      "classroomId has to be at least 1 character and at most 128 characters."
    ),
  body("schoolId")
    .isString()
    .withMessage("Please, enter valid schoolId.")
    .isLength({ min: 1, max: 128 })
    .withMessage(
      "schoolId has to be at least 1 character and at most 128 characters."
    ),
  updateStudent
);

//DELETE
router.delete("/", verifySchoolAdmin, deleteStudent);

export default router;
