const express = require("express");
const wikiController = require("./../controller/wikiController");

const router = express.Router();

router
  .route("/article")
  .get(wikiController.getAllArticles)
  .post(wikiController.createArticle);

router
  .route("/article/:id")
  .get(wikiController.getOneArticle)
  .patch(wikiController.updateArticle)
  .delete(wikiController.deleteArticle);


module.exports = router;
