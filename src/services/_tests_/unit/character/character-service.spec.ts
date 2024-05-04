import { expect, jest, test, beforeEach, describe } from "@jest/globals";
import CharacterService from "../../../character.service";
import { Paginate, PaginateOptions } from "../../../../util/paginate";
import { CharacterFiltersDto } from "../../../../dtos/characters/character-filter.dto";

const mockCharacter = {
  _id: "662a8e383b34e99503907fb1",
  name: "Nome da Entidade",
  description: "Descrição da Entidade (opcional)",
  modified: "2024-04-19T12:00:00.000Z",
  resourceURI: "https://exemplo.com",
  urls: ["https://exemplo.com/url1", "https://exemplo.com/url2"],
  thumbnail: "https://exemplo.com/thumbnail.jpg",
  __v: 0,
  toObject: jest.fn().mockReturnThis(),
};

const mockCharacterList = [
  {
    toObject: jest.fn().mockReturnThis(),
    _id: "66251a9cce471f7c33719977",
    marvel_id: 1009155,
    name: "Ant-Man (Hank Pym)",
    description: "",
    modified: "2021-08-05T19:11:25.000Z",
    resourceURI: "http://gateway.marvel.com/v1/public/characters/1009155",
    urls: [
      "http://marvel.com/characters/2/ant-man?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://marvel.com/universe/Yellowjacket_(Henry_Pym)?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://marvel.com/comics/characters/1009155/ant-man_hank_pym?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
    ],
    thumbnail:
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
    __v: 0,
  },
  {
    toObject: jest.fn().mockReturnThis(),
    _id: "66251a9cce471f7c33719978",
    marvel_id: 1009165,
    name: "Avengers",
    description:
      "Earth's Mightiest Heroes joined forces to take on threats that were too big for any one hero to tackle. With a roster that has included Captain America, Iron Man, Ant-Man, Hulk, Thor, Wasp and dozens more over the years, the Avengers have come to be regarded as Earth's No. 1 team.",
    modified: "2020-07-21T14:29:09.000Z",
    resourceURI: "http://gateway.marvel.com/v1/public/characters/1009165",
    urls: [
      "http://marvel.com/characters/68/avengers?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://marvel.com/universe/Avengers?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://marvel.com/comics/characters/1009165/avengers?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/9/20/5102c774ebae7.jpg",
    __v: 0,
  },
  {
    toObject: jest.fn().mockReturnThis(),
    _id: "66251a9cce471f7c33719979",
    marvel_id: 1009175,
    name: "Beast",
    description: "",
    modified: "2014-01-13T19:48:32.000Z",
    resourceURI: "http://gateway.marvel.com/v1/public/characters/1009175",
    urls: [
      "http://marvel.com/characters/3/beast?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://marvel.com/universe/Beast_(Henry_McCoy)?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://marvel.com/comics/characters/1009175/beast?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/2/80/511a79a0451a3.jpg",
    __v: 0,
  },
  {
    toObject: jest.fn().mockReturnThis(),
    _id: "66251a9cce471f7c3371997a",
    marvel_id: 1009184,
    name: "Black Bolt",
    description: "",
    modified: "2013-10-24T18:39:01.000Z",
    resourceURI: "http://gateway.marvel.com/v1/public/characters/1009184",
    urls: [
      "http://marvel.com/characters/4/black_bolt?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://marvel.com/universe/Black_Bolt?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://marvel.com/comics/characters/1009184/black_bolt?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/1/20/52696929dc721.jpg",
    __v: 0,
  },
  {
    toObject: jest.fn().mockReturnThis(),
    _id: "66251a9cce471f7c3371997b",
    marvel_id: 1009187,
    name: "Black Panther",
    description: "",
    modified: "2018-06-19T20:39:46.000Z",
    resourceURI: "http://gateway.marvel.com/v1/public/characters/1009187",
    urls: [
      "http://marvel.com/comics/characters/1009187/black_panther?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://marvel.com/universe/Black_Panther_(T%27Challa)?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
      "http://marvel.com/comics/characters/1009187/black_panther?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/6/60/5261a80a67e7d.jpg",
    __v: 0,
  },
];

const mockModel = {
  create: jest.fn().mockReturnValue(mockCharacter),
  find: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  exec: jest.fn().mockReturnValue(mockCharacterList),
  countDocuments: jest.fn().mockReturnValue(5),
  findById: jest.fn().mockReturnValue(mockCharacter),
  deleteOne: jest.fn(),
};

describe("Testing CRUD operations", () => {
  let characterService: CharacterService;
  beforeEach(() => {
    characterService = new CharacterService(mockModel as any);
  });

  describe("Testing create method", () => {
    test("should create new character", async () => {
      const character = {
        name: "Nome da Entidade",
        description: "Descrição da Entidade (opcional)",
        modified: new Date("2024-04-19T12:00:00.000Z"),
        resourceURI: "https://exemplo.com",
        urls: ["https://exemplo.com/url1", "https://exemplo.com/url2"],
        thumbnail: "https://exemplo.com/thumbnail.jpg",
      };

      const createdCharacter = await characterService.create(character);

      expect(createdCharacter).toEqual(mockCharacter);
    });
  });

  describe("Testing find method", () => {
    test("should return all characters", async () => {
      const pagination = new PaginateOptions<CharacterFiltersDto>({
        limit: 5,
        page: 1,
      });
      const characters = await characterService.list(pagination);

      expect(characters).toEqual(new Paginate(mockCharacterList, 5, 5, 1));
    });
  });

  describe("Testing findById method", () => {
    test("should return a character by id", async () => {
      const character = await characterService.findById(
        "662a8e383b34e99503907fb1"
      );

      expect(character).toEqual(mockCharacter);
    });

    test("should throw an error when character not found", async () => {
      mockModel.findById = jest.fn().mockReturnValue(null);
      try {
        await characterService.findById("662a8e383b34e99503907fa9");
      } catch (error: any) {
        expect(error.message).toBe("Character not found");
      }
    });
  });

  describe("Testing update method", () => {
    const updatedData = {
      name: "Nome da Entidade atualizada",
      description: "Descrição da Entidade",
      modified: new Date("2024-04-19T12:00:00.000Z"),
      resourceURI: "https://exemplo.com",
      urls: ["https://exemplo.com/url1", "https://exemplo.com/url2"],
      thumbnail: "https://exemplo.com/thumbnail.jpg",
      toObject: jest.fn().mockReturnThis(),
      set: jest.fn(),
      save: jest.fn(),
    };

    test("should update a character", async () => {
      const oldCharacter = {
        name: "Nome da Entidade",
        description: "Descrição da Entidade",
        modified: new Date("2024-04-19T12:00:00.000Z"),
        resourceURI: "https://exemplo.com",
        urls: ["https://exemplo.com/url1", "https://exemplo.com/url2"],
        thumbnail: "https://exemplo.com/thumbnail.jpg",
        set: jest.fn().mockImplementation(function (this: any, updatedData) {
          Object.assign(this, updatedData);
        }),
        save: jest.fn().mockImplementation(function (this: any, updatedData) {
          this.set(updatedData);
        }),
        toObject: jest.fn().mockReturnThis(),
      };

      mockModel.findById = jest.fn().mockReturnValue(oldCharacter);

      const updatedCharacter = await characterService.update(
        "662a8e383b34e99503907fb1",
        updatedData
      );

      expect(updatedCharacter).toEqual(updatedData);
    });

    test("should throw an error when character not found", async () => {
      mockModel.findById = jest.fn().mockReturnValue(null);
      try {
        await characterService.update("662a8e383b34e99503907fb1", updatedData);
      } catch (error: any) {
        expect(error.message).toBe("Character not found");
      }
    });
  });

  describe("Testing delete method", () => {
    test("should delete a character", async () => {
      const character = {
        toObject: jest.fn().mockReturnThis(),
        _id: "66251a9cce471f7c33719979",
        name: "Beast",
        description: "",
        modified: "2014-01-13T19:48:32.000Z",
        resourceURI: "http://gateway.marvel.com/v1/public/characters/1009175",
        urls: [
          "http://marvel.com/characters/3/beast?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
          "http://marvel.com/universe/Beast_(Henry_McCoy)?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
          "http://marvel.com/comics/characters/1009175/beast?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
        ],
        thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/2/80/511a79a0451a3.jpg",
        __v: 0,
      }

      mockModel.findById = jest.fn().mockReturnValue(character);
      mockModel.deleteOne = jest.fn();

      await characterService.delete("66251a9cce471f7c33719979");

      expect(mockModel.deleteOne).toHaveBeenCalled();
    });

    test("should throw an error when character not found", async () => {
      mockModel.findById = jest.fn().mockReturnValue(null);
      try {
        await characterService.delete("662a8e383b34e99503907fa9");
      } catch (error: any) {
        expect(error.message).toBe("Character not found");
      }
    })

    test("should not delete a character", async () => {
      const character = {
        toObject: jest.fn().mockReturnThis(),
        _id: "66251a9cce471f7c33719979",
        marvel_id: 1009175,
        name: "Beast",
        description: "",
        modified: "2014-01-13T19:48:32.000Z",
        resourceURI: "http://gateway.marvel.com/v1/public/characters/1009175",
        urls: [
          "http://marvel.com/characters/3/beast?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
          "http://marvel.com/universe/Beast_(Henry_McCoy)?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
          "http://marvel.com/comics/characters/1009175/beast?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
        ],
        thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/2/80/511a79a0451a3.jpg",
        __v: 0,
      }

      mockModel.findById = jest.fn().mockReturnValue(character);
      
      try {
        await characterService.delete("66251a9cce471f7c33719979");
      } catch (error: any) {
        expect(error.message).toBe("Character cannot be deleted because it is Original");
      }
    });
  });

  describe("Testing findWithThumbnailAvailable method", () => {
    test("should return all characters with thumbnail available", async () => {
      const pagination = new PaginateOptions<CharacterFiltersDto>({
        limit: 5,
        page: 1,
      });
      const characters = await characterService.findWithThumbnailAvailable(
        pagination
      );
      expect(characters).toEqual(new Paginate(mockCharacterList, 5, 5, 1));
    });
  });
});
