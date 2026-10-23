const app = document.querySelector(".app");
const toggles = document.querySelectorAll("[data-sidebar-toggle]");
const mobile = window.matchMedia("(max-width: 48rem)");

function setSidebar(state) {
  app.dataset.sidebar = state;
  toggles.forEach(btn => btn.setAttribute("aria-expanded", String(state === "open")));
}
toggles.forEach(btn => btn.addEventListener("click", () =>
  setSidebar(app.dataset.sidebar === "open" ? "closed" : "open")));

document.addEventListener("keydown", e => { if (e.key === "Escape" && mobile.matches) setSidebar("closed"); });
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", e => {
  e.preventDefault();
  if (mobile.matches) setSidebar("closed");
}));

mobile.addEventListener("change", e => setSidebar(e.matches ? "closed" : "open"));
setSidebar(mobile.matches ? "closed" : "open");