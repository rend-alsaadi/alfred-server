
exports.up = function (knex, Promise) {
    return knex.schema.table('unit', function (table) {
        table.string('longUnitName');
    })

};

exports.down = function (knex, Promise) {
    return knex.schema.hasColumn('unit', 'longUnitName')
        .then(function (exists) {
            knex.schema.table('units', function (table) {
                table.dropColumn('longUnitName');
            });
        });
};
