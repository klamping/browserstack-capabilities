var expect = require("chai").expect;
var bsCaps = require("../index.js");

describe("bsCaps.parse", function() {
  describe("browser only", function() {
    it("should parse browser name", function() {
      var generatedCapabilities = bsCaps.parse("ch");

      var expectedCapabilities = {
        os: 'ANY',
        browser: 'Chrome',
        os_version: 'ANY',
        browser_version: 'ANY'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });

    it("should parse browser name and version", function() {
      var generatedCapabilities = bsCaps.parse("ch:42");

      var expectedCapabilities = {
        os: 'ANY',
        browser: 'Chrome',
        os_version: 'ANY',
        browser_version: '42'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });

    it("should parse browser name and version without alias", function() {
      var generatedCapabilities = bsCaps.parse("Chrome:42");

      var expectedCapabilities = {
        os: 'ANY',
        browser: 'Chrome',
        os_version: 'ANY',
        browser_version: '42'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });
  });

  describe("browser and os", function() {
    it("should parse browser name and os", function() {
      var generatedCapabilities = bsCaps.parse("ch@win");

      var expectedCapabilities = {
        os: 'Windows',
        browser: 'Chrome',
        os_version: 'ANY',
        browser_version: 'ANY'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });

    it("should parse browser name/version and os", function() {
      var generatedCapabilities = bsCaps.parse("ch:42@win");

      var expectedCapabilities = {
        os: 'Windows',
        browser: 'Chrome',
        os_version: 'ANY',
        browser_version: '42'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });

    it("should parse browser name and os/version", function() {
      var generatedCapabilities = bsCaps.parse("ch@win:10");

      var expectedCapabilities = {
        os: 'Windows',
        browser: 'Chrome',
        os_version: '10',
        browser_version: 'ANY'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });

    it("should parse browser name/version and os/version", function() {
      var generatedCapabilities = bsCaps.parse("ch:42@win:10");

      var expectedCapabilities = {
        os: 'Windows',
        browser: 'Chrome',
        os_version: '10',
        browser_version: '42'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });

    it("should parse browser name/version and os/version without aliases", function() {
      var generatedCapabilities = bsCaps.parse("Chrome:42@Windows:XP");

      var expectedCapabilities = {
        os: 'Windows',
        browser: 'Chrome',
        os_version: 'XP',
        browser_version: '42'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });
  });

  it("should handle arrays", function () {
      var generatedCapabilities = bsCaps.parse(["ch", "ff"]);

      var expectedCapabilities = [{
        os: 'ANY',
        browser: 'Chrome',
        os_version: 'ANY',
        browser_version: 'ANY'
      }, {
        os: 'ANY',
        browser: 'Firefox',
        os_version: 'ANY',
        browser_version: 'ANY'
      }];

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);

  })

});
