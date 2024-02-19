import mongoose from "mongoose";

const ClassroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gradeYear: {
    type: Number,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Classroom", ClassroomSchema);
