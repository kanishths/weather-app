const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoia2FuaXNodGhzIiwiYSI6ImNrcmF1OW11czBycnIzMnF1YjF0bDIwZ3IifQ.U7ztLu18We5ZIyp-2Hsyug";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find this location. Try another Search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
        location: body.features[0].text,
      });
    }
  });
};

module.exports = geocode;
