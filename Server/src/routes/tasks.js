const express = require("express");
const router = express.Router();
const taskData = require("../data/tasks");
const { broadcast } = require("../wsServer"); // WebSocket
const authMiddleware = require("../middleware/auth");

// Застосовуємо middleware до всіх маршрутів
router.use(authMiddleware);

// GET /tasks
router.get("/", (req, res) => {
    res.json(taskData.getAllTasks());
});

// POST /tasks
router.post("/", (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const task = taskData.createTask(title, description || "", "OPEN"); // статус за замовчуванням

    // WebSocket подія TASK_CREATED
    broadcast({ type: "TASK_CREATED", task });
    res.status(201).json(task);
});

// PUT /tasks/:id
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, status } = req.body;

    // Оновлюємо таск
    const updated = taskData.updateTask(id, { title, description, status });
    if (!updated) return res.status(404).json({ error: "Task not found" });

    // WebSocket подія TASK_UPDATED
    broadcast({ type: "TASK_UPDATED", task: updated });
    res.json(updated);
});

// DELETE /tasks/:id
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const success = taskData.deleteTask(id);
    if (!success) return res.status(404).json({ error: "Task not found" });

    // WebSocket подія TASK_DELETED
    broadcast({ type: "TASK_DELETED", taskId: id });
    res.json({ success: true });
});

module.exports = router;
