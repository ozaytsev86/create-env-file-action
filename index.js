const core = require('@actions/core');
const fs = require('fs');

const inputPrefix = "INPUT_ENV_";
const fileName = core.getInput('file-name') || '.env';

try {
  let envFileContent = '';

  Object.keys(process.env).forEach(function(key) {
    if(key.startsWith(inputPrefix)) {
      envFileContent += `${key.substring(inputPrefix.length)}=${process.env[key]}\n`;
    }
  });

  fs.writeFile(fileName, envFileContent, function (error) {
    if (error) {
      core.setFailed(error.message);
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
