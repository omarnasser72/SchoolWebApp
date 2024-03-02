import Classroom from "../models/Classroom.js";
import School from "../models/School.js";
import Student from "../models/Student.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { validationResult } from "express-validator";

export const createSchool = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const schoolNameExist = await School.findOne({ name: req.body.name });

    if (schoolNameExist)
      return next(createError(400, "this name already exists!"));

    const newSchool = new School({
      ...req.body,
    });
    await newSchool.save();
    res.status(200).json(newSchool);
  } catch (error) {
    next(error);
  }
};

export const updateSchool = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const currentSchool = await School.findById(req.query.id);
    if (!currentSchool)
      return next(createError(400, "this school doesn't exist"));
    const schoolNameExist = await School.findOne({
      _id: { $ne: currentSchool._id },
      name: req.body.name,
    });

    if (schoolNameExist)
      return next(createError(400, "this school name already exists !"));
    const updatedSchool = await School.findByIdAndUpdate(
      req.query.id,
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).json(updatedSchool);
  } catch (error) {
    next(error);
  }
};

export const deleteSchool = async (req, res, next) => {
  try {
    const school = await School.findById(req.query.id);
    if (!school) return next(createError(400, "this school doesn't exist!"));

    const students = await Student.find({schoolId:req.query.id})

    await Promise.all(students.map(async(student)=>{
      await Student.findByIdAndDelete(student.id)
      console.log(`Student ${student.name} has deleted.`);
    }))

    const classrooms = await Classroom.find({schoolId:req.query.id})

    await Promise.all(classrooms.map(async(classroom)=>{
      await Classroom.findByIdAndDelete(classroom.id)
      console.log(`Classroom ${classroom.name} has deleted.`);
    }))

    const schoolAdmins = await User.find({schoolId:req.query.id})

    await Promise.all(schoolAdmins.map(async(schoolAdmin)=>{
      await User.findByIdAndDelete(schoolAdmin.id)
      console.log(`SchoolAdmin ${schoolAdmin.username} has deleted.`);
    }))

    
    
    await School.findByIdAndDelete(req.query.id);
    res.status(200).json(`${school} has deleted successfully.`);
  } catch (error) {
    next(error);
  }
};

export const getSchools = async (req, res, next) => {
  try {
    if (req.query.id) {
      const school = await School.findById(req.query.id);
      if (!school) return next(createError(400, "this school doesn't exist!"));
      res.status(200).json(school);
    } else {
      const schools = await School.find();
      if (!schools)
        return next(createError(400, "there are no schools exist!"));
      res.status(200).json(schools);
    }
  } catch (error) {
    next(error);
  }
};
