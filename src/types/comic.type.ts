export class Comic {
  marvel_id: number;
  title: string;
  issueNumber: number;
  description: string;
  diamondCode: string;
  ean: string;
  format: string;
  pageCount: number;
  urls: string[];
  collections: string[];
  dates: [
    {
      date: Date;
      type: string;
    }
  ];
  prices: [
    {
      price: number;
      type: string;
    }
  ];
  thumbnail: string;
  images: string[];
  creators: [
    {
      name: string;
      role: string;
    }
  ];
  characters: string[];
  stories: string[];
  events: string[];

  constructor(
    marvel_id: number,
    title: string,
    issueNumber: number,
    description: string,
    diamondCode: string,
    ean: string,
    format: string,
    pageCount: number,
    urls: string[],
    collections: string[],
    dates: [
      {
        date: Date;
        type: string;
      }
    ],
    prices: [
      {
        price: number;
        type: string;
      }
    ],
    thumbnail: string,
    images: string[],
    creators: [
      {
        name: string;
        role: string;
      }
    ],
    characters: string[],
    stories: string[],
    events: string[]
  ) {
    this.marvel_id = marvel_id;
    this.title = title;
    this.issueNumber = issueNumber;
    this.description = description;
    this.diamondCode = diamondCode;
    this.ean = ean;
    this.format = format;
    this.pageCount = pageCount;
    this.urls = urls;
    this.collections = collections;
    this.dates = dates;
    this.prices = prices;
    this.thumbnail = thumbnail;
    this.images = images;
    this.creators = creators;
    this.characters = characters;
    this.stories = stories;
    this.events = events;
  }
}
