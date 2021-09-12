const mongoose = require("mongoose");
const express = require("express");
const ejs = require("ejs");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/projectsDB");
const projectSchema = mongoose.Schema({
  title: String,
  content: String,
  imageName: String
});
const Project = mongoose.model("Project", projectSchema);

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.post("/contact", function(req, res) {

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

app.get("/projects/:projectID", function(req, res) {
  Project.findById(req.params.projectID, function(err, result) {
    if(!err) {
      if(result) {
        res.render("project", { data: result });
      } else {
        res.send("The requested page could not be found");
      }
    } else {
      console.log(err);
    }
  });
});

app.get("/projects-post", function(req, res) {
  res.render("projects-post")
})

app.post("/projects-post", function(req, res) {
  console.log(req.body.title);
  const newProject = new Project({
    title: req.body.title,
    content: req.body.content,
    imageName: req.body.imgName
  });
  newProject.save();
  res.redirect("/projects");
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
