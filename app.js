import express from "express";
import configViewEngine from "./src/config/configViewEngine.js";
import mainRouter from "./src/routes/index.js";
import connection from "./src/config/database.js";

const app = express();

configViewEngine(app);

// Middleware để parse body request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mainRouter);
app.use((req, res) => {
  res.status(404).render("404");
});

export default app;
