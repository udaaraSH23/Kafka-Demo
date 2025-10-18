const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "notification-group" });

async function connectConsumer() {
  await consumer.connect();

  // Subscribe to ride-status and payment topics
  await consumer.subscribe({ topic: "ride-status", fromBeginning: true });
  await consumer.subscribe({ topic: "payment", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const event = JSON.parse(message.value.toString());

      if (topic === "ride-status") {
        console.log(`📢 Ride Update: User ${event.userId}, Ride ${event.rideId}, Status: ${event.status}`);
      } else if (topic === "payment") {
        console.log(`💵 Payment Notification: User ${event.userId}, Ride ${event.rideId}, Amount: $${event.amount}`);
      }
    },
  });

  console.log("✅ Notification Service connected to Kafka");
}

module.exports = { connectConsumer };
