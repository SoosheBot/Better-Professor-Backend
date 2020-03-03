const db = require("../data/dbConfig.js");
const helpers = require("./tasks-helpers");

module.exports = {
  find,
  findBy,
  findById,
  findTaskDeadline,
  add,
  update,
  remove
};

function find() {
  return db("tasks as t")
  .select("t.name as name", "d.due_date as due date")
  .join("deadlines as d", "t.deadline_id", "=", "d.id")
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

function findTaskDeadline(deadlineId) {
    return db("tasks")
      .where("deadline_id", deadlineId)
      .then(tasks => tasks.map(task => helpers.actionToBody(task)));
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
};

function remove(id) {
  return db("tasks")
    .where({ id })
    .del();
}
