exports.up = function(knex) {
    return knex.schema.createTable("tasks", function(tasks) {
        tasks.increments();

        tasks.string("name", 128).unique().notNullable();
        tasks.integer("deadline_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("deadlines")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};
  
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("tasks");
};
