exports.up = function(knex,Promise) {
    return knex.schema.createTable("students", function(students) {
      students.increments();
  
      students.string("lastname", 355).notNullable();
      students.string("firstname", 355).notNullable();
      students.integer("tasks_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tasks")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
  
      students.string("messages");
    });
  };
  
  exports.down = function(knex,Promise) {
    return knex.schema.dropTableIfExists("students");
  };
  