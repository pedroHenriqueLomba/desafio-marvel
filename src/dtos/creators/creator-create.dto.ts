import { body, validationResult } from "express-validator";

export const CreatorCreateDto = [
  body("firstName").isString().notEmpty(),
  body("middleName").isString().optional(),
  body("lastName").isString().notEmpty(),
  body("role").isString().notEmpty(),
  body("thumbnail").isString().notEmpty(),
  body("description").isString().notEmpty(),
  body("comics").isArray().optional(),
  body("comics.name").isString().optional(),
  body("series").isArray().optional(),
  body("series.*").isString().optional(),
  body("stories").isArray().optional(),
  body("stories.*").isString().optional(),
  body("events").isArray().optional(),
  body("events.*").isString().optional(),
  body("urls").isArray().optional(),
  body("urls.*").isString().optional(),
  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
