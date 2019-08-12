
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { VIN: '12345', make: 'Toyota', model: 'Camry', mileage: 100000},
        { VIN: '23456', make: 'Ford', model: 'F150', mileage: 50000},
        { VIN: '34567', make: 'Tesla', model: 'S', mileage: 10000}
      ]);
    });
};
