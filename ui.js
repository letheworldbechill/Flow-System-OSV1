/* -----------------------------------------------------
   Mini-Komponentenbibliothek für DOM-Erstellung
------------------------------------------------------ */
export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);

  for (const [k, v] of Object.entries(props)) {
    if (k === "class") {
      node.className = v;
    } else if (k === "onclick") {
      node.addEventListener("click", v);
    } else if (k.startsWith("on") && typeof v === "function") {
      node.addEventListener(k.slice(2), v);
    } else {
      node.setAttribute(k, v);
    }
  }

  for (const child of children.flat()) {
    if (child == null) continue;
    if (typeof child === "string" || typeof child === "number") {
      node.appendChild(document.createTextNode(String(child)));
    } else {
      node.appendChild(child);
    }
  }

  return node;
}

/* -----------------------------------------------------
   Panel-Komponente (Grundstruktur jeder Modulseite)
------------------------------------------------------ */
export function panel(title, children = [], subtitle = "") {
  return el(
    "section",
    { class: "panel" },
    el(
      "header",
      { class: "panel-header" },
      el("h2", {}, title),
      subtitle ? el("p", {}, subtitle) : null
    ),
    el("div", { class: "panel-body" }, ...children)
  );
}

/* -----------------------------------------------------
   Badge-Komponente (farbliche Wertung)
------------------------------------------------------ */
export const Badge = {
  green(text = "stabil") {
    return el("span", { class: "badge badge-green" }, text);
  },
  yellow(text = "mittig") {
    return el("span", { class: "badge badge-yellow" }, text);
  },
  red(text = "kritisch") {
    return el("span", { class: "badge badge-red" }, text);
  },
  gray(text = "–") {
    return el("span", { class: "badge badge-gray" }, text);
  },

  fromScore(score) {
    if (score == null) return this.gray();
    if (score >= 4) return this.green(score + "/5");
    if (score >= 2.5) return this.yellow(score + "/5");
    return this.red(score + "/5");
  },
};
