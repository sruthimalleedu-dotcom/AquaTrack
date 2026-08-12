# AquaTrack - Project Context

# Repository Information

## Backend Repository

https://github.com/sruthimalleedu-dotcom/AquaTrack.git

Branch

test1

## Frontend Repository

https://github.com/Sanketmaity/aquatrack_frontend.git

Branch

main

---

# Development Workflow

Backend Development

↓

Postman Testing

↓

Frontend Integration

↓

Git Commit

↓

Push to GitHub

↓

Sprint Completion

---

# Sprint Status

Sprint 1
Authentication

Sprint 2
Property Registration

Sprint 3
Approval Workflow

Sprint 4
Property Admin Creation

Sprint 5
Property Admin Management

Sprint 6
Email Notifications

Sprint 7
Super Admin Dashboard

Sprint 8
Property Admin Dashboard (Current)

Upcoming

Apartment Management

Building Management

Manager Management

Resident Management

Water Meter

Billing

Analytics

## Project Overview

AquaTrack is an Enterprise Smart Apartment Water Management System.

The platform enables apartment communities to manage:

- Apartment Registration
- Property Administration
- Building Management
- Manager Management
- Resident Management
- Water Meter Monitoring
- Water Consumption Analytics
- Billing & Payments
- Reports & Notifications

Current Development Stage:
Sprint 8

---

# Technology Stack

## Backend

- Java 23
- Spring Boot 3.5.x
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- PostgreSQL
- Flyway Migration
- Java Mail Sender
- Maven
- Lombok

## Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Framer Motion
- Lucide React

---

# Architecture

The project follows Enterprise Layered Architecture.

Controller

↓

Service

↓

Mapper

↓

Repository

↓

Database

Business logic is NEVER written inside Controllers.

Repository layer only communicates with database.

DTOs are used for every API.

Every Entity has a dedicated Mapper.

---

# Coding Standards

## General

Enterprise level code only.

Follow SOLID principles.

Clean Architecture.

Meaningful variable names.

No shortcut implementations.

No business logic inside Controller.

Builder Pattern wherever applicable.

Use constructor injection.

Proper exception handling.

Consistent comment blocks.

Example:

// ==========================================
// Create Building
// ==========================================

---

# Package Structure

com.aquatrack

├── controller

├── dto

├── entity

├── enums

├── exception

├── mapper

├── notification

├── repository

├── security

├── service

│

└── impl

├── util

├── config

---

# DTO Packages

admin

apartment

auth

building

dashboard

manager

propertyadmin

propertyadminmanagement

propertyregistration

resident

billing (future)

analytics (future)

---

# Security

Authentication

JWT Token

Spring Security

Roles

- SUPER_ADMIN
- PROPERTY_ADMIN
- MANAGER
- RESIDENT

Authorization based on role.

Current user fetched using SecurityUtil.

Example:

String email = SecurityUtil.getCurrentUserEmail();

---

# Notification System

Email Templates

Registration Approved

Registration Rejected

Forgot Password

Password Reset Success

Welcome Property Admin

Property Admin Suspended

Property Admin Reactivated

HTML Email Templates

JavaMailSender

---

# Database

PostgreSQL

Current major entities

User

Apartment

Building

Manager

Resident

PropertyRegistrationRequest

PasswordResetToken

More entities will be added during future sprints.

---

# Completed Modules

## Authentication

✅ Login

✅ JWT Authentication

✅ Forgot Password

✅ Reset Password

✅ Password Reset Email

---

## Super Admin

✅ Dashboard

✅ Dashboard Summary

✅ Recent Registrations

✅ Quick Actions

---

## Property Registration

✅ Public Registration

✅ Approve Registration

✅ Reject Registration

✅ Registration Details

✅ Registration Summary

---

## Property Admin Management

✅ View All Property Admins

✅ View Details

✅ Suspend

✅ Reactivate

✅ Email Notifications

---

## Frontend

✅ Login

✅ Forgot Password

✅ Reset Password

✅ Registration Form

✅ Super Admin Dashboard

✅ Property Registration Module

✅ Property Admin Management

---

# Current Sprint

Sprint 8

Property Admin Dashboard

Status:

In Progress

---

# Sprint Roadmap

Sprint 8

Property Admin Dashboard

Apartment Management

Building Management

Manager Management

Resident Management

Sprint 9

Water Meter Management

Water Usage

Resident Dashboard

Manager Dashboard

Billing

Reports

Analytics

---

# API Style

Every response returns

```json
{
  "success": true,
  "message": "",
  "data": {},
  "timestamp": ""
}
```