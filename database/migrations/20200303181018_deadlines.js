exports.up = function(knex, Promise) {
    return knex.schema.createTable("deadlines", function(deadlines) {
      deadlines.increments();
      deadlines.date("due_date").notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("deadlines");
  };
  