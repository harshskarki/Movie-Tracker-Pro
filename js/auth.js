function requireAuth() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      loadMovies();
      return;
    }

    setTimeout(() => {
      if (!firebase.auth().currentUser) {
        window.location.href = "login.html";
      }
    }, 1500);
  });
}

requireAuth();