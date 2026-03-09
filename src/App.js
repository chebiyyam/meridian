import { useState, useEffect, useRef } from "react";
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
function AIScheduler({ user }) {
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
  }, [user.id]);

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

  const navigate = (v) => {
    setView(v);
    window.location.hash = v;
  };
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
  const [newTask,  setNewTask]  = useState({ text: "", goal_id: "", due: "", priority: "med", hours: "", recurring: [] });
  const [newEvent, setNewEvent] = useState({ title: "", goal_id: "", date: "", time: "" });
  const [newGoal,  setNewGoal]  = useState({ label: "", color: "#8B1A1A" });
  const [editEvent, setEditEvent] = useState(null);
  const [editTask, setEditTask] = useState(null);
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
    setEvents(e || []);

    // Auto-reset recurring tasks that were completed before today
    const allTasks = t || [];
    const todayDay = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase(); // "mon","tue" etc
    const tasksToReset = allTasks.filter(task => {
      if (!task.recurring || !task.done) return false;
      try {
        const days = JSON.parse(task.recurring);
        return Array.isArray(days) && days.includes(todayDay);
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
      setNewTask({ text: "", goal_id: goals[0]?.id || "", due: "", priority: "med", hours: "", recurring: [] });
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
          </nav>
          <div style={{ padding: "16px 28px", borderTop: "1px solid #2E2820" }}>
            <div style={{ fontSize: "10px", color: "#6B5E4E", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
            <div style={{ fontSize: "10px", color: "#6B5E4E", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Done: {completionRate}%</div>
            <div style={{ height: "3px", background: "#2E2820", marginBottom: "14px" }}><div style={fill(completionRate, "#C4A882")} /></div>
            <button onClick={signOut} style={{ background: "none", border: "none", color: "#6B5E4E", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", padding: 0, fontFamily: "Georgia, serif" }}>Sign Out</button>
            <div style={{ fontSize: "9px", color: "#3A3028", marginTop: "12px", letterSpacing: "1px" }}>© 2026 Chebiyyam</div>
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
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr", gap: "16px" }}>
              <div style={S.card}>
                <div style={S.cardTitle}>
                  <span>Upcoming Tasks</span>
                  <button style={S.btnOut} onClick={() => { if(noGoals){navigate("goals");setShowAddGoal(true);}else{ setNewTask({ text: "", goal_id: goals[0]?.id || "", due: "", priority: "med", hours: "", recurring: [] }); setShowAddTask(true); }}}>+ Add</button>
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
              <div style={S.cardTitle}>{selectedDate || "Upcoming Events"}</div>
              {(selectedDate ? eventsForDate(selectedDate) : [...futureEvents].sort((a,b)=>a.date.localeCompare(b.date))).map(e=>(
                <div key={e.id} style={{...chip(e.goal_id),flexDirection:"column",gap:"2px",alignItems:"flex-start",marginBottom:"8px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center"}}>
                    <div style={{fontWeight:"600",fontSize:"12px"}}>{e.title}</div>
                    <button onClick={() => setEditEvent({...e})} style={{background:"none",border:"none",color:"inherit",fontSize:"10px",cursor:"pointer",opacity:0.7,padding:"0 0 0 8px"}}>Edit</button>
                  </div>
                  <div style={{fontSize:"10px",opacity:0.7}}>{e.date} at {e.time} - {goalLabel(e.goal_id)}</div>
                </div>
              ))}
              {futureEvents.length===0 && <div style={{fontSize:"12px",color:"#C0B8AC"}}>No upcoming events.</div>}
              {selectedDate && eventsForDate(selectedDate).length===0 && <div style={{fontSize:"12px",color:"#C0B8AC"}}>No events on this day</div>}
            </div>
          </div>
        )}

        {/* TASKS */}
        {view === "tasks" && (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
            <div style={S.card}>
              <div style={S.cardTitle}>
                <span>Pending ({pendingTasks.length})</span>
                <button style={S.btnOut} onClick={() => { if(noGoals){navigate("goals");setShowAddGoal(true);}else{ setNewTask({ text: "", goal_id: goals[0]?.id || "", due: "", priority: "med", hours: "", recurring: [] }); setShowAddTask(true); }}}>+ Task</button>
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
                  <button onClick={() => deleteTask(task.id)} style={{background:"none",border:"none",color:"#8B1A1A",fontSize:"10px",cursor:"pointer",padding:"0 4px",fontFamily:"Georgia,serif"}}>x</button>
                </div>
              ))}
            </div>
            <div style={S.card}>
              <div style={S.cardTitle}>Completed ({doneTasks.length})</div>
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
            <div style={S.cardTitle}>Schedule Builder</div>
            <AIScheduler user={user} />
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

// ── SANJU LOADER ─────────────────────────────────────────────────────────────
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
    img.src = "https://tbztpvqwiutcrvecqauj.supabase.co/storage/v1/object/public/assets/sanju.jpg";

    img.onload = () => {
      // Figure out display size (centered, max 340px tall)
      const maxH = Math.min(H * 0.65, 340);
      const ratio = img.width / img.height;
      const dH = maxH;
      const dW = dH * ratio;
      const dX = (W - dW) / 2;
      const dY = (H - dH) / 2 - 30;

      // Draw image to offscreen canvas to sample pixels
      const off = document.createElement("canvas");
      off.width = Math.round(dW);
      off.height = Math.round(dH);
      const octx = off.getContext("2d");
      octx.drawImage(img, 0, 0, off.width, off.height);
      const imgData = octx.getImageData(0, 0, off.width, off.height);

      // Sample every Nth pixel as a particle
      const gap = 5;
      const particles = [];
      for (let y = 0; y < off.height; y += gap) {
        for (let x = 0; x < off.width; x += gap) {
          const i = (y * off.width + x) * 4;
          const r = imgData.data[i];
          const g = imgData.data[i+1];
          const b = imgData.data[i+2];
          const a = imgData.data[i+3];
          if (a < 30) continue;
          // skip very dark background pixels
          if (r + g + b < 30) continue;
          particles.push({
            // start: random position scattered around screen
            x: Math.random() * W,
            y: Math.random() * H,
            // target: correct pixel position
            tx: dX + x,
            ty: dY + y,
            color: `rgb(${r},${g},${b})`,
            size: gap - 1,
            speed: 0.025 + Math.random() * 0.035,
            delay: Math.random() * 40,
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
          p.x += (p.tx - p.x) * p.speed;
          p.y += (p.ty - p.y) * p.speed;
          ctx.fillStyle = p.color;
          ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
        }

        // MERIDIAN text fades in after frame 100
        if (frame > 100) {
          const alpha = Math.min(1, (frame - 100) / 50);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = "#C4A882";
          ctx.font = "bold 13px Georgia, serif";
          ctx.textAlign = "center";
          ctx.letterSpacing = "10px";
          ctx.fillText("M E R I D I A N", W / 2, dY + dH + 42);
          ctx.globalAlpha = 1;
        }

        frame++;
        if (frame < 220) {
          animId = requestAnimationFrame(animate);
        }
      };

      animId = requestAnimationFrame(animate);
      canvas._cleanup = () => cancelAnimationFrame(animId);
    };

    img.onerror = () => {
      // fallback if image fails
      ctx.fillStyle = "#0E0C0A";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#C4A882";
      ctx.font = "13px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("MERIDIAN", W/2, H/2);
    };

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
    const minDelay = new Promise(res => setTimeout(res, 3500));
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
