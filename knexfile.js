module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/bpDB',
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  testing: {
    client: 'pg',
    connection: "postgresql://localhost/testing",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations",
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};