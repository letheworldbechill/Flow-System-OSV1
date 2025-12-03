import { el, panel } from "./ui.js";
import { State } from "./state.js";

export function renderWohnung() {
  const scoreInput = el("input", {
    type: "number",
    min: "1",
    max: "5",
    value: "3",
  });

  const noteInput = el("textarea", {
    rows: "3",
    placeholder: "Kurze Notiz zur Wohnung / Ordnung / Atmosphäre …",
  });

  const saveBtn = el(
    "button",
    { class: "btn btn-primary", onclick: () => save() },
    "Snapshot speichern"
  );

  function save() {
    const score = Number(scoreInput.value) || 3;
    const note = noteInput.value.trim();

    State.addResult("wohnung.snapshots", { score, note });

    State.log({
      module: "wohnung",
      type: "snapshot",
      score,
      summary: `Wohnung Snapshot: ${score}/5`,
    });

    noteInput.value = "";
    alert("Snapshot gespeichert.");
  }

  return panel("Wohnung", [
    el("p", {}, "Kurzer Check deiner Wohnumgebung."),
    el("label", {}, "Gesamtgefühl Wohnung (1–5)", scoreInput),
    el("label", {}, "Notiz (optional)", noteInput),
    saveBtn,
  ]);
}
