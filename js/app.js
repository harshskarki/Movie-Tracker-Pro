let movies = [];

function saveToDB(movie) {
  const user = firebase.auth().currentUser;
  if (!user) return;

  db.collection("users")
    .doc(user.uid)
    .collection("movies")
    .add(movie);
}

function loadMovies() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  db.collection("users")
    .doc(user.uid)
    .collection("movies")
    .onSnapshot(snapshot => {
      movies = [];
      snapshot.forEach(doc => {
        movies.push({ id: doc.id, ...doc.data() });
      });
      displayMovies();
    });
}

let activeFilter = "all";

function showToast(msg) {
  let t = document.getElementById("toast");
  t.innerText = msg;
  t.style.display = "block";
  setTimeout(() => t.style.display = "none", 2000);
}

async function fetchMovieData(name) {
  try {
    let res = await fetch(
      `/api/movie?q=${encodeURIComponent(name)}`
    );
    let data = await res.json();
    if (data.results && data.results[0]) {
      let movie = data.results[0];
      return {
        poster: movie.poster_path
          ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
          : "https://via.placeholder.com/300x450?text=No+Image",
        rating: movie.vote_average,
        year: movie.release_date ? movie.release_date.split("-")[0] : "N/A"
      };
    }
  } catch {}
  return { poster: "https://via.placeholder.com/300x450?text=No+Image", 
    rating: "N/A", 
    year: "N/A" };
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

  db.collection("users")
    .doc(user.uid)
    .collection("movies")
    .doc(movie.id)
    .delete();

  showToast("🗑 Deleted");
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
  let newName = prompt("Edit movie name:", movies[i].name);
  if (!newName) return;

  const user = firebase.auth().currentUser;

  db.collection("users")
    .doc(user.uid)
    .collection("movies")
    .doc(movies[i].id)
    .update({ name: newName });
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
    return m.category === activeFilter;
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
        <p>📅 ${m.year} | ⭐ ${typeof m.rating === 'number' ? m.rating.toFixed(1) : m.rating}</p>
        <p style="color:#888;font-size:13px">${m.category}</p>
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
