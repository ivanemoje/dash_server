const bodyParser = require('body-parser');
const express = require("express");
const mysql = require ('mysql');
const cors = require ('cors');

const app = express();
const port = 3000;

const config = require ('./config.json')
const queryoutput = require ('./controllers/queryoutput');
const fdpno = require ('./controllers/queryfdpno');
const addentry = require ('./controllers/addentry');
const latestentry = require ('./controllers/latestentry');

app.use (cors());

app.use(bodyParser.urlencoded({
  limit: '200mb', extended: true
}));

app.use(bodyParser.json({ limit: "50mb" }));

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
app.get('/allentries', (req, res) => { queryoutput.allQueries(req, res, pool) })
app.get('/latestentry', (req, res) => { latestentry.latestEntry(req, res, pool) })
app.get('/fdpno', (req, res) => { fdpno.fdpNo(req, res, pool) })
// Post endpoints
app.post('/addentry', (req, res) => { addentry.addEntry (req, res, pool) })

