import express, { Request, Response } from "express";
import { generateRandomWord } from "../utils/generateRandomWord";
import validateUrl from "../middelwares/validateUrl";

const router = express.Router();

// todo
// Method	Route	Description
// POST	/api/shorten	Create a short URL (Guest mode: not saved)
router.post("/", validateUrl, (req: Request, res: Response) => {
  const { originalUrl } = req.body;
  const customAlias = req.query["customAlias"];

  let shortUrl: string = generateRandomWord();

  if (typeof customAlias === "string" && customAlias.trim()) {
    shortUrl = customAlias;
  }

  res.status(200).json({ originalUrl, shortUrl });
});

// POST	/api/shorten/:userId	Create & save short URL (Logged-in user)
// GET	/api/shorten/:userId	Fetch all short URLs of a user
// GET	/:shortUrl	Redirect to original URL
// PUT	/api/shorten/:shortUrlId	Update a short URL (Only by owner)
// DELETE	/api/shorten/:shortUrlId	Delete a short URL (Only by owner)

export default router;
