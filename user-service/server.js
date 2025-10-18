const express = require("express");
const { connectProducer, sendMessage } = require("./producer");

const app = express();
app.use(express.json());

// Connect Kafka Producer at startup
connectProducer();

// POST /request-ride
app.post("/request-ride", async (req, res) => {
  const { userId, pickup, destination } = req.body;
  if (!userId || !pickup || !destination)
    return res.status(400).json({ error: "Missing fields" });

  const rideRequest = {
    userId,
    pickup,
    destination,
    timestamp: Date.now(),
  };

  await sendMessage("ride-request", rideRequest);
  res.json({ status: "Ride requested", rideRequest });
});

const PORT = 4001;
app.listen(PORT, () => console.log(`👤 User Service running on port ${PORT}`));
