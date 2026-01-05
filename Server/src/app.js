const express = require("express");
const tasksRouter = require("./routes/tasks");
const http = require("http");
const wsServer = require("./wsServer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const AUTH_TOKEN = process.env.AUTH_TOKEN || "mysecrettoken";

// --- Дозволяємо fetch із будь-якого джерела ---
app.use(cors());
app.use(express.json());

// --- Статика для клієнта ---
app.use(express.static("public")); // client.html поміщаємо в папку public

// --- Middleware для Auth токена (REST) ---
app.use((req, res, next) => {
    if (req.path.startsWith("/tasks")) {
        const auth = req.headers["authorization"];
        if (!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
            return res.status(401).json({ error: "Unauthorized: no token" });
        }
    }
    next();
});

// --- API ---
app.use("/tasks", tasksRouter);

// --- Health check ---
app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

// --- Маршрут / ---
app.get("/", (req, res) => {
    res.send("Task Board Server is running 🚀");
});

const server = http.createServer(app);

// --- WebSocket ---
wsServer.init(server);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
