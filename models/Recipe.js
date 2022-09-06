const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  recipeName: { type: String, required: true },
  ingredients: { type: Array, required: true },
  instructions: { type: String, required: true },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
