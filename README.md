ChatbotOS
A fullstack chatbot operating system built with React + TypeScript (frontend) and Django (backend).
Project Structure
```
chatbot-poc/
├── frontend/   # React + TypeScript + Vite
└── backend/    # Django + Django REST Framework
```
Features
Chat interface with predefined bot responses
Message history loaded on page open
Dashboard with real-time stats
Daily / monthly filter on the dashboard
Custom SVG bar chart — no chart library
---
Running the Backend
1. Go into the backend folder
```bash
cd backend
```
2. Create and activate a virtual environment
```bash
python3 -m venv venv
source venv/bin/activate
```
3. Install dependencies
```bash
pip install -r requirements.txt
```
4. Run migrations
```bash
python manage.py migrate
```
5. (Optional) Create an admin user
```bash
python manage.py createsuperuser
```
6. Start the server
```bash
python manage.py runserver
```
The backend will be running at: http://localhost:8000
---
Running the Frontend
Open a new terminal tab.
1. Go into the frontend folder
```bash
cd chatbot-poc/frontend
```
2. Install dependencies
```bash
npm install
```
3. Start the dev server
```bash
npm run dev
```
The frontend will be running at: http://localhost:5175/
---
API Endpoints
Method	URL	Description
POST	`/api/chat/`	Send a message, receive a bot reply
GET	`/api/messages/`	Fetch all messages in order
GET	`/api/stats/?filter=daily`	Stats grouped by day
GET	`/api/stats/?filter=monthly`	Stats grouped by month
---
Bot Keywords
The bot responds to these keywords (case insensitive):
Keyword	Response
hello, hi	Greeting
help	Lists what the bot can answer
hours	Opening hours
price, pricing	Pricing info
contact	Contact email
bye	Farewell
thanks, thank you	Acknowledgement
Anything else gets a fallback response.
---
Tech Stack
Layer	Technology
Frontend	React 19, TypeScript, Vite, React Router
Backend	Django 4, Django REST Framework
Database	SQLite
Styling	Plain CSS per component
Charts	Custom SVG — no chart library
