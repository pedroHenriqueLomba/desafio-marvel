import mongoose, { model } from "mongoose";

const CreatorsSchema = new mongoose.Schema({
  marvel_id: { type: Number },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  suffix: { type: String },
  fullName: { type: String, required: true },
  modified: { type: Date },
  resourceURI: { type: String },
  urls: [{ type: String }],
  thumbnail: { type: String },
  series: [{ type: String }],
  stories: [{ type: String }],
  comics: [{ type: String }],
  events: [{ type: String }],
});

export default model("creators", CreatorsSchema);
