const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

//Paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup for Handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Kanishth",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me:",
    name: "Kanishth",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Helpful text for weather api",
    title: "Help",
    name: "Kanishth",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "this",
    location: "that",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    errorMsg: "Help article not found",
    name: "Kanishth",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    errorMsg: "Page Not Found",
    name: "Kanishth",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
