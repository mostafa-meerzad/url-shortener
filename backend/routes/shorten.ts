import express, { Response } from "express";
import { urlSchema } from "../schemas/urlSchema";
import { generateRandomWord } from "../utils/generateRandomWrod";
import { authMiddleware } from "../middlewares/auth";
import Url from "../models/Url";
import { AuthRequest } from "../types/authRequest";

const router = express.Router();
const usedAliases = new Set<string>(); // Create a Set for unique aliases

router.post("shorten/guest", (req, res) => {
  const parsedData = urlSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json(parsedData.error.flatten());
    return;
  }

  const { originalUrl, customAlias } = parsedData.data;
  let short = generateRandomWord();

  if (customAlias) {
    if (usedAliases.has(customAlias)) {
      res.status(409).json({ error: "Custom alias already in use" });
      return;
    }
    short = customAlias;
  }
  usedAliases.add(short);

  res.status(200).json({ originalUrl, short });
});

router.post("shorten/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const parsedData = urlSchema.safeParse(req.body);

    if (!parsedData.success) {
      res.status(400).json(parsedData.error.flatten());
      return;
    }

    const { originalUrl, customAlias } = parsedData.data;
    const userId = req.user?.userId;

    if (await Url.exists({ user: userId, originalUrl })) {
      res.status(409).json({ error: "URL alias already in use" });
      return;
    }

    let shortUrl = customAlias || generateRandomWord();

    while (await Url.exists({ user: userId, shortUrl })) {
      shortUrl = generateRandomWord();
    }

    const newUrl = new Url({ originalUrl, shortUrl, user: userId });
    await newUrl.save();

    res.status(201).json({ originalUrl, short: shortUrl });
    return;
  } catch (error) {
    console.error("Error shortening URL:", error);
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
});

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

export { router as shorten };
