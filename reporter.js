const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
  reportName: 'Playwright BDD Report',
  jsonDir: './',
  reportPath: 'report',
});
