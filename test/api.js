var chai = require("chai");
var expect = chai.expect;

var authorizeUrl = require("../utils/api").authorizeUrl,
  buildUrl = require("../utils/api").buildUrl;

describe("API tests", function() {
  it('authUrl() should start append auth query string to url"', function() {
    var url = "https://api.tfl.gov.uk/Line/Mode/tube/Disruption";
    var authUrl = authorizeUrl(url);
    var matches = authUrl.match(/^.*?\?app_id=[a-z0-9]*\&app_key=[a-z0-9]*/g);
    expect(matches.length === 1).to.be.true;
  });

  it('buildUrl() should start with "https://"', function() {
    var url = buildUrl("/Line/Mode/tube/Disruption");
    expect(url.substr(0, 8) === "https://").to.be.true;
  });
});
