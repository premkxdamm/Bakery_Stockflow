# 7M Hackathon Project

Welcome to your hackathon project workspace! This project is pre-configured with a modern Full-Stack architecture:
- **Backend**: Spring Boot 3.5.x (Java 21) + Maven + Spring Data JPA + MySQL + OpenAPI / Swagger
- **Frontend**: React 19 + Vite + Axios + React Router DOM + Lucide Icons
- **Database**: MySQL scripts ready in `/database`
- **Docs**: Architecture and API references in `/docs`
- **AI**: Prompts and AI integration templates in `/ai`

---

## 📁 Project Structure

```text
7MHackethon/
├── backend/                  # Spring Boot Java 21 REST API
│   ├── .mvn/wrapper/         # Maven wrapper (no local Maven install needed)
│   ├── src/main/java/        # Clean layered architecture (controller, service, model, repo)
│   ├── src/main/resources/   # application.properties (MySQL, server port 8080)
│   ├── mvnw.cmd / mvnw       # Maven wrapper scripts
│   └── pom.xml               # Dependencies (Web, JPA, Lombok, MySQL, Swagger)
│
├── frontend/                 # React 19 + Vite Single Page Application
│   ├── src/
│   │   ├── api/              # Pre-configured Axios API client (api.js)
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page views
│   │   ├── App.jsx           # Root component with live backend health check
│   │   └── main.jsx          # Entry point
│   ├── .env                  # Environment variables (VITE_API_BASE_URL)
│   ├── package.json          # React, Vite, Axios, React Router, Lucide
│   └── vite.config.js        # Vite configuration
│
├── database/                 # SQL schemas and seed scripts
│   ├── schema.sql
│   └── seed_data.sql
│
├── docs/                     # Documentation & API specs
│   ├── SETUP_GUIDE.md
│   └── API_DOCUMENTATION.md
│
└── ai/                       # AI models, prompts, scripts
    └── README.md
```

---

## 🚀 Quick Start

### 1. Start Backend (Spring Boot)
In a PowerShell terminal:
```powershell
cd C:\7MHackethon\backend
.\mvnw.cmd spring-boot:run
```
- API will run at: `http://localhost:8080`
- Swagger UI (interactive docs): `http://localhost:8080/swagger-ui.html`
- Health check: `http://localhost:8080/api/health`

### 2. Start Frontend (React + Vite)
In another terminal:
```powershell
cd C:\7MHackethon\frontend
npm run dev
```
- Vite dev server will run at: `http://localhost:5173`
- Pre-configured to communicate with backend at `http://localhost:8080`

### 3. Database Setup (MySQL)
- Default database: `hackathon_db`
- Configured in `backend/src/main/resources/application.properties` with user `root` / `yuvi`
- Run `database/schema.sql` and `database/seed_data.sql` in MySQL Workbench or CLI when needed.
