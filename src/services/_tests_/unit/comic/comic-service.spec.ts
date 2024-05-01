import { expect, jest, test, beforeEach, describe } from "@jest/globals";
import ComicService from "../../../comic.service";
import { Paginate, PaginateOptions } from "../../../../util/paginate";
import { ComicFiltersDto } from "../../../../dtos/comics/comic-filter.dto";

const mockComic = {
  _id: "123456",
  title: "Spider-Man",
  issueNumber: 1,
  description: "The amazing adventures of Spider-Man",
  diamondCode: "123456",
  ean: "9781234567890",
  format: "Comic",
  pageCount: 32,
  urls: ["https://example.com/spiderman"],
  collections: ["Spider-Man Collection"],
  dates: [
    {
      date: "2024-04-21",
      type: "release",
    },
    {
      date: "2024-04-28",
      type: "onsale",
    },
  ],
  prices: [
    {
      price: 3.99,
      type: "printPrice",
    },
    {
      price: 2.99,
      type: "digitalPrice",
    },
  ],
  thumbnail: "https://example.com/spiderman-thumbnail.jpg",
  images: ["https://example.com/spiderman-cover.jpg"],
  creators: [
    {
      name: "Stan Lee",
      role: "Writer",
    },
    {
      name: "Steve Ditko",
      role: "Artist",
    },
  ],
  characters: ["Spider-Man", "Mary Jane Watson"],
  stories: ["Origin Story", "The First Battle"],
  events: ["Spider-Verse"],
  toObject: jest.fn().mockReturnThis(),
};

