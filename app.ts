import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes";
import dotenv from 'dotenv';
dotenv.config();

class App {
  express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.database();
    this.routes();
  }

  private middleware(): void {
    this.express.use(express.json());
  }

  private async database() {
    try {
      mongoose.set("strictQuery", true);
      const mongoConnection = process.env.MONGO_CONNECTION;
      if (!mongoConnection) {
        throw new Error("MongoDB connection string is not provided in environment variables");
      }
      await mongoose.connect(mongoConnection);
      console.log("connect database success");
    } catch (error) {
      console.error("Cannot connect to database, error:", error);
    }
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
