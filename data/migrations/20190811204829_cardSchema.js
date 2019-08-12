
exports.up = function(knex) {
  return knex.schema.createTable('cars', (tbl) => {
    tbl.increments('id')
    tbl.text('VIN').notNullable()
    tbl.text('make').notNullable()
    tbl.text('model').notNullable()
    tbl.integer('mileage').notNullable()
    tbl.text('transmissionType')
    tbl.text('titleStatus')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
