const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CocktailSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  published: false,
  ingredients: [
    {
      ingredient_name: String,
      ingredient_amount: String,
    }],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
module.exports = Cocktail;