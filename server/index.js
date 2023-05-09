import express from "express";
const PORT = process.env.PORT || 3000;
import "./DataBase/connection.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
app.use(cors());
app.use(cookieParser())


app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(PORT + " " + "server start");
});
