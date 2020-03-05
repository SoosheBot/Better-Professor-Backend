const db = require("../database/dbConfig");
// const helpers = require("../tasks/tasks-helpers");

module.exports = {
  find,
  findBy,
  findById,
  findUserMessages,
  findUserInfo,
  add,
  update,
  remove
};

function find() {
  const userInfo = {}
  return db("users as u")
  .select("u.id as id", "u.lastname as lastname", "u.firstname as firstname", "u.email as email", "s.lastname as student lastname", "s.id as student id")
  .leftJoin("tasks as t", "t.professor_id", "=", "u.id")
  .leftJoin("messages as m", "m.message_id", "=", "u.id")
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
  // const userInfo = {}
  return db("users as u")
  .select("u.lastname as lastname", "u.firstname as firstname", "m.message as message", "m.created_at as message sent", "m.updated_at as message updated")
  .join("messages as m", "m.professor_id", "=", "u.id")
  .where("professor_id", userId);
  // .leftJoin("tasks as t", "t.student_id", "=", "s.id")
  //   .then(function(rows) {
  //     rows.forEach(row => {
  //       if (!userInfo[row.firstname]) {
  //         userInfo[row.firstname] = { firstname: row.firstname, tasks: [] };
  //       }
  //       userInfo[row.firstname].tasks.push(row.task);
  //     });
  //     return Object.values(userInfo);
  //   });
};

function findUserInfo(userId) {
  return db("students as s")
  .select("s.id as student id", "s.lastname as lastname", "s.firstname as firstname", "s.email as email", "u.firstname as professor firstname")
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
