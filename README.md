# 🎬 Movie Tracker Pro+

A sleek, client-side movie tracking web app built with vanilla HTML, CSS, and JavaScript. Fetches real movie data (posters, ratings, release year) using the TMDB API and saves everything to your browser's local storage — no backend required.

---

## ✨ Features

- 🔍 **Auto-fetch movie data** — posters, ratings, and release year via TMDB API
- 🗂 **Category tagging** — Action, Comedy, Drama, Horror, Sci-Fi, Romance, Thriller, Documentary
- ✅ **Mark as watched** — track what you've seen with a progress bar
- ★ **Favorites** — highlight your must-watch picks
- 🔎 **Live search** — filter movies by name instantly
- 🎛 **Filter bar** — view All, Unwatched, Watched, Favorites, or by category
- 🎲 **Surprise Me** — picks a random unwatched movie for you
- 💾 **Persistent storage** — all data saved to `localStorage`, no login needed
- 🗑 **Delete movies** — remove any entry from your list

---

## 📸 Preview

> Open `movie-tracker.html` directly in your browser — no build step needed.

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/movie-tracker.git
cd movie-tracker
```

### 2. Get a TMDB API Key

1. Sign up at [themoviedb.org](https://www.themoviedb.org)
2. Go to **Settings → API**
3. Copy your **v3 API key**
4. Check that the key status shows **Approved**

> You can test your key by pasting this in your browser:
> `https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=inception`
> If you see JSON data, your key works.

### 3. Add your API key

Open `movie-tracker.html` and find this line near the top of the `<script>` section:

```js
const API_KEY = "YOUR_TMDB_API_KEY_HERE";
```

Replace it with your actual key:

```js
const API_KEY = "your_actual_key_here";
```

### 4. Open in browser

Just double-click `movie-tracker.html` or open it with any browser. No server or install required.

---

## ⚠️ Important Notes

### API Key Security
Your API key is stored in client-side JavaScript, meaning it's visible to anyone who views the page source. This is fine for personal/local use. If you deploy this publicly:
- Restrict your TMDB API key to specific domains via the TMDB dashboard
- Or move the fetch call to a backend/serverless function

### LocalStorage
All your movie data is saved in your browser's `localStorage` under the key `movies_v2`. This means:
- Data is **per browser, per device**
- Data is **lost in incognito/private mode**
- Clearing browser data will erase your list

---

## 🛠 Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Structure |
| CSS3 | Styling, animations |
| Vanilla JavaScript | Logic, DOM, API calls |
| [TMDB API](https://www.themoviedb.org/documentation/api) | Movie data |
| localStorage | Data persistence |
| Google Fonts (Bebas Neue, DM Sans) | Typography |

---

## 📁 File Structure

```
movie-tracker/
│
├── movie-tracker.html   # The entire app (single file)
└── README.md            # You're reading this
```

---

## 🔧 Customization

### Add more categories
Find the `<select id="categorySelect">` in the HTML and add more `<option>` tags:

```html
<option value="Animation">Animation</option>
<option value="Fantasy">Fantasy</option>
```

Then add matching filter buttons in the `.filter-bar` section:

```html
<button class="filter-btn" data-filter="Animation" onclick="setFilter('Animation', this)">Animation</button>
```

### Change the accent color
Find this CSS variable at the top of the `<style>` block and change the hex value:

```css
--red: #e50914;
```

---

## 📄 License

This project is open source and free to use for personal projects.

---

## 🙏 Credits

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org)
- This product uses the TMDB API but is not endorsed or certified by TMDB
