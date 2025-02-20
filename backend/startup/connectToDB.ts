import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config();

connect(process.env.DATABASE_URL as string)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Something went wrong while connecting to DB");
  });
