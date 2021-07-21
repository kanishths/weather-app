const request = require("request");

const forecast = (lat, lon, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=e9f4afcbceff742864b305f76dc41282&query=" +
    lat +
    "," +
    lon +
    "";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find Location", undefined);
    } else {
      callback(
        undefined,
        `The Temperature at ${body.location.localtime} is ${body.current.temperature}\u00B0C out and it Feels Like ${body.current.feelslike}\u00B0C.`
      );
    }
  });
};

module.exports = forecast;
