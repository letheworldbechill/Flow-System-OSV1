import { el, panel } from "./ui.js";
import { State } from "./state.js";

export function renderDiplomatie() {
  const situation = el("textarea", {
    rows: "3",
    placeholder: "Kurz: Worum geht es im Konflikt / in der Spannung?",
  });

  const meinAnteil = el("textarea", {
    rows: "3",
    placeholder: "Was ist dein Anteil / deine Verantwortung?",
  });

  const grenze = el("textarea", {
    rows: "3",
    placeholder: "Wo ist deine Grenze / dein Minimum an Respekt / Klarheit?",
  });

  const btn = el(
    "button",
    { class: "btn btn-primary", onclick: () => save() },
    "Notiz speichern"
  );

  function save() {
    const summary = (situation.value || "").slice(0, 80);

    State.addResult("diplomatie.entries", {
      situation: situation.value,
      meinAnteil: meinAnteil.value,
      grenze: grenze.value,
    });

    State.log({
      module: "diplomatie",
      type: "note",
      summary: "Diplomatie-Notiz: " + summary,
    });

    situation.value = "";
    meinAnteil.value = "";
    grenze.value = "";
    alert("Diplomatie-Notiz gespeichert.");
  }

  return panel("Diplomatie", [
    el("p", {}, "Konflikte nüchtern einordnen, ohne Drama."),
    el("label", {}, "Situation", situation),
    el("label", {}, "Mein Anteil", meinAnteil),
    el("label", {}, "Meine Grenze / Rahmen", grenze),
    btn,
  ]);
}
