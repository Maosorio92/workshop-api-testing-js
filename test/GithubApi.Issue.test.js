const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

const urlBase = 'https://api.github.com/user';
const token = process.env.ACCESS_TOKEN;

const urlBase2 = 'https://api.github.com/repos/Maosorio92/miweb/issues';
const obj = axios.create({
  url: urlBase2,
  headers: {
    Authorization: `token ${token}`
  }
});
describe('Methods PATCH & POST', () => {
  let response;
  before(async () => {
    response = await axios.get(`${urlBase}`, {
      headers: {
        Authorization: `token ${token}`
      }
    });
  });
  it('Get Loged User', async () => {
    const response2 = await axios.get(`${response.data.repos_url}`);
    const repos = response2.data.find((x) => x.visibility === 'public');
    expect(response.status).to.equal(StatusCodes.OK);
    expect(repos.visibility).to.equal('public');
  });
  it('Repo exists', async () => {
    const response2 = await axios.get(`${response.data.repos_url}`);
    const repos = response2.data.find((x) => x.name === 'miweb');
    expect(response.status).to.equal(StatusCodes.OK);
    expect(repos.id).to.not.equal(undefined);
  });
  it('Creating Issue', async () => {
    const response2 = await obj.post(`${urlBase2}`, {
      title: 'Issue5'
    });
    expect(response2.data.body).to.equal(null);
    expect(response2.status).to.equal(201);
    expect(response2.data.title).to.equal('Issue5');
  });
  it('Changing Issue', async () => {
    const response2 = await obj.patch(`${urlBase2}/17`, {
      title: 'Issue3',
      body: 'Learning and learning'
    });
    expect(response2.data.body).to.equal('Learning and learning');
    expect(response2.status).to.equal(StatusCodes.OK);
    expect(response2.data.title).to.equal('Issue3');
  });
});
