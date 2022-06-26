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

 newuser={
    "name": "Manuel", "age":"29", "born_in":"Colombia", "activity":"learning"
}

  it('Consume HEAD Service', async () => {
    const response = await axios.head('https://httpbin.org/get');
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.headers).to.not.equal(null);
    console.log("Status is ",response.status);
  });

  it('Consume POST Service', async () => {
    const response = await axios.post('https://httpbin.org/post',newuser);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.have.property("name");
    console.log("Status is ",response.status);
    console.log("Name of new user is ",response.data.json.name, " , age is ", response.data.json.age, " and activity is ", response.data.json.activity);
  });

  it('Consume PATCH Service', async () => {
    const response = await axios.patch('https://httpbin.org/patch',newuser);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.have.property("age");
    console.log("Status is ",response.status);
  });

  it('Consume PUT Service', async () => {
    const response = await axios.put('https://httpbin.org/put',newuser);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.have.property("born_in");
    console.log("Status is ",response.status);
  });
  
  it('Consume DELETE Service', async () => {
    const response = await axios.delete('https://httpbin.org/delete',newuser);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.length.to.eql(null);
  });
  
});
