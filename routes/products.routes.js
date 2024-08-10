const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/isAdmin");

// GET PRODUCTS
router.get("/products", productsController.getProducts);
// GET PRODUCTS BY ID
router.get("/products/:id", productsController.getProductById);
//!  ROUTES FOR ADMIN
// POST PRODUCTS
router.post(
  "/products",
  [auth, admin, upload],
  productsController.createProduct
);
// PUT PRODUCTS
router.put(
  "/products/:id",
  [auth, admin, upload],
  productsController.updateProduct
);
// DELETE PRODUCTS
router.delete("/products/:id", [auth, admin], productsController.deleteProduct);

module.exports = router;
