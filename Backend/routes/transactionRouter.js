const express = require("express");
const isAuthenticated = require("../middlewares/isAuth");
const transactionController = require("../controllers/transactionCtrl");
const transactionRouter = express.Router();

//!add
transactionRouter.post("/", isAuthenticated, transactionController.create);
//!lists
transactionRouter.get(
  "/",
  isAuthenticated,
  transactionController.getFilteredTransaction
);
//!update
transactionRouter.put(
  "/:id",
  isAuthenticated,
  transactionController.update
);
//!delete
transactionRouter.delete(
  "/:id",
  isAuthenticated,
  transactionController.delete
);
module.exports = transactionRouter;
