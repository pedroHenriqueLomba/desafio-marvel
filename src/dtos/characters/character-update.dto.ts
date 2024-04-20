import { body, validationResult } from "express-validator";

export const UpdateCharacterDto = [
  body("name").isString().withMessage("Name is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("urls")
    .optional()
    .isArray()
    .withMessage("URLs must be an array of strings"),
  body("thumbnail")
    .optional()
    .isString()
    .withMessage("Thumbnail must be a string"),

  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
