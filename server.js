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

const crypto = require('crypto'),
      fs = require("fs"),
      http = require("http");

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8')

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);


httpServer.listen(3000);
httpsServer.listen(3000);

var server = http.createServer(app);
server.setSecure(credentials);
server.addListener("request", handler);

server.use (cors());

server.use(bodyParser.urlencoded({
  limit: '200mb', extended: true
}));

server.use(bodyParser.json({ limit: "50mb" }));

const pool  = mysql.createPool({
  connectionLimit: 100,
  host: config.sqlconfig.host,
  user: config.sqlconfig.user,
  password: config.sqlconfig.password,
  database : config.sqlconfig.database
});

server.listen(port, '0.0.0.0', () => {  console.log("Server listening on port " + port); });

server.get('/', (req, res) => {   res.send('Root\n');  console.log('Root connected to by', req.connection.remoteAddress) })
// Get endpoints
server.get('/allentries', (req, res) => { queryoutput.allQueries(req, res, pool) })
server.get('/latestentry', (req, res) => { latestentry.latestEntry(req, res, pool) })
server.get('/fdpno', (req, res) => { fdpno.fdpNo(req, res, pool) })
// Post endpoints
server.post('/addentry', (req, res) => { addentry.addEntry (req, res, pool) })

