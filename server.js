const express = require('express');
const cors = require('cors')
const app = express();
const utils = require('./utils/utils')
// const Sequelize = require('./sequelize');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.disable('x-powered-by');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

require(__dirname + '/routes/').forEach(function (route) {
  app.use(route.prefix, route.app);
});


app.use(utils.errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});


