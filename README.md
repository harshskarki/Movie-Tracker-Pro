# 🎬 Movie Tracker Pro+

> A client-side movie tracking app built with HTML, CSS & JavaScript. Add movies and auto-fetch posters, ratings & release year via TMDB API. Features watched tracking, favorites, category filters, live search, progress bar, and a random movie picker. No backend, no install — just one HTML file.

---

## Overview

Movie Tracker Pro+ is a lightweight, single-file web application that lets you manage your personal movie watchlist right in the browser. No sign-up, no server, no installation. Just open the HTML file and start adding movies.

When you type a movie name and hit Add, the app talks to the TMDB API and pulls in the official poster, IMDB-style rating, and release year automatically. Everything gets saved to your browser's local storage, so your list is there every time you come back.

It is built for people who want a fast, distraction-free way to keep track of what they have watched, what they want to watch next, and what they loved the most.

---

## What It Does

**Add movies instantly**
Type any movie title and the app fetches the poster, rating, and release year from TMDB in seconds. No manual entry needed.

**Track your progress**
Mark movies as watched or unwatched. A progress bar at the top shows how many you have gotten through at a glance.

**Save your favorites**
Star any movie to mark it as a favorite and filter your list to see only the ones you love.

**Filter and search**
Search your list by title in real time. Filter by status (watched, unwatched, favorites) or by genre category (Action, Comedy, Drama, Horror, Sci-Fi, and more).

**Surprise Me**
Not sure what to watch? Hit the Surprise Me button and the app picks a random unwatched movie from your list for you.

**Fully offline after load**
Once the page is open, everything works offline. Your data lives in the browser — no account, no cloud, no tracking.

---

## How It Works

```
User adds a movie title
        ↓
App calls TMDB Search API
        ↓
Fetches poster + rating + release year
        ↓
Movie card is created and saved to localStorage
        ↓
User can filter, search, mark watched, favorite, or delete
```

---

## Built With

- **HTML5** — structure and layout
- **CSS3** — styling, transitions, and responsive grid
- **Vanilla JavaScript** — all logic, DOM manipulation, and API calls
- **TMDB API** — movie data (posters, ratings, release dates)
- **localStorage** — persistent data storage in the browser
- **Google Fonts** — Bebas Neue (display) + DM Sans (body)

---

## Limitations

- Data is stored per browser and per device — it does not sync across devices
- The TMDB API key is exposed in client-side code, so avoid sharing the file publicly with your key inside
- Clearing browser storage or using incognito mode will erase your list

---

> This product uses the TMDB API but is not endorsed or certified by TMDB.
