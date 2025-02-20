import express, { NextFunction, Request, Response } from "express";
import "./startup/connectToDB";

const app = express();
app.use(express.json());
// Handle invalid JSON Objects
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ error: "Invalid JSON format" });
    return;
  }
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to user URL Shortening service 🚀" });
  return;
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server listening or port: ", PORT);
});
