'use strict';

const exec = require('child_process').exec; // eslint-disable-line prefer-destructuring

/* eslint-disable no-console */
exec('echo $SOURCE_VERSION > ./scripts/commitSlug.txt', (error, stdout, stderr) => {
  // console.log(`${stdout}`);
  // console.log(`${stderr}`);
  if (error !== null) {
    console.error(`exec error: ${error}`);
  }
});
