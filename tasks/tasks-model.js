const db = require("../data/dbConfig.js");
const mappers = require("../middleware/mappers");

module.exports = {
  find,
  findBy,
  findById,
  findDeadline,
  add,
  update,
  remove
};

function find() {
  return db("tasks");
}

function findBy(filter) {
  // return db("tasks as t")
  //   .select("t.name as name", "d.due_date as due_date" )
  //   .join("deadlines as d", "t.deadline_id", "=", "d.id")
  //   .where(filter);
  return db("tasks")
    .select("*")
    .where(filter);
}

function findById(id) {
  return db("tasks")
    .where({ id })
    .first();
}

function findDeadline(deadlineId) {
  return db("tasks")
    .where("deadline_id", deadlineId)
    .then(tasks => tasks.map(task => mappers.taskToBody(task)));
}

function add(task) {
  return db("tasks")
    .insert(task, "id")
    .then(([id]) => find(id));
}

function update(changes, id) {
  return db("tasks", "id")
    .where({ id })
    .update(changes, "*")
    .then(count => findById(id));
}

function remove(id) {
  return db("tasks")
    .where({ id })
    .del();
}
