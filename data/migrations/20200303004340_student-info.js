exports.up = function(knex, Promise) {
    return knex.schema.createTable("student-info", function(tbl) {
      tbl.increments();
      tbl.integer("tasks_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tasks")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("deadline_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("deadlines")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
        tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("student-info");
  };
  
  