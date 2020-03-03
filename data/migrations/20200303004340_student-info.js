exports.up = function(knex, Promise) {
    return knex.schema.createTable("student-info", function(tbl) {
      tbl.increments();
  
      // this table will house tasks, deadlines, and users
    });
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("student-info");
  };
  
  