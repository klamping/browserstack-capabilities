# browserstack-capabilities

An easier way to generate multiple capabilities based on JSON filters for Browserstack.

## Installation

`npm install browserstack-capabilities`

## Usage

The `create` method (currently the only method returned) accepts two parameters: an "include" and an "exclude" JSON filter.

The "include" filter will find all browsers that match the defined properties. 

The "exclude" filter will return all browsers that don't match the defined properties.

### A Simple Include

You do not have to include all properties in your search. Any properties not defined will be included in all variations.

```js
var bsCapabilities = require("browserstack-capabilities");

var capabilities = bsCapabilities.create({
    browser: "ie",
    browser_version: "10.0"
});

console.log(capabilities);
// outputs:
// [{
//  device: null,
//  os: 'Windows',
//  browser: 'ie',
//  os_version: '8',
//  browser_version: '10.0'
// }, {
//  device: null,
//  os: 'Windows',
//  browser: 'ie',
//  os_version: '7',
//  browser_version: '10.0'
// }]
```

### A Complex Include

You can define multiple values per property:

```js
var bsCapabilities = require("browserstack-capabilities");

var capabilities = bsCapabilities.create({
    browser: "ie",
    browser_version: ["11.0", "10.0"],
    os_version: ["10", "8.1", "7"]
});

console.log(capabilities);
// outputs:
// [{
//   device: null,
//   os: 'Windows',
//   browser: 'ie',
//   os_version: '10',
//   browser_version: '11.0'
// }, {
//   device: null,
//   os: 'Windows',
//   browser: 'ie',
//   os_version: '8.1',
//   browser_version: '11.0'
// }, {
//   device: null,
//   os: 'Windows',
//   browser: 'ie',
//   os_version: '7',
//   browser_version: '11.0'
// }, {
//   device: null,
//   os: 'Windows',
//   browser: 'ie',
//   os_version: '7',
//   browser_version: '10.0'
// }]
```

### Combining Includes and Excludes

Includes and excludes can be combined to create complex scenarios. For example, I want all version of IE11 & IE10, except I don't care about IE11 on Windows 7:

```js
var bsCapabilities = require("browserstack-capabilities");

var capabilities = bsCapabilities.create({
    browser: "ie",
    browser_version: ["11.0", "10.0"],
    os_version: ["10", "8.1", "7"]
}, {
    browser_version: "11.0",
    os_version: "7"
});

console.log(capabilities);
// outputs:
// [{
//   device: null,
//   os: 'Windows',
//   browser: 'ie',
//   os_version: '10',
//   browser_version: '11.0'
// }, { 
//   device: null,
//   os: 'Windows',
//   browser: 'ie',
//   os_version: '8.1',
//   browser_version: '11.0'
// }, {
//   device: null,
//   os: 'Windows',
//   browser: 'ie',
//   os_version: '7',
//   browser_version: '10.0'
// }]
```

### Properties

The following properties are defined in the JSON browser data:

- device
- os
- browser
- os_version
- browser_version

You can [generate sample capabilities for single browsers on the Browserstack website](https://www.browserstack.com/automate/node#setting-os-and-browser).

### Multiple OSes

Because each OS has a unique version and/or device name, you can create combinations for them by including the information together:

```js
var bsCapabilities = require("browserstack-capabilities");

var capabilities = bsCapabilities.create({
    browser: "firefox",
    os: ["Windows", "OS X"],
    browser_version: "42.0",
    os_version: ["10", "8.1", "El Capitan", "Yosemite"]
});

console.log(capabilities);
// outputs:
// [{
//   device: null,
//   os: 'Windows',
//   browser: 'firefox',
//   os_version: '10',
//   browser_version: '42.0'
// }, {
//   device: null,
//   os: 'Windows',
//   browser: 'firefox',
//   os_version: '8.1',
//   browser_version: '42.0'
// }, {
//   device: null,
//   os: 'OS X',
//   browser: 'firefox',
//   os_version: 'El Capitan',
//   browser_version: '42.0'
// }, {
//   device: null,
//   os: 'OS X',
//   browser: 'firefox',
//   os_version: 'Yosemite',
//   browser_version: '42.0'
// }]
```

### Multiple Browsers

It's recommended that you create combinations for different browsers separately, due to the singular nature of the "version" property. Once created, you can concat the combinations:

```js
var bsCapabilities = require("browserstack-capabilities");

var ff = bsCapabilities.create({
    browser: "firefox",
    os: "Windows",
    browser_version: "42.0",
    os_version: ["10", "8.1"]
});

var chrome = bsCapabilities.create({
    browser: "chrome",
    os: "Windows",
    browser_version: "46.0",
    os_version: ["10", "8.1"]
});

var capabilities = ff.concat(chrome);

console.log(capabilities);
// outputs:
// [{
//   device: null,
//   os: 'Windows',
//   browser: 'firefox',
//   os_version: '10',
//   browser_version: '42.0'
// }, {
//   device: null,
//   os: 'Windows',
//   browser: 'firefox',
//   os_version: '8.1',
//   browser_version: '42.0'
// }, {
//   device: null,
//   os: 'Windows',
//   browser: 'chrome',
//   os_version: '10',
//   browser_version: '46.0'
// }, {
//   device: null,
//   os: 'Windows',
//   browser: 'chrome',
//   os_version: '8.1',
//   browser_version: '46.0'
// }]
```