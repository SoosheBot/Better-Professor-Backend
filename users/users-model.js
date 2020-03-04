const db = require("../database/dbConfig");
// const helpers = require("../tasks/tasks-helpers");

module.exports = {
  find,
  findBy,
  findById,
  findUserMessages,
  findUserTasks,
  add,
  update,
  remove
};

function find() {
  const userInfo = {}
  return db("users as u")
  .select("u.id as id", "u.lastname as lastname", "u.firstname as firstname", "u.email as email", "t.id as task id", "t.task as task", "t.due_date as due date", "m.message as message")
  .leftJoin("tasks as t", "t.user_id", "=", "u.id")
  .leftJoin("messages as m", "m.user_id", "=", "u.id")

  //keep this code!
  // .select("u.username as username", "t.task as task")
  // .leftJoin("tasks as t", "t.user_id", "=", "u.id")
  // .then(function(rows) {
  //   rows.forEach(row => {
  //     if (!userInfo[row.username]) {
  //       userInfo[row.username] = {username: row.username, tasks: []}
  //     }
  //     userInfo[row.username].tasks.push(row.task)
  //   })
  //   return Object.values(userInfo)
  // })
  
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

function findUserMessages(userId) {
  return db("users as u")
  .select("u.username as username", "m.message as message")
  .join("messages as m", "m.user_id", "=", "u.id")
  .where("user_id", userId);
};

function findUserTasks(userId) {
  return db("tasks as t")
  .select("u.username as username", "t.task as task")
  .join("users as u", "t.user_id", "=", "u.id")
  .where("user_id", userId);
};

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
