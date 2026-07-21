let movies = [];
let editingMovieId = null;
let deletedMovie = null;
let undoTimeout = null;
let undoToastTimer = null;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loader").style.display = "flex";
  document.getElementById("movieList").style.display = "none";
});

function saveToDB(movie) {

  const user =
    firebase.auth().currentUser;

  if (!user) return;

  db.collection("users")
    .doc(user.uid)
    .collection("movies")
    .add({

      name: movie.name || "Unknown",

      category: movie.category || "Other",

      poster: movie.poster || "",

      rating: Number(movie.rating) || 0,

      year: String(movie.year || "N/A"),

      overview: movie.overview || "",

      runtime: movie.runtime || 0,

      genres: movie.genres || [],

      director: movie.director || "Unknown",

      cast: movie.cast || [],

      trailerKey: movie.trailerKey || null,

      similarMovies: movie.similarMovies || [],

      recommendations: movie.recommendations || [],

      watched: movie.watched || false,

      favorite: movie.favorite || false,

      createdAt: Date.now()

    });
}


function loadMovies() {
  const user = firebase.auth().currentUser;
  if (!user) return;

document.getElementById("loader").style.display = "flex";
document.getElementById("movieList").style.display = "none";

  db.collection("users")
  .doc(user.uid)
  .collection("movies")
  .orderBy("createdAt", "desc")
  .onSnapshot(snapshot => {
      movies = [];
      snapshot.forEach(doc => {
        movies.push({ id: doc.id, ...doc.data() });
      });

      document.getElementById("loader").style.display = "none";
      document.getElementById("movieList").style.display = "grid";

      applyFilters();

      renderGenreFilters();

      renderWatchHistory();

      renderActivityStats();

      renderFavoriteGenre();
    });
}

function renderWatchHistory() {

  const container =
    document.getElementById("historyList");

  if (!container) return;

  const latestMovies =
    movies.slice(0, 5);

  if (!latestMovies.length) {
    container.innerHTML =
      "No history available";
    return;
  }

  container.innerHTML =
    latestMovies.map((movie, index) => {

      let dateLabel = "Recently Added";

      if (movie.createdAt) {

        let created;

        if (
          typeof movie.createdAt.toDate === "function"
        ) {

          created =
            movie.createdAt.toDate();

        } else {

          created =
            new Date(movie.createdAt);
        }

        const now =
          new Date();

        const diffMs =
          now - created;

        const diffHours =
          Math.floor(
            diffMs / (1000 * 60 * 60)
          );

        const diffDays =
          Math.floor(
            diffHours / 24
          );

        if (diffHours < 24) {

          dateLabel =
            diffHours <= 1
              ? "1 hour ago"
              : `${diffHours} hours ago`;

        } else if (diffDays === 1) {

          dateLabel = "Yesterday";

        } else {

          dateLabel =
            `${diffDays} days ago`;
        }
      } 
      
      return `
        <div class="history-item">

          <div class="history-left">
            <div class="history-dot"></div>

            <div>
              <div class="history-title">
                🎬 ${movie.name}
              </div>

              <div class="history-date">
                Added ${dateLabel}
              </div>
            </div>
          </div>

        </div>
      `;
    }).join("");
}

function renderActivityStats() {

  const now = new Date();

  let weekCount = 0;
  let monthCount = 0;

  movies.forEach(movie => {

    if (!movie.createdAt)
      return;

    const created =
      typeof movie.createdAt.toDate === "function"
        ? movie.createdAt.toDate()
        : new Date(movie.createdAt);

    const diffMs =
      now - created;

    const diffDays =
      diffMs / (1000 * 60 * 60 * 24);

    if (diffDays <= 7) {
      weekCount++;
    }

    if (diffDays <= 30) {
      monthCount++;
    }
  });

  document.getElementById(
    "weekCount"
  ).textContent = weekCount;

  document.getElementById(
    "monthCount"
  ).textContent = monthCount;

  document.getElementById(
    "totalCount"
  ).textContent = movies.length;
}

