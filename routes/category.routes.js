const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// GET CATEGORIES
router.get('/categories', categoryController.getCategories);
// POST CATEGORIES
router.post('/categories', categoryController.createCategory);

module.exports = router;