var _ = require('lodash');
var parser = require('./lib/parse');
var request = require('sync-request');

var browsers;

function createRulesProduct(rules) {
  var filters = [rules];

  _.each(rules, function (value, property) {
    if (_.isArray(value)) {
      var newFilters = [];

      // create set of filters from possible values
      _.each(value, function (type) {
        _.each(filters, function (filter) {
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

function nestedExclude(browsers, rules) {
  return _.reduce(rules, function (filteredBrowsers, rule) {
    return _.reject(filteredBrowsers, rule);
  }, browsers);
}

module.exports = function (username, key) {
  return {
    create: function (includes, excludes) {

      if (!browsers) {
        var auth = 'Basic ' + new Buffer(username + ':' + key).toString('base64');

        var res = request('GET', 'https://api.browserstack.com/automate/browsers.json', {
          'headers': {
            'Authorization': auth
          }
        });

        browsers = JSON.parse(res.getBody());
      }

      var rules;
      var browserMatches = _.clone(browsers);

      if (includes) {
        if (_.isArray(includes)) {
          rules = _.flatten(_.map(includes, createRulesProduct));
        } else {
          rules = createRulesProduct(includes);
        }

        browserMatches = _.flatten(_.map(rules, function (rule) {
          if (_.includes(['previous', 'current', 'latest'], rule.browser_version)) {
            var current_rule = _.clone(rule);
            delete current_rule.browser_version;
            var candidates = _.filter(browserMatches, current_rule);
            candidates = _.sortBy(candidates, function (browser) {
              var version = browser['browser_version'];
              if (isFinite(version)) {
                return parseFloat(version);
              } else {
                return Infinity;
              }
            });
            if (rule.browser_version !== 'latest') {
              candidates = _.filter(candidates, function (browser) {
                return isFinite(browser['browser_version']);
              });
            }
            var selected;
            switch (rule.browser_version) {
            case 'current':
            case 'latest':
              selected = _.nth(candidates, -1);
              break;
            case 'previous':
              selected = _.nth(candidates, -2);
            }
            return selected ? [selected] : [];
          }
          return _.filter(browserMatches, rule);
        }));

      }
      if (excludes) {
        if (_.isArray(excludes)) {
          rules = _.flatten(_.map(excludes, createRulesProduct));
        } else {
          rules = createRulesProduct(excludes);
        }
        browserMatches = nestedExclude(browserMatches, rules);
      }

      return browserMatches;
    },
    parse: parser
  };
};
