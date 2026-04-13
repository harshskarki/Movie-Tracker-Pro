# 🎬 Movie Tracker Pro

🍿 A modern full-featured movie tracking web app with authentication, smart filtering, and real-time movie data powered by TMDB API. 


## 🚀 Live Demo


👉 https://movietrackerpro.netlify.app/

👉 https://movie-tracker-pro.vercel.app/login.html

https://movie-tracker-pro.vercel.app/


## 📌 Overview


Movie Tracker Pro is a fully interactive frontend web app that allows users to manage a personal movie watchlist with authentication and real-time movie data.


It combines:


-Firebase Authentication 🔐

-TMDB API integration 🎬

-LocalStorage persistence 💾

-Advanced UI filtering system 🎯

### ✨ Features

-🔐 Authentication System

-Email/password login & signup (Firebase Auth)

-Google Sign-In support

-Auto redirect if user already logged in

-Protected routes (index page requires login)

-Logout functionality

### 🎬 Movie Management

-Add movies instantly by name

-Auto-fetch poster, rating, and year (TMDB API)

-Prevent duplicate entries

-Delete movies

-Random “🎲 Surprise Me” movie picker

### 📊 Smart Tracking System

-Total movies counter

-Watched / Unwatched tracking

-Favorites system ⭐

-Progress bar (watch completion %)

-Real-time stats dashboard

### 🔍 Search & Filters

-Live search bar

-Category filters (Action, Comedy, Drama, Horror)

-Status filters:

-Watched

-Unwatched

-Favorites

-Combined filtering (search + category + status)

### 🎨 UI/UX Enhancements

-Dark cinematic theme

-Responsive grid layout (mobile + desktop)

-Animated hover cards

-Toast notifications system

-Filter pills UI

-Stats chips UI

-Progress bar animation

-Fixed footer UI

### 💾 Storage System

-Movies saved in browser localStorage

-Persistent across sessions (same device)

-Firebase handles authentication state



## 📸 Screenshots

<img width="1920" height="968" alt="Image" src="https://github.com/user-attachments/assets/0e0b586a-3d01-4d96-9e82-01b7ddb69450" />



## ⚙️ How It Works

-User signs up / logs in (Firebase Auth)

-Redirected to dashboard (index.html)

-Add movie name

-TMDB API fetches movie details

-Movie stored in localStorage

-UI updates instantly with filters & stats

## 🛠️ Tech Stack

-HTML5

-CSS3

-JavaScript (Vanilla JS)

-Firebase Authentication

-TMDB API

-Browser localStorage

## 📂 Project Structure

movie-tracker-pro/
│── login.html        # Authentication page (Firebase Auth + Google login)
│── index.html        # Main dashboard (movie tracker)
│── script.js         # Core logic (embedded in HTML)
│── style.css         # UI styling (inline in current version)
│
└── assets/
    └── screenshots/


## ⚠️ Limitations

-Data stored locally (not cloud synced yet)

-API key exposed in frontend (not production secure)

-Requires internet for TMDB API

-Firebase rules must be configured properly

## 🚀 Future Improvements 🤔💭

☁️ Cloud database (Firestore sync across devices)

👥 Multi-user shared watchlists

🤖 AI movie recommendations

📱 Mobile app version (React Native / Flutter)

🎯 Watch history timeline

🔔 Notifications for movie releases

🔎 Advanced search (genre + year + rating filters)

## 🤝 Connect With Me

🌐 Portfolio: https://harshvardhansportfolio.vercel.app/

💼 LinkedIn: https://linkedin.com/in/harshvardhan-singh-karki-a9316038a/

💻 GitHub: https://github.com/harshskarki

## 🏆 Project Highlights

✔ Firebase Authentication system (Google + Email login)

✔ Real-time API integration (TMDB)

✔ Advanced filtering + stats system

✔ Fully responsive UI design

✔ Clean frontend architecture

✔ Strong CRUD + state management logic

✔ Production-style project structure


# ⚖️ Disclaimer

This product uses the TMDB API but is not endorsed or certified by TMDB.

