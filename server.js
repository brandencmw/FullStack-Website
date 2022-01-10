require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const ejs = require("ejs");

// Express config
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Mongoose config
const password = process.env.MONGO_PASS;
mongoose.connect(
  "mongodb+srv://admin-branden:" +
    password +
    "@personalsite.vxswe.mongodb.net/projects?retryWrites=true&w=majority/projects"
);
const projectSchema = mongoose.Schema({
  title: String,
  content: String,
  imageName: String,
});
const Project = mongoose.model("Project", projectSchema);


app.get("/", function (req, res) {
  res.render("home");
});

app.get("/projects", function (req, res) {
  Project.find(function (err, projects) {
    if (!err) {
      res.render("projects", { projects: projects });
    } else {
      console.log(err);
    }
  });
});

app.get("/projects/:projectID", function (req, res) {
  Project.findById(req.params.projectID, function (err, result) {
    if (!err) {
      if (result) {
        res.render("project", { data: result });
      } else {
        res.send("The requested page could not be found");
      }
    } else {
      console.log(err);
    }
  });
});

app.get("/projects-post", function (req, res) {
  res.render("projects-post");
});

app.post("/projects-post", function (req, res) {
  console.log(req.body.title);
  const newProject = new Project({
    title: req.body.title,
    content: req.body.content,
    imageName: req.body.imgName,
  });
  newProject.save();
  res.redirect("/projects");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server has started successfully");
});
