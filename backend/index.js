import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./db.js";
import route from "./routes/note-router.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

dbConnect();

app.get("/api/notes", async () => {
  res.json({ message: "sucess" });
});

app.use("/api", route);

app.listen(5000, () => {
  console.log("Server running on :5000");
});
