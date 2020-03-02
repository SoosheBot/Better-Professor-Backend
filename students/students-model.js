const db = require("../data/dbConfig");

module.exports = {
  find,
  findBy,
  findById,
  // findProjects,
  add,
  update,
  remove
};

function find() {
  return db("students").select("username", "projects");
}

function findBy(filter) {
  return db("students")
    .select("username", "projects")
    .where(filter);
}

function findById(id) {
  return db("students")
    .where({ id })
    .first();
}


function add(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function update(changes, id) {
    return db("students", "id")
    .where({ id })
    .update(changes, "*")
    .then(count => findById(id));
}

function remove(id) {
    return db("students")
    .where({ id })
    .del();
}