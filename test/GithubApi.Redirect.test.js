const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');
const chai = require('chai');
const chaiSubset = require('chai-subset');

chai.use(chaiSubset);

const userUrl = 'https://github.com/aperdomob/redirect-test';
const userReUrl = 'https://github.com/aperdomob/new-redirect-test';

describe('Repositories HEAD', () => {
  let userResponse;
  let userResponse2;
  before(async () => {
    userResponse = await axios.head(`${userUrl}`);
    userResponse2 = await axios.head(`${userReUrl}`);
  });
  it('Consume HEAD Service with redirect', () => {
    expect(userResponse.status).to.equal(StatusCodes.OK);
    expect(userResponse2.status).to.equal(StatusCodes.OK);
    expect(userResponse.request.res.responseUrl).to.equal(`${userReUrl}`);
  });
  it('Consume GET Service with redirect', async () => {
    const response = await axios.get(`${userUrl}`);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.request.res.responseUrl).to.equal(`${userReUrl}`);
  });
});
