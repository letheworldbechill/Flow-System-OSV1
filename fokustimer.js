import { el, panel } from "./ui.js";
import { State } from "./state.js";

export function renderFokusTimer() {
  let intervalId = null;
  let startTs = null;
  let targetMinutes = 25;

  const minutesInput = el("input", {
    type: "number",
    min: "5",
    max: "120",
    value: String(targetMinutes),
  });

  const display = el(
    "div",
    { class: "fokus-display" },
    "00:00 / 25:00"
  );

  const noteInput = el("textarea", {
    rows: "2",
    placeholder: "Optional: Woran hast du gearbeitet?",
  });

  const startBtn = el(
    "button",
    { class: "btn btn-primary", onclick: () => start() },
    "Start"
  );
  const stopBtn = el(
    "button",
    { class: "btn btn-ghost", onclick: () => finish() },
    "Fokusblock abschließen"
  );

  function tick() {
    if (!startTs) return;
    const now = Date.now();
    const diffMs = now - startTs;
    const totalSec = Math.floor(diffMs / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;

    display.textContent = `${pad(m)}:${pad(s)} / ${targetMinutes}:00`;
  }

  function start() {
    targetMinutes = Number(minutesInput.value) || 25;
    display.textContent = `00:00 / ${targetMinutes}:00`;

    startTs = Date.now();

    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(tick, 1000);
  }

  function finish() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;

    if (!startTs) {
      alert("Kein Fokusblock gestartet.");
      return;
    }

    const elapsedMin = Math.round(((Date.now() - startTs) / 60000) * 10) / 10;
    const note = noteInput.value.trim();

    State.log({
      module: "fokustimer",
      type: "focusblock",
      summary: `Fokusblock: ca. ${elapsedMin} Min.`,
      score: elapsedMin >= targetMinutes ? 5 : 3,
    });

    State.addResult("fokustimer.blocks", {
      minutesPlanned: targetMinutes,
      minutesDone: elapsedMin,
      note,
    });

    startTs = null;
    noteInput.value = "";
    alert("Fokusblock erfasst.");
  }

  return panel(
    "Fokus Timer",
    [
      el(
        "p",
        {},
        "Setze dir einen realistischen Fokusblock und schließe ihn bewusst ab."
      ),
      el("label", {}, "Dauer (Minuten)", minutesInput),
      display,
      el("label", {}, "Notiz (optional)", noteInput),
      el(
        "div",
        { style: "display:flex;gap:8px;flex-wrap:wrap;" },
        startBtn,
        stopBtn
      ),
    ],
    "Nicht perfekt sein – nur bewusst fokussieren und abschließen."
  );
}

function pad(n) {
  return n < 10 ? "0" + n : String(n);
}
