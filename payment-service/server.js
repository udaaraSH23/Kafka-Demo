const express = require("express");
const { connectConsumer } = require("./consumer");

const app = express();

connectConsumer();

app.listen(4004, () => console.log("💳 Payment Service running on port 4004"));
