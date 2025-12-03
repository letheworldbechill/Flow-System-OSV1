import { el, panel, Badge } from "./ui.js";
import { State } from "./state.js";

export function renderFlowLog() {
  const s = State.currentSession();
  const log = (s.log || [])
    .slice()
    .sort((a, b) => new Date(b.ts) - new Date(a.ts));

  return panel(
    "FlowLog",
    [
      el(
        "div",
        { class: "flowlog" },
        log.length
          ? log.map((e) => logItem(e))
          : el("div", { class: "flowlog-item" }, "Noch keine Ereignisse erfasst.")
      ),
    ],
    "Chronik aller gespeicherten Zustände über alle Module."
  );
}

function logItem(e) {
  return el(
    "div",
    { class: "flowlog-item" },
    el(
      "div",
      { class: "flowlog-header" },
      el("span", { class: "flowlog-time" }, new Date(e.ts).toLocaleString()),
      el("span", { class: "flowlog-module" }, e.module),
      e.score != null ? Badge.fromScore(e.score) : ""
    ),
    e.summary ? el("div", { class: "flowlog-summary" }, e.summary) : null
  );
}
