const express = require("express");
const isAuthenticated = require("../middlewares/isAuth");
const categoryController = require("../controllers/categoryCtrl");
const categoryRouter = express.Router();

//!add
categoryRouter.post(
    "/api/category/add",
    isAuthenticated,
    categoryController.create
);
//!lists
categoryRouter.get(
    "/api/category/lists",
    isAuthenticated,
    categoryController.lists
);
//!update
categoryRouter.put(
    "/api/category/update/:id",
    isAuthenticated,
    categoryController.update
);
//!delete
categoryRouter.delete(
    "/api/category/delete/:id",
    isAuthenticated,
    categoryController.delete
);
module.exports = categoryRouter;