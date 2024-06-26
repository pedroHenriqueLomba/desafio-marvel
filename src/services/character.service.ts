import { CharacterFiltersDto } from "../dtos/characters/character-filter.dto";
import charactersModel from "../models/characters.model";
import { Character, CharacterDocument } from "../types/character.type";
import { Paginate, PaginateOptions } from "../util/paginate";
import { RestError, RestErrorCodes } from "../util/rest-error";

export default class CharacterService {
  private model;

  constructor(model = charactersModel) {
    this.model = model;
  }

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
      throw new RestError("Character not found", RestErrorCodes.NOT_FOUND);
    }
    return character.toObject();
  }

  async update(
    id: string,
    characterData: Character
  ): Promise<CharacterDocument> {
    const character = await this.model.findById(id);
    if (!character) {
      throw new RestError("Character not found", RestErrorCodes.NOT_FOUND);
    }
    character.set(characterData);
    await character.save();
    return character.toObject();
  }

  async delete(id: string): Promise<void> {
    const character = await this.model.findById(id);
    if (!character) {
      throw new RestError("Character not found", RestErrorCodes.NOT_FOUND);
    }
    if (character.marvel_id) {
      throw new RestError(
        "Character cannot be deleted because it is Original",
        RestErrorCodes.FORBIDDEN
      );
    }
    await this.model.deleteOne({ _id: id });
  }

  async findWithThumbnailAvailable(
    paginateOptions: PaginateOptions<CharacterFiltersDto>
  ): Promise<Paginate<CharacterDocument>> {
    const { limit, page } = paginateOptions;
    const filter = { thumbnail: { $not: /image_not_available/ } };
    const characters = await this.model
      .find(filter)
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();
    const total = await this.model.countDocuments(filter);
    return new Paginate<CharacterDocument>(
      characters.map((character) => character.toObject()),
      total,
      limit,
      page
    );
  }
}
