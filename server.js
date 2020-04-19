const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const upload = multer();
const app = express();
let skillsData = require('./data/skills.json');


//Allow cros origin
app.use(cors());

app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.sendFile(__dirname +"/index.html");
});

let name = "";

app.post('/', function(req, res){
  name = req.body;
  console.log(name);
  res.sendFile(__dirname +"/views/presentation.html");
});

app.get('/name', function(req, res){
  res.json(name);
});

app.get('/skills', function(req, res){
  res.json(skillsData);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Listening on Port 8080");
});
