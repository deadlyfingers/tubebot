var request = require("request");

var TFL = require("../resources/tfl");
var buildUrl = require("../utils/api").buildUrl;

var resultsToSpeakableText = require("../utils/formatting").resultsToSpeakableText;

module.exports = function(callback) {
  var url = buildUrl("/Line/Mode/tube/Disruption");
  request(url, function(error, response, body) {
    if (error) {
      throw new Error(error);
    }
    body = JSON.parse(body);

    var messageResult = resultsToSpeakableText(body);
    return callback(messageResult);
  });
};
