const db = require("../data/dbConfig.js");
const mappers = require("../middleware/mappers");

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
  return db("tasks").select("id", "name", "deadline");
}

function findBy(filter) {
  return db("tasks")
    .select("name", "deadline")
    .where(filter);
}

function findById(id) {
  return db("tasks")
    .where({ id })
    .first();
}

function findTaskDeadline(taskId) {
    return db("students")
    .where("task_id", taskId)
    .then(students => students.map(student => mappers.taskToBody(student)));
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
