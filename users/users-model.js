const db = require("../data/dbConfig");
const helpers = require("../tasks/tasks-helpers");
module.exports = {
  find,
  findBy,
  findById,
  findDeadlines,
  add,
  update,
  remove
};

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

function findById(id) {
  return db("student-info as si")
    .select("u.lastname as lastname", "u.firstname as firstname", "t.name as task_name", "d.due_date as due date")
    .join("tasks as t", "si.tasks_id", "=", "t.id")
    .join("deadlines as d", "si.deadline_id", "=", "d.id")
    .join("users as u", "si.user_id", "=", "u.id")
    .where({ id })
    .first();
}

function findDeadlines(deadlineId) {
  return db("student-info as si")
    .select("u.lastname as lastname", "u.firstname as firstname", "d.due_date as deadlines")
    .join("deadlines as d", "d.id", "=", "si.deadline_id")
    .join("users as u", "u.id", "=", "si.user_id")
    .where("deadline_id", deadlineId)
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return findById(id);
}

function update(id, changes) {
  return db("users")
  .where({ id })
  .update(changes);
};

function remove(id) {
  return db("users")
    .where("id", Number(id))
    .del();
}