function renderFavoriteGenre() {

  const genreElement =
    document.getElementById("favoriteGenre");

  const countElement =
    document.getElementById("favoriteGenreCount");

  if (!genreElement || !countElement)
    return;

  const genreCounts = {};

  movies.forEach(movie => {

    if (!movie.genres ||
        !Array.isArray(movie.genres))
      return;

    movie.genres.forEach(genre => {

      genreCounts[genre] =
        (genreCounts[genre] || 0) + 1;

    });

  });

  const entries =
    Object.entries(genreCounts);

  if (!entries.length) {

    genreElement.textContent =
      "No Data";

    countElement.textContent =
      "0 Movies";

    return;
  }

  entries.sort(
    (a, b) => b[1] - a[1]
  );

  const [topGenre, count] =
    entries[0];

  genreElement.textContent =
    topGenre;

  countElement.textContent =
    `${count} Movies`;
}

function renderGenreFilters() {

  const container =
    document.getElementById("dynamicGenres");

  if (!container) return;

  const genres = new Set();

  movies.forEach(movie => {

    if (!movie.genres) return;

    movie.genres.forEach(genre => {
      genres.add(genre);
    });

  });

  const sortedGenres =
    [...genres].sort();

  container.innerHTML =
    sortedGenres.map(genre => `
      <button
        class="filter-pill"
        data-filter="${genre}"
        onclick="setFilter('${genre}', this)"
      >
        ${genre}
      </button>
    `).join("");
}

let activeFilter = "all";

function showToast(msg) {
  let t = document.getElementById("toast");
  t.innerText = msg;
  t.style.display = "block";
  setTimeout(() => t.style.display = "none", 2000);
}

function showUndoToast() {
  const toast = document.getElementById("undoToast");

  clearTimeout(undoToastTimer);

  toast.style.display = "flex";

  undoToastTimer = setTimeout(() => {
    toast.style.display = "none";
  }, 10000);
}

async function fetchMovieData(name) {
  try {
    const res = await fetch(
      `/api/movie?q=${encodeURIComponent(name)}`
    );

    const movie = await res.json();

    return {
      poster:
        movie.poster ||
        "https://via.placeholder.com/300x450?text=No+Image",

      rating: movie.rating,

      year: movie.year,

      similarMovies: movie.similarMovies,

      recommendations: movie.recommendations,

      trailerKey: movie.trailerKey,

      overview: movie.overview,

      runtime: movie.runtime,

      genres: movie.genres,

      director: movie.director,

      cast: movie.cast
    };
  } catch {
    return {
      poster:
        "https://via.placeholder.com/300x450?text=No+Image",

      rating: "N/A",

      year: "N/A",

      overview: "",

      runtime: "",

      genres: [],

      director: "",

      cast: []
    };
  }
}

async function addMovie() {
  let name = document.getElementById("movieInput").value.trim();
  let cat = document.getElementById("category").value;

  const exists = movies.some(
  movie => movie.name.toLowerCase() === name.toLowerCase()
);

if (exists) {
  return showToast("⚠️ Movie already exists");
}

  if (!name) return showToast("⚠️ Enter movie name");

  document.getElementById("loader").style.display = "block";

  let data = await fetchMovieData(name);

  let movieObj = { 
    name,
    category: cat,
    watched: false,
    favorite: false,
    createdAt: Date.now(),
    ...data
  };

  saveToDB(movieObj);

  document.getElementById("loader").style.display = "none";

  showToast("✅ Added!");
  document.getElementById("movieInput").value = "";
}

function deleteMovie(i) {
  if (!confirm("Delete this movie?")) return;

  const user = firebase.auth().currentUser;
  const movie = movies[i];

  deletedMovie = { ...movie };

  db.collection("users")
    .doc(user.uid)
    .collection("movies")
    .doc(movie.id)
    .delete();

  showUndoToast();

  clearTimeout(undoTimeout);

  undoTimeout = setTimeout(() => {
    deletedMovie = null;
  }, 5000);
}

