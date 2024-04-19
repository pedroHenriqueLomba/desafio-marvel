import mongoose, { model } from "mongoose";

const CharacterSchema = new mongoose.Schema({
  marvel_id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  modified: {
    type: Date,
    required: true,
  },
  resourceURI: {
    type: String,
    required: true,
  },
  urls: [
    {
      type: String,
      required: true,
    },
  ],
  thumbnail: {
    type: String,
    required: true,
  },
});

export default model('characters', CharacterSchema)