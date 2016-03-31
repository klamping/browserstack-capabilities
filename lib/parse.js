var getAlias = require("./aliases");
// example strings
// chrome
// ch:42
// chrome@osx
// chrome:42@osx
// ie:9@win:10

function splitProperties(separator, props) {
	props = props.split(separator);

	var required = props[0];

	var optional = props.length > 1 ? props[1] : "ANY";

	return [required, optional];
}

module.exports = function parseCapabality(shorthand) {
	// split by browser/os
	var props = splitProperties("@", shorthand);

	var browserProps = splitProperties(":", props[0]);
	var osProps = splitProperties(":", props[1]);

	return {
		browser: getAlias(browserProps[0]),
		browser_version: browserProps[1],
		os: getAlias(osProps[0]),
		os_version: osProps[1]
	}
};
