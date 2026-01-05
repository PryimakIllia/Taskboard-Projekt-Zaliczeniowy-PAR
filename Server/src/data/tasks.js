let tasks = [];
let nextId = 1;

function getAllTasks() {
    return tasks;
}

function getTaskById(id) {
    return tasks.find(task => task.id === id);
}

function createTask(title, description) {
    const task = {
        id: nextId++,
        title,
        description,
        completed: false
    };
    tasks.push(task);
    return task;
}

function updateTask(id, updatedFields) {
    const task = tasks.find(task => task.id === id);
    if (!task) return null;
    Object.assign(task, updatedFields);
    return task;
}

function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};