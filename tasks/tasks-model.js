const db = require("../database/dbConfig");

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("tasks as t")
    .select(
      "s.firstname as firstname",
      "t.task as task",
      "t.due_date as due date", "u.id as professor id", "u.firstname as professor firstname"
    )
    .join("students as s", "t.student_id", "=", "s.id")
    .join("users as u", "t.professor_id", "=", "u.id");
}

function findBy(filter) {
  return db("tasks")
  .where(filter);
}

function findById(id) {
  return db("tasks")
    .where({ id })
    .first();
}

function add(task) {
  return db("tasks")
    .insert(task, "id")
    .then(([id]) => find(id));
}

function update(id, changes) {
  return db("tasks")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("tasks")
    .where({ id })
    .del();
}
