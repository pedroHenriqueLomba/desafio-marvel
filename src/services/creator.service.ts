import { CreatorFilterDto } from "../dtos/creators/creator-filter.dto";
import creatorsModel from "../models/creators.model";
import { CreatorDocument } from "../types/creator.type";
import { Paginate, PaginateOptions } from "../util/paginate";
import { RestError, RestErrorCodes } from "../util/rest-error";

export default class CreatorService {
  private model = creatorsModel;

  async create(data: any): Promise<CreatorDocument> {
    const createdCreator = await this.model.create(data);
    return createdCreator.toObject();
  }

  async list(
    paginateOptions: PaginateOptions<CreatorFilterDto>
  ): Promise<Paginate<CreatorDocument>> {
    const { limit, page, filters } = paginateOptions;
    const creators = await this.model
      .find(filters)
      .limit(limit)
      .skip(limit * (page - 1));

    const total = await this.model.countDocuments(filters);
    return new Paginate<CreatorDocument>(
      creators.map((creator) => creator.toObject()),
      total,
      page,
      limit
    );
  }

  async findById(id: string): Promise<CreatorDocument> {
    const creator = await this.model.findById(id);
    if (!creator) {
      throw new RestError("Creator not found", RestErrorCodes.NOT_FOUND);
    }
    return creator.toObject();
  }

  async update(id: string, data: any): Promise<CreatorDocument> {
    const creator = await this.model.findById(id);
    if (!creator) {
      throw new RestError("Creator not found", RestErrorCodes.NOT_FOUND);
    }
    creator.set(data);
    await creator.save();
    return creator.toObject();
  }

  async delete(id: string): Promise<void> {
    const creator = await this.model.findById(id);
    if (!creator) {
      throw new RestError("Creator not found", RestErrorCodes.NOT_FOUND);
    }
    if (creator.marvel_id) {
      throw new RestError(
        "Creator cannot be deleted",
        RestErrorCodes.BAD_REQUEST
      );
    } else {
      await this.model.deleteOne({ _id: id });
    }
  }

  async findByFullName(fullName: string): Promise<CreatorDocument> {
    const creator = await this.model.findOne({ fullName });
    if (!creator) {
      throw new RestError("Creator not found", RestErrorCodes.NOT_FOUND);
    }
    return creator.toObject();
  }
}
