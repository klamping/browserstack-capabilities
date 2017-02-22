var expect = require("chai").expect;
var bsCaps = require("../index.js")(process.env.BROWSERSTACK_USERNAME, process.env.BROWSERSTACK_KEY);

describe("bsCaps.parse", function() {
  describe("browser only", function() {
    it("should parse browser name", function() {
      var generatedCapabilities = bsCaps.parse("ch");

      var expectedCapabilities = {
        os: 'ANY',
        browserName: 'chrome',
        os_version: 'ANY',
        version: 'ANY',
        platform: 'ANY'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });

    it("should parse browser name and version", function() {
      var generatedCapabilities = bsCaps.parse("ch:42");

      var expectedCapabilities = {
        os: 'ANY',
        browserName: 'chrome',
        os_version: 'ANY',
        version: '42',
        platform: 'ANY'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });

    it("should parse browser name and version without alias", function() {
      var generatedCapabilities = bsCaps.parse("chrome:42");

      var expectedCapabilities = {
        os: 'ANY',
        browserName: 'chrome',
        os_version: 'ANY',
        version: '42',
        platform: 'ANY'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });
  });

  describe("browser and os", function() {
    it("should parse browser name and os", function() {
      var generatedCapabilities = bsCaps.parse("ch@win");

      var expectedCapabilities = {
        os: 'Windows',
        browserName: 'chrome',
        os_version: 'ANY',
        version: 'ANY',
        platform: 'WINDOWS'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });

    it("should parse browser name/version and os", function() {
      var generatedCapabilities = bsCaps.parse("ch:42@win");

      var expectedCapabilities = {
        os: 'Windows',
        browserName: 'chrome',
        os_version: 'ANY',
        version: '42',
        platform: 'WINDOWS'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });

    it("should parse browser name and os/version", function() {
      var generatedCapabilities = bsCaps.parse("ch@win:10");

      var expectedCapabilities = {
        os: 'Windows',
        browserName: 'chrome',
        os_version: '10',
        version: 'ANY',
        platform: 'WINDOWS'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });

    it("should parse browser name/version and os/version", function() {
      var generatedCapabilities = bsCaps.parse("ch:42@win:10");

      var expectedCapabilities = {
        os: 'Windows',
        browserName: 'chrome',
        os_version: '10',
        version: '42',
        platform: 'WINDOWS'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });

    it("should parse browser name/version and os/version without aliases", function() {
      var generatedCapabilities = bsCaps.parse("chrome:42@Windows:XP");

      var expectedCapabilities = {
        os: 'Windows',
        browserName: 'chrome',
        os_version: 'XP',
        version: '42',
        platform: 'WINDOWS'
      };

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);
    });
  });

  it("should handle arrays", function () {
      var generatedCapabilities = bsCaps.parse(["ch", "ff"]);

      var expectedCapabilities = [{
        os: 'ANY',
        browserName: 'chrome',
        os_version: 'ANY',
        version: 'ANY',
        platform: 'ANY'
      }, {
        os: 'ANY',
        browserName: 'firefox',
        os_version: 'ANY',
        version: 'ANY',
        platform: 'ANY'
      }];

      expect(generatedCapabilities).to.deep.equal(expectedCapabilities);

  })

});
