# 📚 API Documentation

## Base URL
`http://localhost:8080/api`

---

## Starter Endpoints

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Description**: Returns server status, message, and current timestamp.
- **Response**:
```json
{
  "status": "UP",
  "message": "7M Hackathon Backend is running smoothly!",
  "timestamp": "2026-11-18T05:50:00.000Z"
}
```

---

## Layered Architecture Convention

When implementing new endpoints for the hackathon, follow this structure:

1. **Model / Entity** (`com.hackathon.backend.model`):
   - JPA entity mapped to the database table.
2. **Repository** (`com.hackathon.backend.repository`):
   - `interface MyEntityRepository extends JpaRepository<MyEntity, Long>`
3. **DTO** (`com.hackathon.backend.dto`):
   - Request and response payload schemas.
4. **Service** (`com.hackathon.backend.service`):
   - Business logic layer.
5. **Controller** (`com.hackathon.backend.controller`):
   - REST endpoints with `@RestController` and `@RequestMapping("/api/...")`.
