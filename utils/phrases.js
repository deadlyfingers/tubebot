var util = require("util");
var TFL = require("../resources/tfl");

// Helper functions to generate example phrases to use with the bot

const getExampleQuery = function() {
  var query = "What is the Tube status?";
  var dict = TFL.lines;
  if (!dict) {
    return query;
  }
  var keys = Object.keys(dict);
  if (keys.length < 0) {
    return query;
  }
  var i = Math.floor(Math.random() * keys.length);
  var key = keys[i];
  var value = dict[key];
  if (value) {
    const phrases = [
      "What's the status on the %s line?",
      "Is the %s service ok?",
      "Update me on the %s service",
      "%s status"
    ];
    query = getRandomPhrase(phrases, value);
  }
  return query;
};

const getRandomPhrase = function(phrases, value = "") {
  var i = Math.floor(Math.random() * phrases.length);
  if (!value.length) {
    return phrases[i];
  }
  return util.format(phrases[i], value);
};

module.exports = {
  getExampleQuery,
  getRandomPhrase
};
