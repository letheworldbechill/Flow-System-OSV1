import { el, panel, Badge } from "./ui.js";
import { State } from "./state.js";

export function renderRestladung() {
  const last = State.lastSnapshot("restladung");

  const intensityRef = el("input", {
    class: "sf-range",
    type: "range",
    min: 1,
    max: 5,
    value: last?.intensitaet ?? 3,
  });

  const textRef = el(
    "textarea",
    {
      class: "sf-textarea",
      rows: 3,
      placeholder: "Was hängt noch nach? Kurz, ohne Analyse.",
    },
    last?.beschreibung ?? ""
  );

  const info = el("div", {});

  function updateInfo() {
    const intensity = Number(intensityRef.value);

    // Score umgedreht: 1 = hohe Restladung → niedriges Badge
    const score = 6 - intensity;

    info.innerHTML = "";
    info.append(
      el("div", {}, `Restladung: ${intensity} / 5`),
      Badge.fromScore(score)
    );
  }

  updateInfo();

  const saveBtn = el(
    "button",
    {
      class: "sf-btn",
      onclick: () => {
        const intensity = Number(intensityRef.value);
        const beschr = textRef.value.trim();

        const score = 6 - intensity;

        State.addSnapshot("restladung", {
          intensitaet: intensity,
          beschreibung: beschr,
          score,
        });

        updateInfo();
        alert("Restladung gespeichert.");
      },
    },
    "Restladung speichern"
  );

  return panel(
    "Restladung",
    [
      el(
        "div",
        { class: "sf-field" },
        el("span", { class: "sf-field-label" }, "Intensität des Nachhallens"),
        intensityRef
      ),
      el(
        "div",
        { class: "sf-field" },
        el("span", { class: "sf-field-label" }, "Kurzbeschreibung"),
        textRef
      ),
      info,
      saveBtn,
    ],
    "Wie viel Energie hängt von heute oder gestern noch in dir?"
  );
}