import { el, panel, Badge } from "./ui.js";
import { State } from "./state.js";

const QUESTIONS = [
  "Kannst du Gedanken und Gefühle frei äußern, ohne Angst vor Abwertung?",
  "Werden deine Grenzen wahrgenommen und respektiert?",
  "Darfst du Fehler machen, ohne dass dein Wert grundsätzlich in Frage gestellt wird?",
  "Gibt es Raum für deine eigenen Bedürfnisse?",
  "Fühlen sich Konfliktgespräche eher klärend als eskalierend an?",
  "Fühlst du dich über längere Zeit eher gestärkt als geschwächt in dieser Verbindung?",
];

export function renderToxCheck() {
  const selects = [];

  const rows = QUESTIONS.map((q) => {
    const select = el(
      "select",
      {},
      option("1", "1 – kaum / nie"),
      option("2", "2"),
      option("3", "3 – teils / teils"),
      option("4", "4"),
      option("5", "5 – deutlich / oft")
    );

    selects.push(select);
    return el("label", {}, q, select);
  });

  const relationInput = el("input", {
    type: "text",
    placeholder: "Optional: Name / Kontext der Verbindung (nur für dich)",
  });

  const resultBox = el("div", {});

  const saveBtn = el(
    "button",
    { class: "btn btn-primary", onclick: () => save() },
    "Check auswerten und speichern"
  );

  function save() {
    const scores = selects.map((s) => Number(s.value) || 3);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const rounded = Math.round(avg * 10) / 10;

    let badge;
    let text;

    if (avg >= 4) {
      badge = Badge.green("Verbindung wirkt überwiegend unterstützend");
      text = "Die Verbindung wirkt überwiegend stabil und unterstützend.";
    } else if (avg >= 2.6) {
      badge = Badge.yellow("Verbindung wirkt ambivalent");
      text =
        "Es gibt sowohl stärkende als auch belastende Elemente. Genau hinschauen kann hilfreich sein.";
    } else {
      badge = Badge.red("Verbindung wirkt dauerhaft belastend");
      text =
        "Die Verbindung wirkt über längere Zeit eher schwächend. Eigene Grenzen und Ressourcen sind wichtig.";
    }

    resultBox.innerHTML = "";
    resultBox.append(
      el("p", {}, `Durchschnittswert: ${rounded} von 5`),
      badge,
      el("p", {}, text)
    );

    const relation = relationInput.value.trim();

    State.addResult("toxcheck.assessments", {
      scores,
      avg,
      relation,
    });

    State.log({
      module: "toxcheck",
      type: "assessment",
      score: avg,
      summary: relation
        ? `Beziehungs-Check für "${relation}": Ø ${rounded}/5`
        : `Beziehungs-Check: Ø ${rounded}/5`,
    });

    alert("Beziehungs-Check gespeichert.");
  }

  return panel(
    "Beziehungs-Check",
    [
      el(
        "p",
        {},
        "Neutraler Check, ob eine Verbindung dich eher stärkt oder schwächt – ohne Labels, nur Beobachtung."
      ),
      el("label", {}, "Kontext (optional)", relationInput),
      ...rows,
      saveBtn,
      resultBox,
    ],
    "Nutze diesen Check nur für deine eigene Orientierung, nicht als Waffe gegen andere."
  );
}

function option(value, label) {
  return el("option", { value }, label);
}
