import { el, panel } from "./ui.js";
import { State } from "./state.js";

export function renderCogniSkript() {
  const situation = textarea("Kurz: Was ist passiert / was beschäftigt dich?");
  const gedanke = textarea("Was denkst du darüber (spontaner Gedanke)?");
  const gefuehl = textarea("Was fühlst du dazu (ohne Bewertung)?");
  const fakten = textarea("Welche nüchternen Fakten sind sicher?");
  const bedarf = textarea("Was brauchst du in dieser Situation wirklich?");
  const naechsterSchritt = textarea(
    "Was könnte ein kleiner, konkreter nächster Schritt sein?"
  );

  const saveBtn = el(
    "button",
    { class: "btn btn-primary", onclick: () => save() },
    "CogniSkript speichern"
  );

  function save() {
    const entry = {
      situation: situation.value.trim(),
      gedanke: gedanke.value.trim(),
      gefuehl: gefuehl.value.trim(),
      fakten: fakten.value.trim(),
      bedarf: bedarf.value.trim(),
      naechsterSchritt: naechsterSchritt.value.trim(),
    };

    State.addResult("cogniskript.entries", entry);

    const summary = entry.situation
      ? entry.situation.slice(0, 80)
      : "CogniSkript-Eintrag";

    State.log({
      module: "cogniskript",
      type: "entry",
      summary,
    });

    // Felder leeren
    situation.value = "";
    gedanke.value = "";
    gefuehl.value = "";
    fakten.value = "";
    bedarf.value = "";
    naechsterSchritt.value = "";

    alert("CogniSkript-Eintrag gespeichert.");
  }

  return panel(
    "CogniSkript",
    [
      el(
        "p",
        {},
        "Strukturiere eine Situation so, dass sie denkbar und handelbar wird – ohne Drama, ohne Interpretation."
      ),
      labelWrap("Situation", situation),
      labelWrap("Gedanke", gedanke),
      labelWrap("Gefühl", gefuehl),
      labelWrap("Fakten", fakten),
      labelWrap("Bedarf", bedarf),
      labelWrap("Nächster Schritt", naechsterSchritt),
      saveBtn,
    ],
    "Ein Denkgerüst, das deinen inneren Bezugspunkt realistischer macht."
  );
}

function textarea(placeholder) {
  return el("textarea", { rows: "3", placeholder });
}

function labelWrap(text, inputEl) {
  return el("label", {}, text, inputEl);
}
