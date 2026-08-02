const { workerData, parentPort } = require("worker_threads");

console.log(`Worker thread ${workerData.cpu} ${workerData.i} started.`);
const start = Date.now();
// FOr Index sensitive operation
// const size= (1e10 / workerData.cpu)
// const block = size * workerData.i;
// for (let i = block; i < block + size; i++);
for (let i = 0; i < 1e10 / workerData.cpu; i++);
const end = Date.now();

parentPort.postMessage(
  `\nBlocking operation ${workerData.i} took ${end - start} ms.`,
);
