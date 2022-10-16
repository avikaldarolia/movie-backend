const express = require('express');
const app = express();
// const Sequelize = require('./sequelize');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

// const test = async () => {
//   const [results, metadata] = await sequelize.query(
//     'INSERT INTO test_table id values 1'
//   );
// };

// test();
