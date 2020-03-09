const pg = require('pg');

const Client = pg.Client;

const options = {
  host: 'drona.db.elephantsql.com',
  database: 'wquprnon',
  user: 'wquprnon',
  password: 'TyvAJ-61ldtnZ9YZetkO2SC5T-jBtXny'
};

const client = new Client(options);

client.connect();

module.exports = client;

