const faunadb = require('faunadb');
const q = faunadb.query;
SECRET_KEY = process.env.SECRET_KEY;

const clientQuery = new faunadb.Client({
  secret: process.env.SECRET_KEY
})

module.exports = { clientQuery, q };