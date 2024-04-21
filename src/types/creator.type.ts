import { Document, Model } from "mongoose";

export interface Creator {
  marvel_id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  fullName: string;
  modified: Date;
  resourceURI: string;
  urls: string[];
  thumbnail: string;
  series: string[];
  stories: string[];
  comics: string[];
  events: string[];
}

export interface CreatorDocument extends Creator, Document {}

export interface CreatorModel extends Model<CreatorDocument> {}
