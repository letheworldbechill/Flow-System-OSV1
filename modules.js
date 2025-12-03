import { renderDashboard } from "./dashboard.js";
import { renderWohnung } from "./wohnung.js";
import { renderRaumscan } from "./raumscan.js";
import { renderBindung } from "./bindung.js";
import { renderMiniReset } from "./minireset.js";
import { renderDiplomatie } from "./diplomatie.js";
import { renderMusterArchiv } from "./musterarchiv.js";
import { renderRahmung } from "./rahmung.js";
import { renderIntro } from "./intro.js";
import { renderFlowLog } from "./flowlog.js";
import { renderFourRooms } from "./fourrooms.js";
import { renderCogniSkript } from "./cogniskript.js";
import { renderFokusTimer } from "./fokustimer.js";
import { renderToxCheck } from "./toxcheck.js";
import { renderRaumatmos } from "./raumatmos.js";

export const modules = [
  {
    id: "dashboard",
    path: "/",
    title: "Dashboard",
    icon: "🏠",
    group: "System",
    render: renderDashboard,
    showInNav: true,
  },
  {
    id: "fourrooms",
    path: "/fourrooms",
    title: "Four Rooms",
    icon: "🧱",
    group: "Stabilisierung",
    render: renderFourRooms,
    showInNav: true,
  },
  {
    id: "wohnung",
    path: "/wohnung",
    title: "Wohnung",
    icon: "📦",
    group: "Umfeld",
    render: renderWohnung,
    showInNav: false,
  },
  {
    id: "raumatmos",
    path: "/raumatmos",
    title: "Raumatmosphäre",
    icon: "💨",
    group: "Umfeld",
    render: renderRaumatmos,
    showInNav: true,
  },
  {
    id: "raumscan",
    path: "/raumscan",
    title: "RaumScan",
    icon: "📡",
    group: "Zustand",
    render: renderRaumscan,
    showInNav: true,
  },
  {
    id: "cogniskript",
    path: "/cogniskript",
    title: "CogniSkript",
    icon: "🧠",
    group: "Kognition",
    render: renderCogniSkript,
    showInNav: true,
  },
  {
    id: "fokustimer",
    path: "/fokustimer",
    title: "Fokus Timer",
    icon: "⏱️",
    group: "Fokus",
    render: renderFokusTimer,
    showInNav: true,
  },
  {
    id: "bindung",
    path: "/bindung",
    title: "Bindung",
    icon: "🧷",
    group: "Beziehungen",
    render: renderBindung,
    showInNav: true,
  },
  {
    id: "toxcheck",
    path: "/toxcheck",
    title: "Beziehungs-Check",
    icon: "📊",
    group: "Beziehungen",
    render: renderToxCheck,
    showInNav: true,
  },
  {
    id: "minireset",
    path: "/minireset",
    title: "MiniReset",
    icon: "🔄",
    group: "Balance",
    render: renderMiniReset,
    showInNav: true,
  },
  {
    id: "diplomatie",
    path: "/diplomatie",
    title: "Diplomatie",
    icon: "🤝",
    group: "Interaktion",
    render: renderDiplomatie,
    showInNav: true,
  },
  {
    id: "musterarchiv",
    path: "/musterarchiv",
    title: "MusterArchiv",
    icon: "🗂️",
    group: "Langzeit",
    render: renderMusterArchiv,
    showInNav: true,
  },
  {
    id: "flowlog",
    path: "/flowlog",
    title: "FlowLog",
    icon: "📜",
    group: "System",
    render: renderFlowLog,
    showInNav: true,
  },
  {
    id: "rahmung",
    path: "/rahmung",
    title: "Rahmung",
    icon: "🧭",
    group: "Rahmen",
    render: renderRahmung,
    showInNav: false,
  },
  {
    id: "intro",
    path: "/intro",
    title: "Intro",
    icon: "🎬",
    group: "System",
    render: renderIntro,
    showInNav: false,
  },
];
