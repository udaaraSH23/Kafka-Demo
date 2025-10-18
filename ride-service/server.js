const express = require("express");
const { connectProducer } = require("./producer");
const { connectConsumer } = require("./consumer");

const app = express();

async function init() {
  await connectProducer();
  await connectConsumer();
}

init();

app.listen(4003, () => console.log("🚖 Ride Service running on port 4003"));
