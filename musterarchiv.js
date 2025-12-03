import { el, panel } from "./ui.js";
import { State } from "./state.js";

export function renderMusterArchiv() {
  const s = State.currentSession();
  const entries = s.log || [];

  return panel("MusterArchiv", [
    el("p", {}, "Langfristige Muster erkennst du am besten im FlowLog."),
    el("p", {}, "Hier ein einfacher Überblick über die letzten Einträge:"),
    el(
      "ul",
      { class: "list" },
      ...entries
        .slice(-20)
        .reverse()
        .map((e) =>
          el(
            "li",
            {},
            new Date(e.ts).toLocaleString(),
            " · ",
            e.module,
            e.summary ? " · " + e.summary : ""
          )
        )
    ),
  ]);
}
