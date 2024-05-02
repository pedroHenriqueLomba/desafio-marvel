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
    const count = await this.charactersModel.countDocuments();
    if (count === 0) {
      return await this.charactersModel.insertMany(characters);
    } else {
      console.log('Characters already populated');
      return [];
    }
  }

  async insertComics(comics: Comic[]) {
    const count = await this.comicsModel.countDocuments();
    if (count === 0) {
      return await this.comicsModel.insertMany(comics);
    } else {
      console.log('Comics already populated');
      return [];
    }
  }

  async insertCreators(creators: Creator[]) {
    const count = await this.creatorsModel.countDocuments();
    if (count === 0) {
      return await this.creatorsModel.insertMany(creators);
    } else {
      console.log('Creators already populated');
      return [];
    }
  }
}