function undoDelete() {
  if (!deletedMovie) return;

  const movieToRestore = { ...deletedMovie };

  delete movieToRestore.id;

  saveToDB(movieToRestore);

  deletedMovie = null;

  document.getElementById("undoToast").style.display = "none";

  showToast("✅ Movie restored successfully");
}
  
function toggleWatched(i) {
  const user = firebase.auth().currentUser;
  const movie = movies[i];

  movie.watched = !movie.watched;

  db.collection("users")
    .doc(user.uid)
    .collection("movies")
    .doc(movie.id)
    .update({ watched: movie.watched });

  displayMovies();
}

function toggleFavorite(i) {
  const user = firebase.auth().currentUser;
  const movie = movies[i];

  movie.favorite = !movie.favorite;

  db.collection("users")
    .doc(user.uid)
    .collection("movies")
    .doc(movie.id)
    .update({ favorite: movie.favorite });

  displayMovies();
}

function editMovie(i) {
  const movie = movies[i];

  editingMovieId = movie.id;

  document.getElementById("editMovieInput").value =
    movie.name;

  document.getElementById("editModal").style.display =
    "flex";
}

function closeEditModal() {
  document.getElementById("editModal").style.display =
    "none";
}

function openMovieDetails(i) {
  const movie = movies[i];

  document.getElementById("detailsTitle").textContent =
    movie.name;

  document.getElementById("detailsPoster").src =
    movie.poster;

  document.getElementById("detailsInfo").innerHTML = `
  <p><strong>⭐ Rating:</strong> ${movie.rating}</p>

  <p><strong>📅 Year:</strong> ${movie.year}</p>

  <p><strong>⏱ Runtime:</strong> ${movie.runtime || "N/A"} min</p>

  <p><strong>🎭 Genres:</strong> ${(movie.genres || []).join(", ")}</p>

  <p><strong>🎬 Director:</strong> ${movie.director || "Unknown"}</p>

  <p><strong>👨‍🎤 Cast:</strong> ${(movie.cast || []).join(", ")}</p>

  <hr style="margin:15px 0">

  <h3>📝 Overview</h3>

  <p>${movie.overview || "No overview available"}</p>

  ${
      movie.trailerKey
        ? `
          <button
            onclick="watchTrailer('${movie.trailerKey}')"
            style="
              margin-top:15px;
              padding:12px 18px;
              border:none;
              border-radius:10px;
              background:#ef4444;
              color:white;
              cursor:pointer;
              font-weight:600;
            "
          >
            ▶ Watch Trailer
          </button>
        `
        : ""
    }

  ${
      movie.similarMovies?.length
        ? `
          <hr style="margin:20px 0">

          <h3>🎯 Similar Movies</h3>

          <ul>
            ${movie.similarMovies
              .map(name => `<li>${name}</li>`)
              .join("")}
          </ul>
        `
        : ""
    }

    ${
      movie.recommendations?.length
        ? `
          <hr style="margin:20px 0">

          <h3>🤖 Recommended For You</h3>

          <ul>
            ${movie.recommendations
              .map(name => `<li>${name}</li>`)
              .join("")}
          </ul>
        `
        : ""
    }
`;

  document.getElementById(
    "movieDetailsModal"
  ).style.display = "flex";
}

function closeMovieDetails() {
  document.getElementById(
    "movieDetailsModal"
  ).style.display = "none";
}

function watchTrailer(key) {
  window.open(
    `https://www.youtube.com/watch?v=${key}`,
    "_blank"
  );
}

function saveMovieEdit() {
  const newName =
    document.getElementById("editMovieInput")
      .value
      .trim();

  if (!newName) {
    showToast("⚠️ Enter movie name");
    return;
  }

  const user = firebase.auth().currentUser;

  db.collection("users")
    .doc(user.uid)
    .collection("movies")
    .doc(editingMovieId)
    .update({
      name: newName
    });

  closeEditModal();

  showToast("✏️ Movie Updated");
}

