const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');
const chai = require('chai');
const chaiSubset = require('chai-subset');

chai.use(chaiSubset);

const userUrl = 'https://api.github.com/gists';
const token = process.env.ACCESS_TOKEN;
const gistUrl = 'https://api.github.com/gists';
const usergistUrl = 'https://api.github.com/users/Maosorio92/gists';

const axiosClient = axios.create({
  headers: {
    Authorization: `token ${token}`
  }
});
describe('DELETE Method', () => {
  let userResponse;
  it('Creating GIST', async () => {
    userResponse = await axiosClient.post(`${userUrl}`, {
      description: 'Example of a gist of JS Promise',
      public: true,
      files: {
        'saludoPromesa.txt': {
          content: 'let saludo= new Promise(function(resolve, reject) {\n'
          + ' const saludar= "Hola Mundo!";\n'
          + ' setTimeout(() => {\n'
            + '   if (true){\n'
              + '     resolve (saludar);\n'
            + '   }\n'
            + '   else {\n'
              + '     reject ("No hemos podido saludarte");\n'
            + '   }\n'
          + ' },1000);\n'
        + '})\n'
        + 'saludo.then((saludar) => console.log(saludar));\n'
        + 'saludo.catch(() => console.log(error));\n'
        + 'saludo.finally(() => console.log("Saludo finalizado"));'
        }
      }
    });
    expect(userResponse.status).to.equal(201);
    expect(userResponse.data.description).to.equal('Example of a gist of JS Promise');
    expect(userResponse.data.public).to.equal(true);
    expect(userResponse.data.files['saludoPromesa.txt']).to.containSubset({
      filename: 'saludoPromesa.txt',
      content: 'let saludo= new Promise(function(resolve, reject) {\n'
      + ' const saludar= "Hola Mundo!";\n'
      + ' setTimeout(() => {\n'
        + '   if (true){\n'
          + '     resolve (saludar);\n'
        + '   }\n'
        + '   else {\n'
          + '     reject ("No hemos podido saludarte");\n'
        + '   }\n'
      + ' },1000);\n'
    + '})\n'
    + 'saludo.then((saludar) => console.log(saludar));\n'
    + 'saludo.catch(() => console.log(error));\n'
    + 'saludo.finally(() => console.log("Saludo finalizado"));'
    });
  });
  it('Get a GIST', async () => {
    const gistResponse = await axiosClient.get(`${gistUrl}/${userResponse.data.id}`);
    expect(gistResponse.status).to.equal(StatusCodes.OK);
    expect(gistResponse.data.id).to.equal(userResponse.data.id);
  });
  it('Delete a GIST', async () => {
    const gistResponse = await axiosClient.delete(`${gistUrl}/${userResponse.data.id}`);
    expect(gistResponse.status).to.equal(204);
  });
  it('Get a GIST after deleted', async () => {
    const gistResponse = await axiosClient.get(`${usergistUrl}`);
    expect(gistResponse.data.find((x) => x.id === `${userResponse.data.id}`)).to.equal(undefined);
  });
});
