exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl.string("lastname", 128).notNullable();
      tbl.string("firstname", 128).notNullable();
      tbl.string("username", 128).notNullable();
      tbl.string("password", 128).notNullable();
      tbl
        .string("email", 128)
        .notNullable()
        .unique();
      tbl.string("role").defaultTo("user");
    })

    .createTable("tasks", tbl => {
      tbl.increments();
      tbl.text("task", 128).notNullable();
      tbl
        .integer("professor_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .date("due_date")
        .notNullable()
        .defaultTo("2020-12-12");
    })

    .createTable("messages", tbl => {
      tbl.increments();
      tbl
        .text("message")
        .notNullable()
        .unique();
      tbl
        .integer("professor_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("task_id")
        .references("id")
        .inTable("tasks")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("students", tbl => {
      tbl.increments();
      tbl.string("lastname", 128).notNullable();
      tbl.string("firstname", 128).notNullable();
      tbl.string("username", 128).notNullable();
      tbl.string("password", 128).notNullable();
      tbl
        .string("email", 128)
        .notNullable()
        .unique();
      tbl
        .integer("task_id")
        .references("id")
        .inTable("tasks")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("professor_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("professor_message")
        .references("id")
        .inTable("messages")
        // .onDelete("CASCADE")
        // .onUpdate("CASCADE");
      tbl
        .integer("student_message")
        .references("id")
        .inTable("messages")
        // .onDelete("CASCADE")
        // .onUpdate("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("students")
    .dropTableIfExists("messages")
    .dropTableIfExists("tasks")
    .dropTableIfExists("users");
};
