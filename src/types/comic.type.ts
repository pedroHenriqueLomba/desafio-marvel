import { Document, Model } from "mongoose";

export interface Comic {
  marvel_id?: number;
  title: string;
  issueNumber: number;
  description: string;
  diamondCode: string;
  ean: string;
  format: string;
  pageCount: number;
  urls: string[];
  collections: string[];
  dates: {
    date: Date;
    type: string;
  }[];
  prices: {
    price: number;
    type: string;
  }[];
  thumbnail: string;
  images: string[];
  creators: {
    name: string;
    role: string;
  }[];
  characters: string[];
  stories: string[];
  events: string[];
}

export interface ComicDocument extends Comic, Document {}

export interface ComicModel extends Model<ComicDocument> {}
