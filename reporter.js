const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: './reports/json', // only contains Cucumber .json
  reportPath: './report',
  reportName: 'Playwright BDD Report',
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest',
    },
    device: 'Local test machine',
    platform: {
      name: 'Windows',
      version: '10',
    },
  },
});
