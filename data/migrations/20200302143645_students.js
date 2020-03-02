exports.up = function(knex) {
    return knex.schema.createTable("students", function(students) {
      students.increments();
  
      students.string("lastname", 355).notNullable();
      students.string("firstname", 355).notNullable();
    
  
      students.string("messages");
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("students");
  };
  