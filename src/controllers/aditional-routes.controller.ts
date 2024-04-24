import { CharacterFiltersDto } from "../dtos/characters/character-filter.dto";
import CharacterService from "../services/character.service";
import ComicService from "../services/comic.service";
import CreatorService from "../services/creator.service";
import { PaginateOptions } from "../util/paginate";

export class AditionalRoutesController {
  private creatorService = new CreatorService();
  private characterService = new CharacterService();
  private comicService = new ComicService();

  constructor() {
    this.findCreatorByTitleComic = this.findCreatorByTitleComic.bind(this);
    this.findCharactersWithThumbnailAvailable = this.findCharactersWithThumbnailAvailable.bind(this);
    this.findComicCheaperThen = this.findComicCheaperThen.bind(this);
    this.calculatePriceByPage = this.calculatePriceByPage.bind(this);
  }

  public async findCreatorByTitleComic(req: any, res: any) {
    try {
      const comic = await this.comicService.findByTitle(req.params.title);
      const creators = [];
      for (const creator of comic.creators) {
        creators.push(await this.creatorService.findByFullName(creator.name));
      }
      res.status(200).send(creators);
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
}
