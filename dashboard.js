import { el, panel, Badge } from "./ui.js";
import { State } from "./state.js";
import { navigate } from "./router.js";

export function renderDashboard() {
  const s = State.currentSession();

  const lastWh = lastResult(s, "wohnung.snapshots");
  const lastRs = lastResult(s, "raumscan.snapshots");
  const lastBd = lastResult(s, "bindung.snapshots");

  return panel(
    "Dashboard",
    [
      el(
        "div",
        { class: "dashboard-grid" },
        dashCard("Wohnung", "📦", lastWh, () => navigate("/wohnung")),
        dashCard("RaumScan", "📡", lastRs, () => navigate("/raumscan")),
        dashCard("Bindung", "🧷", lastBd, () => navigate("/bindung"))
      ),
      el("h3", {}, "Sofort-Aktionen"),
      el(
        "div",
        { class: "dashboard-actions" },
        el(
          "button",
          { class: "btn dash-action", onclick: () => navigate("/minireset") },
          "🔄 MiniReset"
        ),
        el(
          "button",
          { class: "btn dash-action", onclick: () => navigate("/diplomatie") },
          "🤝 Diplomatie"
        )
      ),
    ],
    "Letzte Zustände und schnelle Einstiege."
  );
}

function lastResult(session, key) {
  const arr = session?.results?.[key] || [];
  return arr.length ? arr[arr.length - 1] : null;
}

function dashCard(title, icon, result, onClick) {
  const score = result?.score ?? null;

  return el(
    "div",
    { class: "dash-card", onclick: onClick },
    el(
      "div",
      { class: "dash-header" },
      el("span", { class: "dash-icon" }, icon),
      el("strong", {}, title)
    ),
    el(
      "div",
      { class: "dash-info" },
      score != null ? `Score: ${score}/5` : "Keine Daten"
    ),
    el(
      "div",
      { class: "dash-badge" },
      score != null ? Badge.fromScore(score) : Badge.gray()
    )
  );
}
