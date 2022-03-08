'use strict';

const chai = require('chai');
const pkgJSON = require('../../../package.json');
const proxyquire = require('proxyquire');

const commitSlug = 'abc123';
const getAppInfo =
  proxyquire(
    '../../../src/services/getAppInfo',
    {
      './getCommitSlug': () => new Promise((resolve) => {
        resolve(commitSlug);
      }),
    },
  );

chai.should();

describe('getAppInfo', () => {
  const commit = commitSlug;

  it('responds with correct app information', () => getAppInfo()
    .then((response) => {
      response.title.should.equal(pkgJSON.name);
      response.should.have.property('environment');
      response.version.should.equal(pkgJSON.version);
      response.commit.should.equal(commit);
    })
    .catch((err) => {
      throw err;
    }));
});
