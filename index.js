const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});

app.get("/", function (req, res) {
  res.status(200).send("Hey, I am responding to your request!");
});

app.get("/home", function (req, res) {
  res.status(200).send("<h1>I am a header.</h1>");
});

const teams = {
  1: {
    name: "Sport Club do Recife",
    foundation: "13/05/1905"
  }
};

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

app.post("/addTeam", function (req, res) {
  res.status.send("You have posted a team of name: "+req.body.name+" and foundation: "+req.body.foundation);
});
