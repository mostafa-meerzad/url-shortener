import express from "express";
import { userRegisterSchema, userLoginSchema } from "../schemas/userSchema";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/register", async (req, res) => {
  const parsedData = userRegisterSchema.safeParse(req.body);
try {

  if (!parsedData.success) {
    res.status(400).json(parsedData.error.formErrors);
    return;
  }

  const { name, email, password } = parsedData.data;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  const token = jwt.sign(
    { userId: newUser._id },
    process.env.JWT_SECRET as string
  );

  res.status(201).send({ token, user: newUser });
} catch (error) {
  res.status(500).json({message: "something went wrong"})
 console.log(error) 
}
});

router.post("/login", async (req, res) => {
  const parsedData = userLoginSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({ error: "Invalid email or password" });
    return;
  }

  const { email, password: candidatePassword } = parsedData.data;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      candidatePassword,
      existingUser.password
    );

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET as string
    );

    res.status(200).send({ token, user: existingUser });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
  }
});

export { router as auth };
