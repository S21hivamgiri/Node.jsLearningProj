const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/non-blocking', (req, res) => {
  res.status(200).send('This is Non Blocking Syncronous route');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

