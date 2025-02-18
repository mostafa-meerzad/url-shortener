import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/urlShortener")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("something went wrong with DB, ", err);
  });
