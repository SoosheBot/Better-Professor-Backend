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
  .select("u.id as id", "u.lastname as lastname", "u.firstname as firstname", "u.email as email", "m.message as message", "s.lastname as student lastname", "s.student_id as student id")
  .leftJoin("tasks as t", "t.professor_id", "=", "u.id")
  .leftJoin("messages as m", "m.message_id", "=", "u.message_id")
  .leftJoin("students as s", "s.professor_id", "=", "u.id")

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
  .join("messages as m", "m.professor_id", "=", "u.id")
  .where("professor_id", userId);
};

function findUserStudents(userId) {
  return db("students as s")
  .select("s.id as student id", "s.lastname as lastname", "s.firstname as firstname", "s.email as email", "u.firstname as professor", "u.id as professor_id")
  .join("users as u", "s.professor_id", "=", "u.id")
  .where("s.professor_id", userId)
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
