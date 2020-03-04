exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("deadlines", tbl => {
      tbl.increments();
      tbl.date("due_date").notNullable().defaultTo("2020-12-12");
    })

    .createTable("tasks", tbl => {
      tbl.increments();
      tbl.text("task", 128).notNullable();
      tbl
        .integer("deadline_id")
        .references("id")
        .inTable("deadlines")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("users", tbl => {
      tbl.increments();
      tbl.string("lastname", 128).notNullable();
      tbl.string("firstname", 128).notNullable();
      tbl.string("username", 128).notNullable();
      tbl.string("password", 128).notNullable();
      tbl
        .string("email", 128).notNullable()
        .unique();
      tbl.string("role").defaultTo("user");
      tbl
        .integer("task_id")
        .references("id")
        .inTable("tasks")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("deadline_id")
        .references("id")
        .inTable("deadlines")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("info", tbl => {
      tbl.increments();
      tbl
        .integer("deadline_id")
        .references("id")
        .inTable("deadlines")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("task_id")
        .references("id")
        .inTable("tasks")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("info")
    .dropTableIfExists("users")
    .dropTableIfExists("tasks")
    .dropTableIfExists("deadlines");
};
