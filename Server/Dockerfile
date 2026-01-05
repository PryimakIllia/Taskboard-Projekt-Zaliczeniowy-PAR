# --- Базовий образ ---
FROM node:24-alpine

# --- Робоча директорія в контейнері ---
WORKDIR /usr/src/app

# --- Копіюємо package.json та package-lock.json ---
COPY package*.json ./

# --- Встановлюємо залежності ---
RUN npm install --production

# --- Копіюємо весь код сервера (routes, wsServer, public, src тощо) ---
COPY . .

# --- Порт, який слухає сервер ---
EXPOSE 3000

# --- Команда запуску ---
CMD ["node", "src/app.js"]
