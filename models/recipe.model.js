const gstore = require('gstore-node')();
const { Schema } = gstore;

const recipeSchema = new Schema({
    recipeName: '',
    servings: 0,
    season: '',
    mealType: [],
    ingredients: [],
    directions: []
});

module.exports = gstore.model('Recipe', recipeSchema);