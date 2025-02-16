import Url from "../models/Url";
import { Schema } from "mongoose";
import { generateRandomWord } from "./generateRandomWord";

const generateShortUrl = async (
  originalUrl: string,
  customAlias?: string,
  userId?: Schema.Types.ObjectId
): Promise<string> => {
  let shortUrl: string;

  if (customAlias) {
    // Validate custom alias
    const invalidAlias = /[^\w\d-\/]+/g;
    if (invalidAlias.test(customAlias)) {
      return "Invalid alias. Allowed characters: letters, numbers, '-', and '_'.";
    }

    // Check if alias is already taken
    const existingUrl = await Url.findOne({ shortUrl: customAlias });
    if (existingUrl) {
      return "Custom alias already taken. Please choose another one.";
    }

    shortUrl = customAlias;
  } else {
    // generate a short url 
    shortUrl = generateRandomWord();
    const existingUrl = await Url.findOne({ shortUrl });
    if (existingUrl) {
      shortUrl = generateRandomWord();
    }
  }

  // if there is no userId provided (guest mode), return URL without saving
  if (!userId) {
    return shortUrl;
  }

  // If the user is logged in, save the url in the database
  const newShortUrl = new Url({
    originalUrl,
    shortUrl,
    user: userId,
  });

  await newShortUrl.save();

  return shortUrl;
};

export default generateShortUrl;
