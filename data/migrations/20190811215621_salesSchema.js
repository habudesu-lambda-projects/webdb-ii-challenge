
exports.up = function(knex) {
  return knex.schema.createTable('sales', (tbl) => {
    tbl.increments('id')
    tbl.integer('carId').references('id').inTable('cars')
    tbl.real('price')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sales')
};
