const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// const { error } = require("console");

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
    name: "Kanishtha Siyaram",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me:",
    name: "Kanishtha Siyaram",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message:
      "This Webapp is designed to search for the weather conditions in any part of the entire world. Head over to the Weather tab and search for any location you want and hit enter",
    title: "Help",
    name: "Kanishtha Siyaram",
  });
});

app.get("/weather", (req, res) => {
  address = req.query.address;
  if (!address) {
    return res.send({
      error: "No Location Given to be fetched",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    errorMsg: "Help article not found",
    name: "Kanishtha Siyaram",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    errorMsg: "Page Not Found",
    name: "Kanishtha Siyaram",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
