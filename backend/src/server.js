import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import notesRouter from "./routes/noteRoutes.js"
import authRouter from "./routes/authRoutes.js"
import {connectDB} from "./config/db.js"
import userRouter from "./routes/userRoutes.js"

dotenv.config();
const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use("/api/notes",notesRouter);
app.use("/api/auth",authRouter);
app.use("/api/users",userRouter );

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);

  });
});
