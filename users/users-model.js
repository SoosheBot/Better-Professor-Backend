const db = require('../data/dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

function find() {
  return db('users').select('id', 'username', 'lastname', 'firstname', 'password', 'email');
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users')
    .select('id', 'lastname', 'firstname', 'password', 'email')
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