const { Kafka } = require("kafkajs");
const { sendMessage } = require("./producer");

// Simulate multiple drivers
const drivers = ["driver_101", "driver_102", "driver_103"];

const kafka = new Kafka({
  clientId: "driver-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "driver-group" });

async function connectConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "ride-request", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const rideRequest = JSON.parse(message.value.toString());
      console.log("🚗 Driver Service received ride request:", rideRequest);

      // Assign a random driver
      const assignedDriver = drivers[Math.floor(Math.random() * drivers.length)];
      const rideAssigned = {
        rideId: rideRequest.timestamp,
        driverId: assignedDriver,
        userId: rideRequest.userId,
        pickup: rideRequest.pickup,
        destination: rideRequest.destination,
      };

      await sendMessage("ride-assigned", rideAssigned);
      console.log(`✅ Ride assigned to ${assignedDriver}`);
    },
  });

  console.log("✅ Driver Consumer connected");
}

module.exports = { connectConsumer };
