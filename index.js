var _ = require("lodash");
var browsers = require("./lib/browsers.json");
var parser = require("./lib/parse");

function createRulesProduct(rules) {
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
  return _.reduce(rules, function(filteredBrowsers, rule) {
    return _.reject(filteredBrowsers, rule);
  }, browsers);
};

module.exports = {
  create: function (includes, excludes) {
    var rules;
    var browserMatches = _.clone(browsers);

    if (includes) {
      rules = createRulesProduct(includes);

      browserMatches = _.flatten(_.map(rules, function(rule) {
        return _.filter(browserMatches, rule);
      }));

    }
    if (excludes) {
      rules = createRulesProduct(excludes);
      browserMatches = nestedExclude(browserMatches, rules);
    }

    return browserMatches;
  },
  parse: parser
};
