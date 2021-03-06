const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('First Api Tests', () => {
  it('Consume GET Service', async () => {
    const response = await axios.get('https://httpbin.org/ip');
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data).to.have.property('origin');
  });

  it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };
    const response = await axios.get('https://httpbin.org/get', { query });
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config.query).to.eql(query);
  });

  const newuser = {
    name: 'Manuel', age: '29', born_in: 'Colombia', activity: 'learning'
  };

  it('Consume HEAD Service', async () => {
    const response = await axios.head('https://httpbin.org/get');
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.headers).to.not.equal(null);
  });

  it('Consume POST Service', async () => {
    const response = await axios.post('https://httpbin.org/post', newuser);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.have.property('name');
  });

  it('Consume PATCH Service', async () => {
    const response = await axios.patch('https://httpbin.org/patch', newuser);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.have.property('age');
  });

  it('Consume PUT Service', async () => {
    const response = await axios.put('https://httpbin.org/put', newuser);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.have.property('born_in');
  });

  it('Consume DELETE Service', async () => {
    const response = await axios.delete('https://httpbin.org/delete', newuser);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.length.to.eql(null);
  });
});
