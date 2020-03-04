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
    return db("messages");
  }

  function add(message) {
    return db("messages")
      .insert(message, "id")
      .then(([id]) => find(id));
  }

  function findBy(filter) {
    return db("messages")
      .select("*")
      .where(filter);
  }

  function findById(id) {
    return db("messages")
      .where({ id })
      .first();
  }

  function update(changes, id) {
    return db("messages", "id")
      .where({ id })
      .update(changes, "*")
      .then(count => findById(id));
  }

  function remove(id) {
    return db("messages")
      .where({ id })
      .del();
  }

