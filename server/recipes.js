import Q from 'q';
import dataStoreCredentials from './components/datastore';
import bulkRecipes from './../datastore_seeds/recipe_seeds';
const Recipe = require('../models/recipe.model');

//Authentication parameters and keys for Google DataStore
const gstore = require('gstore-node')();
const dataStoreClient = require('@google-cloud/datastore')({
    projectId: dataStoreCredentials.projectId,
    keyFilename: dataStoreCredentials.keyFilename
});
gstore.connect(dataStoreClient);
const newRecipeKey = dataStoreClient.key('Recipe','');


/******ROUTES********/
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
    //Adds a new recipe or updates it if an id is provided
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
            /*
            TODO
            	1. Make sure that recipe name doesn't already exist before adding the new one. 
            */
            dataStoreClient.upsert(createEntity(request.payload)).then((results) => {
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

    Recipe.query().run().then(results => {
        deferred.resolve(results);
    }).catch((err) => {
        deferred.reject(err);
    });

    return deferred.promise;
}

//function below could be a app-wide service later on
const createEntity = (payload) => {
    const entity = {
        key: dataStoreClient.key([payload.entityType,parseInt(payload.id)]),
        data: payload.data
    }
    return entity
}

module.exports = { recipeRoutes, getAllRecipes };