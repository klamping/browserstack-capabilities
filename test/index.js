var expect = require('chai').expect;
var bsCapabilities = require('../index.js')(process.env.BROWSERSTACK_USERNAME, process.env.BROWSERSTACK_KEY);

describe('combo generation', function () {
  describe('simple combinations', function () {
    it('should take an include', function () {
      var generatedCombo = bsCapabilities.create({
        browser: 'ie',
        browser_version: '10.0'
      });

      var expectedCombos = [{
        device: null,
        os: 'Windows',
        browser: 'ie',
        os_version: '7',
        browser_version: '10.0',
        real_mobile: null
      }, {
        device: null,
        os: 'Windows',
        browser: 'ie',
        os_version: '8',
        browser_version: '10.0',
        real_mobile: null
      }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });

    it('should take an exclude', function () {
      var generatedCombo = bsCapabilities.create({
        browser: 'ie',
        os: 'Windows',
        os_version: '7'
      }, {
        browser_version: '8.0'
      });

      var expectedCombos = [{
        device: null,
        os: 'Windows',
        browser: 'ie',
        os_version: '7',
        browser_version: '9.0',
        real_mobile: null
      }, {
        device: null,
        os: 'Windows',
        browser: 'ie',
        os_version: '7',
        browser_version: '10.0',
        real_mobile: null
      }, {
        device: null,
        os: 'Windows',
        browser: 'ie',
        os_version: '7',
        browser_version: '11.0',
        real_mobile: null
      }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });

    it('should take an include and an exclude', function () {
      var generatedCombo = bsCapabilities.create({
        browser: 'ie',
        browser_version: '10.0',
        os: 'Windows'
      }, {
        os_version: '7'
      });

      var expectedCombos = [{
        device: null,
        os: 'Windows',
        browser: 'ie',
        os_version: '8',
        browser_version: '10.0',
        real_mobile: null
      }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });
  });

  describe('multiple includes and excludes', function () {
    it('should take multiple includes', function () {
      var generatedCombo = bsCapabilities.create([{
        browser: 'firefox',
        browser_version: '42.0',
        os: 'Windows',
        os_version: ['10', '8.1']
      }, {
        browser: 'chrome',
        browser_version: '46.0',
        os: 'Windows',
        os_version: ['10', '8.1']
      }]);

      var expectedCombos = [{
        device: null,
        os: 'Windows',
        browser: 'firefox',
        os_version: '10',
        browser_version: '42.0',
        real_mobile: null
      }, {
        device: null,
        os: 'Windows',
        browser: 'firefox',
        os_version: '8.1',
        browser_version: '42.0',
        real_mobile: null
      }, {
        device: null,
        os: 'Windows',
        browser: 'chrome',
        os_version: '10',
        browser_version: '46.0',
        real_mobile: null
      }, {
        device: null,
        os: 'Windows',
        browser: 'chrome',
        os_version: '8.1',
        browser_version: '46.0',
        real_mobile: null
      }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });

    it('should take multiple excludes', function () {
      var generatedCombo = bsCapabilities.create({
        browser: 'ie',
        os: 'Windows',
        os_version: '7'
      }, [{
        browser_version: '8.0'
      }, {
        browser_version: '9.0'
      }]);

      var expectedCombos = [{
        device: null,
        os: 'Windows',
        browser: 'ie',
        os_version: '7',
        browser_version: '10.0',
        real_mobile: null
      }, {
        device: null,
        os: 'Windows',
        browser: 'ie',
        os_version: '7',
        browser_version: '11.0',
        real_mobile: null
      }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });

  });

  describe('nested combinations', function () {
    it('should take a nested include', function () {
      var generatedCombo = bsCapabilities.create({
        browser: 'ie',
        browser_version: ['11.0', '10.0'],
        os_version: ['10', '8.1', '7']
      });

      var expectedCombos = [
        {
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '10',
          browser_version: '11.0',
          real_mobile: null
        },
        {
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '8.1',
          browser_version: '11.0',
          real_mobile: null
        },
        {
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '7',
          browser_version: '11.0',
          real_mobile: null
        },
        {
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '7',
          browser_version: '10.0',
          real_mobile: null
        }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });

    it('should take a nested include and simple exclude', function () {
      var generatedCombo = bsCapabilities.create({
        browser: 'ie',
        browser_version: ['11.0', '10.0'],
        os_version: ['10', '8.1', '7']
      }, {
        browser_version: '11.0',
        os_version: '7'
      });

      var expectedCombos = [
        {
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '10',
          browser_version: '11.0',
          real_mobile: null
        },
        {
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '8.1',
          browser_version: '11.0',
          real_mobile: null
        },
        {
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '7',
          browser_version: '10.0',
          real_mobile: null
        }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });


    it('should take a simple include and nested exclude', function () {
      var generatedCombo = bsCapabilities.create({
        browser: 'firefox',
        os: 'Windows',
        browser_version: '42.0'
      }, {
        os_version: ['8', 'XP']
      });

      var expectedCombos = [
        {
          device: null,
          os: 'Windows',
          browser: 'firefox',
          os_version: '7',
          browser_version: '42.0',
          real_mobile: null
        },
        {
          device: null,
          os: 'Windows',
          browser: 'firefox',
          os_version: '8.1',
          browser_version: '42.0',
          real_mobile: null
        },
        {
          device: null,
          os: 'Windows',
          browser: 'firefox',
          os_version: '10',
          browser_version: '42.0',
          real_mobile: null
        }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });

    it('should take a nested include and nested exclude', function () {
      var generatedCombo = bsCapabilities.create({
        browser: 'ie',
        browser_version: ['11.0', '10.0'],
        os_version: ['10', '8.1', '7']
      }, {
        browser_version: '11.0',
        os_version: ['8.1', '7']
      });

      var expectedCombos = [
        {
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '10',
          browser_version: '11.0',
          real_mobile: null
        },
        {
          device: null,
          os: 'Windows',
          browser: 'ie',
          os_version: '7',
          browser_version: '10.0',
          real_mobile: null
        }];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });
  });

  describe('current combinations', function () {
    it('should take a current browser_version include', function () {
      var generatedCombo = bsCapabilities.create({
        browser: 'ie',
        browser_version: ['current'],
        os: 'Windows',
        os_version: ['XP', '7', '8', '8.1', '10']
      });

      var expectedCombos = [
        {
          os: 'Windows',
          os_version: 'XP',
          browser: 'ie',
          device: null,
          browser_version: '7.0',
          real_mobile: null
        },
        {
          os: 'Windows',
          os_version: '7',
          browser: 'ie',
          device: null,
          browser_version: '11.0',
          real_mobile: null
        },
        {
          os: 'Windows',
          os_version: '8',
          browser: 'ie',
          device: null,
          browser_version: '10.0',
          real_mobile: null
        },
        {
          os: 'Windows',
          os_version: '8.1',
          browser: 'ie',
          device: null,
          browser_version: '11.0',
          real_mobile: null
        },
        {
          os: 'Windows',
          os_version: '10',
          browser: 'ie',
          device: null,
          browser_version: '11.0',
          real_mobile: null
        }
      ];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });

    it('should only take operating system where browser exists', function () {
      var generatedCombo = bsCapabilities.create({
        browser: 'edge',
        browser_version: ['current'],
        os: 'Windows',
        os_version: ['XP', '7', '8', '8.1', '10']
      });

      var expectedCombos = [
        {
          os: 'Windows',
          os_version: '10',
          browser: 'edge',
          device: null,
          browser_version: '18.0',
          real_mobile: null
        }
      ];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });
  });

  describe('previous combinations', function () {
    it('should take a previous browser_version include', function () {
      var generatedCombo = bsCapabilities.create({
        browser: 'ie',
        browser_version: ['previous'],
        os: 'Windows',
        os_version: ['XP', '7']
      });

      var expectedCombos = [
        {
          os: 'Windows',
          os_version: 'XP',
          browser: 'ie',
          device: null,
          browser_version: '6.0',
          real_mobile: null
        },
        {
          os: 'Windows',
          os_version: '7',
          browser: 'ie',
          device: null,
          browser_version: '10.0',
          real_mobile: null
        }
      ];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });

    it('should only take operating system where browser exists', function () {
      var generatedCombo = bsCapabilities.create({
        browser: 'edge',
        browser_version: ['previous'],
        os: 'Windows',
        os_version: ['XP', '7', '8', '8.1', '10']
      });

      var expectedCombos = [
        {
          os: 'Windows',
          os_version: '10',
          browser: 'edge',
          device: null,
          browser_version: '17.0',
          real_mobile: null
        }
      ];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });
  });

  describe('latest combinations', function () {
    it('should take a latest browser_version include', function () {
      var generatedCombo = bsCapabilities.create({
        browser: 'ie',
        browser_version: ['latest'],
        os: 'Windows',
        os_version: ['XP', '7', '8', '8.1', '10']
      });

      var expectedCombos = [
        {
          os: 'Windows',
          os_version: 'XP',
          browser: 'ie',
          device: null,
          browser_version: '7.0',
          real_mobile: null
        },
        {
          os: 'Windows',
          os_version: '7',
          browser: 'ie',
          device: null,
          browser_version: '11.0',
          real_mobile: null
        },
        {
          os: 'Windows',
          os_version: '8',
          browser: 'ie',
          device: null,
          browser_version: '10.0',
          real_mobile: null
        },
        {
          os: 'Windows',
          os_version: '8.1',
          browser: 'ie',
          device: null,
          browser_version: '11.0',
          real_mobile: null
        },
        {
          os: 'Windows',
          os_version: '10',
          browser: 'ie',
          device: null,
          browser_version: '11.0',
          real_mobile: null
        }
      ];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });

    it('should only take operating system where browser exists', function () {
      var generatedCombo = bsCapabilities.create({
        browser: 'edge',
        browser_version: ['latest'],
        os: 'Windows',
        os_version: ['XP', '7', '8', '8.1', '10']
      });

      var expectedCombos = [
        {
          os: 'Windows',
          os_version: '10',
          browser: 'edge',
          device: null,
          browser_version: 'insider preview',
          real_mobile: null
        }
      ];

      expect(generatedCombo).to.deep.equal(expectedCombos);
    });
  });
});
