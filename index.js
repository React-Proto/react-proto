#!/usr/bin/env node
const util = require('util');
const program = require('commander');
const execFile = util.promisify(require('child_process').execFile);

program
  .version('0.1.0')
  .description('An application for prototyping React application.');

program
  .command('start')
  .alias('s')
  .description('Start-up react-proto app')
  .action(() => {
    execFile('npm', ['start'])
      .catch(err => console.log(err));
  });

program.parse(process.argv);
