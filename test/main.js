var createCombo = require("../main.js");

// var combos = {
//   ie11All: createCombo({
//     browser: "ie",
//     browser_version: ["11.0", "10.0"],
//     os_version: ["10", "8.1", "7"]
//   }, {
//     browser_version: "11.0",
//     os_version: "7"
//   }),
//   firefoxWindows: createCombo({
//     browser: "firefox",
//     browser_version: "42.0",
//     os: "Windows"
//   }, {
//     os_version: ["XP", "8"]
//   })
// };
    console.log("here");

describe("combo generation", function() {
  it("should take a simple include array", function() {
    var expectedCombos = [ { device: null,
      os: 'Windows',
      browser: 'ie',
      os_version: '8',
      browser_version: '10.0' },
    { device: null,
      os: 'Windows',
      browser: 'ie',
      os_version: '7',
      browser_version: '10.0' } ];

    var generatedCombo = createCombo({
      browser: "ie",
      browser_version: "10.0"
    });

    expect(generatedCombo).to.deep.equal(expectedCombos);
  })
})