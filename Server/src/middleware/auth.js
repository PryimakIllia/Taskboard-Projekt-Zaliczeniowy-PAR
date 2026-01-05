// middleware/auth.js

const AUTH_TOKEN = "mysecrettoken"; // <- встав свій токен сюди

function authMiddleware(req, res, next) {
    console.log("Received headers:", req.headers); // дебаг

    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: "Unauthorized: no token" });

    const token = authHeader.split(' ')[1];
    console.log("Received token:", token); // дебаг
    if (token !== AUTH_TOKEN) return res.status(401).json({ error: "Unauthorized: invalid token" });

    next();
}

module.exports = authMiddleware;
