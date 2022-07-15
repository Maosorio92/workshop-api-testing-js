const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');
const chai = require('chai');
const chaiSubset = require('chai-subset');

chai.use(chaiSubset);

describe('Repositories HEAD', () => {
  let userResponse;
  let userResponse2;
  before(async () => {
    userResponse = await axios.head('https://github.com/aperdomob/redirect-test');
    userResponse2 = await axios.head('https://github.com/aperdomob/new-redirect-test');
  });
  it('Consume HEAD Service with redirect', () => {
    expect(userResponse.status).to.equal(StatusCodes.OK);
    expect(userResponse2.status).to.equal(StatusCodes.OK);
    // console.log(userResponse.status);
    console.log(userResponse.headers.Location);
    console.log(userResponse2.headers);
  });
  it('Consume GET Service with redirect', async () => {
    const response = await axios.get('https://github.com/aperdomob/redirect-test');
    expect(response.status).to.equal(StatusCodes.OK);
    console.log(response.body);
  });
});
