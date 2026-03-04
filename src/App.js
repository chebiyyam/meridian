import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tbztpvqwiutcrvecqauj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRienRwdnF3aXV0Y3J2ZWNxYXVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1ODUwMjIsImV4cCI6MjA4ODE2MTAyMn0.ybcgn0ahWdmRbFFD5zNBXUGbLlqHnllweuE2ws6l7V0",
  { auth: { persistSession: true, autoRefreshToken: true } }
);

const MUTED_COLORS = [
  { name: "Crimson", value: "#8B1A1A" },
  { name: "Navy",    value: "#1A3A5C" },
  { name: "Forest",  value: "#2C4A2E" },
  { name: "Walnut",  value: "#4A3520" },
  { name: "Slate",   value: "#3A4A5C" },
  { name: "Plum",    value: "#4A2040" },
  { name: "Moss",    value: "#3A4A2A" },
  { name: "Sienna",  value: "#6B3A2A" },
];

const QUOTES = [
  "Clarity is the prerequisite of excellence.",
  "Discipline is choosing between what you want now and what you want most.",
  "The man who moves a mountain begins by carrying away small stones.",
  "You don't rise to the level of your goals. You fall to the level of your systems.",
  "Hard work beats talent when talent doesn't work hard.",
  "The secret of getting ahead is getting started.",
  "Focus on being productive instead of busy.",
  "Small daily improvements are the key to staggering long-term results.",
  "Excellence is not a destination but a continuous journey.",
  "What you do today can improve all your tomorrows.",
  "Push yourself, because no one else is going to do it for you.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Don't stop when you're tired. Stop when you're done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days.",
  "It's going to be hard, but hard is not impossible.",
  "Don't wait for opportunity. Create it.",
  "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
  "The key to success is to focus on goals, not obstacles.",
  "Dream bigger. Do bigger.",
  "You are stronger than you think.",
  "Believe you can and you're halfway there.",
  "Act as if what you do makes a difference. It does.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Knowing is not enough; we must apply. Willing is not enough; we must do.",
  "Motivation is what gets you started. Habit is what keeps you going.",
  "The future belongs to those who believe in the beauty of their dreams.",
];

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y, m)    { return new Date(y, m, 1).getDay(); }

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return "Good morning.";
  if (h >= 12 && h < 17) return "Good afternoon.";
  if (h >= 17 && h < 21) return "Good evening.";
  return "Working late.";
}

// ── AUTH ─────────────────────────────────────────────────────────────────────
function AuthScreen() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div style={{ minHeight: "100vh", background: "#0E0C0A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif" }}>
      <div style={{ width: "400px", padding: "48px", background: "#1A1612", border: "1px solid #2E2820" }}>
        <div style={{ fontSize: "28px", letterSpacing: "6px", color: "#C4A882", textTransform: "uppercase", marginBottom: "6px" }}>Meridian</div>
        <div style={{ fontSize: "11px", color: "#6B5E4E", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "40px" }}>Your operating system</div>
        {error   && <div style={{ fontSize: "11px", color: "#8B1A1A", marginBottom: "16px", padding: "8px 12px", background: "#8B1A1A18", border: "1px solid #8B1A1A40" }}>{error}</div>}
        {message && <div style={{ fontSize: "11px", color: "#2C4A2E", marginBottom: "16px", padding: "8px 12px", background: "#2C4A2E18", border: "1px solid #2C4A2E40" }}>{message}</div>}
        {[["Email","email",email,setEmail],["Password","password",password,setPassword]].map(([lbl,type,val,set]) => (
          <div key={lbl}>
            <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#9B8B7A", marginBottom: "6px" }}>{lbl}</div>
            <input type={type} value={val} onChange={e => set(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()}
              style={{ width: "100%", padding: "12px 14px", background: "#0E0C0A", border: "1px solid #2E2820", color: "#F5F2EC", fontSize: "13px", fontFamily: "Georgia, serif", outline: "none", boxSizing: "border-box", marginBottom: "16px" }} />
          </div>
        ))}
        <button onClick={handle} disabled={loading}
          style={{ width: "100%", padding: "14px", background: "#C4A882", color: "#0E0C0A", border: "none", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif", marginTop: "8px" }}>
          {loading ? "..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>
        <div onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setMessage(""); }}
          style={{ fontSize: "11px", color: "#6B5E4E", textAlign: "center", marginTop: "24px", cursor: "pointer" }}>
          {mode === "login" ? "No account? Sign up" : "Have an account? Sign in"}
        </div>
      </div>
    </div>
  );
}

