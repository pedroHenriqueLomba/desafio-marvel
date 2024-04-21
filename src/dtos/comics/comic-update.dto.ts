import { body, validationResult } from "express-validator";

export const ComicUpdateDto = [
  body("title").isString().optional().withMessage("Title must be a string"),
  body("issueNumber")
    .isNumeric()
    .optional()
    .withMessage("Issue number must be a number"),
  body("description")
    .isString()
    .optional()
    .withMessage("Description must be a string"),
  body("diamondCode")
    .isString()
    .optional()
    .withMessage("Diamond code must be a string"),
  body("ean").isString().optional().withMessage("EAN must be a string"),
  body("format").isString().optional().withMessage("Format must be a string"),
  body("pageCount")
    .isNumeric()
    .optional()
    .withMessage("Page count must be a number"),
  body("urls").isArray().optional().withMessage("URLs must be an array"),
  body("urls.*").isString().optional().withMessage("URLs must be strings"),
  body("collections")
    .isArray()
    .optional()
    .withMessage("Collections must be an array"),
  body("collections.*")
    .isString()
    .optional()
    .withMessage("Collections must be strings"),
  body("dates").isArray().optional().withMessage("Dates must be an array"),
  body("dates.*.date")
    .isISO8601()
    .optional()
    .withMessage("Date must be a valid date"),
  body("dates.*.type")
    .isString()
    .optional()
    .withMessage("Type must be a string"),
  body("prices").isArray().optional().withMessage("Prices must be an array"),
  body("prices.*.price")
    .isNumeric()
    .optional()
    .withMessage("Price must be a number"),
  body("prices.*.type")
    .isString()
    .optional()
    .withMessage("Type must be a string"),
  body("thumbnail")
    .isString()
    .optional()
    .withMessage("Thumbnail must be a string"),
  body("images").isArray().optional().withMessage("Images must be an array"),
  body("images.*").isString().optional().withMessage("Images must be strings"),
  body("creators")
    .isArray()
    .optional()
    .withMessage("Creators must be an array"),
  body("creators.*.name")
    .isString()
    .optional()
    .withMessage("Name must be a string"),
  body("creators.*.role")
    .isString()
    .optional()
    .withMessage("Role must be a string"),
  body("characters")
    .isArray()
    .optional()
    .withMessage("Characters must be an array"),
  body("characters.*")
    .isString()
    .optional()
    .withMessage("Characters must be strings"),

  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
