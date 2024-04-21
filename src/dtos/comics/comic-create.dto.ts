import { body, validationResult } from "express-validator";

export const ComicCreateDto = [
  body("title").isString().withMessage("Title must be a string"),
  body("issueNumber").isNumeric().withMessage("Issue number must be a number"),
  body("description").isString().withMessage("Description must be a string"),
  body("diamondCode").isString().withMessage("Diamond code must be a string"),
  body("ean").isString().optional().withMessage("EAN must be a string"),
  body("format").isString().withMessage("Format must be a string"),
  body("pageCount").isNumeric().withMessage("Page count must be a number"),
  body("urls").isArray().withMessage("URLs must be an array"),
  body("urls.*").isString().withMessage("URLs must be strings"),
  body("collections").isArray().withMessage("Collections must be an array"),
  body("collections.*").isString().withMessage("Collections must be strings"),
  body("dates").isArray().withMessage("Dates must be an array"),
  body("dates.*.date").isISO8601().withMessage("Date must be a valid date"),
  body("dates.*.type").isString().withMessage("Type must be a string"),
  body("prices").isArray().withMessage("Prices must be an array"),
  body("prices.*.price").isNumeric().withMessage("Price must be a number"),
  body("prices.*.type").isString().withMessage("Type must be a string"),
  body("thumbnail").isString().withMessage("Thumbnail must be a string"),
  body("images").isArray().withMessage("Images must be an array"),
  body("images.*").isString().withMessage("Images must be strings"),
  body("creators").isArray().withMessage("Creators must be an array"),
  body("creators.*.name").isString().withMessage("Name must be a string"),
  body("creators.*.role").isString().withMessage("Role must be a string"),
  body("characters").isArray().withMessage("Characters must be an array"),
  body("characters.*").isString().withMessage("Characters must be strings"),
  body("stories").isArray().withMessage("Stories must be an array"),
  body("stories.*").isString().withMessage("Stories must be strings"),
  body("events").isArray().withMessage("Events must be an array"),
  body("events.*").isString().withMessage("Events must be strings"),

  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
