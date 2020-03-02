exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", function(tbl) {
    tbl.increments();

    tbl.string("lastname", 355).notNullable();
    tbl.string("firstname", 355).notNullable();
    tbl
      .integer("tasks_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("tasks")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("messages");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students");
};
