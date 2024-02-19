import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classroomId: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Student", StudentSchema);
