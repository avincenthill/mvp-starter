const express = require('express');
const bodyParser = require('body-parser');

// const items = require('../database-mongo');

const app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));

app.get('/test', (req, res) => {
  res.status(200).send();
});

app.listen(1337, () => {
  console.log('fizzbang server listening on port 1337...');
});
