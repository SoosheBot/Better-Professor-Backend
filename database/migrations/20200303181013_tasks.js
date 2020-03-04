exports.up = function(knex, Promise) {
    return knex.schema.createTable("tasks", function(tasks) {
      tasks.increments();
      tasks.text("task", 128).notNullable(); 
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("tasks");
  };
  