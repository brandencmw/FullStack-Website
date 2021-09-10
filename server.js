const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/projectsDB");
const projectSchema = mongoose.Schema({
  title: String,
  content: String,
  img: {
    type: Buffer,
    contentType: String
  }
})
const Project = mongoose.model("Project", projectSchema);

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/projects", function(req, res) {
  Project.find(function(err, projects) {
    if(!err) {
      res.render("projects", {projects: projects});
    } else {
      console.log(err);
    }
  });
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
