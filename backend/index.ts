import express from "express";
import mongoose from "mongoose";
import generateShortUrl from "./utils/generateShortUrl"; // Adjust path as needed
import { generateRandomWord } from "./utils/generateRandomWord";
// Connect to MongoDB first (only needed for testing saved URLs)
mongoose
  .connect("mongodb://127.0.0.1:27017/urlShortener")
  .then(async () => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));

const app = express();

app.get("/", async (req, res) => {
  const originalUrl = "http://www.google.com";
  const shortUrl = await generateShortUrl(originalUrl);
  // console.log(shortUrl);
  // const randomWord = generateRandomWord()
  // console.log(randomWord)
  res.json({ originalUrl, shortUrl });
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
// console.log("hello")
