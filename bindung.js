import { el, panel } from "./ui.js";
import { State } from "./state.js";

export function renderBindung() {
  const scoreInput = el("input", {
    type: "number",
    min: "1",
    max: "5",
    value: "3",
  });

  const noteInput = el("textarea", {
    rows: "3",
    placeholder: "Was bewegt dich gerade in Beziehungen / Bindung?",
  });

  const saveBtn = el(
    "button",
    { class: "btn btn-primary", onclick: () => save() },
    "Bindungs-Snapshot speichern"
  );

  function save() {
    const score = Number(scoreInput.value) || 3;
    const note = noteInput.value.trim();

    State.addResult("bindung.snapshots", { score, note });

    State.log({
      module: "bindung",
      type: "snapshot",
      score,
      summary: `Bindung: ${score}/5`,
    });

    noteInput.value = "";
    alert("Snapshot gespeichert.");
  }

  return panel("Bindung", [
    el(
      "p",
      {},
      "Wie stabil fühlt sich Bindung / Beziehung gerade auf einer Skala von 1–5 an?"
    ),
    el("label", {}, "Bindungs-Gefühl (1–5)", scoreInput),
    el("label", {}, "Notiz (optional)", noteInput),
    saveBtn,
  ]);
}
