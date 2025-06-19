# ByteShop – OOP E-Commerce Platform

ByteShop is a full-stack e-commerce application built as a class project to demonstrate Object-Oriented Programming (OOP) principles in both backend (Java Spring Boot) and frontend (Next.js + TypeScript). The app supports user authentication, role-based access (User/Admin), product management, cart, checkout, and order history.

---

## Table of Contents

- [Features](#features)
- [Architecture & OOP Principles](#architecture--oop-principles)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Authors](#authors)
- [License](#license)

---

## Features

- **User Registration & Login** (JWT-based authentication)
- **Role-based Access Control** (User/Admin)
- **Product Management** (CRUD, admin only)
- **Shopping Cart** (add/remove/clear, persisted in localStorage)
- **Checkout & Order Placement**
- **Order History** (per user)
- **Admin Dashboard** (user/product/order stats)
- **Responsive UI** (Next.js, Tailwind CSS)

---

## Architecture & OOP Principles

### Backend (Java Spring Boot)
- **Encapsulation:** Entities and DTOs use private fields with public getters/setters. Services encapsulate business logic.
- **Abstraction:** Repositories abstract database operations. Services abstract business logic from controllers.
- **Inheritance:** Custom exceptions extend `RuntimeException`. Repositories extend `JpaRepository`.
- **Polymorphism:** Interfaces like `UserDetailsService` allow for flexible authentication logic.
- **Composition:** Entities like `Order` contain lists of `OrderItem`. Services and controllers use dependency injection.

### Frontend (Next.js + TypeScript)
- **Encapsulation:** State and logic are encapsulated in context providers (`AuthContext`, `CartContext`) and reusable components.
- **Abstraction:** TypeScript interfaces define data contracts and enforce type safety.
- **Composition:** UI is built from composable React components.
- **Single Responsibility:** Each component/context has a clear, focused responsibility.

---

## Tech Stack

- **Backend:** Java 17, Spring Boot, Spring Security, Spring Data JPA, MySQL
- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS, Axios
- **Auth:** JWT (JSON Web Token)
- **Other:** React Context API, React Hot Toast

---

## Project Structure

```
byte/
├── server/           # Spring Boot backend
│   ├── src/main/java/com/example/demo/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── security/
│   │   └── service/
│   └── ...
├── client/           # Next.js frontend
│   ├── app/
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── dashboard/admin/
│   │   ├── orders/
│   │   ├── products/
│   │   └── types/
│   ├── components/
│   ├── context/
│   ├── constants/
│   ├── lib/
│   └── styles/
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Java 17+
- MySQL

### Backend Setup

1. **Configure MySQL:**  
   Create a database (e.g., `byteshop`).  
   Update `server/src/main/resources/application.properties` with your DB credentials.

2. **Run the backend:**  
   ```bash
   cd server
   ./mvnw spring-boot:run
   ```
   The API will be available at `http://localhost:8080`.

### Frontend Setup

1. **Install dependencies:**  
   ```bash
   cd client
   npm install
   ```

2. **Run the frontend:**  
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

---

## API Endpoints

- `POST /auth/register` – Register new user
- `POST /auth/login` – Login and receive JWT
- `GET /products` – List products
- `POST /products` – Create product (admin)
- `PUT /products/{id}` – Update product (admin)
- `DELETE /products/{id}` – Delete product (admin)
- `POST /orders` – Place order
- `GET /orders/user?email={email}` – Get user orders
- `GET /admin/stats` – Admin dashboard stats

---

## Authors

- Brian Ceasar

---

## License

This project is for educational purposes only.
