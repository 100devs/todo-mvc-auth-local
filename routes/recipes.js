const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, recipesController.getRecipes);

module.exports = router;
