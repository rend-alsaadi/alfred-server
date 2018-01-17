exports.seed = function seed(knex, Promise) {

    var uuid = require('uuid');

    var tableName = 'unit';

    var rows = [
        {
            name: 'ct',
            guid: uuid(),
            longUnitName: 'Count'
        },
        {
            name: 'cup',
            guid: uuid(),
            longUnitName: 'Cup'
        },
        {
            name: 'g',
            guid: uuid(),
            longUnitName: 'Gram'
        },
        {
            name: 'kg',
            guid: uuid(),
            longUnitName: 'Kilogram'
        },
        {
            name: 'lb',
            guid: uuid(),
            longUnitName: 'Pound'
        },
        {
            name: 'mL',
            guid: uuid(),
            longUnitName: 'Milliter'
        },
        {
            name: 'oz',
            guid: uuid(),
            longUnitName: 'Ounce'
        },
        {
            name: 'pt',
            guid: uuid(),
            longUnitName: 'Pint'
        },
        {
            name: 'tsp',
            guid: uuid(),
            longUnitName: 'Teaspoon'
        },
        {
            name: 'tbsp',
            guid: uuid(),
            longUnitName: 'Tablespoon'
        },
        {
            name: 'fl.oz',
            guid: uuid(),
            longUnitName: 'Fluid Ounce'
        },
        {
            name: 'gal',
            guid: uuid(),
            longUnitName: 'Gallon'
        },
        {
            name: 'qt',
            guid: uuid(),
            longUnitName: 'Quart'
        },
        {
            name: 'pinch',
            guid: uuid(),
            longUnitName: 'Pinch'
        }
    ];
    return knex('inventory').del().then(function () {
        knex(tableName)
            .del()
            .then(function () {
                return knex.insert(rows).into(tableName);
            });
    });
};