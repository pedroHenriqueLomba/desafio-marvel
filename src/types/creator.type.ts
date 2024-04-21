export class Creator {
  marvel_id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  fullName: string;
  modified: Date;
  resourceURI: string;
  urls: string[];
  thumbnail: string;
  series: string[];
  stories: { name: string; type: string }[];
  comics: string[];
  events: string[];

  constructor(creator: any) {
    this.marvel_id = creator.id;
    this.firstName = creator.firstName;
    this.middleName = creator.middleName;
    this.lastName = creator.lastName;
    this.suffix = creator.suffix;
    this.fullName = creator.fullName;
    this.modified = creator.modified;
    this.resourceURI = creator.resourceURI;
    this.urls = creator.urls.map((url: any) => url.url);
    this.thumbnail = `${creator.thumbnail.path}.${creator.thumbnail.extension}`;
    this.series = creator.series.map((serie: any) => {
      return {
        name: serie.name,
      };
    });
    this.stories = creator.stories.map((story: any) => {
      return {
        name: story.name,
        type: story.type,
      };
    });
    this.comics = creator.comics.map((comic: any) => {
      return {
        name: comic.name,
      };
    });
    this.events = creator.events.map((event: any) => {
      return {
        name: event.name,
      };
    });
  }
}