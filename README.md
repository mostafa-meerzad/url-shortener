# 🔗 URL Shortener App

A **feature-rich** URL shortener application built with the **MERN stack** and **TypeScript**. Users can shorten long URLs, manage them through CRUD operations, and even add custom aliases. Authenticated users enjoy advanced features, while guests can still shorten links effortlessly.

## ✨ Features

✅ **URL Shortening** – Shorten any valid URL.  
✅ **Custom Aliases** – Optionally define a custom alias.  
✅ **Guest & Authenticated Mode** – Use without login or access advanced features when logged in.  
✅ **CRUD Operations** – Create, Read, and Delete shortened URLs.  
✅ **Optimistic UI** – Instant updates for a seamless user experience.  
✅ **Search Functionality** – Quickly find and manage your shortened links.  
✅ **Error Handling** – Clear and user-friendly error messages.

## 🛠️ Tech Stack

- **Frontend:** React (with TypeScript & Tailwind CSS)
- **Backend:** Node.js (Express with TypeScript)
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **HTTP Client:** Axios

## 📂 Project Structure

```
url-shortener-app/
├── backend/                # Express backend
│   ├── controllers/        # Business logic
│   ├── middlewares/       # Auth & error handling
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   └── index.ts           # App entry point
└── frontend/               # React frontend
    ├── components/        # Reusable UI pieces
    ├── context/           # Global state (AuthContext)
    ├── pages/             # Main app pages
    ├── types/             # TypeScript interfaces
    └── App.tsx            # Root component
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18+)
- **MongoDB** (local or cloud instance)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/url-shortener-app.git
cd url-shortener-app
```

### 2. Set up environment variables

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
```

### 3. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Run the app

In two separate terminals:

```bash
# Start backend (http://localhost:3000)
cd backend
npm run dev

# Start frontend (http://localhost:5173)
cd frontend
npm run dev
```

## 📌 API Endpoints

### Authentication

- **POST /api/auth/register** – Register a new user
- **POST /api/auth/login** – Log in and receive a JWT

### URL Management

- **POST /api/urls/shorten** – Shorten a URL (auth required for permanent storage)
- **POST /api/urls/shorten/guest** – Shorten a URL (guest mode)
- **GET /api/urls** – Fetch user-specific URLs
- **DELETE /api/urls/:id** – Delete a shortened URL (auth required)

## 🔍 Search Feature

- Search URLs by either original URL or shortened URL.
- Instant filtering with real-time feedback.

## 📜 License

This project is licensed under the **MIT License** – feel free to use and modify it as you like!