function setFilter(filter, el) {
  activeFilter = filter;
  document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
  el.classList.add("active");
  applyFilters();
}

function applyFilters() {
  let q = document.getElementById("searchInput").value.toLowerCase();

  let filtered = movies.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(q);
    if (!matchSearch) return false;

    if (activeFilter === "all") return true;
    if (activeFilter === "watched") return m.watched;
    if (activeFilter === "unwatched") return !m.watched;
    if (activeFilter === "favorites") return m.favorite;

    return (
      m.genres &&
      m.genres.includes(activeFilter)
    );
  });

  displayMovies(filtered);
}

function sortMovies() {
  let type = document.getElementById("sortSelect").value;

  if (type === "rating") {
    movies.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (type === "year") {
    movies.sort((a, b) => (b.year || 0) - (a.year || 0));
  }

  displayMovies();
}

function toggleTheme() {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
}
  
function updateStats() {
  document.getElementById("statTotal").textContent = movies.length;
  document.getElementById("statWatched").textContent = movies.filter(m => m.watched).length;
  document.getElementById("statUnwatched").textContent = movies.filter(m => !m.watched).length;
  document.getElementById("statFavs").textContent = movies.filter(m => m.favorite).length;
}

function displayMovies(list = movies) {
  let container = document.getElementById("movieList");
  let emptyMsg = document.getElementById("emptyMsg");
  container.innerHTML = "";

  let watchedCount = movies.filter(m => m.watched).length;
  let percent = movies.length ? (watchedCount / movies.length) * 100 : 0;
  document.getElementById("progress").style.width = percent + "%";

  updateStats();

  if (list.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  list.forEach((m) => {
    const realIndex = movies.indexOf(m);
    container.innerHTML += `
      <div class="card">
        <img src="${m.poster}" alt="${m.name}">
        <h3 class="${m.watched ? 'watched' : ''} ${m.favorite ? 'favorite' : ''}">
  ${m.name}
  ${m.createdAt && Date.now() - m.createdAt < 86400000 ? "<span style='color:red;font-size:12px'> NEW</span>" : ""}
</h3>
        <p>
            📅 ${m.year}
            |
            ⭐ ${typeof m.rating === 'number'
              ? m.rating.toFixed(1)
              : m.rating}
        </p>

        <p style="color:#888;font-size:13px">
            🎭 ${(m.genres || []).slice(0,2).join(", ")}
        </p>

        <p style="color:#888;font-size:13px">
            ⏱ ${m.runtime || "N/A"} min
        </p>

        <p style="color:#aaa;font-size:13px">
            🎬 ${m.director || "Unknown"}
        </p>

        <p style="color:#aaa;font-size:13px">
            👨‍🎤 ${(m.cast || []).join(", ")}
        </p>

        <button class="small-btn" onclick="openMovieDetails(${realIndex})">
          ℹ️ Details
        </button>
        <button class="small-btn" onclick="toggleWatched(${realIndex})">${m.watched ? "Unwatch" : "✅ Watched"}</button>
        <button class="small-btn" onclick="toggleFavorite(${realIndex})">${m.favorite ? "★ Unfav" : "☆ Fav"}</button>
        <button onclick="editMovie(${realIndex})">✏️ Edit</button>
        <button class="small-btn" onclick="deleteMovie(${realIndex})">🗑 Delete</button>
      </div>
    `;
  });
}

function randomMovie() {
  if (!movies.length) return showToast("No movies!");
  let m = movies[Math.floor(Math.random() * movies.length)];
  showToast("🎬 Watch: " + m.name);
}

document.getElementById("movieInput").addEventListener("keypress", e => {
  if (e.key === "Enter") addMovie();
});

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

displayMovies();
