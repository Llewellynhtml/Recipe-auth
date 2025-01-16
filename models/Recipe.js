const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  ingredients: {
    type: [String],
    required: [true, 'Ingredients are required'],
  },
  instructions: {
    type: String,
    required: [true, 'Instructions are required'],
  },
  servings: {
    type: Number,
    required: [true, 'Number of servings is required'],
  },
  cookTime: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
