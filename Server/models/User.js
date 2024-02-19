import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: false,
  },
});

export default mongoose.model("User", UserSchema);
