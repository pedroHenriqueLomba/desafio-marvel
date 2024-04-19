import { Document, Model } from 'mongoose';

export interface Character {
    marvel_id: number;
    name: string;
    description: string | null;
    modified: Date;
    resourceURI: string;
    urls: string[];
    thumbnail: string;
}


export interface CharacterDocument extends Character, Document {}

export interface CharacterModel extends Model<CharacterDocument> {}