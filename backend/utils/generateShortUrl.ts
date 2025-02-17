import Url from "../models/Url";
import { Types } from "mongoose";
import { generateRandomWord } from "./generateRandomWord";

const generateShortUrl = async (
  originalUrl: string,
  customAlias?: string,
  userId?: Types.ObjectId | string
): Promise<string> => {
  let shortUrl: string;

  if (userId && typeof userId === "string") {
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId");
    }
    userId = new Types.ObjectId(userId);
  }

  if (customAlias) {
    // Validate custom alias
    const invalidAlias = /[^\w\d-\/]+/g;
    if (invalidAlias.test(customAlias)) {
      throw new Error("Invalid alias. Allowed characters: letters, numbers, '-', and '_'.");
    }

    // Check if alias is already taken
    const existingUrl = await Url.findOne({ shortUrl: customAlias });
    if (existingUrl) {
      throw new Error("Custom alias already taken. Please choose another one.");
    }

    shortUrl = customAlias;
  } else {
    // Generate a short url
    shortUrl = generateRandomWord();
    const existingUrl = await Url.findOne({ shortUrl });
    if (existingUrl) {
      shortUrl = generateRandomWord();
    }
  }

  // If no userId (guest mode), return URL without saving
  if (!userId) {
    return shortUrl;
  }

  // If user is logged in, save URL in the database
  const newShortUrl = new Url({
    originalUrl,
    shortUrl,
    user: userId,
  });

  await newShortUrl.save();

  return shortUrl;
};

export default generateShortUrl;
