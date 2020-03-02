exports.up = function(knex, Promise) {
    return knex.schema.createTable("students", function(tbl) {
      tbl.increments();
  
      tbl.string("lastname", 355).notNullable();
      tbl.string("firstname", 355).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("students");
  };
  