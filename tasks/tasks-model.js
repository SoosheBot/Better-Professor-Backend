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
  return db("tasks")
    // .select("t.task as task", "d.due_date as due date")
    // .join("deadlines as d", "t.deadline_id", "=", "d.id");
}

function findBy(filter) {
  return ("tasks as t")
    // .select("t.task as task", "d.due_date as due date")
    // .join("deadlines as d", "t.deadline_id", "=", "d.id")
    .where(filter);
}

function findById(id) {
  return db("tasks as t")
    // .select("t.task as task", "d.due_date as due date")
    // .join("deadlines as d", "t.deadline_id", "=", "d.id")
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
