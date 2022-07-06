const { expect } = require('chai');
const axios = require('axios');

const urlBase = 'https://api.github.com/user/following';
const token = process.env.ACCESS_TOKEN;
const obj = axios.create({
  url: urlBase,
  headers: {
    Authorization: `token ${token}`
  }
});

describe('Repositories PUT', () => {
  it('Following APERDOMO', async () => {
    const response = await obj.put(`${urlBase}/aperdomob`);
    expect(response.status).to.equal(204);
    expect(response.data).to.equal('');
  });
  it('True Following', async () => {
    const response = await obj.get(`${urlBase}`);
    expect(response.data.find((x) => x.login === 'aperdomob')).to.not.equal(undefined);
  });
  it('Following APERDOMO 2nd time', async () => {
    const response = await obj.put(`${urlBase}/aperdomob`);
    expect(response.status).to.equal(204);
    expect(response.data).to.equal('');
  });
  it('True Following 2nd time', async () => {
    const response = await obj.get(`${urlBase}`);
    expect(response.data.find((x) => x.login === 'aperdomob')).to.not.equal(undefined);
  });
});
