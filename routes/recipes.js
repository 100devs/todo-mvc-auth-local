const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');
const { ensureAuth } = require('../middleware/auth');

// Will get all recipes for a user
router.get('/', ensureAuth, recipesController.getRecipes);

// Will get a single recipe by id
router.get('/:id', ensureAuth, recipesController.getOneRecipe);

// Will add a new recipe
router.post('/', ensureAuth, recipesController.addRecipe);

module.exports = router;
