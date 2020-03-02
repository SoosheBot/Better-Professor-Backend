exports.up = function(knex, Promise) {
  return knex.schema.createTable("tasks", function(tbl) {
    tbl.increments();

    tbl
      .string("name", 128)
      .unique()
      .notNullable();
    tbl
      .integer("deadline_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("deadlines")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("student_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("student")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tasks");
};
