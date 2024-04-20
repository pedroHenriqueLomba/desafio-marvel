import { CharacterFiltersDto } from "../dtos/characters/character-filter.dto";
import charactersModel from "../models/characters.model";
import { Character, CharacterDocument } from "../types/character.type";
import { Paginate, PaginateOptions } from "../util/paginate";
import { RestError } from "../util/rest-error";

export default class CharacterService {
  private model = charactersModel;

  async create(character: Character): Promise<CharacterDocument> {
    const createdCharacter = await this.model.create(character);
    return createdCharacter.toObject();
  }

  async list(
    paginateOptions: PaginateOptions<CharacterFiltersDto>
  ): Promise<Paginate<CharacterDocument>> {
    const { limit, page, filters } = paginateOptions;
    const characters = await this.model
      .find(filters)
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();

    const total = await this.model.countDocuments(filters);
    return new Paginate<CharacterDocument>(
      characters.map((character) => character.toObject()),
      total,
      limit,
      page
    );
  }

  async findById(id: string): Promise<CharacterDocument> {
    const character = await this.model.findById(id);
    if (!character) {
      throw new RestError("Character not found", 404);
    }
    return character.toObject();
  }

  async update(id: string, characterData: Character): Promise<CharacterDocument> {
    const character = await this.model.findById(id);
    if (!character) {
      throw new RestError("Character not found", 404);
    }
    character.set(characterData);
    await character.save();
    return character.toObject();
  }
}
