const db = require("../data/dbConfig");
const helpers = require("../middleware/mappers");

module.exports = {
  find,
  findBy,
  findById,
  findTasks,
  add,
  update,
  remove
};

function find() {
  return db("students");
}

function findBy(filter) {
  return db("students")
    .select("*")
    .where(filter);
}

function findById(id) {
  return db("students")
    .where({ id })
    .first();
}

function findTasks(id) {
  return db("students as s")
  .join("tasks as t", "s.task_id", "=", "t.id" )
  .select("s.lastname", "s.firstname", "t.name", "t.due_date")
  .where("task_id", id)
  .then(tasks => tasks.map(task => mappers.taskToBody(task)));
}

function add(student) {
  return db("students")
    .insert(student, "id")
    .then(([id]) => find(id));
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