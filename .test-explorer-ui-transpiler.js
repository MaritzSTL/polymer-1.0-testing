const exec = require('child_process').exec;

async function cleanDirectory() {
  // exec('rimraf --glob .test_explorer_ui_transpilation');
}

async function transpileDirectory() {
  exec('babel examples/**/*.js --out-dir .test_explorer_ui_transpilation --quiet --source-maps true');
}

async function refresh() {
  await cleanDirectory();
  await transpileDirectory();
}

refresh();

module.exports = require('mocha');