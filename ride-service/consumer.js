const { Kafka } = require("kafkajs");
const { sendMessage } = require("./producer");

const kafka = new Kafka({
  clientId: "ride-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "ride-group" });

async function connectConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "ride-assigned", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const ride = JSON.parse(message.value.toString());
      console.log(`🚖 Ride Service received ride-assigned event:`, ride);

      // Simulate ride lifecycle (start -> complete)
      const started = { ...ride, status: "started", startTime: Date.now() };
      await sendMessage("ride-status", started);
      console.log("🏁 Ride started event published");

      setTimeout(async () => {
        const completed = { ...ride, status: "completed", endTime: Date.now() };
        await sendMessage("ride-status", completed);
        console.log("✅ Ride completed event published");
      }, 50000); // simulate 5 seconds ride time
    },
  });

  console.log("✅ Ride Consumer connected");
}

module.exports = { connectConsumer };
