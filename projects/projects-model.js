const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
//   findDeadline,
  add,
  update,
  remove
};

function find() {
  return db("projects").select("project name", "project deadline");
}

function findBy(filter) {
  return db("projects")
    .select("project name", "project deadline")
    .where(filter);
}

function findById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function add(project) {
  return db("projects")
    .insert(project)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
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
