import { el, panel } from "./ui.js";

export function renderRahmung() {
  return panel("Rahmung", [
    el("p", {}, "SystemFlow OS ist kein Diagnosetool und keine Therapie."),
    el("p", {}, "Es ist eine Struktur, die dir hilft, Zustände klarer zu sehen und bewusster zu handeln."),
    el("p", {}, "Du darfst jederzeit abbrechen, pausieren oder Module ignorieren."),
    el(
      "p",
      {},
      "Wenn es dir nicht gut geht oder sich etwas zuspitzt, such dir bitte echte Menschen / Profis in deinem Leben."
    ),
  ]);
}
