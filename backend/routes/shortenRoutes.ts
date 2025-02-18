import express, { Request, Response } from "express";
import generateShortUrl from "../utils/generateShortUrl";

const router = express.Router();

// todo
// Method	Route	Description

// POST	/api/shorten	Create a short URL (Guest mode: not saved)
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl || typeof originalUrl !== "string") {
      res
        .status(400)
        .json({ error: "OriginalUrl is required and must be a string" });
      return;
    }

    const shortUrl = await generateShortUrl(originalUrl);
    res.json({ originalUrl, shortUrl });
  } catch (error) {
    res.json({ error: "Internal Server Error" });
  }
});

// POST	/api/shorten/:userId	Create & save short URL (Logged-in user)

// GET	/api/shorten/:userId	Fetch all short URLs of a user
// GET	/:shortUrl	Redirect to original URL
// PUT	/api/shorten/:shortUrlId	Update a short URL (Only by owner)
// DELETE	/api/shorten/:shortUrlId	Delete a short URL (Only by owner)


export default router;
