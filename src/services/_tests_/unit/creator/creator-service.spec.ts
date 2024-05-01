import { expect, jest, test, beforeEach, describe } from "@jest/globals";
import CreatorService from "../../../creator.service";
import { Paginate, PaginateOptions } from "../../../../util/paginate";
import { CreatorFilterDto } from "../../../../dtos/creators/creator-filter.dto";

const mockCreator = {
  firstName: "Stan",
  lastName: "Lee",
  fullName: "Stan Lee",
  role: "Writer",
  thumbnail: "https://example.com/stanlee-thumbnail.jpg",
  description:
    "Stan Lee was an American comic book writer, editor, publisher, and producer.",
  comics: ["Spider-Man", "X-Men"],
  series: ["The Amazing Spider-Man", "X-Men: The Animated Series"],
  stories: ["Origin Story", "The First Battle"],
  events: ["Spider-Verse"],
  urls: ["https://en.wikipedia.org/wiki/Stan_Lee"],
  toObject: jest.fn().mockReturnThis(),
};

const mockCreatorList = [
  {
    toObject: jest.fn().mockReturnThis(),
    _id: "66251aabce471f7c33719b73",
    marvel_id: 11575,
    firstName: "Kris",
    middleName: "",
    lastName: "Anka",
    suffix: "",
    fullName: "Kris Anka",
    modified: "2016-10-19T14:47:42.000Z",
    resourceURI: "http://gateway.marvel.com/v1/public/creators/11575",
    urls: [
      "http://marvel.com/comics/creators/11575/kris_anka?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
    ],
    thumbnail:
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
    series: [
      "A+X (2012 - 2014)",
      "A+X VOL. 2: = AMAZING TPB (MARVEL NOW) (2013)",
      "A-Force (2015)",
      "Absolute Carnage (2019)",
      "Age of Apocalypse (2012 - 2013)",
      "Age of Apocalypse Vol. 2 (2011 - Present)",
      "All-New Captain America (2014 - 2015)",
      "All-New Inhumans (2015 - 2016)",
      "All-New X-Factor (2014 - 2015)",
      "All-New X-Factor Vol. 2: Change of Decay (2014)",
      "All-New X-Factor Vol. 3: Axis (2015)",
      "All-New X-Men (2012 - 2015)",
      "All-New X-Men Special (2013)",
      "ALL-NEW X-MEN/INDESTRUCTIBLE HULK/SUPERIOR SPIDER-MAN: THE ARMS OF THE OCTOPUS TPB (2013)",
      "Amazing Spider-Man: Renew Your Vows (2015)",
      "Amazing X-Men (2013 - 2015)",
      "Amazing X-Men Vol. 2: World War Wendigo (2014)",
      "Avengers (2012 - 2015)",
      "Black Cat (2019 - 2020)",
      "Black Cat By Jed Mackay Omnibus (2023)",
    ],
    comics: [
      "A+X VOL. 2: = AMAZING TPB (MARVEL NOW) (Trade Paperback)",
      "A+X (2012) #10",
      "A-Force (2015) #2 (Anka Variant)",
      "Absolute Carnage (2019) #2 (Variant)",
      "Age of Apocalypse (2012) #7",
      "Age of Apocalypse (2012) #8",
      "Age of Apocalypse (2012) #9",
      "Age of Apocalypse (2012) #10",
      "Age of Apocalypse (2012) #12",
      "Age of Apocalypse Vol. 2 (Trade Paperback)",
      "All-New Inhumans (2015) #3 (Anka Variant)",
      "All-New X-Factor Vol. 3: Axis (Trade Paperback)",
      "All-New X-Factor (2014) #2 (Anka 2nd Printing Variant)",
      "All-New X-Factor (2014) #3",
      "All-New X-Factor (2014) #4",
      "All-New X-Factor (2014) #5",
      "All-New X-Factor (2014) #6",
      "All-New X-Factor (2014) #7",
      "All-New X-Factor (2014) #8",
      "All-New X-Factor (2014) #9",
    ],
    events: [
      "Axis",
      "Infinity",
      "Inhumanity",
      "Original Sin",
      "Secret Empire",
      "Secret Wars (2015)",
    ],
    __v: 0,
  },
  {
    toObject: jest.fn().mockReturnThis(),
    _id: "66251aabce471f7c33719b88",
    marvel_id: 12741,
    firstName: "Ramón F.",
    middleName: "",
    lastName: "Bachs",
    suffix: "",
    fullName: "Ramón F. Bachs",
    modified: "2023-01-24T23:55:03.000Z",
    resourceURI: "http://gateway.marvel.com/v1/public/creators/12741",
    urls: [
      "http://marvel.com/comics/creators/12741/ramn_f_bachs?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
    ],
    thumbnail:
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
    series: [
      "Amazing Spider-Man Family (2008 - 2009)",
      "Black Panther Legends (2022)",
      "Black Panther Legends (2021 - 2022)",
      "Captain America: Steve Rogers (2016 - 2017)",
      "Civil War Chronicles (2007)",
      "Civil War: Front Line (2006 - 2007)",
      "Civil War: Front Line (2016)",
      "Civil War: Front Line Book 1 (2007)",
      "Civil War: Front Line Book 2 (2007)",
      "CIVIL WAR: FRONT LINE TPB (2016)",
      "Decimation: Generation M (2006)",
      "Disney Kingdoms: Figment (2021)",
      "Eternals Forever (2021)",
      "Figment 2 (2015 - 2016)",
      "Figment 2: Legacy of Imagination (2016)",
      "Generation M (2005 - 2006)",
      "Guardians of the Galaxy: What If? Ecosport Adventure Presented by Ford (2017)",
      "HULK: WORLD WAR HULK OMNIBUS HC (2017)",
      "Hulk: Wwh - Front Line (2008)",
      "Infinity: Heist (2013 - 2014)",
    ],
    comics: [
      "Amazing Spider-Man Family (2008) #1",
      "Amazing Spider-Man Family (2008) #2",
      "MARVEL UNIVERSE AVENGERS EARTH'S MIGHTIEST HEROES VOL. 2 DIGEST (Digest)",
      "Black Panther Legends (Trade Paperback)",
      "Black Panther Legends (2021) #4",
      "Captain America: Steve Rogers (2016) #17",
      "Civil War Chronicles (2007)",
      "Civil War Chronicles (2007) #3",
      "Civil War Chronicles (2007) #4",
      "Civil War Chronicles (2007) #7",
      "Civil War Chronicles (2007) #10",
      "Civil War Chronicles (2007) #11",
      "Civil War: Front Line (Hardcover)",
      "Civil War: Front Line (2006) #1",
      "Civil War: Front Line (2006) #2",
      "Civil War: Front Line (2006) #3",
      "Civil War: Front Line (2006) #4",
      "Civil War: Front Line (2006) #5",
      "Civil War: Front Line (2006) #6",
      "Civil War: Front Line (2006) #7",
    ],
    events: ["Civil War", "Infinity", "Secret Empire", "World War Hulk"],
    __v: 0,
  },
  {
    toObject: jest.fn().mockReturnThis(),
    _id: "66251aabce471f7c33719c06",
    marvel_id: 357,
    firstName: "Jim",
    middleName: "",
    lastName: "Cheung",
    suffix: "",
    fullName: "Jim Cheung",
    modified: "2018-07-16T20:17:30.000Z",
    resourceURI: "http://gateway.marvel.com/v1/public/creators/357",
    urls: [
      "http://marvel.com/comics/creators/357/jim_cheung?utm_campaign=apiRef&utm_source=acba892b64c079f79b646592580eee92",
    ],
    thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/9/80/4bc5c493c853c.jpg",
    series: [
      "A-Force (2015)",
      "A-Force Vol. 0: Warzones! (2015)",
      "AGE OF ULTRON HC (2013)",
      "All-New Inhumans (2015 - 2016)",
      "All-New X-Men (2012 - 2015)",
      "Amazing Fantasy (2022)",
      "Amazing Spider-Man: Red Goblin (2019)",
      "AMAZING SPIDER-MAN: THE CLONE CONSPIRACY HC (2017)",
      "Astonishing X-Men (2017 - 2018)",
      "Astonishing X-Men by Charles Soule Vol. 1: Life of X (2018)",
      "Avengers (2010 - 2012)",
      "Avengers (2018 - 2023)",
      "Avengers (2012 - 2015)",
      "Avengers & X-Men: Axis (2017)",
      "Avengers & X-Men: Axis (2014)",
      "Avengers & X-Men: Axis (2015)",
      "Avengers by Jonathan Hickman: The Complete Collection Vol. 3 (2021)",
      "Avengers By Jonathan Hickman: The Complete Collection Vol. 5 (2022)",
      "Avengers Disassembled (2006)",
      "Avengers Disassembled (2005)",
    ],
    comics: [
      "A-Force (2015) #1",
      "A-Force Vol. 0: Warzones! (Trade Paperback)",
      "AGE OF ULTRON HC (Trade Paperback)",
      "Guardians Of The Galaxy: Guardians Of Infinity (Trade Paperback)",
      "Guardians of The Galaxy: Tales of The Cosmos (Trade Paperback)",
      "All-New Inhumans (2015) #1 (Cheung Connecting Variant D)",
      "All-New X-Men (2012) #4 (Cheung Variant)",
      "Amazing Fantasy (2022) #1000",
      "Amazing Spider-Man: Red Goblin (Trade Paperback)",
      "AMAZING SPIDER-MAN: THE CLONE CONSPIRACY HC (Trade Paperback)",
      "Astonishing X-Men (2017) #1",
      "Astonishing X-Men by Charles Soule Vol. 1: Life of X (Trade Paperback)",
      "AVENGERS: TIME RUNS OUT (Trade Paperback)",
      "Avengers (2010) #1 (DJURDJEVIC VARIANT)",
      "Avengers (2010) #4 (ROMITA JR. VARIANT)",
      "Avengers (2018) #21 (Variant)",
      "Avengers (2010) #34",
      "Avengers (2012) #35",
      "Avengers (2012) #44 (Cheung End of an Era Variant)",
      "Avengers (2012) #44 (Cheung Final Issue Variant)",
    ],
    events: [
      "Age of Ultron",
      "Avengers Disassembled",
      "Avengers VS X-Men",
      "Axis",
      "Civil War",
      "Crossing",
      "Dark Reign",
      "Dead No More: The Clone Conspiracy",
      "Heroic Age",
      "Infinity",
      "Initiative",
      "Original Sin",
      "Secret Invasion",
      "Secret Wars (2015)",
      "World War Hulk",
    ],
    __v: 0,
  },
];

