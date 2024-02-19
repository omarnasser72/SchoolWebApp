import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoutes.js";
import usersRoute from "./routes/userRoutes.js";
import schoolRoute from "./routes/schoolRoutes.js";
import classroomRoute from "./routes/classroomRoute.js";
import studentRoute from "./routes/studentRoute.js";
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

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from the database");
});

//MIDDLEWARES

app.use(cors({ origin: "*" }));

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/school", schoolRoute);
app.use("/classroom", classroomRoute);
app.use("/student", studentRoute);

//Error handling
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "something went wrong";

  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
  });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server is running on port ${process.env.PORT}`);
});
