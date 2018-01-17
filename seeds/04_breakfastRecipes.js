exports.seed = function seed(knex, Promise) {

    var uuid = require('uuid');

    var knex = require('knex')({
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'GoOwls!23',
            database: 'local-alfred-database',
            charset: 'utf8',
        }
    });

    var essential_ingredients_id = knex('category').where({
        name: 'Essential Ingredient'
    }).select('id');

    var ingredients_id = knex('category').where({
        name: 'Ingredient'
    }).select('id');

    var location_id = knex('location').where({
        name: 'Shoppers'
    }).select('id');

    var count_id = knex('unit').where({
        name: 'ct'
    }).select('id');

    var cup_id = knex('unit').where({
        name: 'cup'
    }).select('id');

    var tableName = 'inventory';

    var rows = [{
            name: 'Eggs',
            guid: uuid(),
            amountLeft: 3,
            amountTotal: 12,
            expirationDate: "2017-10-10",
            category_id: essential_ingredients_id,
            location_id: location_id,
            unit_id: count_id
        },
        {
            name: 'Avocado',
            guid: uuid(),
            amountLeft: 0,
            amountTotal: 0,
            category_id: ingredients_id,
            location_id: location_id,
            unit_id: count_id
        },
        {
            name: 'English Muffins',
            guid: uuid(),
            amountLeft: 4,
            amountTotal: 8,
            expirationDate: "2017-10-10",
            category_id: ingredients_id,
            location_id: location_id,
            unit_id: count_id
        },
        {
            name: 'Greek Yogurt',
            guid: uuid(),
            amountLeft: 2,
            amountTotal: 4,
            expirationDate: "2017-10-10",
            category_id: ingredients_id,
            location_id: location_id,
            unit_id: cup_id
        }
    ];
    return knex(tableName)
        // Empty the table (DELETE)
        .del()
        .then(function() {
            return knex.insert(rows).into(tableName);
        });

};