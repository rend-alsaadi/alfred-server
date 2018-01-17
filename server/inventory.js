import Knex from './knex';
import GUID from 'uuid';
import Q from 'q';
import { request } from 'https';

const inventoryRoutes = [{
    //Gets all inventory
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    path: '/inventory',
    method: 'GET',
    handler: (request, reply) => {
        request.query.updates === undefined ? reply(getAllInventoryQuery()) : reply(getIngredientByParam(JSON.parse(request.query.updates)));
    }
},
{
    //Adds a new inventory item
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    path: '/inventory',
    method: 'POST',
    handler: (request, reply) => {
        //set all variables
        const name = request.payload.name;
        const amountTotal = request.payload.amountTotal;
        const amountLeft = request.payload.amountLeft;
        const expirationDate = request.payload.expirationDate;
        const category_id = request.payload.category_id;
        const unit_id = request.payload.unit_id;
        const location_id = request.payload.location_id;
        const guid = GUID();

        const postInventory = Knex.insert([{
            name: name,
            amountTotal: amountTotal,
            amountLeft: amountLeft,
            expirationDate: expirationDate,
            guid: guid
        }]).table('inventory')
            .then((inventory) => {
                reply(inventory);
            })
            .catch((err) => {
                reply('server-side error');
            });
    }
},
{
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    path: '/units',
    method: 'GET',
    handler: (request, reply) => {
        request.query.updates === undefined ? null : reply(getUnitByParam(JSON.parse(request.query.updates)));
    }
}
];

/*METHODS*/
const getAllInventoryQuery = () => {
    var deferred = Q.defer();

    Knex('inventory')
        .join('category', 'inventory.category_id', '=', 'category.id')
        .join('location', 'inventory.location_id', '=', 'location.id')
        .join('unit', 'inventory.unit_id', '=', 'unit.id')
        .select('inventory.id', 'inventory.name', 'inventory.expirationDate', 'inventory.amountLeft', 'inventory.amountTotal',
        'inventory.guid', 'category.name as categoryName', 'category.id as category_id',
        'location.name as locationName', 'location.id as location_id',
        'unit.name as unitName', 'unit.id as unit_id')
        .then((inventory) => {
            deferred.resolve(inventory);
        }).catch((err) => {
            deferred.reject(err);
        });

    return deferred.promise;
};

const getUnitByParam = (parsedUrlParams) => {
    var deferred = Q.defer();

    Knex('unit').where('name', 'like', '%' + parsedUrlParams.value + '%')
        .then((units) => {
            deferred.resolve(units)
        })
        .error((err) => {
            deferred.reject(err)
        })
        .catch((err) => {
            deferred.reject(err)
        });

    return deferred.promise;
}

const getIngredientByParam = (parsedUrlParams) => {
    var deferred = Q.defer();

    Knex('inventory').where('name', 'like', '%' + parsedUrlParams.value + '%')
    .then((inventory) => {
        deferred.resolve(inventory)
    })
    .error((err) => {
        deferred.reject(err)
    })
    .catch((err) => {
        deferred.reject(err)
    });

    return deferred.promise; 
}

module.exports = { inventoryRoutes, getAllInventoryQuery }; 