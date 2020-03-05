const db = require("../database/dbConfig");


module.exports = {
  find,
  findBy,
  findById,
  findMessages,
  findTasks,
  findStudentInfo,
  add,
  update,
  remove
};

function find() {
  const userInfo = {};
  return db("students as s")
    .select(   
      "s.lastname as lastname",
      "s.firstname as firstname",
      "s.email as email",
      "s.id as student_id",
      "t.task as task",
      "t.id as task_id",
      "t.due_date as due_date"
    )
    .join("tasks as t", "t.student_id", "=", "s.id")

    // .leftJoin("tasks as t", "t.student_id", "=", "s.id")
    // .then(function(rows) {
    //   rows.forEach(row => {
    //     if (!userInfo[row.lastname]) {
    //       userInfo[row.lastname] = { lastname: row.lastname, tasks: [] };
    //     }
    //     userInfo[row.lastname].tasks.push(row.task);
    //   });
    //   return Object.values(userInfo);
    // });
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
  return db("messages as m")
    .select("s.id as id",
    "s.firstname as firstname",
    "m.message as message from prof", "m.created_at as message sent", "m.updated_at as message updated")
    .join("students as s", "m.student_id", "=", "s.id")
    .where("student_id", profMessage);
}

function findTasks(studentId) {
  return db("students as s")
    .select(
      "s.id as id",
      "s.lastname as lastname",
      "s.firstname as firstname",
      "t.task as task",
      "t.due_date as due_date"
    )
    .join("tasks as t", "t.student_id", "=", "s.id")
    .where("student_id", studentId);
}

function findStudentInfo(profId) {
  return db("students as s")
  .select("s.id as student_id", "s.lastname as lastname", "s.firstname as firstname")
  .join("users as u", "s.professor_id", "=", "u.id")
  .where("s.professor_id", profId)
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
