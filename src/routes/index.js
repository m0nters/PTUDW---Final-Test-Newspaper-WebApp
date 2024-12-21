import express from "express";
import { getAllArticles } from "../controllers/articlesController.js";
import { getArticleDetail } from "../controllers/articlesDetailController.js";
import {
  createArticle,
  getCreateForm,
} from "../controllers/articlesCreateController.js";
import {
  getEditForm,
  updateArticle,
} from "../controllers/articlesEditController.js";

const mainRouter = express.Router();
mainRouter.get("/", (req, res) => {
  res.redirect("/articles");
});

mainRouter.get("/articles", getAllArticles);
mainRouter.get("/articles/detail", getArticleDetail);
mainRouter.post("/articles/create", createArticle);
mainRouter.get("/articles/create", getCreateForm);
mainRouter.post("/articles/edit", updateArticle);
mainRouter.get("/articles/edit", getEditForm);

export default mainRouter;
