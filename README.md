# 💧 AquaTrack

> **A Smart Apartment Water Usage Management System**

AquaTrack is a scalable Spring Boot backend application for apartment communities to manage residents, monitor water consumption, automate billing, and provide secure role-based access using modern backend engineering practices.

---

# 🚀 Project Status

**Current Version:** `v1.0 Backend Foundation`

## Completed Modules

| Module | Status |
|---------|--------|
| Spring Boot Setup | ✅ Completed |
| PostgreSQL Integration | ✅ Completed |
| Flyway Migration | ✅ Completed |
| Database Schema | ✅ Completed |
| JPA Entities | ✅ Completed |
| Repository Layer | ✅ Completed |
| DTO Layer | ✅ Completed |
| Mapper Layer | ✅ Completed |
| Service Layer | ✅ Completed |
| Apartment CRUD APIs | ✅ Completed |
| JWT Authentication | ✅ Completed |
| Spring Security | ✅ Completed |
| Role-Based Authorization (RBAC) | ✅ Completed |
| Login API | ✅ Completed |
| Forgot Password | ✅ Completed |
| Reset Password | ✅ Completed |
| Global Exception Handling | ✅ Completed |
| Standard API Response | ✅ Completed |
| Postman Testing | ✅ Completed |

---

# 🚀 Tech Stack

| Category | Technology |
|----------|------------|
| Language | Java 23 |
| Framework | Spring Boot 3.5.3 |
| Database | PostgreSQL 17 |
| ORM | Spring Data JPA + Hibernate |
| Migration | Flyway |
| Security | Spring Security + JWT |
| Password Encryption | BCrypt |
| Validation | Jakarta Validation |
| Build Tool | Maven |
| API Testing | Postman |
| Version Control | Git & GitHub |
| IDE | IntelliJ IDEA |

---

# 📂 Project Structure

```text
src
│
├── main
│   ├── java
│   │   └── com.aquatrack
│   │
│   │       ├── config
│   │       ├── controller
│   │       ├── dto
│   │       │    ├── apartment
│   │       │    └── auth
│   │       ├── entity
│   │       ├── exception
│   │       ├── mapper
│   │       ├── repository
│   │       ├── security
│   │       ├── service
│   │       │    └── impl
│   │       ├── util
│   │       └── AquatrackApplication.java
│   │
│   └── resources
│       ├── application.properties
│       └── db
│            └── migration
```

---

# 🏗️ Backend Architecture

```text
                Client
                   │
                   ▼
          Spring Security (JWT)
                   │
                   ▼
             REST Controllers
                   │
                   ▼
               Service Layer
                   │
                   ▼
              Mapper Layer
                   │
                   ▼
           Repository (JPA)
                   │
                   ▼
              PostgreSQL
```

---

# 🔐 Authentication

Implemented Features

- JWT Authentication
- Stateless Security
- Spring Security Filter Chain
- Role-Based Access Control (RBAC)
- BCrypt Password Encryption
- Forgot Password
- Password Reset Token
- Secure Password Reset Flow

Current Roles

- SUPER_ADMIN
- APARTMENT_ADMIN *(Upcoming)*
- MANAGER *(Upcoming)*
- RESIDENT *(Upcoming)*

---

# 🏢 Apartment Module

Completed APIs

| API | Status |
|------|--------|
| Create Apartment | ✅ |
| Get All Apartments | ✅ |
| Get Apartment By ID | ✅ |
| Update Apartment | ✅ |
| Delete Apartment | ✅ |

Implemented Features

- Duplicate Apartment Validation
- Apartment Mapper
- DTO Separation
- Validation
- Exception Handling
- RBAC Protection

---

# 📦 Database Migrations

| Version | Description |
|----------|-------------|
| V1 | Create Users Table |
| V2 | Create Apartments Table |
| V3 | Create Households Table |
| V4 | Create Tariff Plans Table |
| V5 | Create Billing Cycles Table |
| V6 | Create Water Usage Logs Table |
| V7 | Seed Super Admin |
| V8 | User Relationships |
| V9 | Password Reset Tokens |

---

# 📌 API Response Format

## Success

```json
{
  "success": true,
  "message": "Apartment created successfully.",
  "data": {},
  "timestamp": "2026-07-04T05:15:30"
}
```

---

## Error

```json
{
  "success": false,
  "status": 409,
  "message": "Apartment already exists.",
  "timestamp": "2026-07-04T05:15:30"
}
```

---

# 🧪 Tested APIs

Authentication

- Login
- Forgot Password
- Reset Password

Apartment

- Create
- Read
- Update
- Delete
- Duplicate Validation

---

# 📅 Development Roadmap

## ✅ Sprint 1 (Completed)

- Spring Boot Setup
- PostgreSQL
- Flyway
- Database Schema
- JWT Authentication
- Spring Security
- RBAC
- Password Reset
- Apartment CRUD
- Global Exception Handling
- Standard API Response

---

## 🚧 Sprint 2

- Apartment Admin Invitation
- Email Service
- Account Activation
- Password Creation Link
- Apartment Admin Login

---

## 🚧 Sprint 3

- Manager Module
- Resident Module
- Household Module

---

## 🚧 Sprint 4

- Water Meter
- Water Usage
- CSV Upload

---

## 🚧 Sprint 5

- Billing Engine
- Tariff Calculation
- Monthly Billing

---

## 🚧 Sprint 6

- Dashboard APIs
- Reports
- Notifications
- Swagger Documentation

---

# 🛠️ Build & Run

Clone repository

```bash
git clone https://github.com/sruthimalleedu-dotcom/AquaTrack.git
```

Go to project

```bash
cd AquaTrack
```

Run

```bash
./mvnw spring-boot:run
```

---

# 📊 Current Progress

```text
Infrastructure          ██████████ 100%

Authentication          ██████████ 100%

Apartment Module        ██████████ 100%

Remaining Modules       ███░░░░░░░ 20%

Overall Progress        ██████░░░░ 40%
```

---

# 👨‍💻 Contributors

- **Sanket Maity**
- **Sruthi Malleedu**
- **Navida Jain**

---

# 📄 License

This project is developed for learning, software engineering practice, and scalable backend architecture implementation.

---

# 🌟 Upcoming Features

- Apartment Admin Invitation
- Email Notifications
- Manager Management
- Resident Management
- Household Management
- Water Meter Integration
- Billing Automation
- Dashboard Analytics
- Swagger/OpenAPI
- Docker Support
- CI/CD Pipeline
- AWS Deployment
- Redis Caching

---

## ⭐ AquaTrack

**Building an enterprise-grade apartment water management platform using Spring Boot, PostgreSQL, Flyway, JWT Security, and modern backend engineering best practices.**
