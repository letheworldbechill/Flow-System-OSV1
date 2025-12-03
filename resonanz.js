
import { el, panel, Badge } from "./ui.js";
import { State } from "./state.js";

export function renderResonanz() {
  const last = State.lastSnapshot("resonanz");

  const umfeldRef = el("input", {
    class: "sf-range",
    type: "range",
    min: 1,
    max: 5,
    value: last?.umfeld ?? 3,
  });

  const koerperRef = el("input", {
    class: "sf-range",
    type: "range",
    min: 1,
    max: 5,
    value: last?.koerper ?? 3,
  });

  const kopfRef = el("input", {
    class: "sf-range",
    type: "range",
    min: 1,
    max: 5,
    value: last?.kopf ?? 3,
  });

  const info = el("div", {});

  function updateInfo() {
    const u = Number(umfeldRef.value);
    const k = Number(koerperRef.value);
    const h = Number(kopfRef.value);

    const score = (u + k + h) / 3;

    info.innerHTML = "";
    info.append(
      el("div", {}, `Score: ${score.toFixed(1)} / 5`),
      Badge.fromScore(score)
    );
  }

  updateInfo();

  const saveBtn = el(
    "button",
    {
      class: "sf-btn",
      onclick: () => {
        const u = Number(umfeldRef.value);
        const k = Number(koerperRef.value);
        const h = Number(kopfRef.value);
        const score = (u + k + h) / 3;

        State.addSnapshot("resonanz", {
          umfeld: u,
          koerper: k,
          kopf: h,
          score,
        });

        updateInfo();
        alert("Resonanz gespeichert.");
      },
    },
    "Resonanz speichern"
  );

  return panel(
    "Resonanz",
    [
      el(
        "div",
        { class: "sf-field" },
        el("span", { class: "sf-field-label" }, "Resonanz mit Umfeld"),
        umfeldRef
      ),
      el(
        "div",
        { class: "sf-field" },
        el("span", { class: "sf-field-label" }, "Körper-Resonanz"),
        koerperRef
      ),
      el(
        "div",
        { class: "sf-field" },
        el("span", { class: "sf-field-label" }, "Kopf / Gedanken-Resonanz"),
        kopfRef
      ),
      info,
      saveBtn,
    ],
    "Wie sehr schwingst du mit dem, was gerade um dich passiert?"
  );
}
