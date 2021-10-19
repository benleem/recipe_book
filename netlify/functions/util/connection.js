import { config } from "../../../config";
const faunadb = require('faunadb');
const q = faunadb.query

const clientQuery = new faunadb.Client({
  secret: config.SECRET_KEY
});

module.exports = { clientQuery, q };