const app = document.querySelector(".app");
const sidebar = document.getElementById("sidebar");
const toggles = document.querySelectorAll("[data-sidebar-toggle]");
const menuBtn = document.querySelector(".menu");
const closeBtn = document.querySelector(".collapse");
const mobile = window.matchMedia("(max-width: 48rem)");

function setSidebar(state, { moveFocus = false } = {}) {
    const open = state === "open";
    app.dataset.sidebar = state;
    sidebar.inert = !open;   
    toggles.forEach(btn => btn.setAttribute("aria-expanded", String(open)));
    if (moveFocus) (open ? closeBtn : menuBtn).focus();   
}

toggles.forEach(btn => btn.addEventListener("click", () =>
    setSidebar(app.dataset.sidebar === "open" ? "closed" : "open", { moveFocus: true })));

document.addEventListener("keydown", e => {
    if (e.key === "Escape" && mobile.matches && app.dataset.sidebar === "open") {
        setSidebar("closed", { moveFocus: true });
    }
});

document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();  
    if (mobile.matches) setSidebar("closed", { moveFocus: true });
}));

mobile.addEventListener("change", e => setSidebar(e.matches ? "closed" : "open"));
setSidebar(mobile.matches ? "closed" : "open");