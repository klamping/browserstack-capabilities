var aliases = {
	ff: "firefox",
	ch: "chrome",
	ie: "ie",
	win: "windows",
	mac: "os x",
	osx: "os x"
};

var platformAliases = {
	"Windows": "WINDOWS",
	"win": "WINDOWS",
	"osx": "MAC",
	"mac": "MAC"
}

module.exports = {
	getAlias: function getAlias (alias) {
		if (aliases.hasOwnProperty(alias)) {
			return aliases[alias];
		}

		return alias;
	},
	getPlatformAlias: function getPlatformAlias (alias) {
		if (platformAliases.hasOwnProperty(alias)) {
			return platformAliases[alias];
		}

		return "ANY";
	}
}
