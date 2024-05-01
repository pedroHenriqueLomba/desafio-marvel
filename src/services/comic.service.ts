import { ComicFiltersDto } from "../dtos/comics/comic-filter.dto";
import comicsModel from "../models/comics.model";
import { Comic, ComicDocument } from "../types/comic.type";
import { Paginate, PaginateOptions } from "../util/paginate";
import { RestError, RestErrorCodes } from "../util/rest-error";

export default class ComicService {
  private model;

  constructor(model = comicsModel) {
    this.model = model;
  }

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

  async findByTitle(title: string): Promise<ComicDocument> {
    const comic = await this.model.findOne({ title });
    if (!comic) {
      throw new RestError("Comic not found", RestErrorCodes.NOT_FOUND);
    }
    return comic.toObject();
  }

  async findCheaperThen(
    paginateOptions: PaginateOptions<ComicFiltersDto>,
    price: number
  ): Promise<Paginate<ComicDocument>> {
    const { limit, page } = paginateOptions;
    const filter = [
      {
        $unwind: {
          path: "$prices",
        },
      },
      {
        $match: {
          "prices.price": {
            $lt: Number(price),
          },
        },
      },
    ];

    const comics = await this.model
      .aggregate(filter)
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();

    const total = await this.model.countDocuments({ filter });
    return new Paginate<ComicDocument>(comics, total, limit, page);
  }

  async calculatePriceByPage(
    comicId: string,
    typeOfComic: string
  ): Promise<number> {
    const comic = await this.model.findById(comicId);
    if (!comic) {
      throw new RestError("Comic not found", RestErrorCodes.NOT_FOUND);
    }
    const price = comic.prices.find((price) => price.type === typeOfComic);
    if (!price) {
      throw new RestError("Comic price not found", RestErrorCodes.NOT_FOUND);
    }
    if (price.price === null || price.price === undefined) {
      throw new RestError(
        "Comic price is null or undefined",
        RestErrorCodes.NOT_FOUND
      );
    }

    return (price.price ?? 0) / (comic.pageCount ?? 1);
  }

  async findNewerThen(
    publishDate: Date,
    paginateOptions: PaginateOptions<ComicFiltersDto>
  ): Promise<Paginate<ComicDocument>> {
    const { limit, page } = paginateOptions;
    const filter = [
      {
        $unwind: {
          path: "$dates",
        },
      },
      {
        $match: {
          "dates.date": {
            $gt: publishDate,
          },
        },
      },
    ];

    const comics = await this.model
      .aggregate(filter)
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();

    const mongoTotal = await this.model.aggregate(filter).count("total");
    const total = mongoTotal.length > 0 ? mongoTotal[0].total : 0;
    return new Paginate<ComicDocument>(comics, total, limit, page);
  }
}
