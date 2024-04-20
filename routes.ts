import { Router } from "express";
import { HealthCheckController } from "./src/controllers/health-check.controller";
import { PopulateDbController } from "./src/controllers/populate-db.controller";
import CharacterController from "./src/controllers/character.controller";
import { CreateCharacterDto } from "./src/dtos/characters/character-create.dto";
import { UpdateCharacterDto } from "./src/dtos/characters/character-update.dto";

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

export { routes };
