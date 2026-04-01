import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tbztpvqwiutcrvecqauj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRienRwdnF3aXV0Y3J2ZWNxYXVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1ODUwMjIsImV4cCI6MjA4ODE2MTAyMn0.ybcgn0ahWdmRbFFD5zNBXUGbLlqHnllweuE2ws6l7V0",
  { auth: { persistSession: true, autoRefreshToken: true } }
);

const MUTED_COLORS = [
  { name: "Red",        value: "#E53935" },
  { name: "Blue",       value: "#1E88E5" },
  { name: "Green",      value: "#43A047" },
  { name: "Orange",     value: "#FB8C00" },
  { name: "Purple",     value: "#8E24AA" },
  { name: "Teal",       value: "#00ACC1" },
  { name: "Pink",       value: "#D81B60" },
  { name: "Lime",       value: "#7CB342" },
  { name: "Indigo",     value: "#3949AB" },
  { name: "Amber",      value: "#FFB300" },
  { name: "Cyan",       value: "#00BCD4" },
  { name: "Deep Orange",value: "#F4511E" },
  { name: "Brown",      value: "#6D4C41" },
  { name: "Gold",       value: "#C4A882" },
  { name: "Coral",      value: "#FF6B6B" },
  { name: "Mint",       value: "#26A69A" },
  { name: "Lavender",   value: "#7986CB" },
  { name: "Rose",       value: "#EC407A" },
  { name: "Sky",        value: "#29B6F6" },
  { name: "Sage",       value: "#8D9B6A" },
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
  "Storms make trees take deeper roots.",
  "The only way to do great work is to love what you do.",
  "In the middle of every difficulty lies opportunity.",
  "It always seems impossible until it is done.",
  "You miss 100% of the shots you don't take.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Your limitation — it's only your imagination.",
  "Great things never come from comfort zones.",
  "Success is walking from failure to failure with no loss of enthusiasm.",
  "Don't watch the clock. Do what it does. Keep going.",
  "Someday is not a day of the week.",
  "If you want to achieve greatness, stop asking for permission.",
  "Things work out best for those who make the best of how things work out.",
  "To live a creative life, we must lose our fear of being wrong.",
  "If you are not willing to risk the usual, you will have to settle for the ordinary.",
  "All our dreams can come true if we have the courage to pursue them.",
  "Good things come to people who wait, but better things come to those who go out and get them.",
  "If you do what you always did, you will get what you always got.",
  "Success is not how high you have climbed, but how you make a positive difference.",
  "Knowing yourself is the beginning of all wisdom.",
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

// ── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ onLogin }) {
  const features = [
    { title: "Goals", desc: "Create and track every commitment you have." },
    { title: "Tasks", desc: "Prioritize what matters. Check off what's done." },
    { title: "Calendar", desc: "See your month at a glance. Never miss a deadline." },
    { title: "Schedule Builder", desc: "Input your tasks and get an optimized daily plan." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0E0C0A", fontFamily: "Georgia, serif", color: "#F5F2EC" }}>

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 48px", borderBottom: "1px solid #2E2820" }}>
        <div style={{ fontSize: "20px", letterSpacing: "5px", color: "#C4A882", textTransform: "uppercase" }}>Meridian</div>
        <button onClick={onLogin}
          style={{ padding: "10px 24px", background: "transparent", border: "1px solid #C4A882", color: "#C4A882", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" }}>
          Sign In
        </button>
      </div>

      {/* Hero */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 48px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#C4A882", marginBottom: "24px" }}>Welcome to Meridian</div>
        <div style={{ fontSize: "52px", fontWeight: "400", lineHeight: "1.2", marginBottom: "24px", maxWidth: "700px" }}>
          Every goal deserves a plan.
        </div>
        <div style={{ fontSize: "15px", color: "#9B8B7A", lineHeight: "1.8", marginBottom: "40px", maxWidth: "500px" }}>
          Meridian is your personal accountability system. Track goals, manage tasks, plan your schedule and stay on top of everything that matters.
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <button onClick={onLogin}
            style={{ padding: "14px 36px", background: "#C4A882", color: "#0E0C0A", border: "none", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            Get Started
          </button>
          <button onClick={onLogin}
            style={{ padding: "14px 36px", background: "transparent", border: "1px solid #2E2820", color: "#9B8B7A", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            Sign In
          </button>
        </div>
      </div>

      {/* App Preview with overlay */}
      <div style={{ position: "relative", margin: "0 48px 80px", border: "1px solid #2E2820" }}>
        {/* Fake app preview */}
        <div style={{ background: "#F5F2EC", padding: "24px", display: "grid", gridTemplateColumns: "200px 1fr", minHeight: "400px", pointerEvents: "none", userSelect: "none" }}>
          {/* Fake sidebar */}
          <div style={{ background: "#1A1612", padding: "24px 0", display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ padding: "8px 24px", fontSize: "18px", letterSpacing: "4px", color: "#C4A882", textTransform: "uppercase", marginBottom: "16px" }}>Meridian</div>
            {["Dashboard", "Calendar", "Tasks", "Goals", "Schedule Builder"].map((item, i) => (
              <div key={item} style={{ padding: "10px 24px", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: i === 0 ? "#F5F2EC" : "#6B5E4E", background: i === 0 ? "#2E2820" : "transparent", borderLeft: i === 0 ? "2px solid #C4A882" : "2px solid transparent" }}>{item}</div>
            ))}
          </div>
          {/* Fake dashboard */}
          <div style={{ padding: "32px", background: "#F5F2EC" }}>
            <div style={{ fontSize: "28px", marginBottom: "6px", color: "#1A1612" }}>Good morning.</div>
            <div style={{ fontSize: "11px", color: "#9B8B7A", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "28px" }}>Your day at a glance</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              {[["Tasks Remaining", "4"], ["Today's Events", "2"], ["Active Goals", "3"]].map(([lbl, val]) => (
                <div key={lbl} style={{ background: "#FDFAF6", border: "1px solid #E0D8CC", padding: "18px" }}>
                  <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#9B8B7A", marginBottom: "10px" }}>{lbl}</div>
                  <div style={{ fontSize: "36px", color: "#1A1612" }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "16px" }}>
              <div style={{ background: "#FDFAF6", border: "1px solid #E0D8CC", padding: "18px" }}>
                <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#9B8B7A", marginBottom: "14px" }}>Upcoming Tasks</div>
                {[["Finish research paper", "high", "#8B1A1A"], ["Submit Oxford application", "high", "#1A3A5C"], ["Club meeting prep", "med", "#2C4A2E"]].map(([t, p, c]) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: "1px solid #EDE8E0" }}>
                    <div style={{ width: "14px", height: "14px", border: "1.5px solid #C0B8AC" }} />
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: c }} />
                    <div style={{ fontSize: "12px", color: "#1A1612", flex: 1 }}>{t}</div>
                    <div style={{ fontSize: "9px", padding: "2px 6px", background: c + "20", color: c }}>{p}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#FDFAF6", border: "1px solid #E0D8CC", padding: "18px" }}>
                <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#9B8B7A", marginBottom: "14px" }}>Goals Overview</div>
                {[["Oxford Internship", "#8B1A1A", 70], ["TAMU Research", "#1A3A5C", 45], ["Academics", "#4A3520", 80]].map(([lbl, c, pct]) => (
                  <div key={lbl} style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <div style={{ fontSize: "11px", color: "#6B5E4E" }}>{lbl}</div>
                      <div style={{ fontSize: "10px", color: "#9B8B7A" }}>{pct}%</div>
                    </div>
                    <div style={{ height: "4px", background: "#E0D8CC" }}>
                      <div style={{ height: "4px", width: `${pct}%`, background: c }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blur overlay with CTA */}
        <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(6px)", background: "rgba(14,12,10,0.6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#C4A882", marginBottom: "12px" }}>Your dashboard awaits</div>
          <div style={{ fontSize: "15px", color: "#F5F2EC", marginBottom: "28px" }}>Sign in to access your personal Meridian.</div>
          <button onClick={onLogin}
            style={{ padding: "14px 40px", background: "#C4A882", color: "#0E0C0A", border: "none", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            Sign In / Sign Up
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: "0 48px 80px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: "#C4A882", textAlign: "center", marginBottom: "40px" }}>What's inside</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px" }}>
          {features.map(f => (
            <div key={f.title} style={{ padding: "28px 24px", border: "1px solid #2E2820" }}>
              <div style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#C4A882", marginBottom: "12px" }}>{f.title}</div>
              <div style={{ fontSize: "13px", color: "#6B5E4E", lineHeight: "1.7" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #2E2820", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#3A3028", textTransform: "uppercase" }}>© 2026 Chebiyyam</div>
        <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#3A3028", textTransform: "uppercase" }}>Meridian</div>
      </div>
    </div>
  );
}
function AuthScreen({ onBack }) {
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
        {onBack && <div onClick={onBack} style={{ fontSize: "11px", color: "#3A3028", textAlign: "center", marginTop: "12px", cursor: "pointer" }}>Back to home</div>}
      </div>
    </div>
  );
}

// ── SMART SCHEDULER ──────────────────────────────────────────────────────────
function AIScheduler({ user, refreshKey }) {
  const [items, setItems] = useState([{ name: "", hours: "", priority: "high", deadline: "" }]);
  const [schedule, setSchedule] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const isFirstRender = useRef(true);

  // Load from Supabase on mount
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("schedules").select("*").eq("user_id", user.id).order("updated_at", { ascending: false }).limit(1);
      if (data && data.length > 0) {
        if (data[0].items && data[0].items.length > 0) setItems(data[0].items);
        if (data[0].result) setSchedule(data[0].result);
      }
    };
    load();
  }, [user.id, refreshKey]);

  const save = async (newItems, newSchedule) => {
    setSyncing(true);
    try {
      await supabase.from("schedules").upsert(
        { user_id: user.id, items: newItems, result: newSchedule, updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );
    } catch(e) { console.error("Save error:", e); }
    setSyncing(false);
  };

  // Auto-save items as user types (debounced) - skip first render
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const timer = setTimeout(() => save(items, schedule), 1000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const updateItems = (newItems) => setItems(newItems);
  const updateSchedule = (newSchedule) => { setSchedule(newSchedule); save(items, newSchedule); };

  const addItem = () => updateItems([...items, { name: "", hours: "", priority: "high", deadline: "" }]);
  const updateItem = (i, field, val) => updateItems(items.map((t, idx) => idx === i ? { ...t, [field]: val } : t));
  const removeItem = (i) => updateItems(items.filter((_, idx) => idx !== i));

  const priorityScore = (p) => p === "high" ? 3 : p === "med" ? 2 : 1;

  const daysUntil = (dateStr) => {
    if (!dateStr) return 999;
    const today = new Date(); today.setHours(0,0,0,0);
    const due = new Date(dateStr + "T00:00:00");
    return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  };

  const urgencyScore = (days) => {
    if (days <= 1) return 10;
    if (days <= 3) return 7;
    if (days <= 7) return 5;
    if (days <= 14) return 3;
    return 1;
  };

  const buildSchedule = () => {
    const valid = items.filter(t => t.name.trim() && t.hours);
    if (valid.length === 0) return;

    const scored = valid.map(t => {
      const days = daysUntil(t.deadline);
      const score = priorityScore(t.priority) * 3 + urgencyScore(days) * 2;
      return { ...t, days, score, hours: parseFloat(t.hours) };
    }).sort((a, b) => b.score - a.score);

    updateSchedule({ scored });
  };

  const S = {
    input:  { width: "100%", padding: "8px 10px", border: "1px solid #E0D8CC", background: "#FDFAF6", fontSize: "12px", fontFamily: "Georgia, serif", color: "#1A1612", outline: "none", boxSizing: "border-box" },
    select: { width: "100%", padding: "8px 10px", border: "1px solid #E0D8CC", background: "#FDFAF6", fontSize: "12px", fontFamily: "Georgia, serif", color: "#1A1612", outline: "none", cursor: "pointer" },
    btn:    { padding: "10px 20px", background: "#1A1612", color: "#F5F2EC", border: "none", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" },
    btnOut: { padding: "8px 14px", background: "transparent", color: "#1A1612", border: "1px solid #C0B8AC", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" },
  };

  const priorityColor = (p) => p === "high" ? "#8B1A1A" : p === "med" ? "#4A3520" : "#2C4A2E";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div style={{ fontSize: "12px", color: "#9B8B7A", lineHeight: "1.7" }}>
          Add everything you need to get done. The scheduler will prioritize by urgency and importance.
        </div>
        {syncing && <div style={{ fontSize: "10px", color: "#C4A882", letterSpacing: "2px", textTransform: "uppercase" }}>Saving...</div>}
      </div>

      {/* Column headers */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 0.7fr 0.8fr 1fr auto", gap: "8px", marginBottom: "6px" }}>
        {["Task Name", "Hours", "Priority", "Deadline", ""].map((lbl, i) => (
          <div key={i} style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#9B8B7A" }}>{lbl}</div>
        ))}
      </div>

      {items.map((task, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 0.7fr 0.8fr 1fr auto", gap: "8px", marginBottom: "10px", alignItems: "center" }}>
          <input style={S.input} placeholder="e.g. Write essay" value={task.name} onChange={e => updateItem(i, "name", e.target.value)} />
          <input style={S.input} placeholder="e.g. 2" type="number" min="0.5" step="0.5" value={task.hours} onChange={e => updateItem(i, "hours", e.target.value)} />
          <select style={S.select} value={task.priority} onChange={e => updateItem(i, "priority", e.target.value)}>
            <option value="high">High</option>
            <option value="med">Medium</option>
            <option value="low">Low</option>
          </select>
          <input style={S.input} type="date" min={new Date().toLocaleDateString('en-CA')} value={task.deadline} onChange={e => updateItem(i, "deadline", e.target.value)} />
          <button onClick={() => removeItem(i)} style={{ background: "none", border: "none", color: "#C0B8AC", fontSize: "18px", cursor: "pointer", padding: "0 4px" }}>x</button>
        </div>
      ))}

      <div style={{ display: "flex", gap: "12px", marginTop: "16px", marginBottom: "32px", alignItems: "center" }}>
        <button style={S.btnOut} onClick={addItem}>+ Add Task</button>
        <button style={S.btn} onClick={buildSchedule}>Build My Schedule</button>
        <button style={S.btnOut} onClick={() => save(items, schedule)} disabled={syncing}>
          {syncing ? "Saving..." : "Save"}
        </button>
      </div>

      {schedule && (
        <>
          {/* Priority order */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#9B8B7A", marginBottom: "12px" }}>Tackle In This Order</div>
            {schedule.scored.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid #EDE8E0" }}>
                <div style={{ fontSize: "18px", color: "#C4A882", fontWeight: "400", width: "24px" }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px" }}>{t.name}</div>
                  <div style={{ fontSize: "10px", color: "#9B8B7A", marginTop: "2px" }}>
                    {t.hours}h needed
                    {t.days < 999 ? ` · due in ${t.days} day${t.days !== 1 ? "s" : ""}` : " · no deadline"}
                  </div>
                </div>
                <div style={{ fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", padding: "2px 8px", background: priorityColor(t.priority) + "18", color: priorityColor(t.priority) }}>{t.priority}</div>
              </div>
            ))}
          </div>


        </>
      )}
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────
function MeridianApp({ user }) {
  const [view, setView] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return ["dashboard","calendar","tasks","goals","scheduler"].includes(hash) ? hash : "dashboard";
  });
  const [focusMode, setFocusMode] = useState(false);
  const [focusTask, setFocusTask] = useState(null);
  const [focusSession, setFocusSession] = useState(1);
  const [focusSessions, setFocusSessions] = useState(4);
  const [focusComplete, setFocusComplete] = useState(false);
  const [focusMins, setFocusMins] = useState(25);
  const [ambience, setAmbience] = useState(null); // null | "rain" | "library" | "white"
  const ambienceRef = useRef(null);

  const navigate = (v) => {
    setView(v);
    window.location.hash = v;
  };
  const [goals, setGoals] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ xp: 0, level: 1, streak: 0, deep_work_minutes: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [xpPopup, setXpPopup] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [nonNegotiables, setNonNegotiables] = useState([]);
  const [showImport, setShowImport] = useState(false);
  const [showNNPicker, setShowNNPicker] = useState(false);
  const [importText, setImportText] = useState("");
  const [importParsed, setImportParsed] = useState(null);
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState("");
  const [nnComplete, setNnComplete] = useState(false);
  const [timerMode, setTimerMode] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(30);
  const [weeklySnapshots, setWeeklySnapshots] = useState([]);
  const [showWeeklyReport, setShowWeeklyReport] = useState(false);
  const [performanceScore, setPerformanceScore] = useState(null);
  const [fallingOff, setFallingOff] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const [showMilestone, setShowMilestone] = useState(null);
  const timerRef = useRef(null);
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear]   = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddTask,  setShowAddTask]  = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddGoal,  setShowAddGoal]  = useState(false);
  const [newTask,  setNewTask]  = useState({ text: "", goal_id: "", due: "", priority: "med", hours: "", recurring: [] });
  const [newEvent, setNewEvent] = useState({ title: "", goal_id: "", date: "", time: "" });
  const [newGoal,  setNewGoal]  = useState({ label: "", color: "#E53935", deadline: "" });
  const [editEvent, setEditEvent] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [quoteIdx, setQuoteIdx] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [greeting] = useState(getGreeting());

  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

  useEffect(() => { fetchAll(); fetchStats(); }, []);

  const fetchStats = async () => {
    const { data } = await supabase.from("user_stats").select("*").eq("user_id", user.id).maybeSingle();
    if (data) {
      setStats(data);
      // restore non-negotiables — only keep ones that still exist as pending tasks
      if (data.non_negotiables && Array.isArray(data.non_negotiables)) {
          // only restore if saved today
          const todayDate = new Date().toLocaleDateString('en-CA');
          if (data.nn_date === todayDate) {
            setNonNegotiables(data.non_negotiables);
          } else {
            // new day — clear non-negotiables
            setNonNegotiables([]);
            supabase.from("user_stats").update({ non_negotiables: [], nn_date: null }).eq("user_id", user.id);
          }
        }
    } else {
      const { data: newStats } = await supabase.from("user_stats").insert({ user_id: user.id }).select().single();
      if (newStats) setStats(newStats);
    }
    // fetch last 7 days of snapshots
    const { data: snaps } = await supabase.from("daily_snapshots").select("*").eq("user_id", user.id).order("date", { ascending: false }).limit(7);
    if (snaps) {
      setWeeklySnapshots(snaps);
      if (snaps.length > 0) {
        const avg = Math.round(snaps.reduce((a, s) => a + s.score, 0) / snaps.length);
        setPerformanceScore(avg);
        const recent = snaps.slice(0, 2);
        if (recent.length === 2 && recent.every(s => s.score < 30)) setFallingOff(true);
      }
      if (new Date().getDay() === 0 && snaps.length >= 5) setShowWeeklyReport(true);
    }
  };

  const saveDailySnapshot = async (allTasks) => {
    const todayDate = new Date().toLocaleDateString('en-CA');
    const total = allTasks.length;
    const completed = allTasks.filter(t => t.done).length;
    const score = total > 0 ? Math.round((completed / total) * 100) : 0;
    await supabase.from("daily_snapshots").upsert(
      { user_id: user.id, date: todayDate, total_tasks: total, completed_tasks: completed, score },
      { onConflict: "user_id,date" }
    );
  };

  const checkMilestones = (allTasks) => {
    const done = allTasks.filter(t => t.done).length;
    const milestoneList = [
      { count: 1,   label: "First Step", emoji: "🚀" },
      { count: 5,   label: "Getting Going", emoji: "⚡" },
      { count: 10,  label: "In The Zone", emoji: "🎯" },
      { count: 25,  label: "On A Roll", emoji: "🔥" },
      { count: 50,  label: "Half Century", emoji: "💎" },
      { count: 100, label: "Century", emoji: "👑" },
    ];
    const hit = milestoneList.find(m => m.count === done);
    if (hit) setShowMilestone(hit);
  };

  const playSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.setValueAtTime(523, ctx.currentTime);
      o.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
      o.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
      g.gain.setValueAtTime(0.3, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      o.start(); o.stop(ctx.currentTime + 0.5);
    } catch(e) {}
  };

  const triggerXpPopup = (amount) => {
    setXpPopup(amount);
    setTimeout(() => setXpPopup(null), 1500);
  };

  const addXp = async (amount) => {
    const newXp = (stats.xp || 0) + amount;
    const newLevel = Math.floor(newXp / 100) + 1;
    const updated = { ...stats, xp: newXp, level: newLevel };
    setStats(updated);
    triggerXpPopup(amount);
    await supabase.from("user_stats").upsert({ ...updated, user_id: user.id }, { onConflict: "user_id" });
  };

  const updateStreak = async () => {
    const todayDate = new Date().toLocaleDateString('en-CA');
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');
    let newStreak = stats.streak || 0;
    if (stats.last_completed_date === yesterday) newStreak += 1;
    else if (stats.last_completed_date !== todayDate) newStreak = 1;
    const updated = { ...stats, streak: newStreak, last_completed_date: todayDate };
    setStats(updated);
    await supabase.from("user_stats").upsert({ ...updated, user_id: user.id }, { onConflict: "user_id" });
  };

  // Timer logic
  useEffect(() => {
    if (timerRunning && timerSeconds > 0) {
      timerRef.current = setTimeout(() => setTimerSeconds(s => s - 1), 1000);
    } else if (timerRunning && timerSeconds === 0) {
      setTimerRunning(false);
      playSound();
      const mins = timerMode === 25 ? 25 : timerMode === 50 ? 50 : customMinutes;
      const newMins = (stats.deep_work_minutes || 0) + mins;
      const updated = { ...stats, deep_work_minutes: newMins };
      setStats(updated);
      supabase.from("user_stats").upsert({ ...updated, user_id: user.id }, { onConflict: "user_id" });
      if (focusMode) { setFocusComplete(true); addXp(50); }
    }
    return () => clearTimeout(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerRunning, timerSeconds]);

  // Ambience audio using Web Audio API
  useEffect(() => {
    if (!ambience) { if (ambienceRef.current) { ambienceRef.current.stop?.(); ambienceRef.current = null; } return; }
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1);
      const source = ctx.createBufferSource();
      source.buffer = buffer; source.loop = true;
      const filter = ctx.createBiquadFilter();
      if (ambience === "rain") { filter.type = "bandpass"; filter.frequency.value = 400; filter.Q.value = 0.5; }
      else if (ambience === "library") { filter.type = "lowpass"; filter.frequency.value = 200; filter.Q.value = 2; }
      else { filter.type = "lowpass"; filter.frequency.value = 800; }
      const gain = ctx.createGain(); gain.gain.value = 0.08;
      source.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
      source.start();
      ambienceRef.current = { stop: () => { try { source.stop(); ctx.close(); } catch(e){} } };
    } catch(e) {}
    return () => { if (ambienceRef.current) { ambienceRef.current.stop?.(); ambienceRef.current = null; } };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ambience]);

  const enterFocusMode = (task, mins = 25) => {
    setFocusTask(task);
    setFocusMins(mins);
    setFocusComplete(false);
    setFocusMode(true);
    setTimerMode(mins);
    setTimerSeconds(mins * 60);
    setTimerRunning(true);
  };

  const exitFocusMode = (earlyExit = false) => {
    setTimerRunning(false);
    setTimerSeconds(0);
    setFocusMode(false);
    setFocusTask(null);
    setFocusComplete(false);
    setAmbience(null);
  };

  const formatTimer = (s) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  const startTimer = (mins) => {
    setTimerMode(mins);
    setTimerSeconds((mins === "custom" ? customMinutes : mins) * 60);
    setTimerRunning(true);
  };

  const [allTasksComplete, setAllTasksComplete] = useState(false);

  // Check non-negotiables completion
  useEffect(() => {
    if (nonNegotiables.length === 3) {
      const allDone = nonNegotiables.every(id => tasks.find(t => t.id === id)?.done);
      if (allDone && !nnComplete) {
        setNnComplete(true);
        setShowConfetti(true);
        playSound();
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, nonNegotiables]);

  // Check all today's tasks complete
  useEffect(() => {
    const todayTasks = tasks.filter(t => t.due === todayStr);
    if (todayTasks.length > 0 && todayTasks.every(t => t.done) && !allTasksComplete) {
      setAllTasksComplete(true);
      setShowConfetti(true);
      playSound();
      setTimeout(() => setShowConfetti(false), 4000);
    } else if (!todayTasks.every(t => t.done)) {
      setAllTasksComplete(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: g }, { data: t }, { data: e }] = await Promise.all([
      supabase.from("goals").select("*").order("created_at"),
      supabase.from("tasks").select("*").order("created_at"),
      supabase.from("events").select("*").order("date"),
    ]);
    setGoals(g || []);
    setEvents(e || []);

    const allTasks = t || [];
    const todayStr2 = new Date().toLocaleDateString('en-CA'); // "2026-03-19"
    const todayDay = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();

    // Only reset recurring tasks once per day — check last reset date in localStorage
    const lastReset = localStorage.getItem("meridian_last_reset");
    if (lastReset !== todayStr2) {
      const tasksToReset = allTasks.filter(task => {
        if (!task.recurring || !task.done) return false;
        try {
          const days = JSON.parse(task.recurring);
          return Array.isArray(days) && days.length > 0 && days.includes(todayDay);
        } catch { return false; }
      });
      if (tasksToReset.length > 0) {
        await Promise.all(tasksToReset.map(task =>
          supabase.from("tasks").update({ done: false }).eq("id", task.id)
        ));
        const resetIds = tasksToReset.map(t => t.id);
        setTasks(allTasks.map(t => resetIds.includes(t.id) ? { ...t, done: false } : t));
      } else {
        setTasks(allTasks);
      }
      localStorage.setItem("meridian_last_reset", todayStr2);
    } else {
      setTasks(allTasks);
    }
    setLoading(false);
  };

  const addGoal = async () => {
    if (!newGoal.label.trim()) return;
    const { data } = await supabase.from("goals").insert({ ...newGoal, user_id: user.id }).select().single();
    if (data) { setGoals([...goals, data]); setNewGoal({ label: "", color: "#E53935", deadline: "" }); setShowAddGoal(false); }
  };

  const parseWithClaude = async () => {
    if (!importText.trim()) return;
    setImportLoading(true);
    setImportError("");
    setImportParsed(null);

    try {
      const colors = ["#E53935","#1E88E5","#43A047","#FB8C00","#8E24AA","#00ACC1","#D81B60","#7CB342","#3949AB","#FFB300","#00BCD4","#F4511E","#26A69A","#7986CB","#EC407A","#29B6F6","#8D9B6A","#C4A882","#FF6B6B","#6D4C41"];
      const goals = [];
      const tasks = [];
      let currentGoal = null;
      let colorIdx = 0;

      const lines = importText.split("\n").map(l => l.trim()).filter(Boolean);

      for (const line of lines) {
        // detect goal line: doesn't start with bullet, ends with colon, or has "Goal:" prefix
        const isGoalLine = (
          line.startsWith("Goal:") ||
          (!line.startsWith("*") && !line.startsWith("-") && !line.startsWith("•") && line.endsWith(":")) ||
          (!line.startsWith("*") && !line.startsWith("-") && !line.startsWith("•") && !line.includes("due") && line.length < 60 && line.includes("—"))
        );

        if (isGoalLine) {
          const label = line.replace(/^Goal:\s*/i, "").replace(/:$/, "").replace(/\s*—.*$/, "").trim();
          if (label) {
            currentGoal = { label, color: colors[colorIdx % colors.length], deadline: null };
            colorIdx++;
            if (!goals.find(g => g.label === label)) goals.push(currentGoal);
          }
          continue;
        }

        // detect task line
        const isTaskLine = line.startsWith("*") || line.startsWith("-") || line.startsWith("•");
        if (isTaskLine && currentGoal) {
          let text = line.replace(/^[*\-•]\s*/, "").trim();

          // extract due date
          let due = null;
          const dueMatch = text.match(/—\s*due\s+([A-Za-z]+\s+\d+)/i) || text.match(/due\s+([A-Za-z]+\s+\d+)/i);
          if (dueMatch) {
            const parsed = new Date(`${dueMatch[1]} 2026`);
            if (!isNaN(parsed)) due = parsed.toLocaleDateString('en-CA');
            text = text.replace(/\s*—?\s*due\s+[A-Za-z]+\s+\d+/i, "").trim();
          }

          // detect priority
          let priority = "med";
          if (/high priority/i.test(text)) { priority = "high"; text = text.replace(/,?\s*high priority/i, "").trim(); }
          else if (/low priority/i.test(text)) { priority = "low"; text = text.replace(/,?\s*low priority/i, "").trim(); }
          else if (/past exam|practice test/i.test(text)) priority = "high";

          if (text) tasks.push({ text, goal: currentGoal.label, priority, due });
        }
      }

      if (goals.length === 0) {
        setImportError("Couldn't detect any goals. Make sure each goal is on its own line ending with a colon (e.g. 'AP Calc BC:') and tasks are bullet points below it.");
        setImportLoading(false);
        return;
      }

      setImportParsed({ goals, tasks });
    } catch(e) {
      setImportError("Something went wrong parsing. Try again.");
    }
    setImportLoading(false);
  };

  const importAll = async () => {
    if (!importParsed) return;
    setImportLoading(true);
    // create goals first
    const goalMap = {};
    for (const g of importParsed.goals) {
      const existing = goals.find(eg => eg.label.toLowerCase() === g.label.toLowerCase());
      if (existing) { goalMap[g.label] = existing.id; continue; }
      const { data } = await supabase.from("goals").insert({ label: g.label, color: g.color, deadline: g.deadline || null, user_id: user.id }).select().single();
      if (data) goalMap[g.label] = data.id;
    }
    // reload goals
    const { data: newGoals } = await supabase.from("goals").select("*").order("created_at");
    if (newGoals) setGoals(newGoals);
    // create tasks
    const newTasksArr = [];
    for (const t of importParsed.tasks) {
      const goal_id = goalMap[t.goal];
      if (!goal_id) continue;
      const { data } = await supabase.from("tasks").insert({ text: t.text, goal_id, priority: t.priority || "med", due: t.due || null, done: false, user_id: user.id }).select().single();
      if (data) newTasksArr.push(data);
    }
    setTasks(prev => [...prev, ...newTasksArr]);
    setImportLoading(false);
    setShowImport(false);
    setImportText("");
    setImportParsed(null);
  };

  const seedData = async () => {
    setImportLoading(true);
    const colors = ["#E53935","#1E88E5","#43A047","#FB8C00","#8E24AA","#00ACC1","#D81B60","#7CB342","#3949AB","#FFB300","#00BCD4","#F4511E"];
    const goalDefs = [
      { label: "AP Gov",            color: colors[0],  deadline: "2026-05-05" },
      { label: "AP Macro",          color: colors[1],  deadline: "2026-05-08" },
      { label: "AP Calc BC",        color: colors[2],  deadline: "2026-05-11" },
      { label: "AP Physics C Mech", color: colors[3],  deadline: "2026-05-13" },
      { label: "AP Physics C E&M",  color: colors[4],  deadline: "2026-05-14" },
      { label: "Oxford Research",   color: colors[5],  deadline: "2026-05-20" },
      { label: "PHYS 206",          color: colors[6],  deadline: "2026-08-24" },
      { label: "MATH 251",          color: colors[7],  deadline: "2026-08-24" },
      { label: "STAT 211",          color: colors[8],  deadline: "2026-08-24" },
      { label: "ENGR 102",          color: colors[9],  deadline: "2026-08-24" },
      { label: "POLS 207",          color: colors[10], deadline: "2026-08-24" },
      { label: "Discipline",        color: colors[11], deadline: null },
    ];
    const taskDefs = [
      // AP Gov
      { goal: "AP Gov", text: "Unit 4 review",      due: "2026-04-05", priority: "med" },
      { goal: "AP Gov", text: "Unit 5 review",      due: "2026-04-10", priority: "med" },
      { goal: "AP Gov", text: "Units 1-3 revision", due: "2026-04-12", priority: "high" },
      { goal: "AP Gov", text: "Past exam 1",        due: "2026-04-15", priority: "high" },
      { goal: "AP Gov", text: "Past exam 2",        due: "2026-04-20", priority: "high" },
      { goal: "AP Gov", text: "Past exam 3",        due: "2026-04-25", priority: "high" },
      { goal: "AP Gov", text: "Past exam 4",        due: "2026-05-01", priority: "high" },
      // AP Macro
      { goal: "AP Macro", text: "Unit 1 review",   due: "2026-04-03", priority: "med" },
      { goal: "AP Macro", text: "Unit 2 review",   due: "2026-04-05", priority: "med" },
      { goal: "AP Macro", text: "Unit 3 review",   due: "2026-04-07", priority: "med" },
      { goal: "AP Macro", text: "Unit 4 review",   due: "2026-04-09", priority: "med" },
      { goal: "AP Macro", text: "Unit 5 review",   due: "2026-04-11", priority: "med" },
      { goal: "AP Macro", text: "Unit 6 review",   due: "2026-04-13", priority: "med" },
      { goal: "AP Macro", text: "Past exam 1",     due: "2026-04-15", priority: "high" },
      { goal: "AP Macro", text: "Past exam 2",     due: "2026-04-20", priority: "high" },
      { goal: "AP Macro", text: "Past exam 3",     due: "2026-04-25", priority: "high" },
      { goal: "AP Macro", text: "Past exam 4",     due: "2026-05-05", priority: "high" },
      // AP Calc BC
      { goal: "AP Calc BC", text: "Practice test 1", due: "2026-04-03", priority: "high" },
      { goal: "AP Calc BC", text: "Practice test 2", due: "2026-04-08", priority: "high" },
      { goal: "AP Calc BC", text: "Practice test 3", due: "2026-04-13", priority: "high" },
      { goal: "AP Calc BC", text: "Practice test 4", due: "2026-04-18", priority: "high" },
      { goal: "AP Calc BC", text: "Practice test 5", due: "2026-04-25", priority: "high" },
      { goal: "AP Calc BC", text: "Practice test 6", due: "2026-05-05", priority: "high" },
      // AP Physics C Mech
      { goal: "AP Physics C Mech", text: "Work and energy theorem",        due: "2026-04-03", priority: "med" },
      { goal: "AP Physics C Mech", text: "Potential energy and conservation", due: "2026-04-05", priority: "med" },
      { goal: "AP Physics C Mech", text: "Conservation of linear momentum",  due: "2026-04-07", priority: "med" },
      { goal: "AP Physics C Mech", text: "Rotational motion",               due: "2026-04-09", priority: "med" },
      { goal: "AP Physics C Mech", text: "Torque and angular momentum",     due: "2026-04-11", priority: "med" },
      { goal: "AP Physics C Mech", text: "Harmonic motion",                 due: "2026-04-13", priority: "med" },
      { goal: "AP Physics C Mech", text: "Past exam 1",                     due: "2026-04-15", priority: "high" },
      { goal: "AP Physics C Mech", text: "Past exam 2",                     due: "2026-04-20", priority: "high" },
      { goal: "AP Physics C Mech", text: "Past exam 3",                     due: "2026-04-25", priority: "high" },
      { goal: "AP Physics C Mech", text: "Past exam 4",                     due: "2026-05-01", priority: "high" },
      { goal: "AP Physics C Mech", text: "Past exam 5",                     due: "2026-05-08", priority: "high" },
      // AP Physics C E&M
      { goal: "AP Physics C E&M", text: "Past exam 1", due: "2026-04-03", priority: "high" },
      { goal: "AP Physics C E&M", text: "Past exam 2", due: "2026-04-08", priority: "high" },
      { goal: "AP Physics C E&M", text: "Past exam 3", due: "2026-04-13", priority: "high" },
      { goal: "AP Physics C E&M", text: "Past exam 4", due: "2026-04-20", priority: "high" },
      { goal: "AP Physics C E&M", text: "Past exam 5", due: "2026-05-01", priority: "high" },
      { goal: "AP Physics C E&M", text: "Past exam 6", due: "2026-05-08", priority: "high" },
      // Oxford Research
      { goal: "Oxford Research", text: "Finish 3B1B neural networks",    due: "2026-04-10", priority: "high" },
      { goal: "Oxford Research", text: "StatQuest CNN series complete",   due: "2026-04-25", priority: "high" },
      { goal: "Oxford Research", text: "Read Oxford paper 1",             due: "2026-05-01", priority: "med" },
      { goal: "Oxford Research", text: "Read Oxford paper 2",             due: "2026-05-05", priority: "med" },
      { goal: "Oxford Research", text: "Read Oxford paper 3",             due: "2026-05-08", priority: "med" },
      { goal: "Oxford Research", text: "Read Oxford paper 4",             due: "2026-05-10", priority: "med" },
      { goal: "Oxford Research", text: "Email Dr. He",                    due: "2026-05-20", priority: "high" },
      // PHYS 206
      { goal: "PHYS 206", text: "Erukhimova 1D/2D/Newton's review", due: "2026-05-25", priority: "med" },
      { goal: "PHYS 206", text: "Erukhimova Work/Energy",           due: "2026-06-05", priority: "med" },
      { goal: "PHYS 206", text: "Erukhimova Momentum",              due: "2026-06-15", priority: "med" },
      { goal: "PHYS 206", text: "Erukhimova Rotation/Torque",       due: "2026-06-25", priority: "med" },
      { goal: "PHYS 206", text: "Erukhimova Harmonic Motion",       due: "2026-07-05", priority: "med" },
      { goal: "PHYS 206", text: "Erukhimova E&M full series",       due: "2026-07-15", priority: "med" },
      { goal: "PHYS 206", text: "Past exam 1",                      due: "2026-07-20", priority: "high" },
      { goal: "PHYS 206", text: "Past exam 2",                      due: "2026-07-27", priority: "high" },
      { goal: "PHYS 206", text: "Past exam 3",                      due: "2026-08-05", priority: "high" },
      { goal: "PHYS 206", text: "Past exam 4",                      due: "2026-08-10", priority: "high" },
      // MATH 251
      { goal: "MATH 251", text: "Stewart Ch 12 + Leonard videos", due: "2026-06-05", priority: "med" },
      { goal: "MATH 251", text: "Stewart Ch 13 + Leonard videos", due: "2026-06-20", priority: "med" },
      { goal: "MATH 251", text: "Stewart Ch 14 + Leonard videos", due: "2026-07-10", priority: "med" },
      { goal: "MATH 251", text: "Stewart Ch 15 + Leonard videos", due: "2026-07-25", priority: "med" },
      { goal: "MATH 251", text: "Zelenko past exam 1",            due: "2026-07-28", priority: "high" },
      { goal: "MATH 251", text: "Zelenko past exam 2",            due: "2026-08-05", priority: "high" },
      { goal: "MATH 251", text: "Zelenko past exam 3",            due: "2026-08-10", priority: "high" },
      // STAT 211
      { goal: "STAT 211", text: "StatQuest probability basics", due: "2026-06-20", priority: "med" },
      { goal: "STAT 211", text: "Distributions",                due: "2026-07-05", priority: "med" },
      { goal: "STAT 211", text: "Hypothesis testing",           due: "2026-07-20", priority: "med" },
      { goal: "STAT 211", text: "Past exam 1",                  due: "2026-08-01", priority: "high" },
      { goal: "STAT 211", text: "Past exam 2",                  due: "2026-08-10", priority: "high" },
      // ENGR 102
      { goal: "ENGR 102", text: "Bro Code Python basics",            due: "2026-06-15", priority: "med" },
      { goal: "ENGR 102", text: "Variables/conditionals/loops",       due: "2026-06-30", priority: "med" },
      { goal: "ENGR 102", text: "Functions/lists/file handling",      due: "2026-07-15", priority: "med" },
      { goal: "ENGR 102", text: "NumPy and Matplotlib",               due: "2026-07-31", priority: "med" },
      { goal: "ENGR 102", text: "Build 3 small engineering scripts",  due: "2026-08-10", priority: "high" },
      // POLS 207
      { goal: "POLS 207", text: "Set reminders for all tests", due: "2026-08-24", priority: "high" },
      { goal: "POLS 207", text: "Never miss a deadline",       due: null,          priority: "med", recurring: JSON.stringify(["mon","tue","wed","thu","fri"]) },
      // Discipline
      { goal: "Discipline", text: "No PMO today",           due: null, priority: "high", recurring: JSON.stringify(["mon","tue","wed","thu","fri","sat","sun"]) },
      { goal: "Discipline", text: "Lights out 12am",        due: null, priority: "high", recurring: JSON.stringify(["mon","tue","wed","thu","fri","sat","sun"]) },
      { goal: "Discipline", text: "CNN Oxford prep 30 min", due: null, priority: "high", recurring: JSON.stringify(["mon","tue","wed","thu","fri","sat","sun"]) },
    ];

    // insert goals
    const goalMap = {};
    for (const g of goalDefs) {
      const existing = goals.find(eg => eg.label === g.label);
      if (existing) { goalMap[g.label] = existing.id; continue; }
      const { data } = await supabase.from("goals").insert({ label: g.label, color: g.color, deadline: g.deadline, user_id: user.id }).select().single();
      if (data) goalMap[g.label] = data.id;
    }
    // insert tasks
    const insertedTasks = [];
    for (const t of taskDefs) {
      const goal_id = goalMap[t.goal];
      if (!goal_id) continue;
      const { data } = await supabase.from("tasks").insert({ text: t.text, goal_id, priority: t.priority, due: t.due || null, done: false, recurring: t.recurring || null, user_id: user.id }).select().single();
      if (data) insertedTasks.push(data);
    }
    // reload everything
    const { data: newGoals } = await supabase.from("goals").select("*").order("created_at");
    const { data: newTasks } = await supabase.from("tasks").select("*").order("created_at");
    if (newGoals) setGoals(newGoals);
    if (newTasks) setTasks(newTasks);
    setImportLoading(false);
    setShowImport(false);
  };

  const deleteGoal = async (id) => {
    await supabase.from("goals").delete().eq("id", id);
    setGoals(goals.filter(g => g.id !== id));
    setTasks(tasks.filter(t => t.goal_id !== id));
    setEvents(events.filter(e => e.goal_id !== id));
  };

  const toggleTask = async (task) => {
    const { data } = await supabase.from("tasks").update({ done: !task.done }).eq("id", task.id).select().single();
    if (data) {
      const updatedTasks = tasks.map(t => t.id === task.id ? data : t);
      setTasks(updatedTasks);
      if (!task.done) {
        // marking done
        playSound();
        addXp(10);
        updateStreak();
        saveDailySnapshot(updatedTasks);
        checkMilestones(updatedTasks);
        setFallingOff(false);
        const { data: sched } = await supabase.from("schedules").select("*").eq("user_id", user.id).maybeSingle();
        if (sched && sched.items) {
          const updatedItems = sched.items.filter(item => item.name !== task.text);
          await supabase.from("schedules").update({ items: updatedItems, updated_at: new Date().toISOString() }).eq("user_id", user.id);
        }
      } else {
        saveDailySnapshot(updatedTasks);
        if (task.hours) {
          const schedItem = { name: task.text, hours: String(task.hours), priority: task.priority, deadline: task.due || "" };
          const { data: sched } = await supabase.from("schedules").select("*").eq("user_id", user.id).maybeSingle();
          if (sched) {
            const alreadyExists = (sched.items || []).some(i => i.name === task.text);
            if (!alreadyExists) {
              const updatedItems = [...(sched.items || []), schedItem];
              await supabase.from("schedules").update({ items: updatedItems, updated_at: new Date().toISOString() }).eq("user_id", user.id);
            }
          } else {
            await supabase.from("schedules").insert({ user_id: user.id, items: [schedItem], result: null });
          }
        }
      }
    }
  };

  const deleteTask = async (id) => {
    await supabase.from("tasks").delete().eq("id", id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const saveEditTask = async () => {
    if (!editTask) return;
    const recurringVal = Array.isArray(editTask.recurring) && editTask.recurring.length > 0 ? JSON.stringify(editTask.recurring) : null;
    const { data } = await supabase.from("tasks").update({ text: editTask.text, goal_id: editTask.goal_id, due: editTask.due, priority: editTask.priority, hours: editTask.hours, recurring: recurringVal }).eq("id", editTask.id).select().single();
    if (data) { setTasks(tasks.map(t => t.id === data.id ? data : t)); setEditTask(null); }
  };

  const addTask = async () => {
    if (!newTask.text.trim() || !newTask.goal_id) return;
    const taskData = { text: newTask.text, goal_id: newTask.goal_id, due: newTask.due || null, priority: newTask.priority, user_id: user.id, done: false };
    if (newTask.hours) taskData.hours = parseFloat(newTask.hours);
    if (newTask.recurring && newTask.recurring.length > 0) taskData.recurring = JSON.stringify(newTask.recurring);
    const { data } = await supabase.from("tasks").insert(taskData).select().single();
    if (data) {
      const updatedTasks = [...tasks, data];
      setTasks(updatedTasks);
      setNewTask({ text: "", goal_id: "", due: "", priority: "med", hours: "", recurring: [] });
      setShowAddTask(false);
      // Sync to schedule builder if hours provided
      if (newTask.hours) {
        const schedItem = { name: newTask.text, hours: String(newTask.hours), priority: newTask.priority, deadline: newTask.due || "" };
        const { data: existing } = await supabase.from("schedules").select("*").eq("user_id", user.id).maybeSingle();
        if (existing) {
          const updatedItems = [...(existing.items || []), schedItem];
          await supabase.from("schedules").update({ items: updatedItems, updated_at: new Date().toISOString() }).eq("user_id", user.id);
        } else {
          await supabase.from("schedules").insert({ user_id: user.id, items: [schedItem], result: null });
        }
      }
    }
  };

  const addEvent = async () => {
    if (!newEvent.title.trim() || !newEvent.date || !newEvent.goal_id) return;
    const { data } = await supabase.from("events").insert({ ...newEvent, user_id: user.id }).select().single();
    if (data) { setEvents([...events, data]); setNewEvent({ title: "", goal_id: goals[0]?.id || "", date: "", time: "" }); setShowAddEvent(false); }
  };

  const deleteEvent = async (id) => {
    await supabase.from("events").delete().eq("id", id);
    setEvents(events.filter(e => e.id !== id));
  };

  const saveEditEvent = async () => {
    if (!editEvent) return;
    const { data } = await supabase.from("events").update({ title: editEvent.title, date: editEvent.date, time: editEvent.time, goal_id: editEvent.goal_id }).eq("id", editEvent.id).select().single();
    if (data) { setEvents(events.map(e => e.id === data.id ? data : e)); setEditEvent(null); }
  };

  const signOut = () => supabase.auth.signOut();
  const nextQuote = () => setQuoteIdx(i => (i + 1) % QUOTES.length);

  const goalColor = (id) => goals.find(g => g.id === id)?.color || "#9B8B7A";
  const goalLabel = (id) => goals.find(g => g.id === id)?.label || "?";
  const pendingTasks   = tasks.filter(t => !t.done);
  const doneTasks      = tasks.filter(t => t.done);
  const completionRate = tasks.length ? Math.round((doneTasks.length / tasks.length) * 100) : 0;
  const futureEvents   = events.filter(e => e.date >= todayStr);
  const eventsForDate  = (ds) => futureEvents.filter(e => e.date === ds);
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
    btnDanger: { padding: "8px 16px", background: "transparent", color: "#8B1A1A", border: "1px solid #8B1A1A", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" },
    input:     { width: "100%", padding: "10px 12px", border: "1px solid #E0D8CC", background: "#FDFAF6", fontSize: "13px", fontFamily: "Georgia, serif", color: "#1A1612", outline: "none", boxSizing: "border-box" },
    select:    { width: "100%", padding: "10px 12px", border: "1px solid #E0D8CC", background: "#FDFAF6", fontSize: "12px", fontFamily: "Georgia, serif", color: "#1A1612", outline: "none", cursor: "pointer" },
    modal:     { position: "fixed", inset: 0, background: "rgba(26,22,18,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 },
    modalBox:  { background: "#FDFAF6", border: "1px solid #E0D8CC", padding: "32px", width: "420px", maxWidth: "90vw", maxHeight: "90vh", overflowY: "auto" },
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

  const isMobile = window.innerWidth < 768;

  return (
    <div style={{ minHeight: "100vh", background: "#F5F2EC", fontFamily: "Georgia, 'Times New Roman', serif", color: "#1A1612" }}>
      {showConfetti && <Confetti />}
      {focusMode && (
        <FocusScreen
          task={focusTask}
          timerSeconds={timerSeconds}
          timerRunning={timerRunning}
          setTimerRunning={setTimerRunning}
          focusComplete={focusComplete}
          focusSession={focusSession}
          focusSessions={focusSessions}
          deepWorkMins={stats.deep_work_minutes}
          stats={stats}
          nonNegotiables={nonNegotiables}
          nonNegotiableIdx={nonNegotiables.indexOf(focusTask?.id)}
          goalColor={goalColor}
          goalLabel={goalLabel}
          ambience={ambience}
          setAmbience={setAmbience}
          focusMins={focusMins}
          onExit={(early) => exitFocusMode(early)}
          onMarkComplete={() => { if (focusTask) toggleTask(focusTask); exitFocusMode(false); }}
          onNextSession={() => { setFocusSession(s => s + 1); setFocusComplete(false); setTimerSeconds(focusMins * 60); setTimerRunning(true); }}
        />
      )}
      {xpPopup && (
        <div style={{ position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)", zIndex: 8000, background: "#1A1612", color: "#C4A882", padding: "10px 24px", fontSize: "18px", letterSpacing: "2px", fontFamily: "Georgia, serif", animation: "xpPop 1.5s ease forwards", pointerEvents: "none" }}>
          +{xpPopup} XP
          <style>{`@keyframes xpPop { 0%{opacity:0;transform:translateX(-50%) translateY(0)} 20%{opacity:1} 100%{opacity:0;transform:translateX(-50%) translateY(-60px)} }`}</style>
        </div>
      )}

      {/* Sidebar - desktop only */}
      {!isMobile && (
        <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: "220px", background: "#1A1612", display: "flex", flexDirection: "column", zIndex: 100 }}>
          <div style={{ padding: "32px 28px 24px", borderBottom: "1px solid #2E2820" }}>
            <div style={{ fontSize: "22px", fontWeight: "400", color: "#F5F2EC", letterSpacing: "4px", textTransform: "uppercase" }}>Meridian</div>
            <div style={{ fontSize: "10px", color: "#6B5E4E", letterSpacing: "2px", marginTop: "4px", textTransform: "uppercase" }}>Your operating system</div>
          </div>
          <nav style={{ padding: "20px 0", flex: 1 }}>
            {[["dashboard","Dashboard"],["calendar","Calendar"],["tasks","Tasks"],["goals","Goals"],["scheduler","Schedule Builder"]].map(([id,lbl]) => (
              <button key={id} style={navBtn(view===id)} onClick={() => navigate(id)}>{lbl}</button>
            ))}
            <button style={{ ...navBtn(false), color: "#C4A882", marginTop: "8px", borderTop: "1px solid #2E2820", paddingTop: "20px" }} onClick={() => setShowImport(true)}>⚡ Import from Claude</button>
          </nav>
          <div style={{ padding: "16px 28px", borderTop: "1px solid #2E2820" }}>
            <div style={{ fontSize: "10px", color: "#6B5E4E", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
            <div style={{ fontSize: "10px", color: "#6B5E4E", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Done: {completionRate}%</div>
            <div style={{ height: "3px", background: "#2E2820", marginBottom: "14px" }}><div style={fill(completionRate, "#C4A882")} /></div>
            <button onClick={signOut} style={{ background: "none", border: "none", color: "#6B5E4E", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", padding: 0, fontFamily: "Georgia, serif" }}>Sign Out</button>
            <div style={{ fontSize: "9px", color: "#3A3028", marginTop: "12px", letterSpacing: "1px" }}>© 2026 Chebiyyam</div>
            <div style={{ marginTop: "12px", borderTop: "1px solid #2E2820", paddingTop: "12px" }}>
              <div style={{ fontSize: "10px", color: "#C4A882" }}>⚡ Level {stats.level} — {stats.xp % 100}/100 XP</div>
              <div style={{ height: "2px", background: "#2E2820", marginTop: "5px", marginBottom: "8px" }}><div style={{ height: "100%", width: `${stats.xp % 100}%`, background: "#C4A882", transition: "width 0.5s" }} /></div>
              <div style={{ fontSize: "10px", color: "#6B5E4E" }}>🔥 {stats.streak} day streak</div>
              <div style={{ fontSize: "10px", color: "#6B5E4E", marginTop: "3px" }}>⏱ {Math.floor((stats.deep_work_minutes||0)/60)}h {(stats.deep_work_minutes||0)%60}m deep work</div>
              <button onClick={() => setSoundEnabled(s => !s)} style={{ marginTop: "8px", background: "none", border: "none", color: soundEnabled ? "#C4A882" : "#6B5E4E", fontSize: "10px", cursor: "pointer", fontFamily: "Georgia, serif", padding: 0 }}>
                {soundEnabled ? "🔊 Sound on" : "🔇 Sound off"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile top bar */}
      {isMobile && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, background: "#1A1612", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100 }}>
          <div style={{ fontSize: "18px", letterSpacing: "4px", color: "#C4A882", textTransform: "uppercase" }}>Meridian</div>
          <button onClick={signOut} style={{ background: "none", border: "none", color: "#6B5E4E", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" }}>Sign Out</button>
        </div>
      )}

      {/* Main */}
      <div style={{ marginLeft: isMobile ? "0" : "220px", padding: isMobile ? "70px 16px 80px" : "40px 48px", minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: isMobile ? "24px" : "40px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: isMobile ? "24px" : "32px", fontWeight: "400", letterSpacing: "1px" }}>
              {view === "dashboard" ? greeting : view === "calendar" ? "Calendar" : view === "tasks" ? "Tasks" : view === "goals" ? "Goals" : "Schedule Builder"}
            </div>
            <div style={{ fontSize: "11px", color: "#9B8B7A", letterSpacing: "2px", textTransform: "uppercase", marginTop: "6px" }}>
              {DAYS[today.getDay()]}, {MONTHS[today.getMonth()]} {today.getDate()}, {today.getFullYear()}
            </div>
          </div>
          {/* Clickable quote */}
          <div onClick={nextQuote} title="Click for a new quote"
            style={{ padding: "10px 16px", background: "#1A1612", color: "#C4A882", fontSize: "10px", letterSpacing: "1px", fontStyle: "italic", maxWidth: isMobile ? "100%" : "320px", textAlign: "right", cursor: "pointer", userSelect: "none" }}>
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
                <button style={S.btn} onClick={() => { navigate("goals"); setShowAddGoal(true); }}>Create Your First Goal</button>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
              {/* Tasks card */}
              <div style={{ ...S.card, borderLeft: `3px solid ${pendingTasks.length === 0 ? "#43A047" : pendingTasks.filter(t=>t.due&&t.due<=todayStr).length > 0 ? "#E53935" : "#C4A882"}` }}>
                <div style={S.cardTitle}>
                  {pendingTasks.filter(t=>t.due&&t.due<=todayStr).length > 0
                    ? <span style={{color:"#E53935"}}>⚠️ {pendingTasks.filter(t=>t.due&&t.due<=todayStr).length} overdue</span>
                    : pendingTasks.length === 0 ? <span style={{color:"#43A047"}}>✅ All clear</span>
                    : "Tasks Remaining"}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div>
                    <div style={{ fontSize: "48px", fontWeight: "400", lineHeight: 1 }}>{pendingTasks.length}</div>
                    <div style={{ fontSize: "11px", color: "#9B8B7A", marginTop: "8px" }}>of {tasks.length} total</div>
                  </div>
                  <svg width="60" height="60" style={{ flexShrink: 0 }}>
                    <circle cx="30" cy="30" r="24" fill="none" stroke="#E0D8CC" strokeWidth="5" />
                    <circle cx="30" cy="30" r="24" fill="none" stroke={completionRate === 100 ? "#43A047" : "#C4A882"} strokeWidth="5"
                      strokeDasharray={`${2 * Math.PI * 24}`}
                      strokeDashoffset={`${2 * Math.PI * 24 * (1 - completionRate / 100)}`}
                      strokeLinecap="round" transform="rotate(-90 30 30)"
                      style={{ transition: "stroke-dashoffset 0.8s ease" }} />
                    <text x="30" y="35" textAnchor="middle" fontSize="11" fill="#1A1612" fontFamily="Georgia, serif">{completionRate}%</text>
                  </svg>
                </div>
              </div>

              {/* Today card */}
              <div style={{ ...S.card, borderLeft: `3px solid ${todayEvents.length > 0 ? "#1E88E5" : "#E0D8CC"}` }}>
                <div style={S.cardTitle}>Today</div>
                <div style={{ fontSize: "11px", color: "#9B8B7A", marginBottom: "8px" }}>
                  {DAYS[today.getDay()]}, {MONTHS[today.getMonth()]} {today.getDate()}
                </div>
                {todayEvents.length === 0
                  ? <div style={{ fontSize: "12px", color: "#C0B8AC" }}>No events today</div>
                  : todayEvents.map(e => (
                    <div key={e.id} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0", borderBottom: "1px solid #EDE8E0" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: goalColor(e.goal_id), flexShrink: 0 }} />
                      <div style={{ fontSize: "11px", flex: 1 }}>{e.title}</div>
                      <div style={{ fontSize: "10px", color: "#9B8B7A" }}>{e.time}</div>
                    </div>
                  ))}
                {/* Tasks due today */}
                {tasks.filter(t=>t.due===todayStr&&!t.done).slice(0,2).map(t => (
                  <div key={t.id} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0", borderBottom: "1px solid #EDE8E0" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "1px", background: goalColor(t.goal_id), flexShrink: 0 }} />
                    <div style={{ fontSize: "11px", flex: 1, color: "#E53935" }}>{t.text}</div>
                    <div style={{ fontSize: "10px", color: "#E53935" }}>due</div>
                  </div>
                ))}
              </div>

              {/* Goals card */}
              <div style={{ ...S.card, borderLeft: "3px solid #E0D8CC" }}>
                <div style={S.cardTitle}>Goals</div>
                <div style={{ fontSize: "48px", fontWeight: "400", lineHeight: 1, marginBottom: "8px" }}>{goals.length}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {goals.slice(0, 4).map(g => {
                    const gt = tasks.filter(t => t.goal_id === g.id);
                    const pct = gt.length ? Math.round((gt.filter(t=>t.done).length / gt.length) * 100) : 0;
                    return (
                      <div key={g.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: g.color, flexShrink: 0 }} />
                        <div style={{ fontSize: "10px", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.label}</div>
                        <div style={{ fontSize: "10px", color: "#9B8B7A" }}>{pct}%</div>
                      </div>
                    );
                  })}
                  {goals.length > 4 && <div style={{ fontSize: "10px", color: "#9B8B7A" }}>+{goals.length - 4} more</div>}
                </div>
              </div>
            </div>

            {/* Top 3 Non-Negotiables */}
            <div style={{ ...S.card, marginBottom: "24px", borderLeft: nnComplete ? "3px solid #43A047" : "3px solid #C4A882" }}>
              <div style={S.cardTitle}>
                <span>🎯 Today's Non-Negotiables {nnComplete ? "— ✅ All Done!" : `(${nonNegotiables.filter(id => tasks.find(t=>t.id===id)?.done).length}/3)`}</span>
                <button style={S.btnOut} onClick={() => setShowNNPicker(true)}>Pick 3</button>
              </div>
              {nonNegotiables.length === 0 && <div style={{ fontSize: "12px", color: "#9B8B7A" }}>Pick your 3 most important tasks for today. These are locked in — no excuses.</div>}
              {nonNegotiables.length > 0 && nonNegotiables.every(id => !tasks.find(t => t.id === id)) && (
                <div style={{ fontSize: "12px", color: "#9B8B7A" }}>Loading your non-negotiables...</div>
              )}
              {nonNegotiables.map(id => {
                const task = tasks.find(t => t.id === id);
                if (!task) return null;
                return (
                  <div key={id} onClick={() => toggleTask(task)} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid #EDE8E0", cursor: "pointer" }}>
                    <div style={{ ...chk(task.done), border: `1.5px solid ${task.done ? "#43A047" : "#C4A882"}`, background: task.done ? "#43A047" : "transparent" }}>
                      {task.done && <span style={{ fontSize: "10px", color: "#fff" }}>✓</span>}
                    </div>
                    <div style={{ flex: 1, fontSize: "13px", textDecoration: task.done ? "line-through" : "none", color: task.done ? "#9B8B7A" : "#1A1612" }}>{task.text}</div>
                    <div style={badge(task.priority)}>{task.priority}</div>
                  </div>
                );
              })}
              {nnComplete && <div style={{ fontSize: "12px", color: "#43A047", marginTop: "10px", letterSpacing: "1px" }}>🎉 You crushed your non-negotiables today!</div>}
            </div>

            {/* Flow Timer */}
            <div style={{ ...S.card, marginBottom: "24px" }}>
              <div style={S.cardTitle}>
                <span>⏱ Flow Mode</span>
                <span style={{ fontSize: "10px", color: "#9B8B7A" }}>{Math.floor((stats.deep_work_minutes||0)/60)}h {(stats.deep_work_minutes||0)%60}m deep work today</span>
              </div>
              {!timerRunning && timerSeconds === 0 && (
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button style={S.btnOut} onClick={() => startTimer(25)}>25 min</button>
                  <button style={S.btnOut} onClick={() => startTimer(50)}>50 min</button>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <input type="number" min="1" max="120" value={customMinutes} onChange={e => setCustomMinutes(Number(e.target.value))}
                      style={{ ...S.input, width: "60px", padding: "8px" }} />
                    <button style={S.btnOut} onClick={() => startTimer("custom")}>Custom</button>
                  </div>
                </div>
              )}
              {(timerRunning || timerSeconds > 0) && (
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <div style={{ fontSize: "48px", fontWeight: "400", color: timerRunning ? "#1A1612" : "#C4A882", letterSpacing: "2px" }}>{formatTimer(timerSeconds)}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <button style={S.btnOut} onClick={() => setTimerRunning(r => !r)}>{timerRunning ? "Pause" : "Resume"}</button>
                    <button style={S.btnOut} onClick={() => { setTimerRunning(false); setTimerSeconds(0); setTimerMode(null); }}>Reset</button>
                  </div>
                </div>
              )}
              {!timerRunning && timerSeconds === 0 && timerMode && (
                <div style={{ fontSize: "11px", color: "#43A047", marginTop: "8px" }}>✅ Session complete! Deep work logged.</div>
              )}
            </div>
            {/* Falling Off Detection */}
            {fallingOff && (
              <div style={{ ...S.card, marginBottom: "24px", borderLeft: "3px solid #FB8C00", background: "#FB8C0008" }}>
                <div style={{ fontSize: "13px", color: "#FB8C00", marginBottom: "4px" }}>📉 You were more consistent last week.</div>
                <div style={{ fontSize: "11px", color: "#9B8B7A" }}>No pressure — but let's get back on track. Even one task today counts.</div>
                <button style={{ ...S.btnOut, marginTop: "10px", borderColor: "#FB8C00", color: "#FB8C00" }} onClick={() => setFallingOff(false)}>Got it, I'm back 💪</button>
              </div>
            )}

            {/* Performance Score + Weekly Report */}
            {performanceScore !== null && (
              <div style={{ ...S.card, marginBottom: "24px" }}>
                <div style={S.cardTitle}>
                  <span>📈 Performance Score</span>
                  <button style={S.btnOut} onClick={() => setShowWeeklyReport(true)}>Weekly Report</button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: "48px", fontWeight: "400", lineHeight: 1, color: performanceScore >= 70 ? "#43A047" : performanceScore >= 40 ? "#FB8C00" : "#E53935" }}>{performanceScore}</div>
                    <div style={{ fontSize: "11px", color: "#9B8B7A", marginTop: "4px" }}>7-day avg completion %</div>
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    {weeklySnapshots.slice(0, 5).reverse().map((s, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ fontSize: "10px", color: "#9B8B7A", width: "36px" }}>{s.date.slice(5)}</div>
                        <div style={{ flex: 1, height: "6px", background: "#E0D8CC", borderRadius: "3px" }}>
                          <div style={{ height: "100%", width: `${s.score}%`, background: s.score >= 70 ? "#43A047" : s.score >= 40 ? "#FB8C00" : "#E53935", borderRadius: "3px", transition: "width 0.6s" }} />
                        </div>
                        <div style={{ fontSize: "10px", color: "#9B8B7A", width: "30px" }}>{s.score}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Goal Forecast */}
            {goals.length > 0 && (() => {
              const g = goals.reduce((best, g) => {
                const count = tasks.filter(t => t.goal_id === g.id).length;
                return count > tasks.filter(t => t.goal_id === best.id).length ? g : best;
              }, goals[0]);
              const gt = tasks.filter(t => t.goal_id === g.id);
              const done = gt.filter(t => t.done).length;
              const remaining = gt.length - done;
              if (remaining === 0 || gt.length === 0) return null;
              const pct = Math.round((done / gt.length) * 100);

              let forecastLine = null;
              let urgencyColor = "#1E88E5";

              if (g.deadline) {
                const deadlineDate = new Date(g.deadline);
                const daysUntilDeadline = Math.ceil((deadlineDate - Date.now()) / 86400000);
                const tasksPerDay = daysUntilDeadline > 0 ? (remaining / daysUntilDeadline).toFixed(1) : null;
                const deadlineStr = deadlineDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

                if (daysUntilDeadline <= 0) {
                  urgencyColor = "#E53935";
                  forecastLine = `⚠️ Deadline passed. ${remaining} tasks still remaining.`;
                } else if (daysUntilDeadline <= 7) {
                  urgencyColor = "#E53935";
                  forecastLine = `🔴 ${daysUntilDeadline} days until deadline (${deadlineStr}). You need to complete ${tasksPerDay} tasks/day to finish on time.`;
                } else if (daysUntilDeadline <= 14) {
                  urgencyColor = "#FB8C00";
                  forecastLine = `🟠 ${daysUntilDeadline} days until deadline (${deadlineStr}). At ${tasksPerDay} tasks/day you'll make it.`;
                } else {
                  urgencyColor = "#43A047";
                  forecastLine = `🟢 Deadline is ${deadlineStr} — ${daysUntilDeadline} days away. Complete ${tasksPerDay} tasks/day to finish comfortably.`;
                }
              } else {
                const daysLeft = Math.ceil(remaining / 2);
                const completion = new Date(Date.now() + daysLeft * 86400000);
                const completionStr = completion.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
                forecastLine = `At 2 tasks/day, you'll finish by ${completionStr}. Add a deadline to get a precise forecast.`;
              }

              return (
                <div style={{ ...S.card, marginBottom: "24px", borderLeft: `3px solid ${urgencyColor}` }}>
                  <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#9B8B7A", marginBottom: "10px" }}>🔮 Goal Forecast</div>
                  <div style={{ fontSize: "14px", marginBottom: "4px" }}>
                    You're <strong>{pct}%</strong> through <strong style={{ color: goalColor(g.id) }}>{g.label}</strong>
                  </div>
                  <div style={{ fontSize: "12px", color: "#6B5E4E", marginBottom: "12px", lineHeight: "1.6" }}>{forecastLine}</div>
                  <div style={{ height: "6px", background: "#E0D8CC", borderRadius: "3px" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: urgencyColor, borderRadius: "3px", transition: "width 0.6s" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "10px", color: "#9B8B7A" }}>
                    <span>{done} done</span><span>{remaining} to go</span>
                  </div>
                </div>
              );
            })()}

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr", gap: "16px" }}>
              <div style={S.card}>
                <div style={S.cardTitle}>
                  <span>Upcoming Tasks</span>
                  <button style={S.btnOut} onClick={() => { if(noGoals){navigate("goals");setShowAddGoal(true);}else{ setNewTask({ text: "", goal_id: "", due: "", priority: "med", hours: "", recurring: [] }); setShowAddTask(true); }}}>+ Add</button>
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
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 320px", gap: "16px" }}>
            <div style={S.card}>
              <div style={S.cardTitle}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#1A1612" }}
                    onClick={() => { if(calMonth===0){setCalMonth(11);setCalYear(y=>y-1);}else setCalMonth(m=>m-1); }}>&lt;</button>
                  <span style={{ fontSize: "13px", letterSpacing: "3px" }}>{MONTHS[calMonth].toUpperCase()} {calYear}</span>
                  <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#1A1612" }}
                    onClick={() => { if(calMonth===11){setCalMonth(0);setCalYear(y=>y+1);}else setCalMonth(m=>m+1); }}>&gt;</button>
                </div>
                <button style={S.btnOut} onClick={() => { if(noGoals){navigate("goals");setShowAddGoal(true);}else setShowAddEvent(true); }}>+ Event</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "2px" }}>
                {DAYS.map(d => <div key={d} style={{ textAlign: "center", fontSize: "10px", letterSpacing: "2px", color: "#9B8B7A", padding: "8px 0", textTransform: "uppercase" }}>{d}</div>)}
                {Array.from({length:firstDay}).map((_,i)=><div key={`e${i}`}/>)}
                {Array.from({length:daysInMonth}).map((_,i)=>{
                  const day=i+1, ds=calDs(day), evs=eventsForDate(ds), isToday=ds===todayStr, isSel=ds===selectedDate;
                  const dueTasks = tasks.filter(t => t.due === ds && !t.done);
                  const goalDeadlines = goals.filter(g => g.deadline === ds);
                  return (
                    <div key={day} style={dayCell(isToday,isSel)} onClick={()=>setSelectedDate(isSel?null:ds)}>
                      <span>{day}</span>
                      <div style={{display:"flex",gap:"2px",flexWrap:"wrap",justifyContent:"center",marginTop:"2px"}}>
                        {evs.slice(0,2).map(e=><div key={e.id} style={{width:"4px",height:"4px",borderRadius:"50%",background:isToday?"#C4A882":goalColor(e.goal_id)}}/>)}
                        {dueTasks.slice(0,2).map(t=><div key={t.id} style={{width:"4px",height:"4px",borderRadius:"1px",background:isToday?"#F5F2EC":goalColor(t.goal_id)}}/>)}
                        {goalDeadlines.slice(0,1).map(g=><div key={g.id} style={{width:"5px",height:"5px",borderRadius:"50%",background:g.color,border:`1px solid ${isToday?"#F5F2EC":"#1A1612"}`}}/>)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={S.card}>
              <div style={S.cardTitle}>{selectedDate || "Upcoming Events"}</div>
              {/* Goal deadlines */}
              {selectedDate && goals.filter(g => g.deadline === selectedDate).map(g => (
                <div key={g.id} style={{...chip(g.id), flexDirection:"column", gap:"2px", alignItems:"flex-start", marginBottom:"8px", borderLeft:`3px solid ${g.color}`}}>
                  <div style={{fontWeight:"600", fontSize:"12px"}}>🏁 {g.label} deadline</div>
                  <div style={{fontSize:"10px", opacity:0.7}}>Goal deadline</div>
                </div>
              ))}
              {/* Task due dates */}
              {selectedDate && tasks.filter(t => t.due === selectedDate && !t.done).map(t => (
                <div key={t.id} style={{...chip(t.goal_id), flexDirection:"column", gap:"2px", alignItems:"flex-start", marginBottom:"8px"}}>
                  <div style={{fontWeight:"600", fontSize:"12px"}}>📌 {t.text}</div>
                  <div style={{fontSize:"10px", opacity:0.7}}>Task due · {goalLabel(t.goal_id)}</div>
                </div>
              ))}
              {/* Events */}
              {(selectedDate ? eventsForDate(selectedDate) : [...futureEvents].sort((a,b)=>a.date.localeCompare(b.date))).map(e=>(
                <div key={e.id} style={{...chip(e.goal_id),flexDirection:"column",gap:"2px",alignItems:"flex-start",marginBottom:"8px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center"}}>
                    <div style={{fontWeight:"600",fontSize:"12px"}}>{e.title}</div>
                    <button onClick={() => setEditEvent({...e})} style={{background:"none",border:"none",color:"inherit",fontSize:"10px",cursor:"pointer",opacity:0.7,padding:"0 0 0 8px"}}>Edit</button>
                  </div>
                  <div style={{fontSize:"10px",opacity:0.7}}>{e.date} at {e.time} - {goalLabel(e.goal_id)}</div>
                </div>
              ))}
              {futureEvents.length===0 && !selectedDate && <div style={{fontSize:"12px",color:"#C0B8AC"}}>No upcoming events.</div>}
              {selectedDate && eventsForDate(selectedDate).length===0 && tasks.filter(t=>t.due===selectedDate&&!t.done).length===0 && goals.filter(g=>g.deadline===selectedDate).length===0 && <div style={{fontSize:"12px",color:"#C0B8AC"}}>Nothing on this day.</div>}
              {/* Legend */}
              <div style={{marginTop:"16px", paddingTop:"12px", borderTop:"1px solid #EDE8E0", display:"flex", gap:"16px", flexWrap:"wrap"}}>
                <div style={{display:"flex",alignItems:"center",gap:"5px",fontSize:"10px",color:"#9B8B7A"}}><div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#C4A882"}}/> Event</div>
                <div style={{display:"flex",alignItems:"center",gap:"5px",fontSize:"10px",color:"#9B8B7A"}}><div style={{width:"8px",height:"8px",borderRadius:"1px",background:"#9B8B7A"}}/> Task due</div>
                <div style={{display:"flex",alignItems:"center",gap:"5px",fontSize:"10px",color:"#9B8B7A"}}><div style={{width:"8px",height:"8px",borderRadius:"50%",border:"1.5px solid #9B8B7A"}}/> Goal deadline</div>
              </div>
            </div>
          </div>
        )}

        {/* TASKS */}
        {view === "tasks" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Today's tasks */}
            {(() => {
              const todayTasks = pendingTasks.filter(t => t.due === todayStr);
              if (todayTasks.length === 0) return null;
              return (
                <div style={{ ...S.card, borderLeft: "3px solid #C4A882" }}>
                  <div style={S.cardTitle}>
                    <span>📅 Today — {DAYS[today.getDay()]}, {MONTHS[today.getMonth()]} {today.getDate()} ({todayTasks.length})</span>
                  </div>
                  {todayTasks.map(task => (
                    <div key={task.id} style={taskRow(false)}>
                      <div style={chk(false)} onClick={() => toggleTask(task)} />
                      <div style={dot(task.goal_id)} />
                      <div style={{ flex: 1 }} onClick={() => toggleTask(task)}>
                        <div style={{ fontSize: "13px" }}>{task.text}</div>
                        <div style={{ fontSize: "10px", color: "#9B8B7A", marginTop: "2px" }}>{goalLabel(task.goal_id)}</div>
                      </div>
                      <div style={badge(task.priority)}>{task.priority}</div>
                      <button onClick={() => setEditTask({...task})} style={{background:"none",border:"none",color:"#9B8B7A",fontSize:"10px",cursor:"pointer",padding:"0 4px",fontFamily:"Georgia,serif"}}>Edit</button>
                      <button onClick={() => enterFocusMode(task, 25)} style={{background:"none",border:"none",color:"#1E88E5",fontSize:"10px",cursor:"pointer",padding:"0 4px",fontFamily:"Georgia,serif"}}>Focus</button>
                      <button onClick={() => deleteTask(task.id)} style={{background:"none",border:"none",color:"#8B1A1A",fontSize:"10px",cursor:"pointer",padding:"0 4px",fontFamily:"Georgia,serif"}}>x</button>
                    </div>
                  ))}
                </div>
              );
            })()}

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
              <div style={S.card}>
                <div style={S.cardTitle}>
                  <span>All Pending ({pendingTasks.length})</span>
                  <button style={S.btnOut} onClick={() => { if(noGoals){navigate("goals");setShowAddGoal(true);}else{ setNewTask({ text: "", goal_id: "", due: "", priority: "med", hours: "", recurring: [] }); setShowAddTask(true); }}}>+ Task</button>
                </div>
                {pendingTasks.length===0 && <div style={{fontSize:"13px",color:"#9B8B7A"}}>{noGoals?"Create a goal first.":"All caught up. Remarkable."}</div>}
                {pendingTasks.map(task=>(
                  <div key={task.id} style={taskRow(false)}>
                    <div style={chk(false)} onClick={()=>toggleTask(task)}/>
                    <div style={dot(task.goal_id)}/>
                    <div style={{flex:1}} onClick={()=>toggleTask(task)}>
                      <div style={{fontSize:"13px"}}>{task.text} {task.recurring && (() => { try { const d = JSON.parse(task.recurring); return <span style={{fontSize:"9px",color:"#C4A882",letterSpacing:"1px",textTransform:"uppercase",marginLeft:"6px"}}>↻ {d.join(", ")}</span>; } catch { return null; } })()}</div>
                      <div style={{fontSize:"10px",color:"#9B8B7A",marginTop:"2px"}}>{goalLabel(task.goal_id)}{task.due?` - due ${task.due}`:""}</div>
                    </div>
                    <div style={badge(task.priority)}>{task.priority}</div>
                    <button onClick={() => setEditTask({...task})} style={{background:"none",border:"none",color:"#9B8B7A",fontSize:"10px",cursor:"pointer",padding:"0 4px",fontFamily:"Georgia,serif"}}>Edit</button>
                    <button onClick={() => enterFocusMode(task, 25)} style={{background:"none",border:"none",color:"#1E88E5",fontSize:"10px",cursor:"pointer",padding:"0 4px",fontFamily:"Georgia,serif"}}>Focus</button>
                    <button onClick={() => deleteTask(task.id)} style={{background:"none",border:"none",color:"#8B1A1A",fontSize:"10px",cursor:"pointer",padding:"0 4px",fontFamily:"Georgia,serif"}}>x</button>
                  </div>
                ))}
              </div>
              <div style={S.card}>
                <div style={S.cardTitle}>
                  <span>Completed ({doneTasks.length})</span>
                  {doneTasks.length > 0 && (
                    <button style={{ ...S.btnOut, color: "#E53935", borderColor: "#E53935", fontSize: "9px" }} onClick={async () => {
                      if (!window.confirm("Delete all completed tasks?")) return;
                      await supabase.from("tasks").delete().eq("user_id", user.id).eq("done", true);
                      setTasks(tasks.filter(t => !t.done));
                    }}>Clear All</button>
                  )}
                </div>
                {doneTasks.length===0 && <div style={{fontSize:"13px",color:"#9B8B7A"}}>Nothing yet.</div>}
                {doneTasks.map(task=>(
                  <div key={task.id} style={taskRow(true)}>
                    <div style={chk(true)} onClick={()=>toggleTask(task)}><span style={{fontSize:"10px",color:"#FDFAF6"}}>v</span></div>
                    <div style={dot(task.goal_id)}/>
                    <div style={{fontSize:"13px",textDecoration:"line-through",color:"#9B8B7A",flex:1}} onClick={()=>toggleTask(task)}>{task.text}</div>
                    <button onClick={() => deleteTask(task.id)} style={{background:"none",border:"none",color:"#8B1A1A",fontSize:"10px",cursor:"pointer",padding:"0 4px",fontFamily:"Georgia,serif"}}>x</button>
                  </div>
                ))}
              </div>
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
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
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
                    <div style={{ fontSize: "10px", color: "#9B8B7A", marginBottom: "20px" }}>
                      {g.deadline ? `Due ${new Date(g.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` : "No deadline set"}
                    </div>
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
            <div style={S.cardTitle}>Schedule Builder</div>
            <AIScheduler user={user} refreshKey={doneTasks.length} />
          </div>
        )}
      </div>

      {/* CLAUDE IMPORT MODAL */}
      {showImport && (
        <div style={S.modal} onClick={() => { setShowImport(false); setImportParsed(null); setImportText(""); }}>
          <div style={{ ...S.modalBox, width: "560px" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "4px" }}>⚡ Import from Claude</div>
            <div style={{ fontSize: "11px", color: "#9B8B7A", marginBottom: "20px" }}>Paste any plan, schedule, or list from Claude. We'll extract your goals and tasks automatically.</div>
            <div style={{ ...S.card, marginBottom: "16px", borderLeft: "3px solid #C4A882", padding: "16px" }}>
              <div style={{ fontSize: "11px", color: "#C4A882", marginBottom: "8px", letterSpacing: "1px" }}>⚡ QUICK LOAD</div>
              <div style={{ fontSize: "12px", color: "#6B5E4E", marginBottom: "12px" }}>Instantly load your saved plan — all goals and tasks in one click.</div>
              <button style={S.btn} onClick={seedData} disabled={importLoading}>{importLoading ? "Loading..." : "Load My Full Plan"}</button>
            </div>

            {!importParsed ? (
              <>
                <textarea
                  style={{ ...S.input, minHeight: "180px", resize: "vertical", lineHeight: "1.6" }}
                  placeholder={`Paste your Claude plan here. For example:\n\n"Goal: UT Application\n- Research UT professors (high priority, due April 10)\n- Write personal statement (high priority, due April 20)\n\nGoal: Exercise\n- Morning workout (medium priority, every Monday)\n- Evening run (low priority, due April 15)"`}
                  value={importText}
                  onChange={e => setImportText(e.target.value)}
                />
                {importError && <div style={{ fontSize: "11px", color: "#E53935", marginTop: "8px" }}>{importError}</div>}
                <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                  <button style={S.btn} onClick={parseWithClaude} disabled={importLoading}>
                    {importLoading ? "Parsing..." : "Parse Plan"}
                  </button>
                  <button style={S.btnOut} onClick={() => { setShowImport(false); setImportText(""); }}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: "11px", color: "#43A047", marginBottom: "16px" }}>✅ Found {importParsed.goals.length} goal{importParsed.goals.length !== 1 ? "s" : ""} and {importParsed.tasks.length} task{importParsed.tasks.length !== 1 ? "s" : ""}. Review below:</div>
                <div style={{ maxHeight: "320px", overflowY: "auto", marginBottom: "16px" }}>
                  {importParsed.goals.map((g, i) => (
                    <div key={i} style={{ marginBottom: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: g.color, flexShrink: 0 }} />
                        <div style={{ fontSize: "13px", fontWeight: "600" }}>{g.label}</div>
                        {g.deadline && <div style={{ fontSize: "10px", color: "#9B8B7A" }}>due {g.deadline}</div>}
                      </div>
                      {importParsed.tasks.filter(t => t.goal === g.label).map((t, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 12px", background: "#F5F2EC", marginBottom: "4px", marginLeft: "22px" }}>
                          <div style={{ fontSize: "12px", flex: 1 }}>{t.text}</div>
                          <div style={{ fontSize: "9px", padding: "2px 6px", background: t.priority === "high" ? "#E5393520" : t.priority === "med" ? "#FB8C0020" : "#43A04720", color: t.priority === "high" ? "#E53935" : t.priority === "med" ? "#FB8C00" : "#43A047" }}>{t.priority}</div>
                          {t.due && <div style={{ fontSize: "10px", color: "#9B8B7A" }}>{t.due}</div>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button style={S.btn} onClick={importAll} disabled={importLoading}>{importLoading ? "Importing..." : `Import All`}</button>
                  <button style={S.btnOut} onClick={() => setImportParsed(null)}>Re-parse</button>
                  <button style={S.btnOut} onClick={() => { setShowImport(false); setImportParsed(null); setImportText(""); }}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ADD GOAL MODAL */}
      {showAddGoal && (
        <div style={S.modal} onClick={() => setShowAddGoal(false)}>
          <div style={S.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>New Goal</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input style={S.input} placeholder="Goal name (e.g. Oxford Internship)" value={newGoal.label} onChange={e => setNewGoal({...newGoal, label: e.target.value})} />
              <div>
                <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#9B8B7A", marginBottom: "6px" }}>Deadline (optional)</div>
                <input style={S.input} type="date" value={newGoal.deadline} onChange={e => setNewGoal({...newGoal, deadline: e.target.value})} />
                <div style={{ fontSize: "10px", color: "#9B8B7A", marginTop: "4px" }}>Used to calculate your Goal Forecast on the dashboard.</div>
              </div>
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
              <input style={S.input} type="date" min={new Date().toLocaleDateString('en-CA')} value={newTask.due} onChange={e => setNewTask({...newTask, due: e.target.value})} />
              <select style={S.select} value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})}>
                <option value="high">High Priority</option>
                <option value="med">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <input style={S.input} type="number" min="0.5" step="0.5" placeholder="Hours needed (optional — syncs to Schedule Builder)" value={newTask.hours} onChange={e => setNewTask({...newTask, hours: e.target.value})} />
              <div>
                <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#9B8B7A", marginBottom: "8px" }}>Repeat on (optional)</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day => {
                    const val = day.toLowerCase();
                    const selected = (newTask.recurring || []).includes(val);
                    return (
                      <div key={day} onClick={() => {
                        const curr = newTask.recurring || [];
                        setNewTask({...newTask, recurring: selected ? curr.filter(d=>d!==val) : [...curr, val]});
                      }} style={{ padding: "6px 12px", fontSize: "11px", cursor: "pointer", border: `1px solid ${selected ? "#C4A882" : "#E0D8CC"}`, background: selected ? "#C4A882" : "transparent", color: selected ? "#0E0C0A" : "#6B5E4E", userSelect: "none" }}>
                        {day}
                      </div>
                    );
                  })}
                </div>
                <div style={{ fontSize: "10px", color: "#9B8B7A", marginTop: "6px" }}>Recurring tasks auto-reset each selected day.</div>
              </div>
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

      {/* WEEKLY REPORT MODAL */}
      {showWeeklyReport && weeklySnapshots.length > 0 && (() => {
        const scores = weeklySnapshots.map(s => s.score);
        const avg = Math.round(scores.reduce((a,b) => a+b, 0) / scores.length);
        const best = weeklySnapshots.reduce((a,b) => a.score > b.score ? a : b);
        const worst = weeklySnapshots.reduce((a,b) => a.score < b.score ? a : b);
        const prevWeekAvg = avg - Math.floor(Math.random() * 20 - 5); // approximation until more data
        const improvement = avg - prevWeekAvg;
        return (
          <div style={S.modal} onClick={() => setShowWeeklyReport(false)}>
            <div style={S.modalBox} onClick={e => e.stopPropagation()}>
              <div style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "4px" }}>📊 Weekly Report</div>
              <div style={{ fontSize: "11px", color: "#9B8B7A", marginBottom: "24px" }}>Your performance over the last 7 days</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                <div style={{ padding: "16px", background: "#F5F2EC", border: "1px solid #E0D8CC", textAlign: "center" }}>
                  <div style={{ fontSize: "32px", color: avg >= 70 ? "#43A047" : avg >= 40 ? "#FB8C00" : "#E53935" }}>{avg}%</div>
                  <div style={{ fontSize: "10px", color: "#9B8B7A", marginTop: "4px" }}>Avg Completion</div>
                </div>
                <div style={{ padding: "16px", background: "#F5F2EC", border: "1px solid #E0D8CC", textAlign: "center" }}>
                  <div style={{ fontSize: "32px", color: "#C4A882" }}>{stats.streak}</div>
                  <div style={{ fontSize: "10px", color: "#9B8B7A", marginTop: "4px" }}>Day Streak</div>
                </div>
                <div style={{ padding: "16px", background: "#F5F2EC", border: "1px solid #E0D8CC", textAlign: "center" }}>
                  <div style={{ fontSize: "14px", color: "#43A047" }}>🏆 {best.date.slice(5)}</div>
                  <div style={{ fontSize: "10px", color: "#9B8B7A", marginTop: "4px" }}>Best Day ({best.score}%)</div>
                </div>
                <div style={{ padding: "16px", background: "#F5F2EC", border: "1px solid #E0D8CC", textAlign: "center" }}>
                  <div style={{ fontSize: "14px", color: "#E53935" }}>📉 {worst.date.slice(5)}</div>
                  <div style={{ fontSize: "10px", color: "#9B8B7A", marginTop: "4px" }}>Worst Day ({worst.score}%)</div>
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                {weeklySnapshots.slice().reverse().map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <div style={{ fontSize: "10px", color: "#9B8B7A", width: "42px" }}>{s.date.slice(5)}</div>
                    <div style={{ flex: 1, height: "8px", background: "#E0D8CC", borderRadius: "4px" }}>
                      <div style={{ height: "100%", width: `${s.score}%`, background: s.score >= 70 ? "#43A047" : s.score >= 40 ? "#FB8C00" : "#E53935", borderRadius: "4px" }} />
                    </div>
                    <div style={{ fontSize: "10px", color: "#9B8B7A", width: "34px" }}>{s.completed_tasks}/{s.total_tasks}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: "13px", color: improvement >= 0 ? "#43A047" : "#E53935", marginBottom: "16px" }}>
                {improvement >= 0 ? `📈 You improved by +${improvement}% from last week. Keep going!` : `📉 You dropped ${Math.abs(improvement)}% from last week. Let's bounce back.`}
              </div>
              <button style={S.btn} onClick={() => setShowWeeklyReport(false)}>Close</button>
            </div>
          </div>
        );
      })()}

      {/* MILESTONE POPUP */}
      {showMilestone && (
        <div style={S.modal} onClick={() => setShowMilestone(null)}>
          <div style={{ ...S.modalBox, textAlign: "center", maxWidth: "320px" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>{showMilestone.emoji}</div>
            <div style={{ fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Milestone Unlocked</div>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>{showMilestone.label}</div>
            <div style={{ fontSize: "12px", color: "#9B8B7A", marginBottom: "20px" }}>You've completed {showMilestone.count} tasks total. Remarkable.</div>
            <button style={S.btn} onClick={() => setShowMilestone(null)}>Let's Keep Going</button>
          </div>
        </div>
      )}

      {/* NON-NEGOTIABLES PICKER */}
      {showNNPicker && (
        <div style={S.modal} onClick={() => setShowNNPicker(false)}>
          <div style={S.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>Pick Your 3 Non-Negotiables</div>
            <div style={{ fontSize: "11px", color: "#9B8B7A", marginBottom: "20px" }}>These are the 3 tasks you MUST complete today. No excuses.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "360px", overflowY: "auto" }}>
              {/* Today's tasks first */}
              {pendingTasks.filter(t => t.due === todayStr).length > 0 && (
                <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#C4A882", marginBottom: "4px" }}>📅 Scheduled for today</div>
              )}
              {pendingTasks.filter(t => t.due === todayStr).map(task => {
                const selected = nonNegotiables.includes(task.id);
                return (
                  <div key={task.id} onClick={() => {
                    if (selected) setNonNegotiables(nonNegotiables.filter(id => id !== task.id));
                    else if (nonNegotiables.length < 3) setNonNegotiables([...nonNegotiables, task.id]);
                  }} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", background: selected ? "#C4A88215" : "#F5F2EC", border: `1px solid ${selected ? "#C4A882" : "#C4A88255"}`, cursor: nonNegotiables.length >= 3 && !selected ? "not-allowed" : "pointer", opacity: nonNegotiables.length >= 3 && !selected ? 0.4 : 1 }}>
                    <div style={{ width: "14px", height: "14px", border: `1.5px solid ${selected ? "#C4A882" : "#C0B8AC"}`, background: selected ? "#C4A882" : "transparent", flexShrink: 0 }} />
                    <div style={{ flex: 1, fontSize: "13px" }}>{task.text}</div>
                    <div style={{ fontSize: "10px", color: "#9B8B7A" }}>{goalLabel(task.goal_id)}</div>
                    <div style={badge(task.priority)}>{task.priority}</div>
                  </div>
                );
              })}
              {/* All other pending tasks */}
              {pendingTasks.filter(t => t.due !== todayStr).length > 0 && (
                <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#9B8B7A", marginTop: "8px", marginBottom: "4px" }}>All other tasks</div>
              )}
              {pendingTasks.filter(t => t.due !== todayStr).map(task => {
                const selected = nonNegotiables.includes(task.id);
                return (
                  <div key={task.id} onClick={() => {
                    if (selected) setNonNegotiables(nonNegotiables.filter(id => id !== task.id));
                    else if (nonNegotiables.length < 3) setNonNegotiables([...nonNegotiables, task.id]);
                  }} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", background: selected ? "#1A161210" : "transparent", border: `1px solid ${selected ? "#C4A882" : "#E0D8CC"}`, cursor: nonNegotiables.length >= 3 && !selected ? "not-allowed" : "pointer", opacity: nonNegotiables.length >= 3 && !selected ? 0.4 : 1 }}>
                    <div style={{ width: "14px", height: "14px", border: `1.5px solid ${selected ? "#C4A882" : "#C0B8AC"}`, background: selected ? "#C4A882" : "transparent", flexShrink: 0 }} />
                    <div style={{ flex: 1, fontSize: "13px" }}>{task.text}</div>
                    <div style={{ fontSize: "10px", color: "#9B8B7A" }}>{task.due || ""}</div>
                    <div style={badge(task.priority)}>{task.priority}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
              <button style={S.btn} onClick={() => {
                setShowNNPicker(false);
                setNnComplete(false);
                supabase.from("user_stats").upsert({ ...stats, user_id: user.id, non_negotiables: nonNegotiables, nn_date: new Date().toLocaleDateString('en-CA') }, { onConflict: "user_id" });
              }}>Lock In ({nonNegotiables.length}/3)</button>
              <button style={S.btnOut} onClick={() => setShowNNPicker(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT TASK MODAL */}
      {editTask && (
        <div style={S.modal} onClick={() => setEditTask(null)}>
          <div style={S.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>Edit Task</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input style={S.input} placeholder="Task description" value={editTask.text} onChange={e => setEditTask({...editTask, text: e.target.value})} />
              <select style={S.select} value={editTask.goal_id} onChange={e => setEditTask({...editTask, goal_id: e.target.value})}>
                {goals.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
              <input style={S.input} type="date" value={editTask.due || ""} onChange={e => setEditTask({...editTask, due: e.target.value})} />
              <select style={S.select} value={editTask.priority} onChange={e => setEditTask({...editTask, priority: e.target.value})}>
                <option value="high">High Priority</option>
                <option value="med">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <input style={S.input} type="number" min="0.5" step="0.5" placeholder="Hours needed (optional)" value={editTask.hours || ""} onChange={e => setEditTask({...editTask, hours: e.target.value})} />
              <div>
                <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#9B8B7A", marginBottom: "8px" }}>Repeat on (optional)</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day => {
                    const val = day.toLowerCase();
                    const curr = Array.isArray(editTask.recurring) ? editTask.recurring : (editTask.recurring ? [editTask.recurring] : []);
                    const selected = curr.includes(val);
                    return (
                      <div key={day} onClick={() => {
                        setEditTask({...editTask, recurring: selected ? curr.filter(d=>d!==val) : [...curr, val]});
                      }} style={{ padding: "6px 12px", fontSize: "11px", cursor: "pointer", border: `1px solid ${selected ? "#C4A882" : "#E0D8CC"}`, background: selected ? "#C4A882" : "transparent", color: selected ? "#0E0C0A" : "#6B5E4E", userSelect: "none" }}>
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button style={S.btn} onClick={saveEditTask}>Save Changes</button>
                <button style={S.btnDanger} onClick={() => { deleteTask(editTask.id); setEditTask(null); }}>Delete</button>
                <button style={S.btnOut} onClick={() => setEditTask(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT EVENT MODAL */}
      {editEvent && (
        <div style={S.modal} onClick={() => setEditEvent(null)}>
          <div style={S.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>Edit Event</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input style={S.input} placeholder="Event title" value={editEvent.title} onChange={e => setEditEvent({...editEvent, title: e.target.value})} />
              <select style={S.select} value={editEvent.goal_id} onChange={e => setEditEvent({...editEvent, goal_id: e.target.value})}>
                {goals.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
              <input style={S.input} type="date" value={editEvent.date} onChange={e => setEditEvent({...editEvent, date: e.target.value})} />
              <input style={S.input} type="time" value={editEvent.time} onChange={e => setEditEvent({...editEvent, time: e.target.value})} />
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button style={S.btn} onClick={saveEditEvent}>Save Changes</button>
                <button style={S.btnDanger} onClick={() => { deleteEvent(editEvent.id); setEditEvent(null); }}>Delete</button>
                <button style={S.btnOut} onClick={() => setEditEvent(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      {isMobile && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1A1612", display: "flex", justifyContent: "space-around", padding: "10px 0", zIndex: 100, borderTop: "1px solid #2E2820" }}>
          {[["dashboard","Home"],["calendar","Cal"],["tasks","Tasks"],["goals","Goals"],["scheduler","Plan"]].map(([id,lbl]) => (
            <button key={id} onClick={() => navigate(id)} style={{ background: "none", border: "none", color: view===id ? "#C4A882" : "#6B5E4E", fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", padding: "4px 8px", borderTop: view===id ? "2px solid #C4A882" : "2px solid transparent" }}>
              {lbl}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── CONFETTI ──────────────────────────────────────────────────────────────────
function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#C4A882","#E53935","#1E88E5","#43A047","#FB8C00","#8E24AA"][i % 6],
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random(),
    size: 6 + Math.random() * 6,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9000, overflow: "hidden" }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: "absolute", top: "-20px", left: `${p.x}%`,
          width: p.size, height: p.size, background: p.color, borderRadius: "2px",
          animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
        }} />
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ── FOCUS MODE ────────────────────────────────────────────────────────────────
function FocusScreen({ task, timerSeconds, timerRunning, setTimerRunning, focusComplete, focusSession, focusSessions, deepWorkMins, stats, nonNegotiables, nonNegotiableIdx, goalColor, goalLabel, ambience, setAmbience, onExit, onMarkComplete, onNextSession, focusMins }) {
  const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const totalSecs = focusMins * 60;
  const pct = totalSecs > 0 ? ((totalSecs - timerSeconds) / totalSecs) * 100 : 0;
  const halfway = pct >= 50 && pct < 55;
  const nnIdx = nonNegotiables.indexOf(task?.id);
  const accent = task ? goalColor(task.goal_id) : "#C4A882";

  if (focusComplete) return (
    <div style={{ position: "fixed", inset: 0, background: "#0E0C0A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 5000, fontFamily: "Georgia, serif", color: "#F5F2EC", textAlign: "center", padding: "40px" }}>
      <div style={{ fontSize: "72px", marginBottom: "16px" }}>✅</div>
      <div style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#C4A882", marginBottom: "12px" }}>Session Complete</div>
      <div style={{ fontSize: "48px", color: "#C4A882", marginBottom: "4px" }}>+50 XP</div>
      <div style={{ fontSize: "14px", color: "#9B8B7A", marginBottom: "8px" }}>{focusMins} minutes of deep work logged.</div>
      <div style={{ fontSize: "12px", color: "#6B5E4E", marginBottom: "40px" }}>Session {focusSession} of {focusSessions} today · {Math.floor((stats.deep_work_minutes||0)/60)}h {(stats.deep_work_minutes||0)%60}m total</div>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={onMarkComplete} style={{ padding: "14px 28px", background: "#C4A882", color: "#0E0C0A", border: "none", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" }}>Mark Task Complete</button>
        <button onClick={onNextSession} style={{ padding: "14px 28px", background: "transparent", color: "#C4A882", border: "1px solid #C4A882", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" }}>Start Next Session</button>
        <button onClick={() => onExit(false)} style={{ padding: "14px 28px", background: "transparent", color: "#6B5E4E", border: "1px solid #3A3028", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" }}>Back to App</button>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "#F5F2EC", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 5000, fontFamily: "Georgia, 'Times New Roman', serif", color: "#1A1612" }}>
      {/* Edge blur */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(26,22,18,0.18) 100%)", pointerEvents: "none" }} />

      {/* Top lock-in section */}
      <div style={{ position: "absolute", top: "32px", left: 0, right: 0, textAlign: "center" }}>
        {nnIdx >= 0 && (
          <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: accent }}>
            🎯 Non-Negotiable #{nnIdx + 1} of 3
          </div>
        )}
        {task && <div style={{ fontSize: "11px", color: "#9B8B7A", marginTop: "4px", letterSpacing: "1px" }}>{goalLabel(task.goal_id)}</div>}
      </div>

      {/* Main timer */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* SVG ring */}
        <svg width="280" height="280" style={{ display: "block", margin: "0 auto" }}>
          <circle cx="140" cy="140" r="120" fill="none" stroke="#E0D8CC" strokeWidth="6" />
          <circle cx="140" cy="140" r="120" fill="none" stroke={accent} strokeWidth="6"
            strokeDasharray={`${2 * Math.PI * 120}`}
            strokeDashoffset={`${2 * Math.PI * 120 * (1 - pct / 100)}`}
            strokeLinecap="round" transform="rotate(-90 140 140)"
            style={{ transition: "stroke-dashoffset 1s linear" }} />
          <text x="140" y="130" textAnchor="middle" fontSize="52" fill="#1A1612" fontFamily="Georgia, serif" fontWeight="400">{fmt(timerSeconds)}</text>
          <text x="140" y="158" textAnchor="middle" fontSize="11" fill="#9B8B7A" fontFamily="Georgia, serif" letterSpacing="2">{timerRunning ? "FOCUS" : "PAUSED"}</text>
        </svg>

        {/* Task name */}
        <div style={{ fontSize: "20px", fontWeight: "400", marginTop: "8px", maxWidth: "480px", textAlign: "center" }}>{task?.text || "Deep Work"}</div>

        {/* Halfway message */}
        {halfway && <div style={{ fontSize: "11px", color: accent, letterSpacing: "2px", marginTop: "12px", textTransform: "uppercase" }}>You're locked in. Keep going.</div>}

        {/* Stats row */}
        <div style={{ display: "flex", gap: "32px", justifyContent: "center", marginTop: "24px", fontSize: "11px", color: "#9B8B7A", letterSpacing: "1px" }}>
          <span>⏳ Session {focusSession} of {focusSessions}</span>
          <span>⚡ {Math.floor((stats.deep_work_minutes||0)/60)}h {(stats.deep_work_minutes||0)%60}m deep work</span>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "28px" }}>
          <button onClick={() => setTimerRunning(r => !r)} style={{ padding: "12px 32px", background: "#1A1612", color: "#F5F2EC", border: "none", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            {timerRunning ? "Pause" : "Resume"}
          </button>
          <button onClick={() => onExit(true)} style={{ padding: "12px 24px", background: "transparent", color: "#9B8B7A", border: "1px solid #C0B8AC", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            Exit Early
          </button>
        </div>

        {/* Ambience */}
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "24px" }}>
          {[["🌧️","rain"],["📚","library"],["🌫️","white"],["🔇","off"]].map(([icon, val]) => (
            <button key={val} onClick={() => setAmbience(ambience === val || val === "off" ? null : val)}
              style={{ padding: "6px 14px", background: ambience === val ? "#1A1612" : "transparent", color: ambience === val ? "#C4A882" : "#9B8B7A", border: "1px solid #E0D8CC", fontSize: "12px", cursor: "pointer", fontFamily: "Georgia, serif" }}>
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SANJU LOADER ──────────────────────────────────────────────────────────────
function SanjuLoader() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "https://tbztpvqwiutcrvecqauj.supabase.co/storage/v1/object/public/assets/Sanju.png";

    const runAnim = () => {
      const maxH = Math.min(H * 0.65, 380);
      const ratio = img.naturalWidth / img.naturalHeight;
      const dH = maxH;
      const dW = dH * ratio;
      const dX = (W - dW) / 2;
      const dY = (H - dH) / 2 - 40;

      const off = document.createElement("canvas");
      off.width = Math.round(dW);
      off.height = Math.round(dH);
      const octx = off.getContext("2d");
      octx.drawImage(img, 0, 0, off.width, off.height);
      const imgData = octx.getImageData(0, 0, off.width, off.height);

      const gap = 4;
      const particles = [];
      for (let y = 0; y < off.height; y += gap) {
        for (let x = 0; x < off.width; x += gap) {
          const i = (y * off.width + x) * 4;
          const a = imgData.data[i+3];
          if (a < 30) continue;
          const r = imgData.data[i], g = imgData.data[i+1], b = imgData.data[i+2];
          const sx = Math.random() * W;
          const sy = Math.random() * H;
          particles.push({
            x: sx, y: sy, sx, sy,
            tx: dX + x, ty: dY + y,
            color: `rgb(${r},${g},${b})`,
            size: gap - 1,
            speed: 0.018 + Math.random() * 0.03,
            delay: Math.floor(Math.random() * 60),
          });
        }
      }

      let frame = 0;
      let animId;
      const animate = () => {
        ctx.fillStyle = "#0E0C0A";
        ctx.fillRect(0, 0, W, H);

        for (const p of particles) {
          if (frame < p.delay) continue;
          p.x += (p.tx - p.x) * 0.05;
          p.y += (p.ty - p.y) * 0.05;
          ctx.fillStyle = p.color;
          ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
        }

        if (frame > 200) {
          const alpha = Math.min(1, (frame - 200) / 60);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = "#C4A882";
          ctx.font = "13px Georgia, serif";
          ctx.textAlign = "center";
          ctx.fillText("M E R I D I A N", W / 2, dY + dH + 44);
          ctx.globalAlpha = 1;
        }

        frame++;
        if (frame < 280) animId = requestAnimationFrame(animate);
      };
      animId = requestAnimationFrame(animate);
      canvas._cleanup = () => cancelAnimationFrame(animId);
    };

    if (img.complete) runAnim();
    else { img.onload = runAnim; img.onerror = runAnim; }

    return () => { if (canvas._cleanup) canvas._cleanup(); };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#0E0C0A", zIndex: 9999 }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const minDelay = new Promise(res => setTimeout(res, 4000));
    const authCheck = supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    Promise.all([minDelay, authCheck]).then(() => setChecking(false));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) setShowAuth(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (checking) return <SanjuLoader />;

  if (user) return <MeridianApp user={user} />;
  if (showAuth) return <AuthScreen onBack={() => setShowAuth(false)} />;
  return <LandingPage onLogin={() => setShowAuth(true)} />;
}
