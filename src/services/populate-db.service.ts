import CharactersModel from "../models/characters.model";
import comicsModel from "../models/comics.model";
import creatorsModel from "../models/creators.model";
import { Character } from "../types/character.type";
import { Comic } from "../types/comic.type";
import { Creator } from "../types/creator.type";

export class PopulateDbService {
  constructor() {}

  private charactersModel = CharactersModel;
  private comicsModel = comicsModel;
  private creatorsModel = creatorsModel;

  async insertCharacters(characters: Character[]) {
    return await this.charactersModel.insertMany(characters);
  }

  async insertComics(comics: Comic[]) {
    return await this.comicsModel.insertMany(comics);
  }

  async insertCreators(creators: Creator[]) {
    return await this.creatorsModel.insertMany(creators);
  }
}
