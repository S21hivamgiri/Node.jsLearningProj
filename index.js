const express = require("express");
const app = express();
const port = process.env.port || 3000;

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/non-blocking-sync", (req, res) => {
  // Simulate a blocking operation
  const start = Date.now();
  console.log("Non Blocking Syncronous route started");
  const end = Date.now();
  res.status(200).send(`This is Non Blocking Syncronous route took ${end - start} ms`);
  // My output `This is Non Blocking Syncronous route took 0 ms`
});

app.get("/blocking-sync", (req, res) => {
  // Simulate a blocking operation
  const start = Date.now();
  for (let i = 0; i < 1e10; i++);
  const end = Date.now();
  res.status(200).send(`Blocking operation took ${end - start} ms`);
  // My output `Blocking operation took 11405 ms`
});

app.get("/worker-async", async (req, res) => {
  const start = Date.now();
  const { Worker } = require("worker_threads");
  const worker = new Worker("./worker.js");
  worker.on("message", (message) => {
    res.status(200).write(message);
    res.end();
  });
  worker.on("error", (error) => {
    res.status(500).write(`Worker error: ${error.message}`);
    res.end();
  });
  const end = Date.now();
    res.write(`Main thread took ${end - start} ms`);
  // My output `Main thread took 4 ms. Blocking operation took 10856 ms.`
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
