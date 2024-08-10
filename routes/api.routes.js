const express = require("express");
const router = express.Router();

const usersRoutes = require("./users.routes");
const productsRoutes = require("./products.routes");

router.use([usersRoutes, productsRoutes]);

module.exports = router;
