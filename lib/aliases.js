var aliases = {
	ff: "Firefox",
	ch: "Chrome",
	ie: "IE",
	win: "Windows",
	mac: "OS X",
	osx: "OS X"
};

module.exports = function getAlias (alias) {
	if (aliases.hasOwnProperty(alias)) {
		return aliases[alias];
	}

	return alias;
};
