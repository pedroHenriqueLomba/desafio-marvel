import { ComicFiltersDto } from "../dtos/comics/comic-filter.dto";
import comicsModel from "../models/comics.model";
import { Comic, ComicDocument } from "../types/comic.type";
import { Paginate, PaginateOptions } from "../util/paginate";
import { RestError, RestErrorCodes } from "../util/rest-error";

export default class ComicService {
  private model = comicsModel;

  async create(comic: Comic): Promise<ComicDocument> {
    const createdComic = await this.model.create(comic);
    return createdComic.toObject();
  }

  async list(
    paginateOptions: PaginateOptions<ComicFiltersDto>
  ): Promise<Paginate<ComicDocument>> {
    const { limit, page, filters } = paginateOptions;
    const comics = await this.model
      .find(filters)
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();

    const total = await this.model.countDocuments(filters);
    return new Paginate<ComicDocument>(
      comics.map((comic) => comic.toObject()),
      total,
      limit,
      page
    );
  }

  async findById(id: string): Promise<ComicDocument> {
    const comic = await this.model.findById(id);
    if (!comic) {
      throw new RestError("Comic not found", RestErrorCodes.NOT_FOUND);
    }
    return comic.toObject();
  }

  async update(id: string, comicData: Comic): Promise<ComicDocument> {
    const comic = await this.model.findById(id);
    if (!comic) {
      throw new RestError("Comic not found", RestErrorCodes.NOT_FOUND);
    }
    comic.set(comicData);
    await comic.save();
    return comic.toObject();
  }

  async delete(id: string): Promise<void> {
    const comic = await this.model.findById(id);
    if (!comic) {
      throw new RestError("Comic not found", RestErrorCodes.NOT_FOUND);
    }
    if (comic.marvel_id) {
      throw new RestError(
        "Comic cannot be deleted because it is Original",
        RestErrorCodes.FORBIDDEN
      );
    }
    await this.model.deleteOne({ _id: id });
  }
}