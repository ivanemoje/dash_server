const bodyParser = require('body-parser');
const express = require("express");
const mysql = require ('mysql');
const knex = require ('knex');
const cors = require ('cors');

const app = express();
const port = 3000;

const config = require ('./config.json')
const manifest = require ('./controllers/manifest');
const account = require ('./controllers/accountDetail');

app.use (cors());

app.use(bodyParser.urlencoded({
  limit: '200mb', extended: true
}));

app.use(bodyParser.json({ limit: "50mb" }));

const db = knex ({
  client: config.knex.client,
  connection: {
    host: config.knex.host,
    user: config.knex.user,
    password: config.knex.password,
    database : config.knex.database
  }
});

const pool  = mysql.createPool({
  connectionLimit: 100,
  host: config.sqlconfig.host,
  user: config.sqlconfig.user,
  password: config.sqlconfig.password,
  database : config.sqlconfig.database
});

app.listen(port, '0.0.0.0', () => {  console.log("Server listening on port " + port); });

app.get('/', (req, res) => {   res.send('Root\n');  console.log('Root connected to by', req.connection.remoteAddress) })
// Get endpoints
app.get('/allmanifests', (req, res) => { manifest.allManifests(req, res, pool) })
// Post endpoints
app.post('/account_detail', (req, res) => { account.accountDetail (req, res, db) })
