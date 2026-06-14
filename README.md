# 🎬 Movie Tracker Pro

![GitHub stars](https://img.shields.io/github/stars/harshskarki/Movie-Tracker-Pro?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/harshskarki/Movie-Tracker-Pro?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/harshskarki/Movie-Tracker-Pro?style=for-the-badge)
![License](https://img.shields.io/github/license/harshskarki/Movie-Tracker-Pro?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML-5-orange?style=for-the-badge)
![CSS](https://img.shields.io/badge/CSS-3-blue?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge)
![Firebase](https://img.shields.io/badge/Firebase-Backend-orange?style=for-the-badge)
![Firestore](https://img.shields.io/badge/Firestore-Database-yellow?style=for-the-badge)
![API](https://img.shields.io/badge/API-TMDB-blue?style=for-the-badge)
![Visitors](https://komarev.com/ghpvc/?username=harshskarki&repo=Movie-Tracker-Pro&style=for-the-badge)

🍿 A modern full-featured movie tracking web app with authentication, smart filtering, and real-time movie data powered by TMDB API.

---

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://movie-tracker-pro.vercel.app/)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
[![Figma Design](https://img.shields.io/badge/Figma-Design-blueviolet?style=for-the-badge&logo=figma)](https://java-carol-28888285.figma.site/)

## 🚀 Live Demo

👉 https://movie-tracker-pro.vercel.app/

---

## 📌 Overview

**Movie Tracker Pro** is a fully interactive web application that allows users to manage a personalized movie watchlist with authentication and real-time data.

This project demonstrates strong frontend engineering skills by integrating:

* 🔐 Firebase Authentication
* ☁️ Firestore Real-time Database
* 🎬 TMDB API integration
* 🎯 Advanced filtering & state management

---

## ✨ Key Features

### 🔐 Authentication System

* Secure login & signup (Firebase Auth)
* Google Sign-In support
* Protected routes (only logged-in users can access dashboard)
* Auto-login persistence
* Logout functionality

---

### 🎬 Movie Management

* Add movies instantly by name
* Auto-fetch poster, rating, and release year (TMDB API)
* Prevent duplicate entries
* Delete movies
* 🎲 “Surprise Me” random movie picker

---

### 📊 Smart Tracking System

* Total movies counter
* Watched / Unwatched tracking
* Favorites system ⭐
* Real-time stats dashboard
* Dynamic progress bar (watch completion %)

---

### 🔍 Search & Filters

* Live search functionality
* Category filters (Action, Comedy, Drama, Horror)
* Status filters:

  * Watched
  * Unwatched
  * Favorites
* Combined filtering (search + category + status)

---

### 🎨 UI/UX Enhancements

* Dark cinematic theme 🎬
* Responsive grid layout (mobile + desktop)
* Animated movie cards
* Toast notification system
* Filter pills UI
* Stats chips UI
* Smooth progress animations

---

## ⚙️ How It Works

1. User signs up / logs in via Firebase Authentication
2. Redirected to dashboard
3. User adds a movie
4. TMDB API fetches movie details
5. Movie is stored in Firestore database
6. UI updates instantly with real-time data

---

## 🛠️ Tech Stack

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Firebase Authentication
* Firebase Firestore
* TMDB API

---

## 🏗️ Architecture

```text
User
  ↓
Firebase Authentication
  ↓
Movie Tracker Pro
  ↓
TMDB API (Movie Data)
  ↓
Firestore Database
  ↓
Real-Time UI Updates
```
---

## 📂 Project Structure

```text
Movie-Tracker-Pro
│
├── index.html
├── login.html
├── app.html
│
├── css
│   ├── login.css
│   └── app.css
│
├── js
│   ├── firebase-config.js
│   ├── login.js
│   ├── auth.js
│   └── app.js
│
├── sitemap.xml
└── README.md
```
---

## 🚀 Local Setup

```bash
git clone https://github.com/harshskarki/Movie-Tracker-Pro.git

cd Movie-Tracker-Pro
```

1. Configure Firebase Project
2. Add your TMDB API Key
3. Open `index.html` in your browser

---

## 📸 Screenshots

<img width="1920" height="968" src="https://github.com/user-attachments/assets/0e0b586a-3d01-4d96-9e82-01b7ddb69450" />

---

## ⚠️ Limitations

* API key exposed in frontend (not production secure)
* Requires internet for TMDB API
* Uses client-side Firebase SDK configuration
* Requires internet connection for TMDB API requests
* No server-side API proxy for TMDB requests

---

## 🚀 Future Improvements

* 🤖 AI-based movie recommendations
* 👥 Shared watchlists (multi-user collaboration)
* 📱 Mobile app (React Native / Flutter)
* 🔔 Notifications for upcoming releases
* 🎯 Advanced filters (genre, rating, year)
* 📈 Watch history analytics

---

## 🏆 Project Highlights

✔ Implemented authentication system (Google + Email login)

✔ Integrated real-time database (Firestore)

✔ Built advanced filtering & search system

✔ Designed responsive and modern UI

✔ Developed full CRUD functionality

✔ Applied clean state management logic

---

## 🎯 Why This Project?

This project demonstrates the ability to build a real-world full-stack application with authentication, real-time database integration, and dynamic API usage.

It highlights skills in:
- Frontend architecture and UI/UX design  
- State management and filtering logic  
- API integration and asynchronous programming  
- Cloud-based backend using Firebase  

---

## 🤝 Connect With Me

🌐 Portfolio: https://harshvardhansportfolio.vercel.app/

💼 LinkedIn: https://linkedin.com/in/harshvardhan-singh-karki-a9316038a/

💻 GitHub: https://github.com/harshskarki

---

## ⚖️ Disclaimer

This product uses the TMDB API but is not endorsed or certified by TMDB.
