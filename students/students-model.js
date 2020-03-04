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
  return db("students as s")
  .select("u.id as id", "u.lastname as lastname", "u.firstname as firstname", "u.email as email", "t.id as task id", "t.task as task", "t.due_date as due date", "t.message as message")
  .leftJoin("tasks as t", "t.user_id", "=", "u.id")

  //keep this code!
  // .select("u.username as ssername", "t.task as task")
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
  return db("students")
    .where(filter)
    .first();
}

function findById(id) {
  return db("students")
    .where("id", id)
    .first();
}

function findStudentMessages(studentId) {
  return db("students as s")
  .select("u.id as id", "u.lastname as lastname", "u.firstname as firstname", "t.message as message")
  .join("tasks as t", "t.user_id", "=", "u.id")
  .where("user_id", studentId);
};

function findStudentTasks(studentId) {
  return db("tasks as t")
  .select("u.id as id", "u.lastname as lastname", "u.firstname as firstname", "t.task as task")
  .join("students as s", "t.user_id", "=", "u.id")
  .where("user_id", userId);
};

async function add(student) {
  const [id] = await db("students").insert(student, "id");
  return findById(id);
}

function update(id, changes) {
  return db("students")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("students")
    .where({ id })
    .del();
}
