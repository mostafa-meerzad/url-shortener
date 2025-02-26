import express, { Response } from "express";
import { urlSchema } from "../schemas/urlSchema";
import { generateRandomWord } from "../utils/generateRandomWrod";
import { authMiddleware } from "../middlewares/auth";
import Url from "../models/Url";
import { AuthRequest } from "../types/authRequest";
import { mongo } from "mongoose";

const router = express.Router();
const usedAliases = new Set<string>(); // Create a Set for unique aliases

router.post("/shorten/guest", (req, res) => {
  const parsedData = urlSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json(parsedData.error.flatten());
    return;
  }

  const { originalUrl, customAlias } = parsedData.data;
  let shortUrl = generateRandomWord();

  if (customAlias) {
    if (usedAliases.has(customAlias)) {
      res.status(409).json({ error: "Custom alias already in use" });
      return;
    }
    shortUrl = customAlias;
  }
  usedAliases.add(shortUrl);

  res.status(200).json({ originalUrl, shortUrl, _id: new mongo.ObjectId() });
});

router.post(
  "/shorten",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const parsedData = urlSchema.safeParse(req.body);

      if (!parsedData.success) {
        res.status(400).json(parsedData.error.flatten());
        return;
      }

      const { originalUrl, customAlias } = parsedData.data;
      const userId = req.user?.userId;

      if (await Url.exists({ user: userId, originalUrl })) {
        res.status(409).json({ error: "URL already exists" });
        return;
      }

      let shortUrl = customAlias || generateRandomWord();

      while (await Url.exists({ user: userId, shortUrl })) {
        shortUrl = generateRandomWord();
      }

      const newUrl = new Url({ originalUrl, shortUrl, user: userId });
      await newUrl.save();

      res.status(201).json({ originalUrl, shortUrl });
      return;
    } catch (error) {
      console.error("Error shortening URL:", error);
      res.status(500).json({ error: "Something went wrong" });
      return;
    }
  }
);

router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const urls = await Url.find({ user: req.user?.userId }).select({
      originalUrl: 1,
      shortUrl: 1,
      _id: 1,
    });

    res.status(200).json({ urls });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.delete(
  "/:urlId",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { urlId } = req.params;
      const userId = req.user?.userId;
      const url = await Url.findById(urlId);

      if (!url) {
        res.status(404).json({ error: "URL not found" });
        return;
      }

      if (url.user.toString() !== userId) {
        res.status(403).json({ error: "Unauthorized to delete this URL" });
        return;
      }

      await url.deleteOne();

      res.status(200).json({ message: "url successfully deleted" });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

router.post(
  "/search",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { query } = req.query;
      console.log(query);

      if (!query || typeof query !== "string") {
        res.status(400).json({ error: "Query parameter is required" });
        return;
      }
      const urls = await Url.find({
        user: req.user?.userId,
        $or: [
          { originalUrl: { $regex: query, $options: "i" } },
          { shortUrl: { $regex: query, $options: "i" } },
        ],
      }).select({ originalUrl: 1, shortUrl: 1, _id: 1 });

      res.status(200).json({ urls });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

export { router as shorten };
