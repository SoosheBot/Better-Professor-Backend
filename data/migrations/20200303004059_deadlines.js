exports.up = function(knex, Promise) {
    return knex.schema.createTable("deadlines", function(tbl) {
      tbl.increments();
  
      tbl
        .string("name", 128)
        .notNullable();
      tbl.date("due_date").notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("deadlines");
  };