const mockModel = {
  create: jest.fn(),
  find: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  exec: jest.fn().mockReturnValue(mockCreatorList),
  countDocuments: jest.fn(),
  findById: jest.fn(),
  deleteOne: jest.fn(),
};

describe("Testing CRUD operations", () => {
  let creatorService: CreatorService;
  beforeEach(() => {
    creatorService = new CreatorService(mockModel as any);
  });

  test("Should create a creator", async () => {
    mockModel.create.mockReturnValue(mockCreator);
    const creator = await creatorService.create(mockCreator);
    expect(creator).toEqual(mockCreator);
    expect(mockModel.create).toHaveBeenCalledWith(mockCreator);
  });

  test("Should list creators", async () => {
    const paginateOptions = new PaginateOptions<CreatorFilterDto>({
      limit: 3,
      page: 1,
    });
    mockModel.countDocuments.mockReturnValue(3);
    mockModel.find.mockReturnThis();
    mockModel.limit.mockReturnThis();
    mockModel.skip.mockReturnThis();
    mockModel.exec.mockReturnValue(mockCreatorList);
    const creators = await creatorService.list(paginateOptions);
    expect(creators).toEqual(new Paginate(mockCreatorList, 3, 1, 3));
  });

  describe("Testing findById method", () => {
    test("Should find a creator by id", async () => {
      mockModel.findById.mockReturnValue(mockCreator);
      const creator = await creatorService.findById("123");
      expect(creator).toEqual(mockCreator);
    });

    test("Should throw an error when creator is not found", async () => {
      mockModel.findById.mockReturnValue(null);
      try {
        await creatorService.findById("123");
      } catch (error: any) {
        expect(error.message).toBe("Creator not found");
      }
    });
  });

  describe("Testing update method", () => {
    const updatedData = {
      firstName: "Stan",
      lastName: "Lee Atualizado",
      fullName: "Stan Lee Atualizado",
      role: "Writer",
      thumbnail: "https://example.com/stanlee-thumbnail.jpg",
      description:
        "Stan Lee was an American comic book writer, editor, publisher, and producer.",
      comics: ["Spider-Man", "X-Men"],
      series: ["The Amazing Spider-Man", "X-Men: The Animated Series"],
      stories: ["Origin Story", "The First Battle"],
      events: ["Spider-Verse"],
      urls: ["https://en.wikipedia.org/wiki/Stan_Lee"],
      toObject: jest.fn().mockReturnThis(),
      set: jest.fn().mockImplementation(function (this: any, updatedData) {
        Object.assign(this, updatedData);
      }),
      save: jest.fn().mockImplementation(function (this: any, updatedData) {
        this.set(updatedData);
      }),
    };

    const oldData = {
      firstName: "Stan",
      lastName: "Lee",
      fullName: "Stan Lee",
      role: "Writer",
      thumbnail: "https://example.com/stanlee-thumbnail.jpg",
      description:
        "Stan Lee was an American comic book writer, editor, publisher, and producer.",
      comics: ["Spider-Man", "X-Men"],
      series: ["The Amazing Spider-Man", "X-Men: The Animated Series"],
      stories: ["Origin Story", "The First Battle"],
      events: ["Spider-Verse"],
      urls: ["https://en.wikipedia.org/wiki/Stan_Lee"],
      toObject: jest.fn().mockReturnThis(),
      set: jest.fn().mockImplementation(function (this: any, updatedData) {
        Object.assign(this, updatedData);
      }),
      save: jest.fn().mockImplementation(function (this: any, updatedData) {
        this.set(updatedData);
      }),
    };

    test("Should update a creator", async () => {
      mockModel.findById.mockReturnValue(oldData);
      const creator = await creatorService.update("123", updatedData);
      expect(creator).toEqual(updatedData);
    });

    test("Should throw an error when creator is not found", async () => {
      mockModel.findById.mockReturnValue(null);
      try {
        await creatorService.update("123", updatedData);
      } catch (error: any) {
        expect(error.message).toBe("Creator not found");
      }
    });
  });

  describe("Testing delete method", () => {
    const mockCreatorWithMarvelId = {
      marvel_id: 123,
      firstName: "Stan",
      lastName: "Lee",
      fullName: "Stan Lee",
      role: "Writer",
      thumbnail: "https://example.com/stanlee-thumbnail.jpg",
      description:
        "Stan Lee was an American comic book writer, editor, publisher, and producer.",
      comics: ["Spider-Man", "X-Men"],
      series: ["The Amazing Spider-Man", "X-Men: The Animated Series"],
      stories: ["Origin Story", "The First Battle"],
      events: ["Spider-Verse"],
      urls: ["https://en.wikipedia.org/wiki/Stan_Lee"],
      toObject: jest.fn().mockReturnThis(),
    };

    test("Should delete a creator", async () => {
      mockModel.findById.mockReturnValue(mockCreator);
      await creatorService.delete("123");
      expect(mockModel.deleteOne).toHaveBeenCalled();
    });

    test("Should throw an error when creator is not found", async () => {
      mockModel.findById.mockReturnValue(null);
      try {
        await creatorService.delete("123");
      } catch (error: any) {
        expect(error.message).toBe("Creator not found");
      }
    });

    test("Should throw an error when creator cannot be deleted", async () => {
      mockModel.findById.mockReturnValue(mockCreatorWithMarvelId);
      try {
        await creatorService.delete("123");
      } catch (error: any) {
        expect(error.message).toBe("Creator cannot be deleted");
      }
    });
  });
});
