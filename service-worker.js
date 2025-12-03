const CACHE_NAME = "systemflow-os-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./ui.js",
  "./state.js",
  "./router.js",
  "./modules.js",
  "./dashboard.js",
  "./flowlog.js",
  "./intro.js",
  "./wohnung.js",
  "./raumscan.js",
  "./bindung.js",
  "./minireset.js",
  "./diplomatie.js",
  "./musterarchiv.js",
  "./rahmung.js",
  "./manifest.webmanifest",
  "./i18n.js",
  "./fourrooms.js",
  "./cogniskript.js",
  "./fokustimer.js",
  "./toxcheck.js",
  "./raumatmos.js",
  "./resonanz.js",
  "./restladung.js"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activate + remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE_NAME)
            .map((k) => caches.delete(k))
        )
      )
  );
});

// Fetch
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => caches.match("./index.html"))
      );
    })
  );
});
