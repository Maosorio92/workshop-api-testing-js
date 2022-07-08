const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

const userUrl = 'https://api.github.com/user';
const token = process.env.ACCESS_TOKEN;

const miWebIssuesUrl = 'https://api.github.com/repos/Maosorio92/miweb/issues';
const axiosClient = axios.create({
  headers: {
    Authorization: `token ${token}`
  }
});
describe('Methods PATCH & POST', () => {
  let reposResponse;
  let issueCreationResponse;
  before(async () => {
    const userResponse = await axiosClient.get(`${userUrl}`, {
      headers: {
        Authorization: `token ${token}`
      }
    });
    reposResponse = await axiosClient.get(`${userResponse.data.repos_url}`);
  });
  it('Get Loged User', async () => {
    expect(reposResponse.status).to.equal(StatusCodes.OK);
    expect(reposResponse.data.find((x) => x.visibility === 'public')).to.not.equal(undefined);
  });
  it('Repo exists', async () => {
    expect(reposResponse.status).to.equal(StatusCodes.OK);
    expect(reposResponse.data.find((x) => x.name === 'miweb')).to.not.equal(undefined);
  });
  it('Creating Issue', async () => {
    issueCreationResponse = await axiosClient.post(`${miWebIssuesUrl}`, {
      title: 'Issue7'
    });
    console.log(issueCreationResponse.data.number);
    expect(issueCreationResponse.data.body).to.equal(null);
    expect(issueCreationResponse.status).to.equal(201);
    expect(issueCreationResponse.data.title).to.equal('Issue7');
  });
  it('Changing Issue', async () => {
    const issueUpdated = axiosClient.patch(`${miWebIssuesUrl}/${issueCreationResponse.data.number}`, {
      body: 'Learning and learningx2'
    });
    expect(issueUpdated.data.body).to.equal('Learning and learning');
    expect(issueUpdated.status).to.equal(StatusCodes.OK);
    expect(issueUpdated.data.title).to.equal('Issue7');
  });
});
