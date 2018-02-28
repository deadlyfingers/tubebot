var chai = require("chai");
var expect = chai.expect;

// sample response data
const SAMPLE_DATA = [
  require("./data/empty"), // 0
  require("./data/response"), // 1
  require("./data/duplicate"), // 2
  require("./data/duplicates"), // 3
  require("./data/closed"), // 4
  require("./data/single") // 5
];

const getBody = function(index = 0, clone = true) {
  if (index > SAMPLE_DATA.length - 1) {
    throw new Error("Invalid sample data index");
  }
  return clone ? SAMPLE_DATA[index].slice(0) : SAMPLE_DATA[index];
};

var ucFirstLetter = require("../utils/formatting").ucFirstLetter,
  lcFirstLetter = require("../utils/formatting").lcFirstLetter,
  camelCaseToString = require("../utils/formatting").camelCaseToString,
  extractLine = require("../utils/formatting").extractLine,
  resultsToSpeakableText = require("../utils/formatting").resultsToSpeakableText,
  dedup = require("../utils/formatting").dedup,
  summarizeDescriptions = require("../utils/formatting").summarizeDescriptions,
  sortBySeverity = require("../utils/formatting").sortBySeverity,
  keyValuesToSpeakableString = require("../utils/formatting").keyValuesToSpeakableString,
  soloResultsToSpeakableString = require("../utils/formatting").soloResultsToSpeakableString,
  arrayToSpeakableString = require("../utils/formatting").arrayToSpeakableString;

describe("Formatting tests", function() {
  it("ucFirstLetter() should capitalize the first letter in a string", function() {
    var str = ucFirstLetter("this is a test!");
    expect(str.substr(0, 4) === "This").to.be.true;
  });

  it("lcFirstLetter() should lower the first letter in a string", function() {
    var str = lcFirstLetter("Line");
    expect(str === "line").to.be.true;
  });

  it("camelCaseToString() should convert a 'camelCase' string into \"camel case\" lowercase string with spaces.", function() {
    var str = camelCaseToString("camelCase");
    expect(str === "camel case").to.be.true;
  });

  it("extractLine() should return line name (without 'Line' word) from result description.", function() {
    var str = extractLine("Waterloo and City Line: Train service resumes later this morning at 0600.");
    expect(str === "Waterloo and City").to.be.true;
  });

  it("arrayToSpeakableString() should convert array ['a','b','c'] into \"a, b and c\"", function() {
    var str = arrayToSpeakableString(["a", "b", "c"]);
    expect(str === "a, b and c").to.be.true;
  });

  it("dedup() should remove duplicate results", function() {
    var result = dedup(getBody(2));
    expect(result.length === 1).to.be.true;
  });

  it("dedup() should remove multiple duplicate results", function() {
    var multipleResults = dedup(getBody(3));
    expect(multipleResults.length === 2).to.be.true;
  });

  it("dedup() should not remove a single result", function() {
    var singleResult = dedup(getBody(5));
    expect(singleResult.length === 1 && singleResult.length === getBody(5).length).to.be.true;
  });

  it("sortBySeverity() should sort response by severity (most to least)", function() {
    var results = sortBySeverity(getBody(1));
    expect(getBody(1)[0]["closureText"] === "minorDelays" && results[0]["closureText"] === "severeDelays").to.be.true;
  });

  it("sortBySeverity() should sort dedup response by severity (most to least)", function() {
    var multipleResults = dedup(getBody(3));
    var lastIndex = multipleResults.length - 1;
    var results = sortBySeverity(multipleResults);
    expect(
      multipleResults[lastIndex]["closureText"] === "minorDelays" && results[lastIndex]["closureText"] === "minorDelays"
    ).to.be.true;
  });

  it("summarizeDescriptions() should convert response into key values grouped by 'closureText' value", function() {
    var result = summarizeDescriptions(getBody(1));
    expect(result).to.have.nested.property("minorDelays");
    expect(result).to.have.nested.property("severeDelays");
    expect(result).to.have.nested.property("partSuspended");
  });

  it('keyValuesToSpeakableString() should convert response into string format "{Key} on {value} line. \\n"', function() {
    var sorted = sortBySeverity(getBody(1));
    var keyValues = summarizeDescriptions(sorted);
    var str = keyValuesToSpeakableString(keyValues);
    expect(
      str === "Severe delays on Central line. \nPart suspended on Central line. \nMinor delays on Piccadilly line. \n"
    ).to.be.true;
  });

  it('resultsToSpeakableText() should say "No problems" when response is empty', function() {
    var str = resultsToSpeakableText(getBody(0));
    expect(str === "No problems").to.be.true;
  });

  it('resultsToSpeakableText() should not say "No problems" when there is a response', function() {
    var str = resultsToSpeakableText(getBody(1));
    expect(str === "No problems").to.be.false;
  });

  it("resultsToSpeakableText() returns custom empty results message", function() {
    var emptyText = "Nothing to report";
    var str = resultsToSpeakableText(getBody(0), emptyText);
    expect(str === emptyText).to.be.true;
  });

  it("resultsToSpeakableText() should remove dups", function() {
    var str = resultsToSpeakableText(getBody(2), "No problems", true);
    expect(
      str ===
        "District line has severe delays between Wimbledon and Edgware Road  and between Earls Court and Ealing Broiadway due to an earlier faulty train at High Street Kensington."
    ).to.be.true;
  });

  it("resultsToSpeakableText() should remove multiple dups", function() {
    var str = resultsToSpeakableText(getBody(3), "No problems", true);
    expect(str === "Severe delays on District line. \nMinor delays on Piccadilly line. \n 🚇").to.be.true;
  });

  it("resultsToSpeakableText() should process closed response", function() {
    var str = resultsToSpeakableText(getBody(4), "No problems", true);
    expect(str === "Waterloo and City train service resumes later this morning at 0600.").to.be.true;
  });

  it("soloResultsToSpeakableString() should process closed response", function() {
    var str = soloResultsToSpeakableString(getBody(4), "No problems", true);
    expect(str === "Waterloo and City train service resumes later this morning at 0600.").to.be.true;
  });
});
