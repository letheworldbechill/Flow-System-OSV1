import { initRouter, navigate } from "./router.js";
import { modules } from "./modules.js";
import { el } from "./ui.js";
import { State } from "./state.js";

/* -----------------------------
   Navigation dynamisch aufbauen
------------------------------ */
function initNav() {
  const navRoot = document.getElementById("nav");
  navRoot.innerHTML = "";

  modules
    .filter((m) => m.showInNav)
    .forEach((m) => {
      const btn = el(
        "button",
        {
          class: "nav-item",
          "data-path": m.path,
          onclick: () => navigate(m.path),
        },
        `${m.icon} ${m.title}`
      );
      navRoot.appendChild(btn);
    });
}

/* -----------------------------
   State & Router initialisieren
------------------------------ */

State.currentSession();
initNav();
initRouter();

/* -----------------------------
      Service Worker
------------------------------ */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}
