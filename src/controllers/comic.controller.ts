import { ComicFiltersDto } from "../dtos/comics/comic-filter.dto";
import ComicService from "../services/comic.service";
import { PaginateOptions } from "../util/paginate";

export default class ComicController {
  private service = new ComicService();

  constructor() {
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req: any, res: any) {
    try {
      const comic = await this.service.create(req.body);
      res.status(201).send(comic);
    } catch (error: any) {
      const message = error.message ? error.message : "Error";
      const code = error.code ? error.code : 400;
      res.status(code).send(message);
    }
  }

  async list(req: any, res: any) {
    try {
      const paginateOptions = new PaginateOptions<ComicFiltersDto>(req.query);
      const comics = await this.service.list(paginateOptions);
      res.status(200).send(comics);
    } catch (error: any) {
      const message = error.message ? error.message : "Error";
      const code = error.code ? error.code : 400;
      res.status(code).send(message);
    }
  }

  async findById(req: any, res: any) {
    try {
      const comic = await this.service.findById(req.params.id);
      res.status(200).send(comic);
    } catch (error: any) {
      const message = error.message ? error.message : "Error";
      const code = error.code ? error.code : 400;
      res.status(code).send(message);
    }
  }

  async update(req: any, res: any) {
    try {
      const comic = await this.service.update(req.params.id, req.body);
      res.status(200).send(comic);
    } catch (error: any) {
      const message = error.message ? error.message : "Error";
      const code = error.code ? error.code : 400;
      res.status(code).send(message);
    }
  }

  async delete(req: any, res: any) {
    try {
      await this.service.delete(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      const message = error.message ? error.message : "Error";
      const code = error.code ? error.code : 400;
      res.status(code).send(message);
    }
  }
}
