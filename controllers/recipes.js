const Recipe = require('../models/Recipe');

module.exports = {
  getRecipes: async (req, res) => {
    console.log(req.user);
    try {
      const myRecipes = await Recipe.find({ userId: req.user.id });
      res.render('myrecipes.ejs', { recipes: myRecipes, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getOneRecipe: async (req, res) => {
    try {
      const oneRecipe = await Recipe.findById(req.params.id);
      res.render('onerecipe.ejs', { recipe: oneRecipe });
    } catch (err) {
      console.log(err);
    }
  },
  getAddRecipe: async (req, res) => {
    console.log(req.user);
    try {
      res.render('addrecipe.ejs');
    } catch (err) {
      console.log(err);
    }
  },
  postAddRecipe: async (req, res) => {
    try {
      await Recipe.create({
        userId: req.user.id,
        recipeName: req.body.recipeName,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
      });
      console.log('Recipe has been added!');
      res.redirect('/recipes');
    } catch (err) {
      console.log(err);
    }
  },
};
