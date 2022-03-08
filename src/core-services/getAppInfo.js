'use strict';

const express = require('express');
const { version } = require('../../package.json');
const { appName } = require('$config');
const gitData = require('$core-services/getGitData');
const getCommitSlug = require('./getCommitSlug');

const app = express();
const env = app.get('env');

async function getAppInfo() {
  const commitSlug = await getCommitSlug();
  const gitInfo = await gitData();
  return new Promise((resolve) => {
    resolve({
      title: appName,
      environment: env,
      version: version,
      commit: commitSlug || gitInfo.long,
    });
  });
}

module.exports = getAppInfo;
