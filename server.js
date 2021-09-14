require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const ejs = require("ejs");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

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

// const contactSchema = mongoose.Schema({
//   email: String,
//   title: String,
//   content: String,
// });
// const Contact = mongoose.model("Contact", contactSchema);

app.get("/", function (req, res) {
  res.render("home");
});

// app.get("/contact", function (req, res) {
//   res.render("contact");
// });

// app.post("/contact", function (req, res) {
//   const contact = new Contact({
//     email: req.body.email,
//     title: req.body.title,
//     content: req.body.content,
//   });
//   contact.save();
//   res.redirect("/");
// });

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

app.listen(3000 || process.env.PORT, function () {
  console.log("Server has started successfully");
});
