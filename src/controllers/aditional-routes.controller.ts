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
      const characters = await this.characterService.findWithThumbnailAvailable(paginateOptions);
      res.status(200).send(characters);
    } catch (error: any) {
      const message = error.message ? error.message : "Error";
      const code = error.code ? error.code : 400;
      res.status(code).send(message);
    }
  }
}