// ── AI SCHEDULER ─────────────────────────────────────────────────────────────
function AIScheduler({ goals }) {
  const [tasks, setTasks] = useState([{ name: "", hours: "", priority: "high", deadline: "" }]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = () => setTasks([...tasks, { name: "", hours: "", priority: "high", deadline: "" }]);
  const updateTask = (i, field, val) => setTasks(tasks.map((t, idx) => idx === i ? { ...t, [field]: val } : t));
  const removeTask = (i) => setTasks(tasks.filter((_, idx) => idx !== i));

  const generate = async () => {
    const valid = tasks.filter(t => t.name.trim() && t.hours);
    if (valid.length === 0) return;
    setLoading(true); setResult("");
    try {
      const prompt = `You are a productivity coach helping a college student manage their schedule. 
Given these tasks, create an optimized daily schedule with specific time blocks. Be practical, concise and motivating.

Tasks:
${valid.map(t => `- "${t.name}" | ${t.hours}hrs needed | Priority: ${t.priority} | Deadline: ${t.deadline || "flexible"}`).join("\n")}

Provide:
1. A suggested daily schedule with time blocks
2. Which tasks to tackle first and why
3. One key productivity tip for this workload

Keep it under 300 words. Be direct and actionable.`;

      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      setResult(data.content?.[0]?.text || "Could not generate schedule.");
    } catch (e) {
      setResult("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const S = {
    input: { width: "100%", padding: "8px 10px", border: "1px solid #E0D8CC", background: "#FDFAF6", fontSize: "12px", fontFamily: "Georgia, serif", color: "#1A1612", outline: "none", boxSizing: "border-box" },
    select: { padding: "8px 10px", border: "1px solid #E0D8CC", background: "#FDFAF6", fontSize: "12px", fontFamily: "Georgia, serif", color: "#1A1612", outline: "none", cursor: "pointer" },
    btn: { padding: "10px 20px", background: "#1A1612", color: "#F5F2EC", border: "none", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" },
    btnOut: { padding: "8px 14px", background: "transparent", color: "#1A1612", border: "1px solid #C0B8AC", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" },
  };

  return (
    <div>
      <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#9B8B7A", marginBottom: "20px" }}>
        Tell me what you need to get done and I'll build your schedule.
      </div>

      {/* Column headers */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 0.6fr 0.8fr 1fr auto", gap: "8px", marginBottom: "6px" }}>
        {["Task Name", "Hours Needed", "Priority", "Deadline", ""].map((lbl, i) => (
          <div key={i} style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#9B8B7A" }}>{lbl}</div>
        ))}
      </div>

      {tasks.map((task, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 0.6fr 0.8fr 1fr auto", gap: "8px", marginBottom: "10px", alignItems: "center" }}>
          <input style={S.input} placeholder="Task name" value={task.name} onChange={e => updateTask(i, "name", e.target.value)} />
          <input style={S.input} placeholder="Hours" type="number" min="0.5" step="0.5" value={task.hours} onChange={e => updateTask(i, "hours", e.target.value)} />
          <select style={S.select} value={task.priority} onChange={e => updateTask(i, "priority", e.target.value)}>
            <option value="high">High</option>
            <option value="med">Med</option>
            <option value="low">Low</option>
          </select>
          <input style={S.input} placeholder="Deadline (optional)" type="date" value={task.deadline} onChange={e => updateTask(i, "deadline", e.target.value)} />
          <button onClick={() => removeTask(i)} style={{ background: "none", border: "none", color: "#C0B8AC", fontSize: "18px", cursor: "pointer", padding: "0 4px" }}>x</button>
        </div>
      ))}

      <div style={{ display: "flex", gap: "12px", marginTop: "16px", marginBottom: "24px" }}>
        <button style={S.btnOut} onClick={addTask}>+ Add Task</button>
        <button style={S.btn} onClick={generate} disabled={loading}>
          {loading ? "Thinking..." : "Build My Schedule"}
        </button>
      </div>

      {loading && (
        <div style={{ fontSize: "12px", color: "#9B8B7A", fontStyle: "italic", padding: "20px 0" }}>
          Building your optimal schedule...
        </div>
      )}

      {result && (
        <div style={{ background: "#1A1612", padding: "24px", borderLeft: "3px solid #C4A882" }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#C4A882", marginBottom: "16px" }}>Your Schedule</div>
          <div style={{ fontSize: "13px", color: "#E8DDD0", lineHeight: "1.8", whiteSpace: "pre-wrap" }}>{result}</div>
        </div>
      )}
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────
function MeridianApp({ user }) {
  const [view, setView] = useState("dashboard");
  const [goals, setGoals] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear]   = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddTask,  setShowAddTask]  = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddGoal,  setShowAddGoal]  = useState(false);
  const [newTask,  setNewTask]  = useState({ text: "", goal_id: "", due: "", priority: "med" });
  const [newEvent, setNewEvent] = useState({ title: "", goal_id: "", date: "", time: "" });
  const [newGoal,  setNewGoal]  = useState({ label: "", color: "#8B1A1A" });
  const [quoteIdx, setQuoteIdx] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [greeting] = useState(getGreeting());

  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: g }, { data: t }, { data: e }] = await Promise.all([
      supabase.from("goals").select("*").order("created_at"),
      supabase.from("tasks").select("*").order("created_at"),
      supabase.from("events").select("*").order("date"),
    ]);
    setGoals(g || []);
    setTasks(t || []);
    setEvents(e || []);
    setLoading(false);
  };

  const addGoal = async () => {
    if (!newGoal.label.trim()) return;
    const { data } = await supabase.from("goals").insert({ ...newGoal, user_id: user.id }).select().single();
    if (data) { setGoals([...goals, data]); setNewGoal({ label: "", color: "#8B1A1A" }); setShowAddGoal(false); }
  };

  const deleteGoal = async (id) => {
    await supabase.from("goals").delete().eq("id", id);
    setGoals(goals.filter(g => g.id !== id));
    setTasks(tasks.filter(t => t.goal_id !== id));
    setEvents(events.filter(e => e.goal_id !== id));
  };

  const toggleTask = async (task) => {
    const { data } = await supabase.from("tasks").update({ done: !task.done }).eq("id", task.id).select().single();
    if (data) setTasks(tasks.map(t => t.id === task.id ? data : t));
  };

  const addTask = async () => {
    if (!newTask.text.trim() || !newTask.goal_id) return;
    const { data } = await supabase.from("tasks").insert({ ...newTask, user_id: user.id, done: false }).select().single();
    if (data) { setTasks([...tasks, data]); setNewTask({ text: "", goal_id: goals[0]?.id || "", due: "", priority: "med" }); setShowAddTask(false); }
  };

  const addEvent = async () => {
    if (!newEvent.title.trim() || !newEvent.date || !newEvent.goal_id) return;
    const { data } = await supabase.from("events").insert({ ...newEvent, user_id: user.id }).select().single();
    if (data) { setEvents([...events, data]); setNewEvent({ title: "", goal_id: goals[0]?.id || "", date: "", time: "" }); setShowAddEvent(false); }
  };

  const signOut = () => supabase.auth.signOut();
  const nextQuote = () => setQuoteIdx(i => (i + 1) % QUOTES.length);

  const goalColor = (id) => goals.find(g => g.id === id)?.color || "#9B8B7A";
  const goalLabel = (id) => goals.find(g => g.id === id)?.label || "?";
  const pendingTasks   = tasks.filter(t => !t.done);
  const doneTasks      = tasks.filter(t => t.done);
  const completionRate = tasks.length ? Math.round((doneTasks.length / tasks.length) * 100) : 0;
  const eventsForDate  = (ds) => events.filter(e => e.date === ds);
  const todayEvents    = eventsForDate(todayStr);
  const upcomingTasks  = pendingTasks.filter(t => t.due).sort((a,b) => new Date(a.due)-new Date(b.due)).slice(0,5);
  const daysInMonth    = getDaysInMonth(calYear, calMonth);
  const firstDay       = getFirstDay(calYear, calMonth);
  const calDs          = (day) => `${calYear}-${String(calMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
  const noGoals        = goals.length === 0;

  const S = {
    card:      { background: "#FDFAF6", border: "1px solid #E0D8CC", padding: "24px" },
    cardTitle: { fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#9B8B7A", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    btn:       { padding: "10px 20px", background: "#1A1612", color: "#F5F2EC", border: "none", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" },
    btnOut:    { padding: "8px 16px", background: "transparent", color: "#1A1612", border: "1px solid #C0B8AC", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" },
    input:     { width: "100%", padding: "10px 12px", border: "1px solid #E0D8CC", background: "#FDFAF6", fontSize: "13px", fontFamily: "Georgia, serif", color: "#1A1612", outline: "none", boxSizing: "border-box" },
    select:    { width: "100%", padding: "10px 12px", border: "1px solid #E0D8CC", background: "#FDFAF6", fontSize: "12px", fontFamily: "Georgia, serif", color: "#1A1612", outline: "none", cursor: "pointer" },
    modal:     { position: "fixed", inset: 0, background: "rgba(26,22,18,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 },
    modalBox:  { background: "#FDFAF6", border: "1px solid #E0D8CC", padding: "32px", width: "420px", maxWidth: "90vw" },
  };

  const navBtn = (active) => ({
    display: "flex", alignItems: "center", padding: "12px 28px",
    color: active ? "#F5F2EC" : "#6B5E4E", background: active ? "#2E2820" : "transparent",
    cursor: "pointer", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase",
    border: "none", width: "100%", textAlign: "left", fontFamily: "Georgia, serif",
    borderLeft: active ? "2px solid #C4A882" : "2px solid transparent",
  });

  const taskRow  = (done) => ({ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 0", borderBottom: "1px solid #EDE8E0", opacity: done ? 0.5 : 1, cursor: "pointer" });
  const chk      = (done) => ({ width: "16px", height: "16px", border: `1.5px solid ${done ? "#C4A882" : "#C0B8AC"}`, background: done ? "#C4A882" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" });
  const dot      = (id)   => ({ width: "6px", height: "6px", borderRadius: "50%", background: goalColor(id), flexShrink: 0, marginTop: "6px" });
  const fill     = (pct, color) => ({ height: "4px", width: `${pct}%`, background: color || "#1A1612", transition: "width 0.6s" });
  const chip     = (id)   => ({ fontSize: "11px", padding: "4px 10px", background: goalColor(id)+"18", color: goalColor(id), borderLeft: `2px solid ${goalColor(id)}`, marginBottom: "6px", display: "flex", justifyContent: "space-between" });
  const badge    = (p)    => ({ fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", padding: "2px 6px", flexShrink: 0, background: p==="high"?"#8B1A1A20":p==="med"?"#4A352020":"#2C4A2E20", color: p==="high"?"#8B1A1A":p==="med"?"#4A3520":"#2C4A2E" });
  const dayCell  = (isToday, isSel) => ({ aspectRatio: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "6px 4px", background: isToday ? "#1A1612" : isSel ? "#E8E0D4" : "transparent", color: isToday ? "#F5F2EC" : "#1A1612", cursor: "pointer", fontSize: "12px" });

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#F5F2EC", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif" }}>
      <div style={{ fontSize: "12px", letterSpacing: "4px", color: "#9B8B7A", textTransform: "uppercase" }}>Loading...</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#F5F2EC", fontFamily: "Georgia, 'Times New Roman', serif", color: "#1A1612" }}>

      {/* Sidebar */}
      <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: "220px", background: "#1A1612", display: "flex", flexDirection: "column", zIndex: 100 }}>
        <div style={{ padding: "32px 28px 24px", borderBottom: "1px solid #2E2820" }}>
          <div style={{ fontSize: "22px", fontWeight: "400", color: "#F5F2EC", letterSpacing: "4px", textTransform: "uppercase" }}>Meridian</div>
          <div style={{ fontSize: "10px", color: "#6B5E4E", letterSpacing: "2px", marginTop: "4px", textTransform: "uppercase" }}>Your operating system</div>
        </div>
        <nav style={{ padding: "20px 0", flex: 1 }}>
          {[["dashboard","Dashboard"],["calendar","Calendar"],["tasks","Tasks"],["goals","Goals"],["scheduler","AI Scheduler"]].map(([id,lbl]) => (
            <button key={id} style={navBtn(view===id)} onClick={() => setView(id)}>{lbl}</button>
          ))}
        </nav>
        <div style={{ padding: "16px 28px", borderTop: "1px solid #2E2820" }}>
          <div style={{ fontSize: "10px", color: "#6B5E4E", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
          <div style={{ fontSize: "10px", color: "#6B5E4E", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Done: {completionRate}%</div>
          <div style={{ height: "3px", background: "#2E2820", marginBottom: "14px" }}><div style={fill(completionRate, "#C4A882")} /></div>
          <button onClick={signOut} style={{ background: "none", border: "none", color: "#6B5E4E", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", padding: 0, fontFamily: "Georgia, serif" }}>Sign Out</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: "220px", padding: "40px 48px", minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px" }}>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "400", letterSpacing: "1px" }}>
              {view === "dashboard" ? greeting : view === "calendar" ? "Calendar" : view === "tasks" ? "Tasks" : view === "goals" ? "Goals" : "AI Scheduler"}
            </div>
            <div style={{ fontSize: "12px", color: "#9B8B7A", letterSpacing: "2px", textTransform: "uppercase", marginTop: "6px" }}>
              {DAYS[today.getDay()]}, {MONTHS[today.getMonth()]} {today.getDate()}, {today.getFullYear()}
            </div>
          </div>
          {/* Clickable quote */}
          <div onClick={nextQuote} title="Click for a new quote"
            style={{ padding: "12px 20px", background: "#1A1612", color: "#C4A882", fontSize: "11px", letterSpacing: "2px", fontStyle: "italic", maxWidth: "360px", textAlign: "right", cursor: "pointer", transition: "opacity 0.2s", userSelect: "none" }}>
            "{QUOTES[quoteIdx]}"
          </div>
        </div>

        {/* DASHBOARD */}
        {view === "dashboard" && (
          <>
            {noGoals && (
              <div style={{ ...S.card, borderLeft: "3px solid #C4A882", marginBottom: "24px" }}>
                <div style={{ fontSize: "14px", marginBottom: "8px" }}>Welcome to Meridian.</div>
                <div style={{ fontSize: "12px", color: "#9B8B7A", marginBottom: "16px" }}>Start by creating your goals. Add the commitments you want to track and stay accountable to.</div>
                <button style={S.btn} onClick={() => { setView("goals"); setShowAddGoal(true); }}>Create Your First Goal</button>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "24px" }}>
              <div style={S.card}>
                <div style={S.cardTitle}>Tasks Remaining</div>
                <div style={{ fontSize: "48px", fontWeight: "400", lineHeight: 1 }}>{pendingTasks.length}</div>
                <div style={{ fontSize: "11px", color: "#9B8B7A", marginTop: "8px" }}>of {tasks.length} total</div>
                <div style={{ height: "3px", background: "#E0D8CC", marginTop: "12px" }}><div style={fill(completionRate)} /></div>
              </div>
              <div style={S.card}>
                <div style={S.cardTitle}>Today's Events</div>
                <div style={{ fontSize: "48px", fontWeight: "400", lineHeight: 1 }}>{todayEvents.length}</div>
                <div style={{ fontSize: "11px", color: "#9B8B7A", marginTop: "8px" }}>scheduled today</div>
                {todayEvents.map(e => <div key={e.id} style={{ fontSize: "11px", color: "#6B5E4E", marginTop: "6px" }}>{e.time} - {e.title}</div>)}
              </div>
              <div style={S.card}>
                <div style={S.cardTitle}>Active Goals</div>
                <div style={{ fontSize: "48px", fontWeight: "400", lineHeight: 1 }}>{goals.length}</div>
                <div style={{ fontSize: "11px", color: "#9B8B7A", marginTop: "8px" }}>commitments tracked</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "20px" }}>
              <div style={S.card}>
                <div style={S.cardTitle}>
                  <span>Upcoming Tasks</span>
                  <button style={S.btnOut} onClick={() => { if(noGoals){setView("goals");setShowAddGoal(true);}else setShowAddTask(true); }}>+ Add</button>
                </div>
                {upcomingTasks.length === 0 && <div style={{ fontSize: "13px", color: "#9B8B7A" }}>{noGoals ? "Create a goal first to start adding tasks." : "No tasks yet."}</div>}
                {upcomingTasks.map(task => (
                  <div key={task.id} style={taskRow(task.done)} onClick={() => toggleTask(task)}>
                    <div style={chk(task.done)}>{task.done && <span style={{ fontSize: "10px", color: "#FDFAF6" }}>v</span>}</div>
                    <div style={dot(task.goal_id)} />
                    <div style={{ flex: 1, fontSize: "13px" }}>{task.text}</div>
                    <div style={badge(task.priority)}>{task.priority}</div>
                    {task.due && <div style={{ fontSize: "10px", color: "#9B8B7A", flexShrink: 0 }}>{task.due.slice(5)}</div>}
                  </div>
                ))}
              </div>
              <div style={S.card}>
                <div style={S.cardTitle}>Goals Overview</div>
                {goals.length === 0 && <div style={{ fontSize: "12px", color: "#C0B8AC" }}>No goals yet.</div>}
                {goals.map(g => {
                  const gt = tasks.filter(t => t.goal_id === g.id);
                  const d  = gt.filter(t => t.done).length;
                  const p  = gt.length ? Math.round((d/gt.length)*100) : 0;
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
                  {todayEvents.map(e => <div key={e.id} style={chip(e.goal_id)}><span>{e.title}</span><span>{e.time}</span></div>)}
                  {todayEvents.length === 0 && <div style={{ fontSize: "12px", color: "#C0B8AC" }}>No events today</div>}
                </div>
              </div>
            </div>
          </>
        )}

        {/* CALENDAR */}
        {view === "calendar" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>
            <div style={S.card}>
              <div style={S.cardTitle}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#1A1612" }}
                    onClick={() => { if(calMonth===0){setCalMonth(11);setCalYear(y=>y-1);}else setCalMonth(m=>m-1); }}>&lt;</button>
                  <span style={{ fontSize: "13px", letterSpacing: "3px" }}>{MONTHS[calMonth].toUpperCase()} {calYear}</span>
                  <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#1A1612" }}
                    onClick={() => { if(calMonth===11){setCalMonth(0);setCalYear(y=>y+1);}else setCalMonth(m=>m+1); }}>&gt;</button>
                </div>
                <button style={S.btnOut} onClick={() => { if(noGoals){setView("goals");setShowAddGoal(true);}else setShowAddEvent(true); }}>+ Event</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "2px" }}>
                {DAYS.map(d => <div key={d} style={{ textAlign: "center", fontSize: "10px", letterSpacing: "2px", color: "#9B8B7A", padding: "8px 0", textTransform: "uppercase" }}>{d}</div>)}
                {Array.from({length:firstDay}).map((_,i)=><div key={`e${i}`}/>)}
                {Array.from({length:daysInMonth}).map((_,i)=>{
                  const day=i+1, ds=calDs(day), evs=eventsForDate(ds), isToday=ds===todayStr, isSel=ds===selectedDate;
                  return (
                    <div key={day} style={dayCell(isToday,isSel)} onClick={()=>setSelectedDate(isSel?null:ds)}>
                      <span>{day}</span>
                      <div style={{display:"flex",gap:"2px",flexWrap:"wrap",justifyContent:"center"}}>
                        {evs.slice(0,3).map(e=><div key={e.id} style={{width:"4px",height:"4px",borderRadius:"50%",background:isToday?"#C4A882":goalColor(e.goal_id),marginTop:"2px"}}/>)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={S.card}>
              <div style={S.cardTitle}>{selectedDate || "All Events"}</div>
              {(selectedDate ? eventsForDate(selectedDate) : [...events].sort((a,b)=>a.date.localeCompare(b.date))).map(e=>(
                <div key={e.id} style={{...chip(e.goal_id),flexDirection:"column",gap:"2px",alignItems:"flex-start",marginBottom:"8px"}}>
                  <div style={{fontWeight:"600",fontSize:"12px"}}>{e.title}</div>
                  <div style={{fontSize:"10px",opacity:0.7}}>{e.date} at {e.time} - {goalLabel(e.goal_id)}</div>
                </div>
              ))}
              {events.length===0 && <div style={{fontSize:"12px",color:"#C0B8AC"}}>No events yet.</div>}
              {selectedDate && eventsForDate(selectedDate).length===0 && <div style={{fontSize:"12px",color:"#C0B8AC"}}>No events on this day</div>}
            </div>
          </div>
        )}

        {/* TASKS */}
        {view === "tasks" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={S.card}>
              <div style={S.cardTitle}>
                <span>Pending ({pendingTasks.length})</span>
                <button style={S.btnOut} onClick={() => { if(noGoals){setView("goals");setShowAddGoal(true);}else setShowAddTask(true); }}>+ Task</button>
              </div>
              {pendingTasks.length===0 && <div style={{fontSize:"13px",color:"#9B8B7A"}}>{noGoals?"Create a goal first.":"All caught up. Remarkable."}</div>}
              {pendingTasks.map(task=>(
                <div key={task.id} style={taskRow(false)} onClick={()=>toggleTask(task)}>
                  <div style={chk(false)}/>
                  <div style={dot(task.goal_id)}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"13px"}}>{task.text}</div>
                    <div style={{fontSize:"10px",color:"#9B8B7A",marginTop:"2px"}}>{goalLabel(task.goal_id)}{task.due?` - due ${task.due}`:""}</div>
                  </div>
                  <div style={badge(task.priority)}>{task.priority}</div>
                </div>
              ))}
            </div>
            <div style={S.card}>
              <div style={S.cardTitle}>Completed ({doneTasks.length})</div>
              {doneTasks.length===0 && <div style={{fontSize:"13px",color:"#9B8B7A"}}>Nothing yet.</div>}
              {doneTasks.map(task=>(
                <div key={task.id} style={taskRow(true)} onClick={()=>toggleTask(task)}>
                  <div style={chk(true)}><span style={{fontSize:"10px",color:"#FDFAF6"}}>v</span></div>
                  <div style={dot(task.goal_id)}/>
                  <div style={{fontSize:"13px",textDecoration:"line-through",color:"#9B8B7A"}}>{task.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GOALS */}
        {view === "goals" && (
          <>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
              <button style={S.btn} onClick={() => setShowAddGoal(true)}>+ New Goal</button>
            </div>
            {goals.length === 0 && (
              <div style={{ ...S.card, textAlign: "center", padding: "48px" }}>
                <div style={{ fontSize: "14px", marginBottom: "8px", color: "#9B8B7A" }}>No goals yet.</div>
                <div style={{ fontSize: "12px", color: "#C0B8AC", marginBottom: "24px" }}>Add the commitments you want to track.</div>
                <button style={S.btn} onClick={() => setShowAddGoal(true)}>Create Your First Goal</button>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {goals.map(g => {
                const gt = tasks.filter(t => t.goal_id === g.id);
                const d  = gt.filter(t => t.done).length;
                const p  = gt.length ? Math.round((d/gt.length)*100) : 0;
                const ge = events.filter(e => e.goal_id === g.id).sort((a,b)=>a.date.localeCompare(b.date));
                return (
                  <div key={g.id} style={{ ...S.card, borderLeft: `3px solid ${g.color}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                      <div style={{ fontSize: "14px", letterSpacing: "1px" }}>{g.label}</div>
                      <button onClick={() => deleteGoal(g.id)} style={{ background: "none", border: "none", color: "#C0B8AC", fontSize: "18px", cursor: "pointer", padding: "0 0 0 8px", lineHeight: 1 }}>x</button>
                    </div>
                    <div style={{ fontSize: "10px", color: "#9B8B7A", marginBottom: "20px" }}>Active commitment</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                      {[{label:"Tasks Done",val:`${d}/${gt.length}`},{label:"Progress",val:`${p}%`}].map(stat=>(
                        <div key={stat.label} style={{textAlign:"center"}}>
                          <div style={{fontSize:"22px",color:g.color}}>{stat.val}</div>
                          <div style={{fontSize:"10px",color:"#9B8B7A",textTransform:"uppercase"}}>{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{height:"4px",background:"#E0D8CC",marginBottom:"16px"}}><div style={fill(p,g.color)}/></div>
                    {ge.length > 0 && (
                      <>
                        <div style={{fontSize:"10px",color:"#9B8B7A",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"8px"}}>Upcoming</div>
                        {ge.slice(0,2).map(e=>(
                          <div key={e.id} style={{fontSize:"11px",color:"#6B5E4E",padding:"4px 0",borderBottom:"1px solid #EDE8E0",display:"flex",justifyContent:"space-between"}}>
                            <span>{e.title}</span><span style={{color:"#9B8B7A"}}>{e.date.slice(5)}</span>
                          </div>
                        ))}
                      </>
                    )}
                    {ge.length === 0 && <div style={{fontSize:"11px",color:"#C0B8AC"}}>No upcoming events</div>}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* AI SCHEDULER */}
        {view === "scheduler" && (
          <div style={S.card}>
            <div style={S.cardTitle}>AI Schedule Builder</div>
            <AIScheduler goals={goals} />
          </div>
        )}
      </div>

      {/* ADD GOAL MODAL */}
      {showAddGoal && (
        <div style={S.modal} onClick={() => setShowAddGoal(false)}>
          <div style={S.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>New Goal</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input style={S.input} placeholder="Goal name (e.g. Oxford Internship)" value={newGoal.label} onChange={e => setNewGoal({...newGoal, label: e.target.value})} />
              <div>
                <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#9B8B7A", marginBottom: "10px" }}>Color</div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {MUTED_COLORS.map(c => (
                    <div key={c.value} onClick={() => setNewGoal({...newGoal, color: c.value})}
                      style={{ width: "28px", height: "28px", borderRadius: "50%", background: c.value, cursor: "pointer", border: newGoal.color === c.value ? "3px solid #C4A882" : "3px solid transparent", boxSizing: "border-box" }} />
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button style={S.btn} onClick={addGoal}>Create Goal</button>
                <button style={S.btnOut} onClick={() => setShowAddGoal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD TASK MODAL */}
      {showAddTask && (
        <div style={S.modal} onClick={() => setShowAddTask(false)}>
          <div style={S.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>New Task</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input style={S.input} placeholder="Task description" value={newTask.text} onChange={e => setNewTask({...newTask, text: e.target.value})} />
              <select style={S.select} value={newTask.goal_id} onChange={e => setNewTask({...newTask, goal_id: e.target.value})}>
                <option value="">Select a goal</option>
                {goals.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
              <input style={S.input} type="date" value={newTask.due} onChange={e => setNewTask({...newTask, due: e.target.value})} />
              <select style={S.select} value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})}>
                <option value="high">High Priority</option>
                <option value="med">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button style={S.btn} onClick={addTask}>Add Task</button>
                <button style={S.btnOut} onClick={() => setShowAddTask(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD EVENT MODAL */}
      {showAddEvent && (
        <div style={S.modal} onClick={() => setShowAddEvent(false)}>
          <div style={S.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>New Event</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input style={S.input} placeholder="Event title" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
              <select style={S.select} value={newEvent.goal_id} onChange={e => setNewEvent({...newEvent, goal_id: e.target.value})}>
                <option value="">Select a goal</option>
                {goals.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
              <input style={S.input} type="date" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
              <input style={S.input} type="time" value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} />
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button style={S.btn} onClick={addEvent}>Add Event</button>
                <button style={S.btnOut} onClick={() => setShowAddEvent(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
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
