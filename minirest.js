import { el, panel } from "./ui.js";
import { State } from "./state.js";

export function renderMiniReset() {
  const noteInput = el("textarea", {
    rows: "3",
    placeholder:
      "Optional: Was hast du kurz für dich getan (atmen, aufstehen, Wasser, etc.)?",
  });

  const btn = el(
    "button",
    { class: "btn btn-primary", onclick: () => save() },
    "MiniReset markieren"
  );

  function save() {
    const note = noteInput.value.trim();

    State.log({
      module: "minireset",
      type: "event",
      summary: "MiniReset ausgeführt.",
    });

    if (note) {
      State.addResult("minireset.notes", { note });
    }

    noteInput.value = "";
    alert("MiniReset erfasst.");
  }

  return panel("MiniReset", [
    el("p", {}, "Markiere bewusst einen kleinen Reset-Moment."),
    el("label", {}, "Notiz (optional)", noteInput),
    btn,
  ]);
}
