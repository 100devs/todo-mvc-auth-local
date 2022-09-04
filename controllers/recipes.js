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
};
