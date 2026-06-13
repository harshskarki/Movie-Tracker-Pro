"use strict";

const glow = document.querySelector(".cursor-glow");
const btn = document.querySelector(".btn");
const features = document.querySelectorAll(".feature");
const counters = document.querySelectorAll(".counter");

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  if (!glow) return;

  posX += (mouseX - posX) * 0.1;
  posY += (mouseY - posY) * 0.1;

  glow.style.left = posX + "px";
  glow.style.top = posY + "px";

  requestAnimationFrame(animate);
}

if (glow) {
  animate();
}


if (btn) {
  btn.innerText = "⏳ Loading...";
}

firebase.auth().onAuthStateChanged(user => {
  if (!btn) return;

  if (user) {
    btn.innerText = "🎬 Go to App";
    btn.href = "app.html";
  } else {
    btn.innerText = "🚀 Get Started";
    btn.href = "login.html";
  }
});


function revealFeatures() {
  features.forEach(f => {
    const rect = f.getBoundingClientRect();

    if (rect.top < window.innerHeight - 50) {
      f.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealFeatures);

revealFeatures();

// 🔢 STATS COUNTING ANIMATION

counters.forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;

    const increment = Math.max(1, target / 100);

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(update, 20);
    } else {
      counter.innerText = target >= 1000 
        ? (target/1000) + "K+" 
        : target + (target === 99 ? "%" : "+");
    }
  };

  update();
});

