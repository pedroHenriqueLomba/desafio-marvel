import { CharacterFiltersDto } from "../dtos/characters/character-filter.dto";
import CharacterService from "../services/character.service";
import { PaginateOptions } from "../util/paginate";

export default class CharacterController {
  private service = new CharacterService();

  constructor() {
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req: any, res: any) {
    try {
      const character = await this.service.create(req.body);
      res.status(201).send(character);
    } catch (error: any) {
      const message = error.message ? error.message : "Error";
      const code = error.code ? error.code : 400;
      res.status(code).send(message);
    }
  }

  async list(req: any, res: any) {
    try {
      const paginateOptions = new PaginateOptions<CharacterFiltersDto>(
        req.query
      );
      const characters = await this.service.list(paginateOptions);
      res.status(200).send(characters);
    } catch (error: any) {
      const message = error.message ? error.message : "Error";
      const code = error.code ? error.code : 400;
      res.status(code).send(message);
    }
  }

  async findById(req: any, res: any) {
    try {
      const character = await this.service.findById(req.params.id);
      res.status(200).send(character);
    } catch (error: any) {
      const message = error.message ? error.message : "Error";
      const code = error.code ? error.code : 400;
      res.status(code).send(message);
    }
  }

  async update(req: any, res: any) {
    try {
      const character = await this.service.update(req.params.id, req.body);
      res.status(200).send(character);
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
