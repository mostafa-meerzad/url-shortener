import express from "express";
import shortenRoutes from "./routes/shortenRoutes";

const app = express();
app.use("/api/shorten", shortenRoutes);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to our URL Shortening service 🚀" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server listening on port:", PORT);
});
