const db = require("../database/dbConfig");
// const helpers = require("../tasks/tasks-helpers");

module.exports = {
  find,
  findBy,
  findById,
  findMessages,
  findTasks,
  add,
  update,
  remove
};

function find() {
  const userInfo = {}
  return db("students as s")
  .select("s.id as id", "s.lastname as lastname", "s.firstname as firstname", "s.email as email", "t.id as task id", "t.task as task", "t.due_date as due date")
  .leftJoin("tasks as t", "t.student_id", "=", "s.id")
 

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

function findMessages(profMessage) {
  return db("students as s")
  .select("s.id as id", "s.lastname as lastname", "s.firstname as firstname", "m.message as message")
  .join("messages as m", "s.professor_message", "=", "m.id")
  .where("professor_message", profMessage);
};


function findTasks(taskId) {
  return db("tasks as t")
  .select("s.id as id", "s.lastname as lastname", "s.firstname as firstname", "t.task as task", "t.due_date as due date")
  .join("students as s", "s.task_id", "=", "t.task_id")
  .where("task_id", taskId);
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
