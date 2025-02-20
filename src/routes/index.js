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
import { deleteArticle } from "../controllers/articlesDeleteController.js";

const mainRouter = express.Router();
mainRouter.get("/", (req, res) => {
  res.redirect("/articles");
});

mainRouter.get("/articles", getAllArticles);
mainRouter.get("/articles/detail", getArticleDetail);

mainRouter.get("/articles/create", getCreateForm);
mainRouter.post("/articles/create", createArticle);

mainRouter.get("/articles/edit", getEditForm);
mainRouter.post("/articles/edit", updateArticle);

mainRouter.delete("/articles/delete/:id", deleteArticle);

export default mainRouter;
