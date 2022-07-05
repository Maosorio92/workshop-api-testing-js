const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');
const chai = require('chai');
const chaiSubset = require('chai-subset');
const md5 = require('md5');

chai.use(chaiSubset);

describe('Repositories GET', () => {
  let userResponse;
  before(async () => {
    userResponse = await axios.get('https://api.github.com/users/aperdomob');
  });
  it('Consume GET Service on GITHUB API', () => {
    expect(userResponse.status).to.equal(StatusCodes.OK);
    expect(userResponse.data.name).to.equal('Alejandro Perdomo');
    expect(userResponse.data.company).to.equal('Perficient Latam');
    expect(userResponse.data.location).to.equal('Colombia');
  });
  describe('Using hypermedia', () => {
    let jasmineRepo;
    before(async () => {
      const repositoriesResponse = await axios.get(`${userResponse.data.repos_url}`);
      jasmineRepo = repositoriesResponse.data.find(
        (repo) => repo.name === 'jasmine-json-report'
      );
    });
    it('To verify jasmin repo', () => {
      expect(jasmineRepo.name).to.equal('jasmine-json-report');
      expect(jasmineRepo.private).to.equal(false);
      expect(jasmineRepo.description).not.equal(null);
    });
    it('Downloading by zip', async () => {
      const response = await axios.get(`${jasmineRepo.url}/zipball/master`);
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.headers['content-type']).to.equal('application/zip');
    });
    it('Finding REAMDE', async () => {
      const response = await axios.get(`${jasmineRepo.url}/contents`);
      const obj = response.data;
      expect(obj).to.containSubset([{
        name: 'README.md',
        path: 'README.md',
        sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
      }]);
      expect(response.status).to.equal(StatusCodes.OK);
    });
    it('Downloading README and checking md5', async () => {
      const response = await axios.get(`${jasmineRepo.url}/contents`);
      const response2 = await axios.get(`${response.data[2].download_url}`);
      const obj = response2.data;
      const hash = md5(obj);
      expect(hash).to.equal('497eb689648cbbda472b16baaee45731');
    });
  });
});
