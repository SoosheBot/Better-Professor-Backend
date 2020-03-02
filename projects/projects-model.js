const db = require("../data/dbConfig.js");
const mappers = require("../middleware/mappers");

module.exports = {
  find,
  findBy,
  findById,
  findProjectDeadline,
  add,
  update,
  remove
};

function find() {
  return db("projects").select("id", "name", "deadline");
}

function findBy(filter) {
  return db("projects")
    .select("name", "deadline")
    .where(filter);
}

function findById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function findProjectDeadline(projectId) {
    return db("students")
    .where("project_id", projectId)
    .then(students => students.map(student => mappers.projectToBody(student)));
  }

  function add(project) {
    return db("projects")
      .insert(project, "id")
      .then(([id]) => find(id));
  }

function update(changes, id) {
  return db("projects", "id")
    .where({ id })
    .update(changes, "*")
    .then(count => findById(id));
}

function remove(id) {
  return db("projects")
    .where({ id })
    .del();
}
