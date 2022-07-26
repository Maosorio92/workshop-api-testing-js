const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

const userUrl = 'https://api.github.com/users';
const token = process.env.ACCESS_TOKEN;

const axiosClient = axios.create({
  headers: {
    Authorization: `token ${token}`
  }
});
describe('Methods PATCH & POST', () => {
  it('Get Users', async () => {
    const userResponse = await axiosClient.get(`${userUrl}`);
    expect(userResponse.status).to.equal(StatusCodes.OK);
    expect(userResponse.data.length).to.equal(30);
  });
  it('Get 10 Users', async () => {
    const params = {
      per_page: 10
    };
    const userResponse2 = await axiosClient.get(`${userUrl}`, { params });
    expect(userResponse2.status).to.equal(StatusCodes.OK);
    expect(userResponse2.data.length).to.equal(10);
  });
  it('Get 100 Users', async () => {
    const params = {
      per_page: 100
    };
    const userResponse2 = await axiosClient.get(`${userUrl}`, { params });
    expect(userResponse2.status).to.equal(StatusCodes.OK);
    expect(userResponse2.data.length).to.equal(100);
  });
});
