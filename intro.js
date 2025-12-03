import { el, panel } from "./ui.js";

export function renderIntro() {
  return panel("Intro", [
    el("p", {}, "SystemFlow OS ist dein kleines mentales Betriebssystem."),
    el("p", {}, "Es hilft dir, Zustände zu scannen, zu ordnen und abzuschließen."),
    el(
      "ul",
      { class: "list" },
      el("li", {}, "🏠 Dashboard: Überblick über dein System."),
      el("li", {}, "📦 Wohnung: Umfeld-Check."),
      el("li", {}, "📡 RaumScan: innerer Zustand."),
      el("li", {}, "🧷 Bindung: Beziehungen."),
      el("li", {}, "🔄 MiniReset: kleine Entlastung."),
      el("li", {}, "🤝 Diplomatie: Umgang mit Konflikten."),
      el("li", {}, "📜 FlowLog: Verlauf über alles.")
    )
  ]);
}
