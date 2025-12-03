import { el, panel } from "./ui.js";
import { State } from "./state.js";

export function renderRaumscan() {
  const energie = numberField("Energie (1–5)", 3);
  const klarheit = numberField("Klarheit (1–5)", 3);
  const anspannung = numberField("Anspannung (1–5)", 2);

  const noteInput = el("textarea", {
    rows: "3",
    placeholder: "Kurze Notiz zum inneren Zustand …",
  });

  const saveBtn = el(
    "button",
    { class: "btn btn-primary", onclick: () => save() },
    "RaumScan speichern"
  );

  function save() {
    const e = Number(energie.value) || 3;
    const k = Number(klarheit.value) || 3;
    const a = Number(anspannung.value) || 2;

    // Formel optimiert: Ergebnis zwischen 1–5
    const score = Math.round(((e + k - a + 5) / 3) * 10) / 10;

    const note = noteInput.value.trim();

    State.addResult("raumscan.snapshots", { score, e, k, a, note });

    State.log({
      module: "raumscan",
      type: "snapshot",
      score,
      summary: `RaumScan: Energie ${e}, Klarheit ${k}, Anspannung ${a}`,
    });

    noteInput.value = "";
    alert("RaumScan gespeichert.");
  }

  return panel("RaumScan", [
    el("p", {}, "Kurzer innerer Zustands-Scan."),
    energie.label,
    klarheit.label,
    anspannung.label,
    el("label", {}, "Notiz (optional)", noteInput),
    saveBtn,
  ]);
}

function numberField(labelText, initial) {
  const input = el("input", {
    type: "number",
    min: "1",
    max: "5",
    value: String(initial),
  });

  const label = el("label", {}, labelText, input);

  return { label, value: input };
}
