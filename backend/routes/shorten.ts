import express from "express";
import { urlSchema } from "../schemas/urlSchema";
import { generateRandomWord } from "../utils/generateRandomWrod";

const router = express.Router();
const usedAliases = new Set<string>(); // Create a Set for unique aliases

router.post("/guest", (req, res) => {
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

export { router as shorten };
