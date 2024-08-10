const express = require("express");
const router = express.Router();

const usersRoutes = require("./users.routes");
const productsRoutes = require("./products.routes");
const categoriesRoutes = require("./category.routes");

router.use([usersRoutes, productsRoutes, categoriesRoutes]);

module.exports = router;
