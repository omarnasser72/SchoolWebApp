import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gradeYear: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Student", StudentSchema);
