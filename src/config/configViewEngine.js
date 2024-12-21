import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..", "..");

const configViewEngine = (app) => {
  app.set("views", path.join(rootDir, "src", "views"));
  app.set("view engine", "ejs");
  app.use(express.static(path.join(rootDir, "src", "public")));
};

export default configViewEngine;
