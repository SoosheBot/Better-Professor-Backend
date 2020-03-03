const db = require('../data/dbConfig');

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove
};

function find() {
  return db('users').select("id", "username", "is_admin");
}

function findBy(filter) {
  return db('users').where(filter).first();
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id');
  return findById(id);
}

function update(changes, id) {
  return db("users", "id")
  .where({ id })
  .update(changes, "*")
  .then(count => findById(id));
}

function remove(id) {
  return db('users')
    .where('id', Number(id))
    .del();
}