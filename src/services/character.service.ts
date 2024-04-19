import { Model } from "mongoose";
import charactersModel from "../models/characters.model";
import {
  Character,
  CharacterDocument,
} from "../types/character.type";

export default class CharacterService {
  private model = charactersModel;

  async create(character: Character): Promise<CharacterDocument> {
    const createdCharacter = await this.model.create(character);
    return createdCharacter.toObject(); 
  }
}
