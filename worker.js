const { parentPort } = require("worker_threads");

const start = Date.now();
for (let i = 0; i < 1e10; i++);
const end = Date.now();

parentPort.postMessage(`\nBlocking operation took ${end - start} ms.`);
