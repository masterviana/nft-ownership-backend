'use strict';

const gitRev = require('git-rev');

const gitData = {
  long: undefined,
  short: undefined,
  branch: undefined,
  tag: undefined,
};

const gitLong = new Promise((resolve) => {
  gitRev.long((longVersion) => {
    gitData.long = longVersion;
    resolve(longVersion);
  });
});

const gitShort = new Promise((resolve) => {
  gitRev.short((short) => {
    gitData.short = short;
    resolve(short);
  });
});

const gitBranch = new Promise((resolve) => {
  gitRev.branch((branch) => {
    gitData.branch = branch;
    resolve(branch);
  });
});

const gitTag = new Promise((resolve) => {
  gitRev.tag((tag) => {
    gitData.tag = tag;
    resolve(tag);
  });
});

// eslint-disable-next-line arrow-body-style
module.exports = async () => {
  return Promise
    .all([gitLong, gitShort, gitBranch, gitTag])
    .then(() => gitData);
};
