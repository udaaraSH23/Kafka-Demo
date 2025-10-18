const express = require("express");
const { connectConsumer } = require("./consumer");

const app = express();

connectConsumer();

app.listen(4005, () => console.log("📣 Notification Service running on port 4005"));
