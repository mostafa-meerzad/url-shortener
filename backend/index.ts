import express from "express";
import shortenRoutes from "./routes/shortenRoutes";
import "./setup/connectDB";

const app = express();
app.use(express.json());
app.use("/api/shorten", shortenRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to our URL Shortening service 🚀" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server listening on port:", PORT);
});
