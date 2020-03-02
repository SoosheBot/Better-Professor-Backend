exports.up = function(knex) {
    return knex.schema.createTable("deadlines", function(deadlines) {
        deadlines.increments();

        deadlines.string("name", 128).unique().notNullable();
        deadlines.date("due_date").notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("deadlines");
  };
  