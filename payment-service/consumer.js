const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "payment-group" });
const producer = kafka.producer();

async function connectConsumer() {
  await consumer.connect();
  await producer.connect();

  await consumer.subscribe({ topic: "ride-status", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const ride = JSON.parse(message.value.toString());

      // Only process completed rides
      if (ride.status === "completed") {
        const paymentEvent = {
          rideId: ride.rideId,
          userId: ride.userId,
          driverId: ride.driverId,
          amount: Math.floor(Math.random() * 100) + 10, // simulate fare
          timestamp: Date.now(),
        };

        await producer.send({
          topic: "payment",
          messages: [{ value: JSON.stringify(paymentEvent) }],
        });

        console.log("💰 Payment processed:", paymentEvent);
      }
    },
  });

  console.log("✅ Payment Service connected to Kafka");
}

module.exports = { connectConsumer };
