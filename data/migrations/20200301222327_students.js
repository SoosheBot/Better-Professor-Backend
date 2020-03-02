exports.up = function(knex) {
    return knex.schema.createTable("students", function(students) {
      students.increments();
  
      students.string("lastname", 355).notNullable();
      students.string("firstname", 355).notNullable();
      students
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
  
      students.string("messages");
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("students");
  };
  