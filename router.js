import { modules } from "./modules.js";

const routes = new Map();

/* ---------------------------------
   Router initialisieren
---------------------------------- */
export function initRouter() {
  modules.forEach((m) => routes.set(m.path, m.render));

  window.addEventListener("popstate", () => {
    renderRoute(location.pathname);
  });

  renderRoute(location.pathname || "/");
}

/* ---------------------------------
   Navigation / Route-Wechsel
---------------------------------- */
export function navigate(path) {
  if (location.pathname !== path) {
    history.pushState({}, "", path);
  }
  renderRoute(path);
}

/* ---------------------------------
   Wirkliches Rendern des Moduls
---------------------------------- */
function renderRoute(path) {
  const renderFn = routes.get(path) || routes.get("/");
  const root = document.getElementById("app");

  root.innerHTML = "";
  if (renderFn) {
    const component = renderFn();
    root.appendChild(component);
  }

  highlightNav(path);
}

/* ---------------------------------
   Navigation visuell markieren
---------------------------------- */
function highlightNav(path) {
  const buttons = document.querySelectorAll(".nav-item");
  buttons.forEach((btn) => {
    const target = btn.getAttribute("data-path");
    btn.classList.toggle("active", target === path);
  });
}
