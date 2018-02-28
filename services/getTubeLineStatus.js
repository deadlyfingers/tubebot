var request = require("request");
var util = require("util");

var TFL = require("../resources/tfl");
var buildUrl = require("../utils/api").buildUrl;

var resultsToSpeakableText = require("../utils/formatting").resultsToSpeakableText;

module.exports = function(callback, id) {
  if (!id) {
    throw new Error("Request id param required");
  }
  var url = buildUrl(util.format("/Line/%s/Disruption", id.trim()));

  request(url, function(error, response, body) {
    if (error) {
      throw new Error(error);
    }
    body = JSON.parse(body);

    var name = TFL.lines[id] || id;
    var emptyText = util.format("No problems on %s line.", name);

    var messageResult = resultsToSpeakableText(body, emptyText, true);
    return callback(messageResult);
  });
};
