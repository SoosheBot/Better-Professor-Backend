exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", tbl => {
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
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users");
  };
  