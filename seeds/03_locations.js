exports.seed = function seed( knex, Promise ) {

    var uuid = require('uuid'); 

    var tableName = 'location';

    var rows = [
        {
            name: 'Shoppers',
            guid: uuid(),
        },
        {
            name: 'Giant',
            guid: uuid(),            
        },
        {
            name: 'Trader Joes',
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