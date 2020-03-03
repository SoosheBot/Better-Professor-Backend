exports.up = function(knex, Promise) {
    return knex.schema.createTable("tasks", function(tbl) {
      tbl.increments();
      tbl
        .string("name", 128)
        .unique()
        .notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("tasks");
  };