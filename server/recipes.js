import Q from 'q';
import googleDataStore from '@google-cloud/datastore'
import dataStoreCredentials from './components/datastore';
import bulkRecipes from './../datastore_seeds/recipe_seeds';

//Authentication parameters for Google DataStore
const dataStoreClient = googleDataStore({
    projectId: dataStoreCredentials.projectId,
    keyFilename: dataStoreCredentials.keyFilename
});

const newRecipeKey = dataStoreClient.key('Recipe');

const recipeRoutes = [
    //Gets all recipes
    {
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        path: '/recipe',
        method: 'GET',
        handler: (request, reply) => {
            getAllRecipes().then((recipes) => {
                reply(recipes);
            }).catch((err) => {
                reply(err);
            })
        }
    },
    //Adds a new recipe
    {
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        path: '/recipe',
        method: 'POST',
        handler: (request, reply) => {
            const newRecipe = {
                recipeName: request.payload.recipeName,
                servings: request.payload.servings,
                ingredients: request.payload.ingredients,
                prepTime: request.payload.prepTime,
                directions: request.payload.directions,
                mealType: request.payload.mealType,
                amountOfTimesMade: request.payload.amountOfTimesMade,
                season: request.payload.season
            }

            const newRecipeEntity = {
                key: newRecipeKey,
                data: newRecipe
            }
            /*
            TODO
            	1. Make sure that recipe name doesn't already exist before adding the new one. 
            */
            //Insert new recipe to DataStore
            dataStoreClient.insert(newRecipeEntity).then((results) => {
                reply(results);
            }).catch((err) => {
                reply(err);
            });
        }
    },
    //Bulk insert recipes
    {
        path: '/bulkInsertRecipes',
        method: 'GET',
        handler: (request, reply) => {
            const bulkEntities = [];
            bulkRecipes.forEach((recipe) => {
                bulkEntities.push({
                    key: newRecipeKey,
                    data: recipe
                });
            });
            dataStoreClient.upsert(bulkEntities).then((result) => {
                reply(result);
            }).catch((err) => {
                reply(err);
            })
        }
    }

];

const getAllRecipes = () => {
    const deferred = Q.defer();

    const recipeQuery = dataStoreClient.createQuery('Recipe');
    dataStoreClient.runQuery(recipeQuery).then((results) => {
        deferred.resolve(results);
    }).catch((err) => {
        deferred.reject(err);
    });

    return deferred.promise;
}

module.exports = { recipeRoutes, getAllRecipes };