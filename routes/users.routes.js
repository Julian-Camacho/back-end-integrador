const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../middlewares/upload");

// GET USERS
router.get("/users", usersController.getUsers);
// GET USERS BY ID
router.get("/users/:id", usersController.getUserById);
// POST USERS
router.post("/users", upload, usersController.postUser);
// PUT USERS
router.put("/users/:id", [auth, upload], usersController.putUser);
// DELETE USERS
router.delete("/users/:id", [auth, isAdmin], usersController.deleteUser);
// POST LOGIN
router.post("/login", usersController.login);

module.exports = router;
