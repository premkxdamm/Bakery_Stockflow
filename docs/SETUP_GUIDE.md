# 🚀 7M Hackathon Setup & Developer Guide

This guide contains everything you need to run and extend your project during the hackathon.

---

## 🛠️ Prerequisites Installed

- **Java JDK**: Version 21 (`C:\Program Files\Java\jdk-21.0.11`)
- **Maven**: Handled via included Maven Wrapper (`mvnw.cmd`)
- **Node.js**: Version 24+ (`v24.22.0`)
- **npm**: Version 11+ (`11.0.0`)
- **Git**: Initialized with `main` branch

---

## 🖥️ Running the Backend (Spring Boot)

1. Open PowerShell and navigate to the backend folder:
   ```powershell
   cd C:\7MHackethon\backend
   ```
2. Start the application:
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```
3. Test the endpoints:
   - **Health Check**: [http://localhost:8080/api/health](http://localhost:8080/api/health)

---

## 🌐 Running the Frontend (React + Vite)

1. Open another PowerShell window and navigate to the frontend folder:
   ```powershell
   cd C:\7MHackethon\frontend
   ```
2. Start the development server:
   ```powershell
   npm run dev
   ```
3. Open in browser: [http://localhost:5173](http://localhost:5173)

---

## 🗄️ Database Setup (MySQL)

- Database name: `hackathon_db`
- Default connection properties configured in `backend/src/main/resources/application.properties`:
  ```properties
  spring.datasource.url=jdbc:mysql://localhost:3306/hackathon_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Kolkata
  spring.datasource.username=root
  spring.datasource.password=yuvi
  ```
- To initialize schemas:
  - Import `database/schema.sql`
  - (Optional) Import `database/seed_data.sql`

---

## 📦 Adding Dependencies

### Backend
Add dependencies in `backend/pom.xml`, then run:
```powershell
cd C:\7MHackethon\backend
.\mvnw.cmd clean compile
```

### Frontend
Install npm packages in `frontend`:
```powershell
cd C:\7MHackethon\frontend
npm install <package-name>
```
