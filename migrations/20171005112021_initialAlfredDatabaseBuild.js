
exports.up = function(knex, Promise) {
    return knex
            .schema
            //Category of inventory (e.g. essential imgredients, household items)
            .createTable( 'category', function( categoryTable ) {

                // Primary Key
                categoryTable.increments('id').primary;

                // Data
                categoryTable.string( 'guid', 50 ).notNullable().unique();               
                categoryTable.string( 'name', 50 ).notNullable().unique(); 
            })

            //unit of measure for each piece of inventory (e.g. lbs, fluid oz)
            .createTable( 'unit', function( unitTable ) {

                // Primary Key
                unitTable.increments('id').primary();

                // Data
                unitTable.string( 'guid', 50 ).notNullable().unique();               
                unitTable.string( 'name', 50 ).notNullable().unique();
            })

            .createTable( 'location' , function( locationTable ){

            	//Primary Key
            	locationTable.increments('id').primary(); 

            	//Data
            	locationTable.string('guid', 50).notNullable().unique(); 
                locationTable.string( 'name', 50 ).notNullable().unique();          	
            })

            .createTable('inventory', function (inventoryTable){

            	//Primary and foreign keys
            	inventoryTable.increments('id').primary(); 
            	inventoryTable.integer('category_id').unsigned()
            	inventoryTable.foreign('category_id').references('category.id');

            	inventoryTable.integer('location_id').unsigned();
            	inventoryTable.foreign('location_id').references('location.id');

            	inventoryTable.integer('unit_id').unsigned();
            	inventoryTable.foreign('unit_id').references('unit.id'); 

            	//Data
            	inventoryTable.string('guid', 50).notNullable().unique(); 
                inventoryTable.string( 'name', 50 ).notNullable().unique();
                inventoryTable.float('amountLeft'); 
                inventoryTable.float('amountTotal'); 
                inventoryTable.date('expirationDate'); 

            });
  
};

exports.down = function(knex, Promise) {

    return knex
        .schema
            .dropTableIfExists( 'categoryTable' )
            .dropTableIfExists( 'unitTable' )	
            .dropTableIfExists('locationTable')
            .dropTableIfExists('inventoryTable'); 
};
