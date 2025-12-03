import { el, panel } from "./ui.js";
import { State } from "./state.js";

export function renderRaumatmos() {
  const raum = el("input", {
    type: "text",
    placeholder: "Welcher Raum (z.B. Wohnzimmer, Arbeitsplatz …)?",
  });

  const scoreInput = el("input", {
    type: "number",
    min: "1",
    max: "5",
    value: "3",
  });

  const noteInput = el("textarea", {
    rows: "2",
    placeholder:
      "Was prägt die Atmosphäre gerade (Licht, Ordnung, Geräusche, Stimmung)?",
  });

  const saveBtn = el(
    "button",
    { class: "btn btn-primary", onclick: () => save() },
    "Raumatmosphäre speichern"
  );

  function save() {
    const roomName = raum.value.trim() || "Raum";
    const score = Number(scoreInput.value) || 3;
    const note = noteInput.value.trim();

    State.addResult("raumatmos.snapshots", {
      room: roomName,
      score,
      note,
    });

    State.log({
      module: "raumatmos",
      type: "snapshot",
      score,
      summary: `Raumatmosphäre in "${roomName}": ${score}/5`,
    });

    alert("Raumatmosphäre gespeichert.");
  }

  return panel(
    "Raumatmosphäre",
    [
      el(
        "p",
        {},
        "Dezent wahrnehmen, wie sich ein Raum gerade anfühlt – ohne Bewertung, nur als Zustand."
      ),
      el("label", {}, "Raum", raum),
      el("label", {}, "Atmosphäre (1–5)", scoreInput),
      el("label", {}, "Notiz (optional)", noteInput),
      saveBtn,
    ],
    "Ein kleiner Check, wie sehr dich ein Raum gerade unterstützt oder eher fordert."
  );
}
