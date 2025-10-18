# 🚖 Uber-like Microservices Demo with Kafka, Node.js & Express

This project demonstrates a **microservices-based architecture** using **Apache Kafka** as the message broker between independent services built with **Node.js** and **Express**.

Each service handles a specific responsibility (User, Driver, Ride, Payment, Notification), and they communicate asynchronously using **Kafka producers and consumers**.

---

## 🧩 Services Overview

| Service | Description | Kafka Topics |
|----------|--------------|---------------|
| **User Service** | Manages user creation and ride requests | `ride-requests` |
| **Driver Service** | Registers drivers and listens for new ride requests | `ride-requests`, `ride-assignments` |
| **Ride Service** | Handles ride creation, assignment, and updates | `ride-requests`, `ride-assignments`, `ride-status` |
| **Payment Service** | Processes ride payments | `ride-completed`, `payment-status` |
| **Notification Service** | Sends notifications to users and drivers | `ride-assignments`, `ride-status`, `payment-status` |

---

## ⚙️ Architecture

```
         +----------------+
         |   User Service |
         +-------+--------+
                 |
                 |  ride-requests
                 v
         +-------+--------+
         |   Ride Service |
         +-------+--------+
                 |
      +----------+----------+
      |                     |
ride-assignments     ride-status
      v                     v
+-----+------+       +-------+------+
| Driver Svc |       | Payment Svc  |
+-----+------+       +-------+------+
      |                     |
      +----------+----------+
                 |
          +------v------+
          | Notification|
          |   Service   |
          +-------------+
```

---

## 🧱 Tech Stack

- **Node.js**
- **Express.js**
- **KafkaJS**
- **Apache Kafka**
- **Docker Compose** (optional)

---

## 🧰 Prerequisites

- Node.js (v18+)
- Apache Kafka + Zookeeper
- Or use Docker Compose:
  ```bash
  docker-compose up -d
  ```

---

## 🚀 Setup & Run

### 1️⃣ Clone Repository

```bash
git clone git@github.com:udaaraSH23/Kafka-Demo.git
cd Kafka-Demo
```

### 2️⃣ Start Kafka


```bash
docker-compose up -d
```

---

### 3️⃣ Start Each Service

Open **five terminals**:

```bash
cd user-service && node server.js
cd ../driver-service && node server.js
cd ../ride-service && node server.js
cd ../payment-service && node server.js
cd ../notification-service && node server.js
```

---

## 🧪 Testing the Workflow

### Step 1: Request a Ride

```bash
curl -X POST http://localhost:3001/request-ride -H "Content-Type: application/json" -d '{"userId": "user123", "pickup": "Colombo", "destination": "Kandy"}'
```

➡️ Publishes a message to **`ride-requests`** topic.

---

## 🧩 Message Flow Example

1. **User → Ride Service:** `ride-request`
2. **Ride Service → Driver Service:** `ride-assignment`
3. **Driver Service → Ride Service:** `ride-accepted`
4. **Ride Service → Payment Service:** `ride-completed`
5. **Payment Service → Notification Service:** `payment-status`

---

## 📁 Project Structure

```
kafka-uber-demo/
│
├── user-service/
├── driver-service/
├── ride-service/
├── payment-service/
├── notification-service/
└── README.md
```

---

## 📡 Kafka Topics

| Topic | Description |
|--------|--------------|
| `ride-requests` | Created by user when requesting a ride |
| `ride-assignments` | Ride assigned to a driver |
| `ride-status` | Updates about ride progress |
| `ride-completed` | Triggered when ride is completed |
| `payment-status` | Sent after payment success/failure |

---

## 🧑‍💻 Author

**Udara**  
🚀 Full-Stack Developer | DevOps Enthusiast

---

## 🪪 License

MIT License
