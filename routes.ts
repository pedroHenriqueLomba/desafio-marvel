import { Router } from "express";
import { HealthCheckController } from "./src/controllers/health-check.controller";
import { PopulateDbController } from "./src/controllers/populate-db.controller";
import CharacterController from "./src/controllers/character.controller";
import { CreateCharacterDto } from "./src/dtos/characters/character-create.dto";
import { UpdateCharacterDto } from "./src/dtos/characters/character-update.dto";
import { ComicCreateDto } from "./src/dtos/comics/comic-create.dto";
import ComicController from "./src/controllers/comic.controller";
import { ComicUpdateDto } from "./src/dtos/comics/comic-update.dto";

const routes = Router();

// Health Check
routes.get("/health", new HealthCheckController().healthCheck);

// Populate database
routes.get("/populate", new PopulateDbController().populate)

// Characters
routes.post("/characters", CreateCharacterDto, new CharacterController().create);
routes.get("/characters", new CharacterController().list);
routes.get("/characters/:id", new CharacterController().findById);
routes.put("/characters/:id", UpdateCharacterDto, new CharacterController().update);
routes.delete("/characters/:id", new CharacterController().delete);

// Comics
routes.post("/comics", ComicCreateDto, new ComicController().create);
routes.get("/comics", new ComicController().list);
routes.get("/comics/:id", new ComicController().findById);
routes.put("/comics/:id", ComicUpdateDto, new ComicController().update);
routes.delete("/comics/:id", new ComicController().delete);


export { routes };
