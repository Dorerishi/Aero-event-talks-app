
const express = require('express');
const app = express();
const port = 3000;

const talks = require('./talks.json');

app.use(express.static('public'));

app.get('/api/talks', (req, res) => {
  res.json(talks);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
