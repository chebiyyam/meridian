import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tbztpvqwiutcrvecqauj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRienRwdnF3aXV0Y3J2ZWNxYXVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1ODUwMjIsImV4cCI6MjA4ODE2MTAyMn0.ybcgn0ahWdmRbFFD5zNBXUGbLlqHnllweuE2ws6l7V0"
);

const GOALS = [
  { id: "oxford", label: "Oxford Internship", color: "#8B1A1A" },
  { id: "tamu", label: "TAMU Research", color: "#1A3A5C" },
  { id: "clubs", label: "Clubs & EC", color: "#2C4A2E" },
  { id: "academics", label: "Academics", color: "#4A3520" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(year, month) { return new Date(year, month, 1).getDay(); }

function AuthScreen() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const s = {
    wrap: { minHeight: "100vh", background: "#0E0C0A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif" },
    box: { width: "400px", padding: "48px", background: "#1A1612", border: "1px solid #2E2820" },
    logo: { fontSize: "28px", letterSpacing: "6px", color: "#C4A882", textTransform: "uppercase", marginBottom: "8px" },
    sub: { fontSize: "11px", color: "#6B5E4E", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "40px" },
    label: { fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#9B8B7A", marginBottom: "6px", display: "block" },
    input: { width: "100%", padding: "12px 14px", background: "#0E0C0A", border: "1px solid #2E2820", color: "#F5F2EC", fontSize: "13px", fontFamily: "Georgia, serif", outline: "none", boxSizing: "border-box", marginBottom: "16px" },
    btn: { width: "100%", padding: "14px", background: "#C4A882", color: "#0E0C0A", border: "none", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif", marginTop: "8px" },
    toggle: { fontSize: "11px", color: "#6B5E4E", textAlign: "center", marginTop: "24px", cursor: "pointer" },
    error: { fontSize: "11px", color: "#8B1A1A", marginBottom: "16px", padding: "8px 12px", background: "#8B1A1A18", border: "1px solid #8B1A1A40" },
    success: { fontSize: "11px", color: "#2C4A2E", marginBottom: "16px", padding: "8px 12px", background: "#2C4A2E18", border: "1px solid #2C4A2E40" },
  };

  const handle = async () => {
    setError(""); setMessage(""); setLoading(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setMessage("Account created! Check your email to confirm, then sign in.");
    }
    setLoading(false);
  };

  return (
    <div style={s.wrap}>
      <div style={s.box}>
        <div style={s.logo}>Meridian</div>
        <div style={s.sub}>Your operating system</div>
        {error && <div style={s.error}>{error}</div>}
        {message && <div style={s.success}>{message}</div>}
        <label style={s.label}>Email</label>
        <input style={s.input} type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} />
        <label style={s.label}>Password</label>
        <input style={s.input} type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} />
        <button style={s.btn} onClick={handle} disabled={loading}>
          {loading ? "..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>
        <div style={s.toggle} onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setMessage(""); }}>
          {mode === "login" ? "No account? Sign up" : "Have an account? Sign in"}
        </div>
      </div>
    </div>
  );
}

