exports.up = function (knex) {
  return knex.schema.createTable('secrets', (table) => {
    table.increments('id').primary();
    table.string('name', 24).notNullable();
    table.string('secret', 256).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('secrets');
};
