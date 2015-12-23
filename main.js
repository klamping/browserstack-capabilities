var _ = require("lodash");
var browsers = require("./browsers.json");

function nestedInclude (rules) {
  var filters = [rules];

  _.each(rules, function(value, property) {
    if (_.isArray(value)) {
      var newFilters = [];

      // create set of filters from possible values
      _.each(value, function(type) {
        _.each(filters, function(filter) {
          var updatedFilter = _.clone(filter);
          updatedFilter[property] = type;
          newFilters.push(updatedFilter);
        });
      });

      filters = newFilters;
    }
  })

  return filters;
}

function nestedExclude (browsers, rules) {
  _.each(rules, function (value, property) {
    if (_.isArray(value)) {
      _.each(value, function (singleValue) {
        browsers = _.reject(browsers, property, singleValue);
      })
    } else {
      browsers = _.reject(browsers, rules);
    }
  })

  return browsers;
};

module.exports = function (includes, excludes) {
  var combos;
  var browserMatches = _.clone(browsers);

  if (includes) {
    combos = nestedInclude(includes);
    browserMatches = _.flatten(_.map(combos, function(combo) {
      return _.filter(browserMatches, combo);
    }));
  }
  if (excludes) {
    browserMatches = nestedExclude(browserMatches, excludes);
  }

  return browserMatches;
};

// var firefox = createCombo({
//   browser: "firefox",
//   os: [{
//     name: "windows",
//     versions: ["10.0", "8.1", "7"]
//   }, {
//     name: "OS X",
//     versions: ["10.0", "8.1", "7"]
//   }]
// })

// firefox.windows
// firefox.osx
// firefox


// module.exports = {
//   createCombo: function (options) {

//   }
// }




// group different browsers
// var combos = _.groupBy(browsers, "browser");

// // group each browser by OS
// combos = _.each(combos, function(browser, key){
//   combos[key] = _.groupBy(browser, "browser_version");

//   combos[key] = _.each(combos[key], function(browserVersion, versionKey){
//     combos[key][versionKey] = _.groupBy(browserVersion, "os");
//   })

// });

// console.log(combos.firefox["42.0"].Windows);