'use strict';

const app = require('../../../src/app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const pkgJSON = require('../../../package.json');

chai.use(chaiHttp);
chai.should();

describe('api base route (/)', () => {
  it('responds with correct response', () => chai
    .request(app)
    .get('/api/')
    .set('Accept', 'application/json')
    .then((res) => {
      const { body } = res;
      res.should.have.status(200);
      body.title.should.equal(pkgJSON.name);
      body.should.have.property('environment');
      body.version.should.equal(pkgJSON.version);
      body.should.have.property('commit');
    })
    .catch((err) => {
      throw err;
    }));
});
