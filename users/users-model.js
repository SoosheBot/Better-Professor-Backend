const db = require("../database/dbConfig");
// const helpers = require("../tasks/tasks-helpers");

module.exports = {
  find,
  findBy,
  findById,
  findUserMessages,
  findUserStudents,
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
  .select("u.lastname as lastname", "u.firstname as firstname", "m.message as message")
  .join("messages as m", "m.professor_id", "=", "u.professor_id")
  .where("professor_id", userId);
};

function findUserStudents(id) {
  return db("students as s")
  .select("s.id as student id", "s.lastname as lastname", "s.firstname as firstname", "s.email as email", "u.firstname as professor", "u.professor_id as professor_id")
  .join("users as u", "s.professor_id", "=", "u.professor_id")
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
