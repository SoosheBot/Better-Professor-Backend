const db = require("../database/dbConfig");

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove
};

function find() {
    return db("deadlines");
  }

  function add(deadline) {
    return db("deadlines")
      .insert(deadline, "id")
      .then(([id]) => find(id));
  }

  function findBy(filter) {
    return db("deadlines")
      .select("*")
      .where(filter);
  }

  function findById(id) {
    return db("deadlines")
      .where({ id })
      .first();
  }

  function update(changes, id) {
    return db("deadlines", "id")
      .where({ id })
      .update(changes, "*")
      .then(count => findById(id));
  }

  function remove(id) {
    return db("deadlines")
      .where({ id })
      .del();
  }

