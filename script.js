(() => {
  "use strict";
  const weddingMoment = new Date("2026-11-22T07:45:00+05:30").getTime();
  const $ = (id) => document.getElementById(id);

  
  // Create a few lightweight floating hearts
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const heartLayer = document.createDocumentFragment();

  
for (let i = 0; i < 5; i++) {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = "♥";
  heart.setAttribute("aria-hidden", "true");

  const sizes = [11, 15, 19, 13, 17];
  const durations = [18, 14, 21, 16, 19];
  const colors = [
    "#e8a0b0",
    "#f0b8c5",
    "#d98798",
    "#f4c5ce",
    "#df91a5"
  ];

  heart.style.left = `${10 + i * 19}%`;
  heart.style.setProperty("--heart-size", `${sizes[i]}px`);
  heart.style.setProperty("--heart-duration", `${durations[i]}s`);
  heart.style.setProperty("--heart-color", colors[i]);
  heart.style.setProperty("--heart-opacity", `${0.3 + (i % 3) * 0.12}`);
  heart.style.setProperty("--heart-blur", `${i % 2 ? 0.4 : 0}px`);
  heart.style.setProperty("--heart-delay", `-${i * 3.2}s`);

  heartLayer.appendChild(heart);
}

    document.body.appendChild(heartLayer);
  }



  // Lightweight falling flower petals
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const petals = document.createDocumentFragment();

    for (let i = 0; i < 10; i++) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.setAttribute("aria-hidden", "true");

      petal.style.left = `${(i * 37 + 11) % 100}%`;
      petal.style.animationDuration = `${15 + (i % 5) * 2}s`;
      petal.style.animationDelay = `-${(i * 2) % 15}s`;
      petal.style.transform = `rotate(${i * 35}deg)`;

      petals.appendChild(petal);
    }

    document.body.appendChild(petals);
  }

  function updateCountdown() {
    const now = Date.now();
    const diff = weddingMoment - now;
    if (diff <= 0) {
      $("countdown").innerHTML = '<p class="countdown-note">The forever has begun ♡</p>';
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    $("days").textContent = String(days).padStart(2, "0");
    $("hours").textContent = String(hours).padStart(2, "0");
    $("minutes").textContent = String(minutes).padStart(2, "0");
    $("seconds").textContent = String(seconds).padStart(2, "0");
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Visitor-controlled playback of the user's uploaded wedding song.
 
  // Welcome screen and user-triggered wedding music.
  const weddingAudio = $("weddingAudio");
  const welcomeScreen = $("welcomeScreen");
  const openInvitationBtn = $("openInvitationBtn");

  weddingAudio.volume = 0.75;

 
 


openInvitationBtn.addEventListener("click", async () => {
  document.body.classList.add("invitation-opening");
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  welcomeScreen.classList.add("opening");

  try {
    await weddingAudio.play();
  } catch (error) {
    console.log("Music could not start:", error);
  }


window.setTimeout(() => {
  welcomeScreen.style.display = "none";

  // Restore normal page scrolling.
  document.body.classList.remove("invitation-opening");
  document.body.style.overflowY = "auto";
  document.documentElement.style.overflowY = "auto";
  document.documentElement.style.scrollBehavior = "auto";
}, 850);

});




  
const shareText = `You're invited to celebrate Vishnu Prasath & Rithanya!

Reception: 21 November 2026, 6:00 PM onwards.
Muhurtham: 22 November 2026, 7:45–8:45 AM.

Venue: Vivaas Mahal, Dhali Road, Periyakulam Pirivu.`;

  $("shareInvite").addEventListener("click", (event) => {
    event.preventDefault();
    const url = window.location.href;
    const message = `${shareText}\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
})();


document.addEventListener("visibilitychange", async () => {
  if (document.hidden) {
    weddingAudio.pause();
  } else {
    try {
      await weddingAudio.play();
    } catch (error) {
      console.log("Music could not resume:", error);
    }
  }
});
