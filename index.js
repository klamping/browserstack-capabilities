var _ = require("lodash");
var parser = require("./lib/parse");
var request = require("sync-request");

var browsers;

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
  });

  return filters;
}

function nestedExclude (browsers, rules) {
  return _.reduce(rules, function(filteredBrowsers, rule) {
    return _.reject(filteredBrowsers, rule);
  }, browsers);
}

module.exports = function(username, password) {
  return {
    create: function (includes, excludes) {

      if (!browsers) {
        var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

        var res = request('GET', 'https://api.browserstack.com/4/browsers?flat=true', {
          'headers': {
            'Authorization': auth
          }
        });

        browsers = JSON.parse(res.getBody());
      }

      var rules;
      var browserMatches = _.clone(browsers);

      if (includes) {
        rules = createRulesProduct(includes);

        browserMatches = _.flatten(_.map(rules, function (rule) {
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
};
