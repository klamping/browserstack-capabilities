var expect = require("chai").expect;
var bsCapabilities = require("../index.js");

describe("combo generation", function() {
  describe("simple combinations", function() {
    it("should take an include", function() {
      var generatedCombo = bsCapabilities.create({
        browser: "ie",
        browser_version: "10.0"
      });

      var expectedCombos = [{
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '8',
          browser_version: '10.0'
        }, {
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '7',
          browser_version: '10.0'
        }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });

    it.skip("should take an exclude", function() {
      var generatedCombo = bsCapabilities.create(null, {
        browser: "ie"
      });

      var expectedCombos = [{
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '8',
          browser_version: '10.0'
        }, {
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '7',
          browser_version: '10.0'
        }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });

    it("should take an include and an exclude", function() {
      var generatedCombo = bsCapabilities.create({
        browser: "ie",
        browser_version: "10.0",
        os: "Windows"
      }, {
        os_version: "7"
      });

      var expectedCombos = [{
        device: null,
        os: 'Windows',
        browser: 'ie',
        os_version: '8',
        browser_version: '10.0'
      }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });
  });

  describe("nested combinations", function() {
    it("should take a nested include", function() {
      var generatedCombo = bsCapabilities.create({
        browser: "ie",
        browser_version: ["11.0", "10.0"],
        os_version: ["10", "8.1", "7"]
      });

      var expectedCombos = [
        {
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '10',
          browser_version: '11.0'},
        { device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '8.1',
          browser_version: '11.0' },
        { device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '7',
          browser_version: '11.0' },
        { device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '7',
          browser_version: '10.0' }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });

    it("should take a nested include and simple exclude", function() {
      var generatedCombo = bsCapabilities.create({
        browser: "ie",
        browser_version: ["11.0", "10.0"],
        os_version: ["10", "8.1", "7"]
      }, {
        browser_version: "11.0",
        os_version: "7"
      });

      var expectedCombos = [
        {
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '10',
          browser_version: '11.0'},
        { device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '8.1',
          browser_version: '11.0' },
        { device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '7',
          browser_version: '10.0' }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });


    it("should take a simple include and nested exclude", function() {
      var generatedCombo = bsCapabilities.create({
        browser: "firefox",
        os: "Windows",
        browser_version: "42.0"
      }, {
        os_version: ["8", "XP"]
      });

      var expectedCombos = [
        {
          device: null,
          os: 'Windows',
          browser: 'firefox',
          os_version: '7',
          browser_version: '42.0'},
        {
          device: null,
          os: 'Windows',
          browser: 'firefox',
          os_version: '10',
          browser_version: '42.0'},
        { device: null,
          os: 'Windows',
          browser: 'firefox',
          os_version: '8.1',
          browser_version: '42.0' }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });

    it("should take a nested include and nested exclude", function() {
      var generatedCombo = bsCapabilities.create({
        browser: "ie",
        browser_version: ["11.0", "10.0"],
        os_version: ["10", "8.1", "7"]
      }, {
        browser_version: "11.0",
        os_version: ["8.1", "7"]
      });

      var expectedCombos = [
        {
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '10',
          browser_version: '11.0'},
        { device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '7',
          browser_version: '10.0' }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });
  });
});
