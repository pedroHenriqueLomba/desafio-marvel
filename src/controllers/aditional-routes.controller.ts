import { CharacterFiltersDto } from "../dtos/characters/character-filter.dto";
import CharacterService from "../services/character.service";
import ComicService from "../services/comic.service";
import CreatorService from "../services/creator.service";
import { Creator } from "../types/creator.type";
import { Paginate, PaginateOptions } from "../util/paginate";
import { RestError } from "../util/rest-error";

export class AditionalRoutesController {
  private creatorService = new CreatorService();
  private characterService = new CharacterService();
  private comicService = new ComicService();

  constructor() {
    this.findCreatorByTitleComic = this.findCreatorByTitleComic.bind(this);
    this.findCharactersWithThumbnailAvailable =
      this.findCharactersWithThumbnailAvailable.bind(this);
    this.findComicCheaperThen = this.findComicCheaperThen.bind(this);
    this.calculatePriceByPage = this.calculatePriceByPage.bind(this);
    this.findComicNewerThen = this.findComicNewerThen.bind(this);
  }

  public async findCreatorByTitleComic(req: any, res: any) {
    try {
      const comic = await this.comicService.findByTitle(req.params.title);
      const creators = [];
      for (const creator of comic.creators) {
        creators.push(await this.creatorService.findByFullName(creator.name));
      }
      res.status(200).send(new Paginate<Creator>(creators, creators.length, creators.length, 1));
    } catch (error: any) {
      const message = error.message ? error.message : "Error";
      const code = error.code ? error.code : 400;
      res.status(code).send(message);
    }
  }

  public async findCharactersWithThumbnailAvailable(req: any, res: any) {
    try {
      const paginateOptions = new PaginateOptions<CharacterFiltersDto>(
        req.query
      );
      const characters = await this.characterService.findWithThumbnailAvailable(
        paginateOptions
      );
      res.status(200).send(characters);
    } catch (error: any) {
      const message = error.message ? error.message : "Error";
      const code = error.code ? error.code : 400;
      res.status(code).send(message);
    }
  }

  public async findComicCheaperThen(req: any, res: any) {
    try {
      const paginateOptions = new PaginateOptions<any>(req.query);
      const price = req.query.price;
      const characters = await this.comicService.findCheaperThen(
        paginateOptions,
        price
      );
      res.status(200).send(characters);
    } catch (error: any) {
      const message = error.message ? error.message : "Error";
      const code = error.code ? error.code : 400;
      res.status(code).send(message);
    }
  }

  public async calculatePriceByPage(req: any, res: any) {
    try {
      const comicId = req.params.id;
      const typeOfComic = req.query.type;
      const price = await this.comicService.calculatePriceByPage(
        comicId,
        typeOfComic
      );
      res.status(200).send({ price: Number(price.toFixed(2)) });
    } catch (error: any) {
      const message = error.message ? error.message : "Error";
      const code = error.code ? error.code : 400;
      res.status(code).send(message);
    }
  }

  public async findComicNewerThen(req: any, res: any) {
    try {
      const paginateOptions = new PaginateOptions<any>(req.query);
      if (!req.query.date) {
        throw new RestError("Date is required", 400);
      }
      const date = new Date(req.query.date);
      const comics = await this.comicService.findNewerThen(
        date,
        paginateOptions
      );
      res.status(200).send(comics);
    } catch (error: any) {
      const message = error.message ? error.message : "Error";
      const code = error.code ? error.code : 400;
      res.status(code).send(message);
    }
  }
}
