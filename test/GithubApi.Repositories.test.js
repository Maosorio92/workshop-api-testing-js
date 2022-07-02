const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');
const chai = require('chai');
const chaiSubset = require('chai-subset');
const md5 = require('md5');

chai.use(chaiSubset);

const urlrepos = 'https://api.github.com/repos/aperdomob/jasmine-json-report';

describe('Repositories GET', () => {
  it('Consume GET Service on GITHUB API', async () => {
    const response = await axios.get('https://api.github.com/users/aperdomob');
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.name).to.equal('Alejandro Perdomo');
    expect(response.data.company).to.equal('Perficient Latam');
    expect(response.data.location).to.equal('Colombia');
  });

  it('Finding by Hypermedia', async () => {
    const response = await axios.get('https://api.github.com/users/aperdomob/repos');
    const repo = response.data;
    function isjasmine(nombre) {
      return nombre.name === 'jasmine-json-report';
    }
    const jasmine = repo.find(isjasmine);
    expect(jasmine.name).to.equal('jasmine-json-report');
    expect(jasmine.private).to.equal(false);
    expect(jasmine.description).not.equal(null);
  });
  it('Downloading by zip', async () => {
    const response = await axios.get(`${urlrepos}/zipball/master`);
    expect(response.status).to.equal(StatusCodes.OK);
  });
  it('Finding REAMDE', async () => {
    const response = await axios.get('https://api.github.com/repos/aperdomob/jasmine-json-report/contents');
    const obj = response.data;
    expect(obj).to.containSubset([{
      name: 'README.md',
      path: 'README.md',
      sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
    }]);
    expect(response.status).to.equal(StatusCodes.OK);
  });
  it('Downloading REAMDE and checking md5', async () => {
    const response = await axios.get('https://raw.githubusercontent.com/aperdomob/jasmine-json-report/master/README.md');
    const obj = response.data;
    const hash = md5(obj);
    console.log(`MD5 is ${hash}`);
    expect(hash).not.equal(null);
  });
});
