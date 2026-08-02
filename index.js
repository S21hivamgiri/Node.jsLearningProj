const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/non-blocking', (req, res) => {
  res.status(200).send('This is Non Blocking Syncronous route');
});

app.get('/blocking', (req, res) => {
  // Simulate a blocking operation
  const start = Date.now();
  for (let i = 0; i < 1e10; i++);
  const end = Date.now();
  res.status(200).send(`Blocking operation took ${end - start} ms`);
  // My output `Blocking operation took 11284 ms`
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

