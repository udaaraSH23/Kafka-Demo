const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "driver-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
  console.log("✅ Driver Producer connected");
}

async function sendMessage(topic, message) {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`📤 Sent message to ${topic}:`, message);
  } catch (err) {
    console.error("❌ Error sending message:", err);
  }
}

module.exports = { connectProducer, sendMessage };
