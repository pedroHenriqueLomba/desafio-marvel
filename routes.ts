import { Router } from "express";
import { HealthCheckController } from "./src/controllers/health-check.controller";
import { PopulateDbController } from "./src/controllers/populate-db.controller";
import CharacterController from "./src/controllers/character.controller";
import { CreateCharacterDto } from "./src/dtos/characters/character-create.dto";

const routes = Router();

// Health Check
routes.get("/health", new HealthCheckController().healthCheck);

// Populate database
routes.get("/populate", new PopulateDbController().populate)

// Characters
routes.post("/characters", CreateCharacterDto, new CharacterController().create);

export { routes };
