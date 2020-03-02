const db = require("../data/dbConfig");
const helpers = require("../middleware/mappers");

module.exports = {
  find,
  findBy,
  findById,
  findStudentProjects,
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

function findStudentProjects(studentId) {
  return db("projects")
  .where("student_id", studentId)
  .then(projects => projects.map(project => mappers.projectToBody(project)));
}

function add(student) {
  return db("students")
    .insert(student)
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