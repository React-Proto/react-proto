#!/usr/bin/env node
const util = require('util');
const program = require('commander');
const execFile = util.promisify(require('child_process').execFile);
const { Spinner } = require('cli-spinner');

const spinner = new Spinner('running app... %s');
spinner.setSpinnerString('|/-\\');

program
  .version('0.1.7', '-v, --version, -V')
  .description('An application for prototyping React application.');

program
  .command('start')
  .description('Start-up react-proto app')
  .action(() => {
    spinner.start();
    execFile('npm', ['start'])
      .catch(err => console.log(err));
  });

program.parse(process.argv);
