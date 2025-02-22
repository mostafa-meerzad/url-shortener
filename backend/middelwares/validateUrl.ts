import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    res.status(400).json({ error: "URL is required" });
    return;
  }

  try {
    new URL(originalUrl);
    next();
    return;
  } catch {
    res.status(400).json({ error: "Invalid URL format" });
    return;
  }
};
