import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import schoolRoute from "./routes/school.js";
import classroomRoute from "./routes/classroom.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to the database");
  } catch (error) {
    console.error(error);
  }
};

//MIDDLEWARES

app.use(cors({ origin: "*" }));

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/school", schoolRoute);
app.use("/classroom", classroomRoute);

//Error handling
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "something went wrong";

  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
  });
});

app.listen(proccess.env.PORT, () => {
  connect();
  console.log(`Server is running on port ${proccess.env.PORT}`);
});
