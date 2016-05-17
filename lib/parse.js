var aliases = require("./aliases");
var getAlias = aliases.getAlias;
var getPlatformAlias = aliases.getPlatformAlias;
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

function parseCapabality(shorthand) {
	// split by browser/os
	var props = splitProperties("@", shorthand);

	var browserProps = splitProperties(":", props[0]);
	var osProps = splitProperties(":", props[1]);

	return {
		browserName: getAlias(browserProps[0]),
		version: browserProps[1],
		platform: getPlatformAlias(osProps[0]),
		os: getAlias(osProps[0]),
		os_version: osProps[1]
	}
}

function parseCapabilities(capabilities) {
	if (capabilities.constructor === Array) {
		return capabilities.map(parseCapabality);
	} else {
		return parseCapabality(capabilities);
	}
}

module.exports = parseCapabilities;
