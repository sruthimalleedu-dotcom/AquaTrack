# 💧 AquaTrack

> **A Smart Apartment Water Usage Management System**
>
> AquaTrack is a Spring Boot based backend application designed to help apartment communities monitor household water consumption, automate billing, manage residents, and detect abnormal usage patterns through a secure and scalable REST API architecture.

---

## 📌 Project Status

**Current Milestone:** ✅ Milestone 1 – Database Foundation Completed

| Module | Status |
|---------|--------|
| Spring Boot Setup | ✅ Completed |
| PostgreSQL Configuration | ✅ Completed |
| Flyway Migration | ✅ Completed |
| Database Schema | ✅ Completed |
| Project Architecture | ✅ Completed |
| Authentication | ⏳ Upcoming |
| CRUD APIs | ⏳ Upcoming |
| CSV Upload | ⏳ Upcoming |
| Billing Engine | ⏳ Upcoming |
| Alerts & Notifications | ⏳ Upcoming |

---

# 🚀 Tech Stack

| Category | Technology |
|----------|------------|
| Language | Java 23 |
| Framework | Spring Boot 3.5.3 |
| Database | PostgreSQL 17 |
| ORM | Spring Data JPA + Hibernate |
| Database Migration | Flyway |
| Security | Spring Security + JWT *(Upcoming)* |
| Build Tool | Maven |
| API Testing | Postman |
| IDE | IntelliJ IDEA |
| Version Control | Git + GitHub |

---

# 📂 Project Structure

```text
src
│
├── main
│   ├── java
│   │   └── com.aquatrack
│   │       ├── config
│   │       ├── constant
│   │       ├── controller
│   │       ├── csv
│   │       ├── dto
│   │       ├── entity
│   │       ├── exception
│   │       ├── mapper
│   │       ├── repository
│   │       ├── security
│   │       ├── service
│   │       ├── util
│   │       ├── validation
│   │       └── AquatrackApplication.java
│   │
│   └── resources
│       ├── application.properties
│       └── db
│           └── migration
│
└── test
```

---

# 🗄️ Database Schema

Current database consists of **6 primary entities**.

```
Apartment
    │
    ├──────────────┐
    │              │
    ▼              ▼
Household        User
    │
    ▼
WaterUsageLog

Apartment
    │
    ├──────────────┐
    ▼              ▼
BillingCycle   TariffPlan
```

---

## 📦 Flyway Migrations

| Version | Description |
|----------|-------------|
| V1 | Create Users Table |
| V2 | Create Apartments Table |
| V3 | Create Households Table |
| V4 | Create Tariff Plans Table |
| V5 | Create Billing Cycles Table |
| V6 | Create Water Usage Logs Table |
| V7 | Add User Relationships & Constraints |

---

# ✨ Current Features

### Database

- PostgreSQL Integration
- Flyway Versioned Migrations
- Normalized Database Design
- Foreign Key Relationships
- Unique Constraints
- Index Optimization

---

### Backend Foundation

- Spring Boot Project
- Maven Build Configuration
- Layered Architecture
- Configuration Management
- Ready for REST API Development

---

# 🏗️ Planned Architecture

```
Frontend

      │

 REST API

      │

Spring Boot

├── Security
├── Controllers
├── Services
├── Validation
├── CSV Import
├── JPA
├── Flyway

      │

 PostgreSQL
```

---

# 📅 Development Roadmap

## ✅ Milestone 1

- Spring Boot Setup
- PostgreSQL
- Flyway
- Database Schema
- Migrations

---

## 🚧 Milestone 2

- JPA Entities
- Repository Layer
- DTOs
- Mapper
- Validation

---

## 🚧 Milestone 3

- JWT Authentication
- Spring Security
- Login
- Registration
- Role Based Access

---

## 🚧 Milestone 4

- Apartment APIs
- Household APIs
- Resident Assignment
- Meter Configuration

---

## 🚧 Milestone 5

- Water Usage Logging
- CSV Upload
- Duplicate Detection
- Exception Handling

---

## 🚧 Milestone 6

- Billing Engine
- Tariff Calculation
- Monthly Billing

---

## 🚧 Milestone 7

- Testing
- Unit Tests
- Integration Tests
- API Documentation

---

# 🧪 Build & Run

Clone repository

```bash
git clone https://github.com/sruthimalleedu-dotcom/AquaTrack.git
```

Navigate to project

```bash
cd AquaTrack
```

Run application

```bash
./mvnw spring-boot:run
```

---

# 🛠️ Database Setup

Create PostgreSQL Database

```sql
CREATE DATABASE aquatrack;
```

Update

```
application.properties
```

```
spring.datasource.url=jdbc:postgresql://localhost:5432/aquatrack
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

Flyway will automatically execute all migrations on application startup.

---

# 📊 Current Progress

```
Overall Progress

████████░░░░░░░░░░░░░░░░░

≈ 30%
```

---

# 👨‍💻 Contributors

- **Sanket Maity** – Backend Development
- **Sruthi Malleedu** – Project Collaboration

---

# 📄 License

This project is developed for academic learning, software engineering practice, and backend architecture implementation.

---

# ⭐ Future Enhancements

- JWT Authentication
- Email Notifications
- Smart Water Alerts
- Billing Automation
- Dashboard Analytics
- Swagger API Documentation
- Docker Deployment
- CI/CD Pipeline
- AWS Deployment
- Redis Caching

---

## 🌟 AquaTrack

**Building a scalable apartment water management platform using Spring Boot, PostgreSQL, Flyway, and modern backend engineering best practices.**
