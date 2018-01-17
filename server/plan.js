/*
Meal plan algorithm
-There could be a toggle for "food-saver" mode to make the initial algorithm easier
-the endpoint would accept amount, in meals, of breakfast, lunch and dinner needed + a flag for foodSaver
-let's start with breakfast.
-first the algorithm would query all breakfasts
-then it would query all ingredients. 

FOOD SAVER MODE: To-do later
-----------------------------
-have to answer the question: given the ingredients i have, what recipes should I use? 
-so that means it'll have to match ingredients i have left with...

REGULAR MODE
------------------------------
-randomly pick recipes that amount to the required # of breakfasts or meal. it can go over, but not under
	-Output: list of recipes to be made for that meal 
-debits recipe ingredients from inventory ingredients
	-Output: Ingredients needed, basically any number in the negatives needs to be ordered/added to grocery list

-any time an essential ingredient is lower than a certain percentage it should be automatically put onto the list. 
*/
import Q from 'q';
import _ from'lodash';
import googleDataStore from '@google-cloud/datastore';
import dataStoreCredentials from './components/datastore';
import inventory from './inventory';
import recipe from './recipes';

//Authentication parameters for Google DataStore
const dataStoreClient = googleDataStore({
    projectId: dataStoreCredentials.projectId,
    keyFilename: dataStoreCredentials.keyFilename
});

const newRecipeKey = dataStoreClient.key('Recipe');

const planRoutes = [{
    //Creates a new meal plan given the specified number of meals required
    path: '/plan',
    method: 'POST',
    handler: (request, reply) => {
        const servings = request.payload;
        createMealPlan(servings.breakfast, servings.lunch, servings.dinner).then((mealPlan) => {
            reply(mealPlan);
        }).catch((err) => {
            reply(err);
        });
    }
}];

/*METHODS*/
const createMealPlan = (breakfast, lunch, dinner) => {
    const deferred = Q.defer();
    var ingredients;
    var recipes;
    var mealPlan;
    //Note: Don't even need to get the inventory unless we build the foodsaver option
    inventory.getAllInventoryQuery()
        .then((inventory) => {
            ingredients = inventory;
            return recipe.getAllRecipes();
        })
        .then((recipes) => {
            recipes = recipes[0]; //results from datastore will always have a seond object in array that isn't needed
            mealPlan = pickRecipes(recipes, breakfast, lunch, dinner);
            deferred.resolve(mealPlan);
        })
        .catch((err) => {
            deferred.reject(err);
        })

    return deferred.promise;
};

const pickRecipes = (recipes, breakfast, lunch, dinner) => {
    var recipesList = recipes;
    var breakfastServings = breakfast;
    var breakfastRecipes = filterRecipes(recipes, "Breakfast");  
    /*
    while (breakfastServings > 0) {
        //add breakfasts to the list
    }
    */ 

    return recipesList;
}

const filterRecipes = (recipeList, mealType) => {
	const filteredRecipeList = [];

	_.forEach(recipeList, function(recipe){
		_.find(recipe.meal, function(meal){
			if(meal===mealType){
				filteredRecipeList.push(recipe); 
			}; 
		});

	});
	return filteredRecipeList; 
} 

module.exports = { planRoutes };