const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders.controller");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/isAdmin");

// GET ORDERS
router.get("/orders", [auth, admin], ordersController.getOrders);
// POST ORDERS
router.post("/orders", auth, ordersController.createOrder);

module.exports = router;
