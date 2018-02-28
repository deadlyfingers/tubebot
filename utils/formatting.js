var emoji = require("node-emoji");

// TFL API response formatting functions

// Converts response description into speakable text or summerized points.
const resultsToSpeakableText = (results, emptyText = "No problems", verbose = false) => {
  if (results.length === 0) {
    return emptyText;
  }
  // dedup as sometimes you can get duplicate results!
  var uniqueResults = dedup(results);
  // return detailed message for single line response
  if (verbose && uniqueResults.length === 1) {
    return soloResultsToSpeakableString(uniqueResults);
  }
  // summarize response
  return keyValuesToSpeakableString(summarizeDescriptions(sortBySeverity(uniqueResults))) + emoji.emojify(" :metro:");
};

// de-duplicate results
const dedup = results => {
  return results.reduce((a, c) => {
    if (!a.find(x => x.description === c.description)) {
      a.push(c);
    }
    return a;
  }, []);
};

// order results by most severe delays
const sortBySeverity = results => {
  // ordering will be as follows: undefined conditions (-1), minor (0) -> severe (1,2)
  const order = ["minorDelays", "partSuspended", "severeDelays", "serviceClosed"];
  var i, j;
  return results
    .sort((a, b) => {
      i = order.indexOf(a.closureText);
      j = order.indexOf(b.closureText);
      if (i === j) {
        return 0;
      }
      return i > j ? 1 : -1;
    })
    .reverse();
};

// group by closureText then list lines affected
const summarizeDescriptions = results => {
  return results.reduce((a, c) => {
    if (!a[c.closureText]) {
      a[c.closureText] = [];
      a._order ? a._order.push(c.closureText) : (a._order = [c.closureText]);
    }
    let matches = c.description.match(/^(.*?)(\sLine)?:/i);
    if (matches.length > 0 && !a[c.closureText].includes(matches[1])) {
      a[c.closureText].push(matches[1]);
    }
    return a;
  }, {});
};

// joins an array of strings as a formated string.
// eg. ['a','b','c'] becomes 'a, b and c'
const arrayToSpeakableString = list => {
  if (list.length <= 1) {
    return list;
  }
  let lastIndex = list.length - 1;
  return list.reduce((a, c, i) => {
    let text = i !== 0 ? a + ", " + c : "" + c;
    return i < lastIndex ? text : a + " and " + c;
  }, "");
};

// formats key value result into readable string for output
const keyValuesToSpeakableString = kv => {
  var keys = kv._order ? kv._order : Object.keys(kv);
  return keys.reduce((a, c) => {
    if (c.startsWith("_")) {
      return a;
    }
    return a + ucFirstLetter(camelCaseToString(c)) + " on " + arrayToSpeakableString(kv[c]) + " line. \n";
  }, "");
};

// formats single result into readable string for output
const soloResultsToSpeakableString = uniqueResults => {
  let matches = uniqueResults[0].description.match(/(^.*?:)\s([^.]*)/i);
  if (matches && matches.length > 2) {
    let line = extractLine(matches[1]);
    let description = matches[2].trim() + ".";
    let firstWord = "";
    let words = description.split(" ");
    if (words.length > 0) {
      firstWord = words[0].toLowerCase();
    }
    const statusWords = ["minor", "part", "severe"];
    let filler = statusWords.includes(firstWord) ? " line has " : " ";
    return line + filler + lcFirstLetter(description);
  } else {
    console.warn("* Regex pattern not able to process this description");
    return uniqueResults[0].description;
  }
};

// Gets line name from description so "Waterloo and City Line: ..." text will become "Waterloo and City"
const extractLine = text => {
  let matches = text.match(/^(.*?)(\sLine)?:/i);
  if (matches.length > 0) {
    return matches[1];
  }
  return text;
};

// string functions
const ucFirstLetter = s => {
  return s.substr(0, 1).toUpperCase() + s.substr(1);
};

const lcFirstLetter = s => {
  return s.substr(0, 1).toLowerCase() + s.substr(1);
};

const camelCaseToString = s => {
  return s
    .split(/(?=[A-Z])/)
    .join(" ")
    .toLowerCase();
};

module.exports = {
  resultsToSpeakableText,
  dedup,
  sortBySeverity,
  summarizeDescriptions,
  arrayToSpeakableString,
  keyValuesToSpeakableString,
  soloResultsToSpeakableString,
  extractLine,
  ucFirstLetter,
  lcFirstLetter,
  camelCaseToString
};
