document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return; // ⬅️ no hay banner en esta página

  const acceptBtn = document.getElementById("accept-cookies");
  const rejectBtn = document.getElementById("reject-cookies");

  const choice = localStorage.getItem("cookies_choice");

  if (!choice) {
    banner.classList.remove("hidden");
  } else {
    banner.classList.add("hidden");
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookies_choice", "accepted");
      banner.classList.add("hidden");
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      localStorage.setItem("cookies_choice", "rejected");
      banner.classList.add("hidden");
    });
  }
});
