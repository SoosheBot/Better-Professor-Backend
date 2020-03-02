exports.up = function(knex) {
    return knex.schema.createTable("projects", function(projects) {
        projects.increments();

        projects.string("name", 128).notNullable();
        projects.date("deadline").notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("projects");
};
