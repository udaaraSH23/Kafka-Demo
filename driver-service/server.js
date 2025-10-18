const express = require("express");
const { connectProducer } = require("./producer");
const { connectConsumer } = require("./consumer");

const app = express();

async function init() {
  await connectProducer();
  await connectConsumer();
}

init();

app.listen(4002, () => console.log("🚕 Driver Service running on port 4002"));
