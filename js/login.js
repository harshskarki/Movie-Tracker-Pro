"use strict";

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    setTimeout(() => {
      window.location.href = "app.html";
    }, 800);
  }
});

function showError(msg) {
  const el = document.getElementById("error");

  // set message
  el.innerText = msg;

  // 🔥 RESET animation so it triggers EVERY time
  el.style.animation = "none";
  el.offsetHeight; // force reflow
  el.style.animation = "shake 0.3s";

  // ⏳ auto clear after 3 sec
  if (msg) {
    setTimeout(() => {
      el.innerText = "";
    }, 3000);
  }
}
  
function showLoader(show) {
  const loader = document.getElementById("loader");
  loader.style.display = show ? "block" : "none";
  loader.innerText = show ? "⏳ Authenticating..." : "";
}

function togglePass() {
  let pass = document.getElementById("password");
  let toggle = document.querySelector(".toggle");

  if (pass.type === "password") {
    pass.type = "text";
    toggle.innerText = "🙈"; // hidden icon
  } else {
    pass.type = "password";
    toggle.innerText = "👁️"; // show icon
  }
}

async function login() {
  const btn = document.getElementById("loginBtn");
  const emailEl = document.getElementById("email");
  const passEl = document.getElementById("password");
  let isSuccess = false;
  
  try {
    showLoader(true);
    showError("");

    btn.disabled = true;
    btn.classList.add("loading");
    
    const email = emailEl.value.trim();
    const pass = passEl.value.trim();

    // ✅ FRONTEND VALIDATION (FAANG STYLE)
    if (!email || !pass) {
      throw { code: "empty-fields" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  throw { code: "invalid-email-format" };
}
    if (pass.length < 6) {
      throw { code: "weak-password" };
    }

    // 🔐 Firebase login
    await firebase.auth().signInWithEmailAndPassword(email, pass);
    isSuccess = true;
    
    // ✅ SUCCESS ANIMATION
    showLoader(false);
    btn.innerText = "✅ Success!";
    btn.style.background = "green";

    setTimeout(() => {
      window.location.href = "app.html";
    }, 800);

  } catch (err) {
  console.log("ERROR FULL:", err);

  let msg = "❌ Login failed";

  const code = err.code || err.message;

  if (code === "empty-fields") {
    msg = "⚠️ Please fill all fields";
  }
  else if (code === "invalid-email-format") {
    msg = "⚠️ Enter a valid email";
  }
  else if (code === "weak-password") {
    msg = "🔒 Password must be at least 6 characters";
  }
  else if (code.includes("auth/invalid-email")) {
    msg = "⚠️ Invalid email format";
  }
  else if (
    code.includes("auth/invalid-credential") ||
    code.includes("auth/wrong-password") ||
    code.includes("auth/user-not-found")
  ) {
    msg = "❌ Invalid email or password";
  }

  showError(msg);

  // ✅ MOVE INPUT ERROR EFFECT HERE
  emailEl.classList.add("input-error");
  passEl.classList.add("input-error");

  setTimeout(() => {
    emailEl.classList.remove("input-error");
    passEl.classList.remove("input-error");
  }, 1500);

  
    } finally {
    showLoader(false);
    btn.disabled = false;
    btn.classList.remove("loading");

    if (!isSuccess) { // ✅ 👈 CHECK HERE
      btn.innerText = "Login";
      btn.style.background = "#e50914";
    }
  }
}
  
async function signup() {
  try {
    showLoader(true);
    showError("");

    const email = document.getElementById("email").value.trim();
const pass = document.getElementById("password").value.trim();

if (!email || !pass) {
  showError("⚠️ Please fill all fields");
  return;
}

if (pass.length < 6) {
  showError("🔒 Password must be at least 6 characters");
  return;
}

    await firebase.auth().createUserWithEmailAndPassword(email, pass);
    setTimeout(() => {
  window.location.href = "app.html";
}, 800);

  } catch (err) {
    showError(err.message);
  } finally {
    showLoader(false);
  }
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(() => {
  setTimeout(() => {
    window.location.href = "app.html";
  }, 800);
})
    .catch(err => showError(err.message));
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !document.getElementById("loginBtn").disabled) {
    login();
  }
});