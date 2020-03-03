exports.up = function(knex, Promise) {
  return knex.schema.createTable("tasks", tbl => {
    tbl.increments();
    tbl
      .integer("deadline_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("deadlines")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    tbl.text("name", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tasks");
};
