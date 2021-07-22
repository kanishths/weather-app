const request = require("request");
const { accessKey } = require("../config");
console.log(accessKey);
const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${lat},${lon}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find Location", undefined);
    } else {
      const arr = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const year = body.location.localtime.substring(0, 4);
      const month = parseInt(body.location.localtime.substring(5, 7));
      const date = body.location.localtime.substring(8, 10);
      const time = body.location.localtime.substring(11);
      callback(
        undefined,
        `The Temperature at ${arr[month]} ${date}, ${year} ${time},  is ${body.current.temperature}\u00B0C out and it Feels Like ${body.current.feelslike}\u00B0C. The humidity outside is ${body.current.humidity}%`
      );
    }
  });
};

module.exports = forecast;
