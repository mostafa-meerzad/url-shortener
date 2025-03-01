import express, { NextFunction, Request, Response } from "express";
import "./startup/connectToDB";
import { auth } from "./routes/auth";
import { shorten } from "./routes/shorten";
import cors from "cors";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
// Handle invalid JSON Objects
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ error: "Invalid JSON format" });
    return;
  }
  next();
});

app.use("/api/auth", auth);
app.use("/api/urls", shorten);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to user URL Shortening service 🚀" });
  return;
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server listening or port: ", PORT);
});
