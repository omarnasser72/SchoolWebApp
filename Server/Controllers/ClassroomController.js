import Classroom from "../models/Classroom.js";
import { createError } from "../utils/error.js";
import { validationResult } from "express-validator";

export const createClassroom = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const classroomExists = await Classroom.findOne({
      name: req.body.name,
      gradeYear: req.body.gradeYear,
      schoolId: req.body.schoolId,
    });

    if (classroomExists) return next(createError(400, "Duplicated classroom"));

    const newClassroom = new Classroom({
      ...req.body,
    });
    newClassroom.save();

    res.status(200).json(newClassroom);
  } catch (error) {
    next(error);
  }
};

export const getClassrooms = async (req, res, next) => {
  try {
    if (req.query.id) {
      const classroom = await Classroom.findById(req.query.id);
      if (!classroom) return next(createError(400, "Classroom doesn't exist!"));
      res.status(200).json(classroom);
    } else {
      const classrooms = await Classroom.find({ schoolId: req.query.schoolId });
      if (!classrooms)
        return next(createError(400, "There are no classrooms exist!"));
      res.status(200).json(classrooms);
    }
  } catch (error) {
    next(error);
  }
};

export const updateClassroom = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let currentClassroom = await Classroom.findById(req.query.id);
    if (!currentClassroom)
      return next(createError(400, "Classroom doesn't exist !"));

    if (req.query.schoolId !== req.body.schoolId)
      return next(createError(400, "You can't change schoolId !"));

    currentClassroom = await Classroom.findOne({
      _id: { $ne: currentClassroom._id },
      name: req.body.name,
      gradeYear: req.body.gradeYear,
      schoolId: req.body.schoolId,
    });

    if (currentClassroom) return next(createError(400, "Duplicated classroom"));

    const updatedClassroom = await Classroom.findByIdAndUpdate(
      req.query.id,
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).json(updatedClassroom);
  } catch (error) {
    next(error);
  }
};

export const deleteClassroom = async (req, res, next) => {
  try {
    const classroomExists = await Classroom.findById(req.query.id);
    if (!classroomExists)
      return next(createError(400, "Classroom doesn't exist!"));
    await Classroom.findByIdAndDelete(req.query.id);
    res
      .status(200)
      .json(
        `${classroomExists.name} in grade ${classroomExists.gradeYear} has deleted successfully.`
      );
  } catch (error) {
    next(error);
  }
};
