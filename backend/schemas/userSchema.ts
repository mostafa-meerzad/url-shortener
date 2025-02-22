import { z } from "zod";

const userRegisterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").max(50),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export { userLoginSchema, userRegisterSchema };
