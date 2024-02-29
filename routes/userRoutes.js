const express = require("express");
const userController = require("./../controller/userController");
const authController = require("../controller/authControler")

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router
  .route("/user")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/user/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
