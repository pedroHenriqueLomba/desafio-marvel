import mongoose, { model } from "mongoose";

const CreatorsSchema = new mongoose.Schema({
  marvel_id: { type: Number, required: true },
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  suffix: { type: String },
  fullName: { type: String },
  modified: { type: Date },
  resourceURI: { type: String },
  urls: [{ type: String }],
  thumbnail: { type: String },
  series: [{ type: String }],
  stories: [
    {
      name: {type: String},
      type: {type: String},
    },
  ],
  comics: [{ type: String }],
  events: [{ type: String }],
});

export default model("creators", CreatorsSchema);
