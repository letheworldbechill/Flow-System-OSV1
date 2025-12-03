import { el, panel, Badge } from "./ui.js";
import { State } from "./state.js";

const ROOMS = [
  { id: "living", label: "Wohnzimmer" },
  { id: "bed", label: "Schlafzimmer" },
  { id: "kitchen", label: "Küche" },
  { id: "bath", label: "Bad" },
];

export function renderFourRooms() {
  const inputs = {};

  const rows = ROOMS.map((room) => {
    const input = el("input", {
      type: "text",
      placeholder: `Ein kleines Abschluss-Erfolgserlebnis im ${room.label} heute …`,
    });

    inputs[room.id] = input;

    return el("label", {}, room.label, input);
  });

  const info = el(
    "p",
    {},
    "Ziel: In jedem Raum einmal pro Tag bewusst einen kleinen Abschlussmoment wahrnehmen (aufgeräumt, erledigt, bewusst abgeschlossen)."
  );

  const badge = el("div", {});

  const saveBtn = el(
    "button",
    { class: "btn btn-primary", onclick: () => save() },
    "Heutigen FourRooms-Eintrag speichern"
  );

  function save() {
    const data = {};
    let completed = 0;

    ROOMS.forEach((room) => {
      const val = inputs[room.id].value.trim();
      data[room.id] = val;
      if (val) completed++;
    });

    const score =
      completed === 0
        ? null
        : Math.round((completed / ROOMS.length) * 5 * 10) / 10;

    State.addResult("fourrooms.snapshots", {
      score,
      rooms: data,
    });

    State.log({
      module: "fourrooms",
      type: "snapshot",
      score: score ?? undefined,
      summary: `FourRooms: ${completed}/${ROOMS.length} Räume mit bewusstem Abschluss.`,
    });

    badge.innerHTML = "";

    if (score == null) {
      badge.appendChild(Badge.gray("Heute noch kein bewusster Abschluss"));
    } else if (score >= 4) {
      badge.appendChild(Badge.green("Starke Basis heute"));
    } else if (score >= 2.5) {
      badge.appendChild(Badge.yellow("Teilweise abgeschlossen"));
    } else {
      badge.appendChild(Badge.red("Sehr wenig Abschluss heute"));
    }

    alert("FourRooms-Eintrag gespeichert.");
  }

  return panel(
    "Four Rooms",
    [
      info,
      ...rows,
      el("div", { class: "dash-badge" }, badge),
      saveBtn,
    ],
    "Vier reale Räume, vier kleine Erfolgsmomente. Stabilisierung im Alltag, ohne Druck."
  );
}
