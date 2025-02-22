import express, { Request, Response } from "express";
import { generateRandomWord } from "../utils/generateRandomWord";
import User from "../models/user";
import Url from "../models/Url";
import validateUrl from "../middelwares/validateUrl";
import QueryString from "qs";

const router = express.Router();

router.post("/", validateUrl, (req: Request, res: Response) => {
  const { originalUrl, customAlias } = req.body;
  let shortUrl: string = generateRandomWord();

  if (typeof customAlias === "string" && customAlias.trim()) {
    shortUrl = customAlias;
  }

  res.status(200).json({ originalUrl, shortUrl });
});


router.post("/:userId", validateUrl, async (req: Request, res: Response) => {
  try {
    const { originalUrl, customAlias } = req.body;
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      res
        .status(400)
        .json({ error: "Invalid User!", errorCode: "INVALID_USER" });
      return;
    }

    const existingUrl = await Url.findOne({ user: userId, originalUrl });
    if (existingUrl) {
      res
        .status(400)
        .json({ error: "URL already exists.", errorCode: "DUPLICATE_URL" });
      return;
    }

    let shortUrl = generateRandomWord();

    if (typeof customAlias === "string" && customAlias.trim()) {
      const existingAlias = await Url.findOne({
        user: userId,
        shortUrl: customAlias,
      });

      if (existingAlias) {
        res.status(400).json({
          error: "Custom Alias already exists.",
          errorCode: "DUPLICATE_ALIAS",
        });
        return;
      }

      shortUrl = customAlias;
    }

    const newUrl = new Url({ originalUrl, shortUrl, user: userId });
    await newUrl.save();

    res.status(200).json({ originalUrl, shortUrl });
    return;
  } catch (error) {
    console.error("Error creating short URL:", error);
    res
      .status(500)
      .json({ error: "Something went wrong", errorCode: "SERVER_ERROR" });
    return;
  }
});

// GET	/api/shorten/:userId	Fetch all short URLs of a user
// GET	/:shortUrl	Redirect to original URL
// PUT	/api/shorten/:shortUrlId	Update a short URL (Only by owner)
// DELETE	/api/shorten/:shortUrlId	Delete a short URL (Only by owner)

export default router;
