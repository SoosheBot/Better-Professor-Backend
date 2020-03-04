const db = require("../database/dbConfig");
// const helpers = require("../tasks/tasks-helpers");

module.exports = {
  find,
  findBy,
  findById,
  // findDeadlines,
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
  return db("users")
    .where("id", id)
    .first();
}

// function findDeadlines(deadlineId) {
//   return db("users")
//     // .select("u.lastname as lastname", "u.firstname as firstname", "d.due_date as due date")
//     // .join("deadlines as d", "d.id", "=", "si.deadline_id")
//     // .join("users as u", "u.id", "=", "si.user_id")
//     .where("deadline_id", deadlineId)
//     .then(users => users.map(user => helpers.actionToBody(user)));
// }

async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return findById(id);
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}
