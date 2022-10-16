const express = require('express');
const app = express();
// const Sequelize = require('./sequelize');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

require(__dirname + '/routes/').forEach(function (route) {
  app.use(route.prefix, route.app);
});


app.get('/', (req, res) => {
  res.send('Helloo World!');
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});


