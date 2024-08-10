const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/isAdmin');
const isAdmin = require('../middlewares/isAdmin');

// GET USERS
router.get('/users', usersController.getUsers);
// GET USERS BY ID
router.get('/users/:id', usersController.getUserById);
// POST USERS
router.post('/users', usersController.postUser);
// PUT USERS
router.put('/users/:id', auth, usersController.putUser);
// DELETE USERS
router.delete('/users/:id', [auth, isAdmin], usersController.deleteUser);
// POST LOGIN
router.post('/login', usersController.login);

module.exports = router;