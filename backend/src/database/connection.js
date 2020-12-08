const knex = require('knex');
const { attachPaginate } = require('knex-paginate');
const path = require('path');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true,
});

attachPaginate();

module.exports = db;