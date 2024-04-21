import mongoose, { model } from "mongoose";

const ComicsSchema = new mongoose.Schema({
  marvel_id: { type: Number },
  title: { type: String, required: true },
  issueNumber: { type: Number },
  description: { type: String },
  diamondCode: { type: String },
  ean: { type: String },
  format: { type: String },
  pageCount: { type: Number },
  urls: [{ type: String }],
  collections: [{ type: String }],
  dates: [
    {
      date: { type: Date },
      type: { type: String },
    },
  ],
  prices: [
    {
      price: { type: Number },
      type: { type: String },
    },
  ],
  thumbnail: { type: String },
  images: [{ type: String }],
  creators: [
    {
      name: { type: String },
      role: { type: String },
    },
  ],
  characters: [{ type: String }],
  stories: [{ type: String }],
  events: [{ type: String }],
});

export default model("comics", ComicsSchema);
