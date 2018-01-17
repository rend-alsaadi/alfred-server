
exports.up = function (knex, Promise) {
    return knex.schema.table('unit', function (table) {
        table.renameColumn("name", "abbreviation");
        table.renameColumn("longUnitName", "name"); 
    })

};

exports.down = function (knex, Promise) {

};
