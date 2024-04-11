import { Router } from "express";
import { HealthCheckController } from "./src/controllers/health-check.controller";

const routes = Router();

// Health Check
routes.get("/health", new HealthCheckController().healthCheck);

export { routes };
