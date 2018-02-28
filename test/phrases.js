var chai = require("chai");
var expect = chai.expect;

var getExampleQuery = require("../utils/phrases").getExampleQuery,
  getRandomPhrase = require("../utils/phrases").getRandomPhrase;

describe("Phrases tests", function() {
  it("getRandomPhrase() should return a random query", function() {
    const phrases = ["hello!", "hi!", "howday!"];
    var query = getRandomPhrase(phrases);
    expect(query.length > 1 && query.slice(-1) === "!").to.be.true;
  });

  it("getRandomPhrase() should return a query with a value", function() {
    const phrases = ["%s status", "What is the %s line status?"];
    const value = "Bakerloo";
    var query = getRandomPhrase(phrases, value);
    expect(query.length > 1 && query.search(value) >= 0).to.be.true;
  });

  it("getExampleQuery() should return a query", function() {
    var query = getExampleQuery();
    expect(query.length > 1).to.be.true;
  });
});
