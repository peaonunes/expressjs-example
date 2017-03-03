const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enabling CORS for domains on whiteList.
var whiteList = ["http://localhost:8000", "http://localhost:3000", "http://localhost:8080"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
}

app.use(cors(corsOptionsDelegate));

// App listening.
app.listen(3000, function () {
  console.log("App listening on port 3000!");
});

// Root route.
app.get("/", function (req, res) {
  res.status(200).send("Hey, I am responding to your request!");
});

// Example of HTML.
app.get("/home", function (req, res) {
  res.status(200).send("<h1>I am a header.</h1>");
});

const teams = {
  1: {
    name: "Sport Club do Recife",
    foundation: "13/05/1905"
  }
};

// Route with parameters
app.get("/teams/:id", function (req, res) {
  if(teams[req.params.id] !== undefined){
    res.status(200).send(teams[req.params.id]);
  } else {
    res.status(404).send("Oops! 404: Team not found!");
  }
});

const form = "<form method=\"post\" action=\"http://localhost:3000/addTeam\">"
  +"Name:<br>"
  +"  <input type=\"text\" name=\"name\" value=\"\">"
  +"  <br>"
  +"  Foundation:<br>"
  +"  <input type=\"text\" name=\"foundation\" value=\"\">"
  +"  <br><br>"
  +"  <input type=\"submit\" value=\"Submit\">"
  +"</form>";

app.get("/addTeam", function (req, res) {
  res.status(200).send(form);
});

// POST method with parameters
app.post("/addTeam", function (req, res) {
  res.status.send("You have posted a team of name: "+req.body.name+" and foundation: "+req.body.foundation);
});
