import Express from "express";
import {
  createClassroom,
  deleteClassroom,
  getClassrooms,
  updateClassroom,
} from "../Controllers/ClassroomController.js";
import { verifySchoolAdmin } from "../utils/jwt.js";
import { body } from "express-validator";
const router = Express.Router();

//CREATE CLASSROOM
router.post(
  `/`,
  verifySchoolAdmin,
  body("name")
    .isString()
    .withMessage("Please, Enter valid classroom name.")
    .isLength({ min: 1, max: 1 })
    .withMessage("Please, enter classroom name with 1 character."),
  body("gradeYear")
    .isNumeric()
    .withMessage("Please, enter valid grade year")
    .custom((value) => {
      const grade = parseInt(value);
      if (grade < 1 || grade > 12)
        throw new Error("Please, enter grade year from 1 to 12.");
      return true;
    }),
  body("schoolId")
    .isString()
    .withMessage("Please, enter valid schoolId.")
    .isLength({ min: 1, max: 128 })
    .withMessage(
      "schoolId has to be at least 1 character and at most 128 characters."
    ),
  createClassroom
);

//READ ONE CLASSROOM USING ID OR ALL CLASSROOMS
router.get(`/`, verifySchoolAdmin, getClassrooms);

//UPDATE
router.put(
  "/",
  verifySchoolAdmin,
  body("name")
    .isString()
    .withMessage("Please, Enter valid classroom name.")
    .isLength({ min: 1, max: 1 })
    .withMessage("Please, enter classroom name with 1 character."),
  body("gradeYear")
    .isNumeric()
    .withMessage("Please, enter valid grade year")
    .custom((value) => {
      const grade = parseInt(value);
      if (grade < 1 || grade > 12)
        throw new Error("Please, enter grade year from 1 to 12.");
      return true;
    }),
  body("schoolId")
    .isString()
    .withMessage("Please, enter valid schoolId.")
    .isLength({ min: 1, max: 128 })
    .withMessage(
      "schoolId has to be at least 1 character and at most 128 characters."
    ),
  updateClassroom
);

//DELETE
router.delete("/", verifySchoolAdmin, deleteClassroom);

export default router;
