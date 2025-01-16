const express = require('express');
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');

const router = express.Router();

router.post('/recipes', createRecipe);
router.get('/recipes', getRecipes);
router.get('/recipes/:id', getRecipeById);
router.put('/recipes/:id', updateRecipe);
router.delete('/recipes/:id', deleteRecipe);

module.exports = router;
