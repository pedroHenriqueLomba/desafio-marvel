import { Router } from "express";
import { HealthCheckController } from "./src/controllers/health-check.controller";
import { PopulateDbController } from "./src/controllers/populate-db.controller";

const routes = Router();

// Health Check
routes.get("/health", new HealthCheckController().healthCheck);

// Populate database
routes.get("/populate", new PopulateDbController().populate)

export { routes };
