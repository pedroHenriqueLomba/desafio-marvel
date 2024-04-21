import { Request, Response } from "express";
import { PopulateDbService } from "../services/populate-db.service";
import { MarvelApiService } from "../services/marvel-api.service";
import { ResponseMarvelList } from "../types/response-marvel-list.type";
import { Character } from "../types/character.type";

export class PopulateDbController {
  constructor() {
    this.populateDbService = new PopulateDbService();
    this.marvelApiService = new MarvelApiService();
    this.populate = this.populate.bind(this);
    this.getCharacters = this.getCharacters.bind(this);
    this.getComics = this.getComics.bind(this);
  }

  private populateDbService: PopulateDbService;
  private marvelApiService: MarvelApiService;

  async populate(req: any, res: any) {
    try {
      await this.saveCharacters(); // Uncomment this line to populate the database with characters
      await this.saveComics(); // Uncomment this line to populate the database with comics
      await this.saveCreators(); // Uncomment this line to populate the database with creators
      res.status(200).send('Database populated');
    } catch (error) {
      console.error("Error populating database:", error);
      res.status(500).send("Error populating database");
    }
  }

  private async saveCharacters() {
    const characters = await this.getCharacters();
    await this.insertCharacters(characters);
  }

  private async getCharacters(): Promise<Character[]> {
    const characters: ResponseMarvelList<any> = await this.marvelApiService.fetch(
      "events/315/characters"
    );
    const charactersData = characters.data.results.map((character) => {
      return {
        marvel_id: character.id,
        name: character.name,
        description: character.description,
        modified: character.modified,
        resourceURI: character.resourceURI,
        urls: character.urls.map((url: any) => url.url),
        thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      };
    });
    return charactersData;
  }

  private async insertCharacters(characters: Character[]) {
    await this.populateDbService.insertCharacters(characters);
  }

  private async saveComics() {
    const comics = await this.getComics();
    this.insertComics(comics);
  }

  private async getComics() {
    const comics: ResponseMarvelList<any> = await this.marvelApiService.fetch("events/315/comics");
    const comicsData = comics.data.results.map((comic) => {
      return {
        marvel_id: comic.id,
        title: comic.title,
        issueNumber: comic.issueNumber,
        description: comic.description,
        diamondCode: comic.diamondCode,
        ean: comic.ean,
        format: comic.format,
        pageCount: comic.pageCount,
        urls: comic.urls.map((url: any) => url.url),
        collections: comic.collections.map((collection: any) => collection.name),
        dates: comic.dates.map((date: any) => {
          return {
            date: date.date,
            type: date.type,
          };
        }),
        prices: comic.prices.map((price: any) => {
          return {
            price: price.price,
            type: price.type,
          };
        }),
        thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        images: comic.images.map((image: any) => `${image.path}.${image.extension}`),
        creators: comic.creators.items.map((creator: any) => {
          return {
            name: creator.name,
            role: creator.role,
          };
        }),
        characters: comic.characters.items.map((character: any) => character.name),
        stories: comic.stories.items.map((story: any) => story.name),
        events: comic.events.items.map((event: any) => event.name),
      };
    });
    return comicsData;
  }

  private async insertComics(comics: any) {
    await this.populateDbService.insertComics(comics);
  }

  private async saveCreators() {
    const creators = await this.getCreators();
    this.insertCreators(creators);
  }

  private async getCreators() {
    const creators: ResponseMarvelList<any> = await this.marvelApiService.fetch("events/315/creators");
    const creatorsData = creators.data.results.map((creator) => {
      return {
        marvel_id: creator.id,
        firstName: creator.firstName,
        middleName: creator.middleName,
        lastName: creator.lastName,
        suffix: creator.suffix,
        fullName: creator.fullName,
        modified: creator.modified,
        resourceURI: creator.resourceURI,
        urls: creator.urls.map((url: any) => url.url),
        thumbnail: `${creator.thumbnail.path}.${creator.thumbnail.extension}`,
        series: creator.series.items.map((serie: any) => {
          return serie.name;
        }),
        stories: creator.stories.items.map((story: any) => {
          return {
            name: story.name,
            type: story.type,
          };
        }),
        comics: creator.comics.items.map((comic: any) => {
          return comic.name;
        }),
        events: creator.events.items.map((event: any) => {
          return event.name;
        }),
      };
    });
    return creatorsData;
  }

  private async insertCreators(creators: any) {
    await this.populateDbService.insertCreators(creators);
  }

}
