exports.seed = function seed( knex, Promise ) {

    var uuid = require('uuid'); 

    var tableName = 'category';

    var rows = [
        {
            name: 'Essential Ingredient',
            guid: uuid(),
        },
        {
            name: 'Ingredient',
            guid: uuid(),            
        },
        {
            name: 'Snack',
            guid: uuid(),            
        },
        {
            name: 'Spice',
            guid: uuid(),            
        },                
        {
            name: 'Household Item',
            guid: uuid(),            
        }        

    ];

    return knex( tableName )
        // Empty the table (DELETE)
        .del()
        .then( function() {
            return knex.insert( rows ).into( tableName );
        });

};