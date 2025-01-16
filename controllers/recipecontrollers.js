const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, servings, cookTime } = req.body;
    if (!title || !ingredients || !instructions || !servings) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const recipe = new Recipe({ title, ingredients, instructions, servings, cookTime });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecipes = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const recipes = await Recipe.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Recipe.countDocuments();
    res.json({
      recipes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