const mockComicList = [
  {
    toObject: jest.fn().mockReturnThis(),
    _id: "66251a9dce471f7c337199a3",
    marvel_id: 48513,
    title: "Infinity: Heist (2013) #4",
    issueNumber: 4,
    description:
      "The crime of the century just got a bit more complicated! Blizzard's new...uh....developments put the entire team in jeopardy--while Titanium Man's true identity is OUT OF THIS WORLD! Frank Tieri and Al Barrionuevo bring the twists in the Infinity Heist!",
    diamondCode: "SEP130670",
    ean: "",
    format: "Comic",
    pageCount: 32,
    urls: [
      "http://marvel.com/comics/issue/48513/infinity_heist_2013_4?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://comicstore.marvel.com/Infinity-Heist-4/digital-comic/32347?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://marvel.com/digitalcomics/view.htm?iid=32347&utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "https://applink.marvel.com/issue/32347?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
    ],
    collections: [],
    dates: [
      {
        date: "2014-01-08T05:00:00.000Z",
        type: "onsaleDate",
        _id: "66251a9dce471f7c337199a4",
      },
      {
        date: "2013-12-23T05:00:00.000Z",
        type: "focDate",
        _id: "66251a9dce471f7c337199a5",
      },
      {
        date: "2014-06-30T04:00:00.000Z",
        type: "unlimitedDate",
        _id: "66251a9dce471f7c337199a6",
      },
      {
        date: "2014-01-08T05:00:00.000Z",
        type: "digitalPurchaseDate",
        _id: "66251a9dce471f7c337199a7",
      },
    ],
    prices: [
      {
        price: 3.99,
        type: "printPrice",
        _id: "66251a9dce471f7c337199a8",
      },
      {
        price: 1.99,
        type: "digitalPurchasePrice",
        _id: "66251a9dce471f7c337199a9",
      },
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/8/e0/52cad12a0d589.jpg",
    images: [
      "http://i.annihil.us/u/prod/marvel/i/mg/8/e0/52cad12a0d589.jpg",
      "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/528ce6dc78d4b.jpg",
    ],
    creators: [
      {
        name: "Alejandro Barrionuevo Iribarne",
        role: "penciller (cover)",
        _id: "66251a9dce471f7c337199aa",
      },
      {
        name: "Frank Tieri",
        role: "writer",
        _id: "66251a9dce471f7c337199ab",
      },
    ],
    characters: [],
    stories: [
      "cover from Infinity: Heist (2013) #4",
      "story from Infinity: Heist (2013) #4",
    ],
    events: ["Infinity"],
    __v: 0,
  },
  {
    toObject: jest.fn().mockReturnThis(),
    _id: "66251a9dce471f7c337199ac",
    marvel_id: 43297,
    title: "Guardians of the Galaxy (2013) #9",
    issueNumber: 9,
    description:
      "INFINITY TIE-IN! The Infinity adventure continues as Thanos's rise might lead to the Guardians' fall.",
    diamondCode: "SEP130672",
    ean: "",
    format: "Comic",
    pageCount: 32,
    urls: [
      "http://marvel.com/comics/issue/43297/guardians_of_the_galaxy_2013_9?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://comicstore.marvel.com/Guardians-of-the-Galaxy-9/digital-comic/31974?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://marvel.com/digitalcomics/view.htm?iid=31974&utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "https://applink.marvel.com/issue/31974?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
    ],
    collections: [],
    dates: [
      {
        date: "2013-12-04T05:00:00.000Z",
        type: "onsaleDate",
        _id: "66251a9dce471f7c337199ad",
      },
      {
        date: "2013-11-20T05:00:00.000Z",
        type: "focDate",
        _id: "66251a9dce471f7c337199ae",
      },
      {
        date: "2014-06-02T04:00:00.000Z",
        type: "unlimitedDate",
        _id: "66251a9dce471f7c337199af",
      },
      {
        date: "2013-12-04T05:00:00.000Z",
        type: "digitalPurchaseDate",
        _id: "66251a9dce471f7c337199b0",
      },
    ],
    prices: [
      {
        price: 3.99,
        type: "printPrice",
        _id: "66251a9dce471f7c337199b1",
      },
      {
        price: 1.99,
        type: "digitalPurchasePrice",
        _id: "66251a9dce471f7c337199b2",
      },
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/4/03/573e240b52268.jpg",
    images: ["http://i.annihil.us/u/prod/marvel/i/mg/4/03/573e240b52268.jpg"],
    creators: [
      {
        name: "Brian Michael Bendis",
        role: "writer",
        _id: "66251a9dce471f7c337199b3",
      },
      {
        name: "Francesco Francavilla",
        role: "penciller (cover)",
        _id: "66251a9dce471f7c337199b4",
      },
    ],
    characters: ["Guardians of the Galaxy"],
    stories: ["Cover #96956", "Interior #96957"],
    events: ["Infinity"],
    __v: 0,
  },
  {
    toObject: jest.fn().mockReturnThis(),
    _id: "66251a9dce471f7c337199b5",
    marvel_id: 48010,
    title: "Infinity: The Hunt (2013) #4",
    issueNumber: 4,
    description:
      "INFINITY TIE-IN! The super student teenagers of the Marvel Universe take on Thanos' forces! The seeds of a future Marvel event are planted here!",
    diamondCode: "SEP130671",
    ean: "",
    format: "Comic",
    pageCount: 32,
    urls: [
      "http://marvel.com/comics/issue/48010/infinity_the_hunt_2013_4?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://comicstore.marvel.com/Infinity-The-Hunt-4/digital-comic/31976?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://marvel.com/digitalcomics/view.htm?iid=31976&utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "https://applink.marvel.com/issue/31976?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
    ],
    collections: [],
    dates: [
      {
        date: "2013-11-27T05:00:00.000Z",
        type: "onsaleDate",
        _id: "66251a9dce471f7c337199b6",
      },
      {
        date: "2013-11-13T05:00:00.000Z",
        type: "focDate",
        _id: "66251a9dce471f7c337199b7",
      },
      {
        date: "2014-05-28T04:00:00.000Z",
        type: "unlimitedDate",
        _id: "66251a9dce471f7c337199b8",
      },
      {
        date: "2013-11-27T05:00:00.000Z",
        type: "digitalPurchaseDate",
        _id: "66251a9dce471f7c337199b9",
      },
    ],
    prices: [
      {
        price: 3.99,
        type: "printPrice",
        _id: "66251a9dce471f7c337199ba",
      },
      {
        price: 1.99,
        type: "digitalPurchasePrice",
        _id: "66251a9dce471f7c337199bb",
      },
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/2/a0/59480b004d1b2.jpg",
    images: [
      "http://i.annihil.us/u/prod/marvel/i/mg/2/a0/59480b004d1b2.jpg",
      "http://i.annihil.us/u/prod/marvel/i/mg/8/03/528538642a5b4.jpg",
    ],
    creators: [
      {
        name: "Matt Kindt",
        role: "writer",
        _id: "66251a9dce471f7c337199bc",
      },
      {
        name: "Steven Sanders",
        role: "artist",
        _id: "66251a9dce471f7c337199bd",
      },
    ],
    characters: [],
    stories: [
      "cover from Infinity: The Hunt (2013) #4",
      "story from Infinity: The Hunt (2013) #4",
    ],
    events: ["Infinity"],
    __v: 0,
  },
];

const mockModel = {
  create: jest.fn(),
  find: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  exec: jest.fn().mockReturnValue(mockComicList),
  countDocuments: jest.fn(),
  findById: jest.fn(),
  deleteOne: jest.fn(),
};

describe("Testing CRUD operations", () => {
  let comicService: ComicService;
  beforeEach(() => {
    comicService = new ComicService(mockModel as any);
  });

  test("Should create a new comic", async () => {
    mockModel.create.mockReturnValue(mockComic);
    const comic = {
      title: "Spider-Man",
      issueNumber: 1,
      description: "The amazing adventures of Spider-Man",
      diamondCode: "123456",
      ean: "9781234567890",
      format: "Comic",
      pageCount: 32,
      urls: ["https://example.com/spiderman"],
      collections: ["Spider-Man Collection"],
      dates: [
        {
          date: new Date("2024-04-19T12:00:00.000Z"),
          type: "release",
        },
        {
          date: new Date("2024-04-19T12:00:00.000Z"),
          type: "onsale",
        },
      ],
      prices: [
        {
          price: 3.99,
          type: "printPrice",
        },
        {
          price: 2.99,
          type: "digitalPrice",
        },
      ],
      thumbnail: "https://example.com/spiderman-thumbnail.jpg",
      images: ["https://example.com/spiderman-cover.jpg"],
      creators: [
        {
          name: "Stan Lee",
          role: "Writer",
        },
        {
          name: "Steve Ditko",
          role: "Artist",
        },
      ],
      characters: ["Spider-Man", "Mary Jane Watson"],
      stories: ["Origin Story", "The First Battle"],
      events: ["Spider-Verse"],
    };
    const result = await comicService.create(comic);
    expect(result).toEqual(mockComic);
  });

  describe("Testing find method", () => {
    test("should return all comics", async () => {
      mockModel.countDocuments.mockReturnValue(3);
      mockModel.find.mockReturnThis();
      mockModel.limit.mockReturnThis();
      mockModel.skip.mockReturnThis();
      mockModel.exec.mockReturnValue(mockComicList);
      const pagination = new PaginateOptions<ComicFiltersDto>({
        limit: 3,
        page: 1,
      });
      const comics = await comicService.list(pagination);

      expect(comics).toEqual(new Paginate(mockComicList, 3, 3, 1));
    });
  });

  describe("Testing findById method", () => {
    test("should return a comic by id", async () => {
      mockModel.findById.mockReturnValue(mockComic);
      const comic = await comicService.findById("123456");
      expect(comic).toEqual(mockComic);
    });

    test("should throw an error when comic is not found", async () => {
      mockModel.findById.mockReturnValue(null);
      try {
        await comicService.findById("123456");
      } catch (error: any) {
        expect(error.message).toBe("Comic not found");
        expect(error.code).toBe(404);
      }
    });
  });

  describe("Testing update method", () => {
    const updatedData = {
      _id: "123456",
      title: "Spider-Man updated",
      issueNumber: 1,
      description: "The amazing adventures of Spider-Man",
      diamondCode: "123456",
      ean: "9781234567890",
      format: "Comic",
      pageCount: 32,
      urls: ["https://example.com/spiderman"],
      collections: ["Spider-Man Collection"],
      dates: [
        {
          date: new Date("2024-04-21"),
          type: "release",
        },
        {
          date: new Date("2024-04-28"),
          type: "onsale",
        },
      ],
      prices: [
        {
          price: 3.99,
          type: "printPrice",
        },
        {
          price: 2.99,
          type: "digitalPrice",
        },
      ],
      thumbnail: "https://example.com/spiderman-thumbnail.jpg",
      images: ["https://example.com/spiderman-cover.jpg"],
      creators: [
        {
          name: "Stan Lee",
          role: "Writer",
        },
        {
          name: "Steve Ditko",
          role: "Artist",
        },
      ],
      characters: ["Spider-Man", "Mary Jane Watson"],
      stories: ["Origin Story", "The First Battle"],
      events: ["Spider-Verse"],
      toObject: jest.fn().mockReturnThis(),
      set: jest.fn().mockImplementation(function (this: any, updatedData) {
        Object.assign(this, updatedData);
      }),
      save: jest.fn().mockImplementation(function (this: any, updatedData) {
        this.set(updatedData);
      }),
    };

    const oldComic = {
      _id: "123456",
      title: "Spider-Man",
      issueNumber: 1,
      description: "The amazing adventures of Spider-Man",
      diamondCode: "123456",
      ean: "9781234567890",
      format: "Comic",
      pageCount: 32,
      urls: ["https://example.com/spiderman"],
      collections: ["Spider-Man Collection"],
      dates: [
        {
          date: "2024-04-21",
          type: "release",
        },
        {
          date: "2024-04-28",
          type: "onsale",
        },
      ],
      prices: [
        {
          price: 3.99,
          type: "printPrice",
        },
        {
          price: 2.99,
          type: "digitalPrice",
        },
      ],
      thumbnail: "https://example.com/spiderman-thumbnail.jpg",
      images: ["https://example.com/spiderman-cover.jpg"],
      creators: [
        {
          name: "Stan Lee",
          role: "Writer",
        },
        {
          name: "Steve Ditko",
          role: "Artist",
        },
      ],
      characters: ["Spider-Man", "Mary Jane Watson"],
      stories: ["Origin Story", "The First Battle"],
      events: ["Spider-Verse"],
      toObject: jest.fn().mockReturnThis(),
      set: jest.fn().mockImplementation(function (this: any, updatedData) {
        Object.assign(this, updatedData);
      }),
      save: jest.fn().mockImplementation(function (this: any, updatedData) {
        this.set(updatedData);
      }),
    };

    test("should update a comic", async () => {
      mockModel.findById.mockReturnValue(oldComic);

      const updatedComic = await comicService.update("123456", updatedData);
      expect(updatedComic).toEqual(updatedData);
    });

    test("should throw an error when comic is not found", async () => {
      mockModel.findById.mockReturnValue(null);
      try {
        await comicService.update("123456", updatedData);
      } catch (error: any) {
        expect(error.message).toBe("Comic not found");
        expect(error.code).toBe(404);
      }
    });
  });

  describe("Testing delete method", () => {
    test("should delete a comic", async () => {
      mockModel.findById.mockReturnValue(mockComic);
      mockModel.deleteOne = jest.fn();
      await comicService.delete("123456");

      expect(mockModel.deleteOne).toHaveBeenCalled();
    });
    
    test("should throw an error when comic is not found", async () => {
      mockModel.findById.mockReturnValue(null);
      try {
        await comicService.delete("123456");
      } catch (error: any) {
        expect(error.message).toBe("Comic not found");
        expect(error.code).toBe(404);
      }
    });

    test("should throw an error when comic is original", async () => {
      const mockOriginalComic = {
        _id: "123456",
        marvel_id: 654321,
        title: "Spider-Man",
        issueNumber: 1,
        description: "The amazing adventures of Spider-Man",
        diamondCode: "123456",
        ean: "9781234567890",
        format: "Comic",
        pageCount: 32,
        urls: ["https://example.com/spiderman"],
        collections: ["Spider-Man Collection"],
        dates: [
          {
            date: "2024-04-21",
            type: "release",
          },
          {
            date: "2024-04-28",
            type: "onsale",
          },
        ],
        prices: [
          {
            price: 3.99,
            type: "printPrice",
          },
          {
            price: 2.99,
            type: "digitalPrice",
          },
        ],
        thumbnail: "https://example.com/spiderman-thumbnail.jpg",
        images: ["https://example.com/spiderman-cover.jpg"],
        creators: [
          {
            name: "Stan Lee",
            role: "Writer",
          },
          {
            name: "Steve Ditko",
            role: "Artist",
          },
        ],
        characters: ["Spider-Man", "Mary Jane Watson"],
        stories: ["Origin Story", "The First Battle"],
        events: ["Spider-Verse"],
        toObject: jest.fn().mockReturnThis(),
      };
      mockModel.findById.mockReturnValue(mockOriginalComic);
      try {
        await comicService.delete("123456")
      } catch (error: any) {
        expect(error.message).toBe("Comic cannot be deleted because it is Original");
      }
    });
  });
});
