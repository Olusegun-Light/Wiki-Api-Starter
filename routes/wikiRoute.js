const express = require("express");
const wikiController = require("./../controller/wikiController");
const authController = require("../controller/authControler");

const router = express.Router();

router
  .route("/article")
  .get(authController.protect, wikiController.getAllArticles)
  .post(authController.protect, authController.restrictTo("author"), wikiController.createArticle);

router
  .route("/article/:id")
  .get(wikiController.getOneArticle)
  .patch(wikiController.updateArticle)
  .delete(wikiController.deleteArticle);


module.exports = router;
