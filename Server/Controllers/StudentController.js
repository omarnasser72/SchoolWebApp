import Student from "../models/Student.js";
import Classroom from "../models/Classroom.js";
import School from "../models/School.js";
import { createError } from "../utils/error.js";
import { validationResult } from "express-validator";

export const createStudent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const StudentExists = await Student.findOne({
      name: req.body.name,
      classroomId: req.body.classroomId,
      schoolId: req.body.schoolId,
    });
    const classroom = await Classroom.findById(req.body.classroomId);
    if (!classroom) next(createError(400, "Classroom doesn't exist !"));
    const school = await School.findById(req.body.schoolId);
    if (!school) next(createError(400, "School doesn't exist !"));

    if (StudentExists) return next(createError(400, "Duplicated Student"));

    const newStudent = new Student({
      ...req.body,
    });
    newStudent.save();

    res
      .status(200)
      .json(
        `${newStudent.name} has been added to grade ${classroom.gradeYear} in classrooom ${classroom.name} in ${school.name} school.`
      );
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    if (!req.query.schoolId)
      next(createError(400, "schoolId must be provided !"));
    if (req.query.id) {
      const student = await Student.findById(req.query.id);
      if (!student) return next(createError(400, "Student doesn't exist!"));
      res.status(200).json(student);
    } else {
      const students = await Student.find({ schoolId: req.query.schoolId });
      if (!students)
        return next(createError(400, "There are no Students exist!"));
      res.status(200).json(students);
    }
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let currentStudent = await Student.findById(req.query.id);
    if (!currentStudent)
      return next(createError(400, "Student doesn't exist !"));

    if (req.query.schoolId !== req.body.schoolId)
      return next(createError(400, "You can't change schoolId !"));

    currentStudent = await Student.findOne({
      _id: { $ne: currentStudent._id },
      name: req.body.name,
      classroomId: req.body.classroomId,
      schoolId: req.body.schoolId,
    });

    if (currentStudent) return next(createError(400, "Duplicated Student"));

    const updatedStudent = await Student.findByIdAndUpdate(
      req.query.id,
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.query.id);
    if (!student) return next(createError(400, "Student doesn't exist!"));
    await Student.findByIdAndDelete(req.query.id);
    const classroom = await Classroom.findById(student.classroomId);
    const school = await School.findById(student.schoolId);
    // console.log("classroom: ", classroom);
    // console.log("school: ", school);
    res
      .status(200)
      .json(
        `${student.name} in grade ${classroom.gradeYear} in classroom ${classroom.name} in ${school.name} has deleted successfully.`
      );
  } catch (error) {
    next(error);
  }
};
