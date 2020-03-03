exports.up = function(knex, Promise) {
    return knex.schema.createTable("deadlines", function(tbl) {
      tbl.increments();
      tbl.date("due_date").notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("deadlines");
  };