function MeridianApp({ user }) {
  const [view, setView] = useState("dashboard");
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [newTask, setNewTask] = useState({ text: "", goal: "oxford", due: "", priority: "med" });
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", goal: "oxford" });
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);

  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: t }, { data: e }] = await Promise.all([
      supabase.from("tasks").select("*").order("created_at"),
      supabase.from("events").select("*").order("date"),
    ]);
    setTasks(t || []);
    setEvents(e || []);
    setLoading(false);
  };

  const toggleTask = async (task) => {
    const { data } = await supabase.from("tasks").update({ done: !task.done }).eq("id", task.id).select().single();
    if (data) setTasks(tasks.map(t => t.id === task.id ? data : t));
  };

  const addTask = async () => {
    if (!newTask.text.trim()) return;
    const { data } = await supabase.from("tasks").insert({ ...newTask, user_id: user.id, done: false }).select().single();
    if (data) { setTasks([...tasks, data]); setNewTask({ text: "", goal: "oxford", due: "", priority: "med" }); setShowAddTask(false); }
  };

  const addEvent = async () => {
    if (!newEvent.title.trim() || !newEvent.date) return;
    const { data } = await supabase.from("events").insert({ ...newEvent, user_id: user.id }).select().single();
    if (data) { setEvents([...events, data]); setNewEvent({ title: "", date: "", time: "", goal: "oxford" }); setShowAddEvent(false); }
  };

  const signOut = () => supabase.auth.signOut();

  const pendingTasks = tasks.filter(t => !t.done);
  const doneTasks = tasks.filter(t => t.done);
  const completionRate = tasks.length ? Math.round((doneTasks.length / tasks.length) * 100) : 0;
  const eventsForDate = (ds) => events.filter(e => e.date === ds);
  const todayEvents = eventsForDate(todayStr);
  const upcomingTasks = pendingTasks.filter(t => t.due).sort((a, b) => new Date(a.due) - new Date(b.due)).slice(0, 5);
  const goalColor = (id) => GOALS.find(g => g.id === id)?.color || "#555";
  const goalLabel = (id) => GOALS.find(g => g.id === id)?.label || id;
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const calDateStr = (day) => `${calYear}-${String(calMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

  const s = {
    app: { minHeight: "100vh", background: "#F5F2EC", fontFamily: "Georgia, 'Times New Roman', serif", color: "#1A1612" },
    sidebar: { position: "fixed", left: 0, top: 0, bottom: 0, width: "220px", background: "#1A1612", display: "flex", flexDirection: "column", zIndex: 100 },
    main: { marginLeft: "220px", padding: "40px 48px", minHeight: "100vh" },
    card: { background: "#FDFAF6", border: "1px solid #E0D8CC", padding: "24px" },
    cardTitle: { fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#9B8B7A", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    btn: { padding: "10px 20px", background: "#1A1612", color: "#F5F2EC", border: "none", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" },
    btnOutline: { padding: "8px 16px", background: "transparent", color: "#1A1612", border: "1px solid #C0B8AC", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" },
    input: { width: "100%", padding: "10px 12px", border: "1px solid #E0D8CC", background: "#FDFAF6", fontSize: "13px", fontFamily: "Georgia, serif", color: "#1A1612", outline: "none", boxSizing: "border-box" },
    select: { width: "100%", padding: "10px 12px", border: "1px solid #E0D8CC", background: "#FDFAF6", fontSize: "12px", fontFamily: "Georgia, serif", color: "#1A1612", outline: "none", cursor: "pointer" },
    modal: { position: "fixed", inset: 0, background: "rgba(26,22,18,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 },
    modalBox: { background: "#FDFAF6", border: "1px solid #E0D8CC", padding: "32px", width: "420px", maxWidth: "90vw" },
  };

  const navItem = (active) => ({
    display: "flex", alignItems: "center", gap: "12px", padding: "12px 28px",
    color: active ? "#F5F2EC" : "#6B5E4E", background: active ? "#2E2820" : "transparent",
    cursor: "pointer", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase",
    border: "none", width: "100%", textAlign: "left", borderLeft: active ? "2px solid #C4A882" : "2px solid transparent",
  });

  const taskRow = (done) => ({
    display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 0",
    borderBottom: "1px solid #EDE8E0", opacity: done ? 0.5 : 1, cursor: "pointer",
  });

  const chk = (done) => ({
    width: "16px", height: "16px", border: `1.5px solid ${done ? "#C4A882" : "#C0B8AC"}`,
    background: done ? "#C4A882" : "transparent", display: "flex", alignItems: "center",
    justifyContent: "center", flexShrink: 0, marginTop: "2px",
  });

  const dot = (id) => ({ width: "6px", height: "6px", borderRadius: "50%", background: goalColor(id), flexShrink: 0, marginTop: "6px" });

  const badge = (p) => ({
    fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", padding: "2px 6px", flexShrink: 0,
    background: p === "high" ? "#8B1A1A20" : p === "med" ? "#4A352020" : "#2C4A2E20",
    color: p === "high" ? "#8B1A1A" : p === "med" ? "#4A3520" : "#2C4A2E",
  });

  const chip = (id) => ({
    fontSize: "11px", padding: "4px 10px", background: goalColor(id) + "18",
    color: goalColor(id), borderLeft: `2px solid ${goalColor(id)}`, marginBottom: "6px",
    display: "flex", justifyContent: "space-between",
  });

  const fill = (pct, color) => ({ height: "4px", width: `${pct}%`, background: color || "#1A1612", transition: "width 0.6s ease" });

  const dayCell = (isToday, isSelected) => ({
    aspectRatio: "1", display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "flex-start", padding: "6px 4px",
    background: isToday ? "#1A1612" : isSelected ? "#E8E0D4" : "transparent",
    color: isToday ? "#F5F2EC" : "#1A1612", cursor: "pointer", fontSize: "12px",
  });

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#F5F2EC", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif" }}>
      <div style={{ fontSize: "12px", letterSpacing: "4px", color: "#9B8B7A", textTransform: "uppercase" }}>Loading...</div>
    </div>
  );

  return (
    <div style={s.app}>
      <div style={s.sidebar}>
        <div style={{ padding: "32px 28px 24px", borderBottom: "1px solid #2E2820" }}>
          <div style={{ fontSize: "22px", fontWeight: "400", color: "#F5F2EC", letterSpacing: "4px", textTransform: "uppercase" }}>Meridian</div>
          <div style={{ fontSize: "10px", color: "#6B5E4E", letterSpacing: "2px", marginTop: "4px", textTransform: "uppercase" }}>Your operating system</div>
        </div>
        <nav style={{ padding: "20px 0", flex: 1 }}>
          {[{ id: "dashboard", label: "Dashboard" }, { id: "calendar", label: "Calendar" }, { id: "tasks", label: "Tasks" }, { id: "goals", label: "Goals" }].map(item => (
            <button key={item.id} style={navItem(view === item.id)} onClick={() => setView(item.id)}>{item.label}</button>
          ))}
        </nav>
        <div style={{ padding: "16px 28px", borderTop: "1px solid #2E2820" }}>
          <div style={{ fontSize: "10px", color: "#6B5E4E", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
          <div style={{ fontSize: "10px", color: "#6B5E4E", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Done: {completionRate}%</div>
          <div style={{ height: "3px", background: "#2E2820", marginBottom: "14px" }}>
            <div style={fill(completionRate, "#C4A882")} />
          </div>
          <button onClick={signOut} style={{ background: "none", border: "none", color: "#6B5E4E", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", padding: 0 }}>Sign Out</button>
        </div>
      </div>

      <div style={s.main}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px" }}>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "400", letterSpacing: "1px" }}>
              {view === "dashboard" ? "Good morning." : view === "calendar" ? "Calendar" : view === "tasks" ? "Tasks" : "Goals"}
            </div>
            <div style={{ fontSize: "12px", color: "#9B8B7A", letterSpacing: "2px", textTransform: "uppercase", marginTop: "6px" }}>
              {DAYS[today.getDay()]}, {MONTHS[today.getMonth()]} {today.getDate()}, {today.getFullYear()}
            </div>
          </div>
          <div style={{ padding: "12px 20px", background: "#1A1612", color: "#C4A882", fontSize: "11px", letterSpacing: "2px", fontStyle: "italic", maxWidth: "360px", textAlign: "right" }}>
            "Clarity is the prerequisite of excellence."
          </div>
        </div>

        {view === "dashboard" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "24px" }}>
              <div style={s.card}>
                <div style={s.cardTitle}>Tasks Remaining</div>
                <div style={{ fontSize: "48px", fontWeight: "400", lineHeight: 1 }}>{pendingTasks.length}</div>
                <div style={{ fontSize: "11px", color: "#9B8B7A", marginTop: "8px" }}>of {tasks.length} total</div>
                <div style={{ height: "3px", background: "#E0D8CC", marginTop: "12px" }}><div style={fill(completionRate)} /></div>
              </div>
              <div style={s.card}>
                <div style={s.cardTitle}>Today's Events</div>
                <div style={{ fontSize: "48px", fontWeight: "400", lineHeight: 1 }}>{todayEvents.length}</div>
                <div style={{ fontSize: "11px", color: "#9B8B7A", marginTop: "8px" }}>scheduled today</div>
                {todayEvents.map(e => <div key={e.id} style={{ fontSize: "11px", color: "#6B5E4E", marginTop: "6px" }}>{e.time} - {e.title}</div>)}
              </div>
              <div style={s.card}>
                <div style={s.cardTitle}>Active Goals</div>
                <div style={{ fontSize: "48px", fontWeight: "400", lineHeight: 1 }}>{GOALS.length}</div>
                <div style={{ fontSize: "11px", color: "#9B8B7A", marginTop: "8px" }}>commitments tracked</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "20px" }}>
              <div style={s.card}>
                <div style={s.cardTitle}>
                  <span>Upcoming Tasks</span>
                  <button style={s.btnOutline} onClick={() => setShowAddTask(true)}>+ Add</button>
                </div>
                {upcomingTasks.length === 0 && <div style={{ fontSize: "13px", color: "#9B8B7A" }}>No tasks yet. Add one to get started.</div>}
                {upcomingTasks.map(task => (
                  <div key={task.id} style={taskRow(task.done)} onClick={() => toggleTask(task)}>
                    <div style={chk(task.done)}>{task.done && <span style={{ fontSize: "10px", color: "#FDFAF6" }}>v</span>}</div>
                    <div style={dot(task.goal)} />
                    <div style={{ flex: 1, fontSize: "13px" }}>{task.text}</div>
                    <div style={badge(task.priority)}>{task.priority}</div>
                    {task.due && <div style={{ fontSize: "10px", color: "#9B8B7A", flexShrink: 0 }}>{task.due.slice(5)}</div>}
                  </div>
                ))}
              </div>
              <div style={s.card}>
                <div style={s.cardTitle}>Goals Overview</div>
                {GOALS.map(g => {
                  const gt = tasks.filter(t => t.goal === g.id);
                  const d = gt.filter(t => t.done).length;
                  const p = gt.length ? Math.round((d / gt.length) * 100) : 0;
                  return (
                    <div key={g.id} style={{ marginBottom: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <div style={{ fontSize: "11px", color: "#6B5E4E" }}>{g.label}</div>
                        <div style={{ fontSize: "10px", color: "#9B8B7A" }}>{d}/{gt.length}</div>
                      </div>
                      <div style={{ height: "4px", background: "#E0D8CC" }}><div style={fill(p, g.color)} /></div>
                    </div>
                  );
                })}
                <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #EDE8E0" }}>
                  <div style={{ fontSize: "10px", color: "#9B8B7A", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Today's Focus</div>
                  {todayEvents.map(e => <div key={e.id} style={chip(e.goal)}><span>{e.title}</span><span>{e.time}</span></div>)}
                  {todayEvents.length === 0 && <div style={{ fontSize: "12px", color: "#C0B8AC" }}>No events today</div>}
                </div>
              </div>
            </div>
          </>
        )}

        {view === "calendar" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>
            <div style={s.card}>
              <div style={s.cardTitle}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#1A1612" }}
                    onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y-1); } else setCalMonth(m => m-1); }}>&lt;</button>
                  <span style={{ fontSize: "13px", letterSpacing: "3px" }}>{MONTHS[calMonth].toUpperCase()} {calYear}</span>
                  <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#1A1612" }}
                    onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y+1); } else setCalMonth(m => m+1); }}>&gt;</button>
                </div>
                <button style={s.btnOutline} onClick={() => setShowAddEvent(true)}>+ Event</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
                {DAYS.map(d => <div key={d} style={{ textAlign: "center", fontSize: "10px", letterSpacing: "2px", color: "#9B8B7A", padding: "8px 0", textTransform: "uppercase" }}>{d}</div>)}
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const ds = calDateStr(day);
                  const evs = eventsForDate(ds);
                  const isToday = ds === todayStr;
                  const isSelected = ds === selectedDate;
                  return (
                    <div key={day} style={dayCell(isToday, isSelected)} onClick={() => setSelectedDate(isSelected ? null : ds)}>
                      <span>{day}</span>
                      <div style={{ display: "flex", gap: "2px", flexWrap: "wrap", justifyContent: "center" }}>
                        {evs.slice(0, 3).map(e => <div key={e.id} style={{ width: "4px", height: "4px", borderRadius: "50%", background: isToday ? "#C4A882" : goalColor(e.goal), marginTop: "2px" }} />)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={s.card}>
              <div style={s.cardTitle}>{selectedDate || "All Events"}</div>
              {(selectedDate ? eventsForDate(selectedDate) : [...events].sort((a,b) => a.date.localeCompare(b.date))).map(e => (
                <div key={e.id} style={{ ...chip(e.goal), flexDirection: "column", gap: "2px", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div style={{ fontWeight: "600", fontSize: "12px" }}>{e.title}</div>
                  <div style={{ fontSize: "10px", opacity: 0.7 }}>{e.date} at {e.time} - {goalLabel(e.goal)}</div>
                </div>
              ))}
              {events.length === 0 && <div style={{ fontSize: "12px", color: "#C0B8AC" }}>No events yet.</div>}
              {selectedDate && eventsForDate(selectedDate).length === 0 && <div style={{ fontSize: "12px", color: "#C0B8AC" }}>No events on this day</div>}
            </div>
          </div>
        )}

        {view === "tasks" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={s.card}>
              <div style={s.cardTitle}>
                <span>Pending ({pendingTasks.length})</span>
                <button style={s.btnOutline} onClick={() => setShowAddTask(true)}>+ Task</button>
              </div>
              {pendingTasks.length === 0 && <div style={{ fontSize: "13px", color: "#9B8B7A" }}>All caught up. Remarkable.</div>}
              {pendingTasks.map(task => (
                <div key={task.id} style={taskRow(false)} onClick={() => toggleTask(task)}>
                  <div style={chk(false)} />
                  <div style={dot(task.goal)} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px" }}>{task.text}</div>
                    <div style={{ fontSize: "10px", color: "#9B8B7A", marginTop: "2px" }}>{goalLabel(task.goal)}{task.due ? ` - due ${task.due}` : ""}</div>
                  </div>
                  <div style={badge(task.priority)}>{task.priority}</div>
                </div>
              ))}
            </div>
            <div style={s.card}>
              <div style={s.cardTitle}>Completed ({doneTasks.length})</div>
              {doneTasks.length === 0 && <div style={{ fontSize: "13px", color: "#9B8B7A" }}>Nothing yet.</div>}
              {doneTasks.map(task => (
                <div key={task.id} style={taskRow(true)} onClick={() => toggleTask(task)}>
                  <div style={chk(true)}><span style={{ fontSize: "10px", color: "#FDFAF6" }}>v</span></div>
                  <div style={dot(task.goal)} />
                  <div style={{ fontSize: "13px", textDecoration: "line-through", color: "#9B8B7A" }}>{task.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "goals" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {GOALS.map(g => {
              const gt = tasks.filter(t => t.goal === g.id);
              const d = gt.filter(t => t.done).length;
              const p = gt.length ? Math.round((d / gt.length) * 100) : 0;
              const ge = events.filter(e => e.goal === g.id).sort((a,b) => a.date.localeCompare(b.date));
              return (
                <div key={g.id} style={{ ...s.card, borderLeft: `3px solid ${g.color}` }}>
                  <div style={{ fontSize: "14px", letterSpacing: "1px", marginBottom: "4px" }}>{g.label}</div>
                  <div style={{ fontSize: "10px", color: "#9B8B7A", marginBottom: "20px" }}>Active commitment</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                    {[{ label: "Tasks Done", val: `${d}/${gt.length}` }, { label: "Progress", val: `${p}%` }].map(stat => (
                      <div key={stat.label} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "22px", color: g.color }}>{stat.val}</div>
                        <div style={{ fontSize: "10px", color: "#9B8B7A", textTransform: "uppercase" }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: "4px", background: "#E0D8CC", marginBottom: "16px" }}><div style={fill(p, g.color)} /></div>
                  {ge.length > 0 && (
                    <>
                      <div style={{ fontSize: "10px", color: "#9B8B7A", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Upcoming</div>
                      {ge.slice(0, 2).map(e => (
                        <div key={e.id} style={{ fontSize: "11px", color: "#6B5E4E", padding: "4px 0", borderBottom: "1px solid #EDE8E0", display: "flex", justifyContent: "space-between" }}>
                          <span>{e.title}</span><span style={{ color: "#9B8B7A" }}>{e.date.slice(5)}</span>
                        </div>
                      ))}
                    </>
                  )}
                  {ge.length === 0 && <div style={{ fontSize: "11px", color: "#C0B8AC" }}>No upcoming events</div>}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showAddTask && (
        <div style={s.modal} onClick={() => setShowAddTask(false)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>New Task</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input style={s.input} placeholder="Task description" value={newTask.text} onChange={e => setNewTask({ ...newTask, text: e.target.value })} />
              <select style={s.select} value={newTask.goal} onChange={e => setNewTask({ ...newTask, goal: e.target.value })}>
                {GOALS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
              <input style={s.input} type="date" value={newTask.due} onChange={e => setNewTask({ ...newTask, due: e.target.value })} />
              <select style={s.select} value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })}>
                <option value="high">High Priority</option>
                <option value="med">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button style={s.btn} onClick={addTask}>Add Task</button>
                <button style={s.btnOutline} onClick={() => setShowAddTask(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddEvent && (
        <div style={s.modal} onClick={() => setShowAddEvent(false)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>New Event</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input style={s.input} placeholder="Event title" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />
              <select style={s.select} value={newEvent.goal} onChange={e => setNewEvent({ ...newEvent, goal: e.target.value })}>
                {GOALS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
              <input style={s.input} type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} />
              <input style={s.input} type="time" value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} />
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button style={s.btn} onClick={addEvent}>Add Event</button>
                <button style={s.btnOutline} onClick={() => setShowAddEvent(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (checking) return (
    <div style={{ minHeight: "100vh", background: "#0E0C0A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif" }}>
      <div style={{ fontSize: "12px", letterSpacing: "4px", color: "#6B5E4E", textTransform: "uppercase" }}>Meridian</div>
    </div>
  );

  return user ? <MeridianApp user={user} /> : <AuthScreen />;
}
