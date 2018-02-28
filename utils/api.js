var path = require("path");

// TFL API URI functions

const buildUrl = function(apiPath) {
  var hostName = process.env.TFL_API_HOST ? process.env.TFL_API_HOST : "api.tfl.gov.uk";
  return authorizeUrl("https://" + path.join(hostName, apiPath));
};

const authorizeUrl = function(uri) {
  if (!process.env.TFL_APP_ID || !process.env.TFL_APP_KEY) {
    console.error("Requires TFL app id and key. Register with TFL for credentials.");
  }
  return uri + "?app_id=" + process.env.TFL_APP_ID + "&app_key=" + process.env.TFL_APP_KEY;
};

module.exports = {
  buildUrl,
  authorizeUrl
};
