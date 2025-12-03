const STORAGE_KEY = "systemflow_state_v1";

/* ----------------------------------------------
   L O A D  +  I N I T
---------------------------------------------- */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.sessions)) parsed.sessions = [];
    return parsed;
  } catch (e) {
    console.warn("State load error", e);
    return createInitialState();
  }
}

function createInitialState() {
  return {
    sessions: [],
    settings: {
      lang: "de",
      theme: "dark",
    },
  };
}

/* ----------------------------------------------
   N E U E  S E S S I O N
---------------------------------------------- */
function newSession() {
  return {
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    notes: {},
    results: {},
    log: [],
  };
}

/* ----------------------------------------------
   S T A T E  O B J E K T
---------------------------------------------- */
export const State = {
  data: loadState(),

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn("State save error", e);
    }
  },

  currentSession() {
    if (!this.data.sessions.length) {
      const s = newSession();
      this.data.sessions.push(s);
      this.save();
    }
    return this.data.sessions[this.data.sessions.length - 1];
  },

  /* ----------------------------------------------
     L O G
  ---------------------------------------------- */
  log(entry) {
    const s = this.currentSession();
    if (!Array.isArray(s.log)) s.log = [];

    s.log.push({
      ts: new Date().toISOString(),
      ...entry,
    });

    this.save();
  },

  /* ----------------------------------------------
     R E S U L T S
  ---------------------------------------------- */
  addResult(key, result) {
    const s = this.currentSession();
    if (!s.results[key]) s.results[key] = [];

    s.results[key].push({
      ts: new Date().toISOString(),
      ...result,
    });

    this.save();
  },

  /* ----------------------------------------------
     S N A P S H O T S
  ---------------------------------------------- */
  addSnapshot(module, data) {
    this.addResult(`${module}.snapshots`, data);
  },

  lastSnapshot(module) {
    const s = this.currentSession();
    const arr = s.results?.[`${module}.snapshots`] || [];
    return arr.length > 0 ? arr[arr.length - 1] : null;
  },
};
