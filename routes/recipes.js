const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');
const { ensureAuth } = require('../middleware/auth');

// Will get all recipes for a user
router.get('/', ensureAuth, recipesController.getRecipes);

// Will get a single recipe by id
router.get('/:id', ensureAuth, recipesController.getOneRecipe);

// Will get and render the add new recipe view
router.post('/add', ensureAuth, recipesController.getAddRecipe);

// Will add a new recipe
router.post('/add', ensureAuth, recipesController.postAddRecipe);

module.exports = router;
