import { Document, Schema, model } from "mongoose";

export interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  user: Schema.Types.ObjectId;
  clicks: number;
  createdAt: Date;
}

const urlSchema = new Schema<IUrl>(
  {
    originalUrl: { type: String, required: true, unique: true },
    shortUrl: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Url = model<IUrl>("Url", urlSchema);

export default Url;
