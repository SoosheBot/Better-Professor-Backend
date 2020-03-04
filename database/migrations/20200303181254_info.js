exports.up = function(knex, Promise) {
    return knex.schema.createTable("info", function(info) {
        info
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");  
        info
        .integer("task_id")
        .references("id")
        .inTable("tasks")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");  
  
    info
        .integer("deadline_id")
        .references("id")
        .inTable("deadlines")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");  
    })
};

exports.down = function(knex) {
  
};
