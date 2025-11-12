// index.js
const express = require('express');
const path = require('path');
const router = require('../app');
const app = express();

app.use('/', router);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const str = path.join(__dirname, '..', 'index.html');
  console.log(str);
  res.sendFile(str);
});

app.listen(PORT, () => {
  console.log(`Seat-locking API running at http://localhost:${PORT}`);
});
