const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');
const chai = require('chai');
const chaiSubset = require('chai-subset');
const md5 = require('md5');

chai.use(chaiSubset);

const urlrepos = 'https://api.github.com/repos/aperdomob/jasmine-json-report';

describe('Repositories GET', () => {
  let userResponse;

  before(async () => {
    userResponse = await axios.get('https://api.github.com/users/aperdomob');
  });
  it('Consume GET Service on GITHUB API', async () => {
    expect(userResponse.status).to.equal(StatusCodes.OK);
    expect(userResponse.data.name).to.equal('Alejandro Perdomo');
    expect(userResponse.data.company).to.equal('Perficient Latam');
    expect(userResponse.data.location).to.equal('Colombia');
  });

  describe('Using hypermedia', () => {
    let jasmineRepo;
    before(async () => {
      const repositoriesResponse = await axios.get(`${userResponse.repos_url}`);
      jasmineRepo = repositoriesResponse.data.find((repo) => repo.name === 'jasmine-json-report');
    });
    it('Finding by Hypermedia', async () => {
      expect(jasmineRepo.name).to.equal('jasmine-json-report');
      expect(jasmineRepo.private).to.equal(false);
      expect(jasmineRepo.description).not.equal(null);
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
});
