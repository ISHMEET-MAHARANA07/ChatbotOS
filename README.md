# ChatbotOS

A fullstack chatbot operating system built with React + TypeScript (frontend) and Django (backend).

## Project Structure

```text
chatbot-poc/
├── frontend/   # React + TypeScript + Vite
└── backend/    # Django + Django REST Framework
```

## Features

- **Chat Interface**: Interactive chat with predefined bot responses.
- **Message History**: Chat history loads automatically on page open.
- **Analytics Dashboard**: Real-time stats with daily/monthly filters.
- **Custom Visualizations**: High-performance SVG bar chart (no third-party chart library).

---

## Running the Backend

1. **Go into the backend folder**
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **(Optional) Create an admin user**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the server**
   ```bash
   python manage.py runserver
   ```
   *The backend will be running at: http://localhost:8000*

---

## Running the Frontend

Open a new terminal tab.

1. **Go into the frontend folder**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the dev server**
   ```bash
   npm run dev
   ```
   *The frontend will be running at: http://localhost:5173/*

---

## API Endpoints

| Method | URL | Description |
| :--- | :--- | :--- |
| **POST** | `/api/chat/` | Send a message, receive a bot reply |
| **GET** | `/api/messages/` | Fetch all messages in chronological order |
| **GET** | `/api/stats/?filter=daily` | Telemetry stats grouped by day |
| **GET** | `/api/stats/?filter=monthly`| Telemetry stats grouped by month |

---

## Bot Keywords

The bot responds to these keywords (case insensitive):

| Keyword | Response Type |
| :--- | :--- |
| `hello`, `hi` | Greeting |
| `help` | Lists what the bot can answer |
| `hours` | Opening hours |
| `price`, `pricing` | Pricing info |
| `contact` | Contact email |
| `bye` | Farewell |
| `thanks`, `thank you` | Acknowledgement |

> *Note: Anything else gets a standard fallback response.*

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, React Router |
| **Backend** | Django 4+, Django REST Framework |
| **Database** | SQLite |
| **Styling** | Plain Vanilla CSS per component |
| **Charts** | Custom built SVG (No library dependency) |
