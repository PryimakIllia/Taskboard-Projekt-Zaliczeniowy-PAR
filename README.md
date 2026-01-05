# Real-Time Task Board

## 1. Opis projektu

Projekt został zrealizowany w ramach przedmiotu **PAR – Projektowanie aplikacji rozproszonych**, semestr V.

Aplikacja oparta jest na architekturze klient-serwer i demonstruje hybrydowy model komunikacji:

- Synchroniczny: REST API do operacji CRUD  
- Asynchroniczny: WebSocket do natychmiastowych powiadomień  
- Zarządzanie stanem zadań w czasie rzeczywistym

Projekt napisany w Node.js, dane przechowywane są w pamięci (brak bazy danych).

---

## 2. Architektura systemu

System składa się z jednego serwera Node.js oraz dwóch typów klientów.

### Serwer (`server/src/app.js`) odpowiada za:

- Przechowywanie stanu zadań w pamięci  
- REST API dla operacji CRUD: `/tasks`  
- WebSocket do natychmiastowych powiadomień dla wszystkich podłączonych klientów  
- Serwowanie statycznego klienta: `public/client.html`  

### Klienci

1. **REST Clients** - wysyłają zapytania CRUD na zadania (PowerShell, curl, Postman)  
2. **WebSocket Clients** - odbierają powiadomienia w czasie rzeczywistym (HTML + JS, `client.html`)  

---

## 3. Protokoły i użyte biblioteki

### REST API (HTTP + JSON)

- Synchronizacja i operacje CRUD  
- Biblioteki: `express`, `cors`  
- Operacje:  
  - `GET /tasks` - pobierz wszystkie zadania  
  - `POST /tasks` - dodaj nowe zadanie `{ "title": "...", "description": "..." }`  
  - `PUT /tasks/:id` - aktualizuj zadanie `{ "title": "...", "description": "...", "status": "OPEN|IN_PROGRESS|DONE" }`  
  - `DELETE /tasks/:id` - usuń zadanie  
- Authorization: wszystkie żądania REST wymagają tokenu w nagłówku:  
  `"Authorization: Bearer mysecrettoken"`  

### WebSocket

- Natychmiastowe powiadomienia dla wszystkich klientów  
- Biblioteka: `ws`  
- Adres: `ws://localhost:3000`  
- Serwer wysyła zdarzenia:  
  - `TASK_CREATED` - nowe zadanie  
  - `TASK_UPDATED` - zaktualizowane zadanie  
  - `TASK_DELETED` - usunięte zadanie  
- Klient live-log pokazuje wszystkie zdarzenia REST i WS w czasie rzeczywistym  

### Node.js + npm

- Runtime i zarządzanie zależnościami  

> **Uzasadnienie wyboru protokołów:**  
> - REST jest prosty w implementacji, umożliwia łatwe testowanie i obsługę operacji CRUD  
> - WebSocket pozwala na real-time powiadomienia dla wszystkich klientów, co zwiększa interaktywność aplikacji  

---

## 4. Struktura projektu

taskboard1/
├── server/
│ ├── src/
│ │ ├── app.js # Główny plik serwera
│ │ ├── routes/
│ │ │ └── tasks.js # Trasy REST dla CRUD zadań
│ │ ├── wsServer/
│ │ │ └── wsServer.js # Broadcast WebSocket
│ │ └── data/
│ │ └── tasks.js # Logika CRUD w pamięci
│ ├── package.json
│ └── Dockerfile # Dockerfile serwera
├── public/
│ └── client.html # Klient WebSocket
├── docker-compose.yml
└── README.md # Dokumentacja projektu

---

## 5. Instalacja i uruchomienie

### 5.1 Lokalnie (Node.js)

Zainstaluj zależności:
cd server
npm install

Uruchom serwer:
node src/app.js

Otwórz klienta w przeglądarce:

file://<ścieżka_projektu>/server/public/client.html
Można otworzyć kilka zakładek jako różni klienci WebSocket.

REST API test
Pobranie wszystkich zadań:

GET http://localhost:3000/tasks
Authorization: Bearer mysecrettoken
Dodanie zadania:

POST http://localhost:3000/tasks
Authorization: Bearer mysecrettoken
Body: { "title": "Test", "description": "Desc" }
Aktualizacja zadania:

PUT http://localhost:3000/tasks/:id
Authorization: Bearer mysecrettoken
Body: { "title": "...", "description": "...", "status": "DONE" }
Usunięcie zadania:

DELETE http://localhost:3000/tasks/:id
Authorization: Bearer mysecrettoken
5.2 Docker
Budowanie i uruchomienie kontenera:

docker compose up --build
Serwer dostępny pod:

http://localhost:3000/
Klient przeglądarkowy:

http://localhost:3000/client.html
6. Problemy i sposoby ich rozwiązania
Brak tokena w nagłówku REST → zwracany błąd 401 Unauthorized. Rozwiązanie: dodać nagłówek Authorization: Bearer <token>.

Nieistniejący ID zadania → zwracany błąd 404 Not Found. Rozwiązanie: obsługa błędów w routerze REST.

WebSocket nie działa w Dockerze → upewnić się, że port 3000 jest otwarty i poprawnie przekierowany w docker-compose.yml.

Brak bazy danych → dane przechowywane w pamięci. Możliwość przyszłego rozszerzenia projektu o bazę (MongoDB, SQLite, PostgreSQL).

7. Uwagi
Dane przechowywane w pamięci, brak bazy danych

Obsługa wielu klientów jednocześnie przez WebSocket

Token Authorization wymagany dla REST

Klient live-log pokazuje wszystkie zdarzenia REST i WS w czasie rzeczywistym

Docker umożliwia szybkie uruchomienie projektu bez instalowania Node.js

Projekt demonstruje hybrydowy model komunikacji: synchroniczna + asynchroniczna

8. Podsumowanie
Projekt jest kompletny i funkcjonalny:

REST API do operacji CRUD

WebSocket do real-time powiadomień

Obsługa dwóch typów klientów

Docker + Node.js

Można go łatwo rozbudować, np. dodając bazę danych lub kolejkę wiadomości do obsługi zadań w tle.

9. Autor
Illia Pryimak 
Numer Indeksu: 164657