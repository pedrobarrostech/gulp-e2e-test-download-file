'use strict';
var SpecReporter = require('../node_modules/jasmine-spec-reporter/src/jasmine-spec-reporter.js');

exports.config = {

  allScriptsTimeout: 99999,
  baseUrl: 'http://localhost:9999',
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    silent: true,
    defaultTimeoutInterval: 360000,
    print: function () {
    }
  },  
  specs: [
    'functional/specs/download-file.spec.js',
  ],
  capabilities: {
    browserName: 'chrome',
    'chromeOptions': {
      args: ['--test-type'],
      prefs: {
          download: {
              'prompt_for_download': false,
              'directory_upgrade': true,
              'default_directory': '/tmp/'+ process.pid
          }
      }
    }
  },
  onPrepare: function () {
    require("babel-core/register");
    jasmine.getEnv().addReporter(new SpecReporter());
  }
};