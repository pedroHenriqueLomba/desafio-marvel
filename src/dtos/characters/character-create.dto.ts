import { body, validationResult } from "express-validator";

export const CreateCharacterDto = [
  body("name").isString().withMessage("Name is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("modified")
    .isISO8601()
    .optional()
    .withMessage("The date must be of the format YYYY-MM-DDTHH:MM:SSZ"),
  body("resourceURI")
    .isString()
    .optional()
    .withMessage("Resource URI must be a string"),
  body("urls")
    .isArray()
    .optional()
    .withMessage("URLs must be an array of strings"),
  body("urls.*").isString().optional().withMessage("URLs must be strings"),
  body("thumbnail")
    .isString()
    .optional()
    .withMessage("Thumbnail must be a string"),

  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
