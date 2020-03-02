exports.up = function(knex,Promise) {
    return knex.schema.createTable("deadlines", function(deadlines) {
        deadlines.increments();

        deadlines.string("name", 128).unique().notNullable();
        deadlines.date("due_date").notNullable();
    });
};

exports.down = function(knex,Promise) {
    return knex.schema.dropTableIfExists("deadlines");
  };
  