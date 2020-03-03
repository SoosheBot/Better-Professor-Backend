const db = require("../data/dbConfig.js");


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