const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');
const chai = require('chai');
const chaiSubset = require('chai-subset');

chai.use(chaiSubset);

const userUrl = 'https://api.github.com/gists';
const token = process.env.ACCESS_TOKEN;
const gistUrl = 'https://api.github.com/gists';
const gist = {
  description: 'Example of a gist of JS Promise',
  public: true,
  files: {
    'saludoPromesa.js': {
      content: `const saludo= new Promise(function(resolve, reject) {
        const saludar= "Hola Mundo!";
        setTimeout(() => {
          if (true) {
            resolve(saludar);
          } else {
            reject("No hemos podido saludarte");
          }
        }, 1000);
      });
      saludo.then((saludar) => console.log(saludar));
      saludo.catch((error) => console.log(error));
      saludo.finally(() => console.log("Saludo finalizado"));`
    }
  }
};

const axiosClient = axios.create({
  headers: {
    Authorization: `token ${token}`
  }
});
describe('DELETE Method', () => {
  let userResponse;
  before(async () => {
    userResponse = await axiosClient.post(`${userUrl}`, gist);
  });
  it('Creating GIST', async () => {
    expect(userResponse.status).to.equal(201);
    expect(userResponse.data).to.containSubset(gist);
  });
  it('Get a GIST', async () => {
    const gistResponse = await axiosClient.get(userResponse.data.url);
    expect(gistResponse.status).to.equal(StatusCodes.OK);
    expect(gistResponse.data.id).to.equal(userResponse.data.id);
  });
  it('Delete a GIST', async () => {
    const gistResponse = await axiosClient.delete(`${gistUrl}/${userResponse.data.id}`);
    expect(gistResponse.status).to.equal(StatusCodes.NO_CONTENT);
  });
  it('Get a GIST after deleted', async () => {
    let response;
    try {
      await axiosClient.get(userResponse.data.url);
    } catch (error) {
      response = error.response;
    }
    expect(response.status).to.equal(404);
  });
});
