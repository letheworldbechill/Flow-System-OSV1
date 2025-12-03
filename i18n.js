// Sehr simple Stub-i18n, falls du später erweitern willst

const dict = {
  de: {
    dashboard_title: "Dashboard",
  },
  en: {
    dashboard_title: "Dashboard",
  },
};

let currentLang = "de";

export function setLang(lang) {
  currentLang = dict[lang] ? lang : "de";
}

export function t(key) {
  return dict[currentLang]?.[key] ?? key;
}
