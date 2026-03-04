import { useState, useEffect } from "react";

const GOALS = [
  { id: "oxford", label: "Oxford Internship", color: "#8B1A1A", icon: "◈" },
  { id: "tamu", label: "TAMU Research", color: "#1A3A5C", icon: "◉" },
  { id: "clubs", label: "Clubs & EC", color: "#2C4A2E", icon: "◆" },
  { id: "academics", label: "Academics", color: "#4A3520", icon: "◇" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

const initialTasks = [
  { id: 1, text: "Submit Oxford progress report", goal: "oxford", due: "2026-03-05", done: false, priority: "high" },
  { id: 2, text: "TAMU lab meeting prep", goal: "tamu", due: "2026-03-04", done: false, priority: "high" },
  { id: 3, text: "Review protein folding paper", goal: "tamu", due: "2026-03-06", done: true, priority: "med" },
  { id: 4, text: "Finance club treasurer report", goal: "clubs", due: "2026-03-07", done: false, priority: "med" },
  { id: 5, text: "ECON 301 problem set", goal: "academics", due: "2026-03-05", done: false, priority: "high" },
  { id: 6, text: "Email Oxford supervisor", goal: "oxford", due: "2026-03-03", done: true, priority: "low" },
];

const initialEvents = [
  { id: 1, title: "TAMU Lab Meeting", date: "2026-03-04", time: "10:00", goal: "tamu" },
  { id: 2, title: "Oxford Check-in Call", date: "2026-03-06", time: "14:00", goal: "oxford" },
  { id: 3, title: "Finance Club", date: "2026-03-07", time: "18:00", goal: "clubs" },
  { id: 4, title: "ECON 301 Midterm", date: "2026-03-12", time: "09:00", goal: "academics" },
  { id: 5, title: "Research Presentation", date: "2026-03-18", time: "13:00", goal: "tamu" },
  { id: 6, title: "Oxford Deadline", date: "2026-03-20", time: "23:59", goal: "oxford" },
];

const streakData = {
  oxford: { current: 12, best: 18 },
  tamu: { current: 8, best: 14 },
  clubs: { current: 5, best: 9 },
  academics: { current: 21, best: 21 },
};

export default function Meridian() {
  const [view, setView] = useState("dashboard");
  const [tasks, setTasks] = useState(initialTasks);
  const [events, setEvents] = useState(initialEvents);
  const [today] = useState(new Date(2026, 2, 3));
  const [calMonth, setCalMonth] = useState(2); // March
  const [calYear, setCalYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newTask, setNewTask] = useState({ text: "", goal: "oxford", due: "", priority: "med" });
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", goal: "oxford" });
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [quote] = useState("Clarity is the prerequisite of excellence.");

  const todayStr = `${calYear}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = () => {
    if (!newTask.text.trim()) return;
    setTasks([...tasks, { ...newTask, id: Date.now(), done: false }]);
    setNewTask({ text: "", goal: "oxford", due: "", priority: "med" });
    setShowAddTask(false);
  };

  const addEvent = () => {
    if (!newEvent.title.trim() || !newEvent.date) return;
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setNewEvent({ title: "", date: "", time: "", goal: "oxford" });
    setShowAddEvent(false);
  };

  const pendingTasks = tasks.filter(t => !t.done);
  const doneTasks = tasks.filter(t => t.done);
  const completionRate = Math.round((doneTasks.length / tasks.length) * 100);

  const eventsForDate = (dateStr) => events.filter(e => e.date === dateStr);
  const todayEvents = eventsForDate(todayStr);
  const upcomingTasks = pendingTasks
    .filter(t => t.due)
    .sort((a, b) => new Date(a.due) - new Date(b.due))
    .slice(0, 5);

  const goalColor = (id) => GOALS.find(g => g.id === id)?.color || "#555";
  const goalLabel = (id) => GOALS.find(g => g.id === id)?.label || id;

  const calDateStr = (day) => {
    return `${calYear}-${String(calMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
  };

  const styles = {
    app: {
      minHeight: "100vh",
      background: "#F5F2EC",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#1A1612",
    },
    sidebar: {
      position: "fixed",
      left: 0, top: 0, bottom: 0,
      width: "220px",
      background: "#1A1612",
      display: "flex",
      flexDirection: "column",
      padding: "0",
      zIndex: 100,
    },
    logo: {
      padding: "32px 28px 24px",
      borderBottom: "1px solid #2E2820",
    },
    logoText: {
      fontSize: "22px",
      fontWeight: "400",
      color: "#F5F2EC",
      letterSpacing: "4px",
      textTransform: "uppercase",
    },
    logoSub: {
      fontSize: "10px",
      color: "#6B5E4E",
      letterSpacing: "2px",
      marginTop: "4px",
      textTransform: "uppercase",
    },
    nav: {
      padding: "20px 0",
      flex: 1,
    },
    navItem: (active) => ({
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 28px",
      color: active ? "#F5F2EC" : "#6B5E4E",
      background: active ? "#2E2820" : "transparent",
      cursor: "pointer",
      fontSize: "12px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      border: "none",
      width: "100%",
      textAlign: "left",
      transition: "all 0.2s",
      borderLeft: active ? "2px solid #C4A882" : "2px solid transparent",
    }),
    main: {
      marginLeft: "220px",
      padding: "40px 48px",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "40px",
    },
    pageTitle: {
      fontSize: "32px",
      fontWeight: "400",
      letterSpacing: "1px",
      color: "#1A1612",
    },
    dateBadge: {
      fontSize: "12px",
      color: "#9B8B7A",
      letterSpacing: "2px",
      textTransform: "uppercase",
      marginTop: "6px",
    },
    quoteBox: {
      padding: "12px 20px",
      background: "#1A1612",
      color: "#C4A882",
      fontSize: "11px",
      letterSpacing: "2px",
      fontStyle: "italic",
      maxWidth: "360px",
      textAlign: "right",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "20px",
      marginBottom: "24px",
    },
    grid2: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr",
      gap: "20px",
    },
    card: {
      background: "#FDFAF6",
      border: "1px solid #E0D8CC",
      padding: "24px",
    },
    cardTitle: {
      fontSize: "10px",
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: "#9B8B7A",
      marginBottom: "16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    statNum: {
      fontSize: "48px",
      fontWeight: "400",
      color: "#1A1612",
      lineHeight: 1,
    },
    statLabel: {
      fontSize: "11px",
      color: "#9B8B7A",
      marginTop: "8px",
      letterSpacing: "1px",
    },
    progressBar: (pct, color) => ({
      height: "3px",
      background: "#E0D8CC",
      marginTop: "12px",
      position: "relative",
    }),
    progressFill: (pct, color) => ({
      height: "3px",
      width: `${pct}%`,
      background: color || "#1A1612",
      transition: "width 0.6s ease",
    }),
    taskItem: (done, priority) => ({
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      padding: "12px 0",
      borderBottom: "1px solid #EDE8E0",
      opacity: done ? 0.5 : 1,
      cursor: "pointer",
    }),
    checkbox: (done) => ({
      width: "16px",
      height: "16px",
      border: `1.5px solid ${done ? "#C4A882" : "#C0B8AC"}`,
      background: done ? "#C4A882" : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginTop: "2px",
      cursor: "pointer",
    }),
    taskText: (done) => ({
      fontSize: "13px",
      textDecoration: done ? "line-through" : "none",
      color: done ? "#9B8B7A" : "#1A1612",
      flex: 1,
      lineHeight: "1.5",
    }),
    goalDot: (goalId) => ({
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: goalColor(goalId),
      flexShrink: 0,
      marginTop: "6px",
    }),
    priorityBadge: (p) => ({
      fontSize: "9px",
      letterSpacing: "1px",
      textTransform: "uppercase",
      padding: "2px 6px",
      background: p === "high" ? "#8B1A1A20" : p === "med" ? "#4A352020" : "#2C4A2E20",
      color: p === "high" ? "#8B1A1A" : p === "med" ? "#4A3520" : "#2C4A2E",
      flexShrink: 0,
    }),
    calGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "2px",
    },
    calDay: (isToday, hasEvents, isSelected, isFaded) => ({
      aspectRatio: "1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "6px 4px",
      background: isToday ? "#1A1612" : isSelected ? "#E8E0D4" : "transparent",
      color: isToday ? "#F5F2EC" : isFaded ? "#C0B8AC" : "#1A1612",
      cursor: "pointer",
      fontSize: "12px",
      position: "relative",
    }),
    eventDot: (color) => ({
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      background: color,
      marginTop: "2px",
    }),
    streakBar: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    },
    streakRow: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    streakLabel: {
      fontSize: "11px",
      color: "#6B5E4E",
      width: "120px",
      flexShrink: 0,
    },
    streakTrack: {
      flex: 1,
      height: "6px",
      background: "#E0D8CC",
    },
    btn: {
      padding: "10px 20px",
      background: "#1A1612",
      color: "#F5F2EC",
      border: "none",
      fontSize: "10px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      cursor: "pointer",
    },
    btnOutline: {
      padding: "8px 16px",
      background: "transparent",
      color: "#1A1612",
      border: "1px solid #C0B8AC",
      fontSize: "10px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      cursor: "pointer",
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #E0D8CC",
      background: "#FDFAF6",
      fontSize: "13px",
      fontFamily: "Georgia, serif",
      color: "#1A1612",
      outline: "none",
      boxSizing: "border-box",
    },
    select: {
      padding: "10px 12px",
      border: "1px solid #E0D8CC",
      background: "#FDFAF6",
      fontSize: "12px",
      fontFamily: "Georgia, serif",
      color: "#1A1612",
      outline: "none",
      cursor: "pointer",
    },
    modal: {
      position: "fixed",
      inset: 0,
      background: "#1A161280",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 200,
    },
    modalBox: {
      background: "#FDFAF6",
      border: "1px solid #E0D8CC",
      padding: "32px",
      width: "420px",
      maxWidth: "90vw",
    },
    eventChip: (goalId) => ({
      fontSize: "11px",
      padding: "4px 10px",
      background: goalColor(goalId) + "18",
      color: goalColor(goalId),
      borderLeft: `2px solid ${goalColor(goalId)}`,
      marginBottom: "6px",
      display: "flex",
      justifyContent: "space-between",
    }),
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "▣" },
    { id: "calendar", label: "Calendar", icon: "◫" },
    { id: "tasks", label: "Tasks", icon: "≡" },
    { id: "goals", label: "Goals", icon: "◈" },
  ];

  return (
    <div style={styles.app}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <div style={styles.logoText}>Meridian</div>
          <div style={styles.logoSub}>Your operating system</div>
        </div>
        <nav style={styles.nav}>
          {navItems.map(item => (
            <button key={item.id} style={styles.navItem(view === item.id)} onClick={() => setView(item.id)}>
              <span style={{ fontSize: "14px" }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "20px 28px", borderTop: "1px solid #2E2820" }}>
          <div style={{ fontSize: "10px", color: "#6B5E4E", letterSpacing: "2px", marginBottom: "8px", textTransform: "uppercase" }}>Completion</div>
          <div style={{ fontSize: "28px", color: "#C4A882" }}>{completionRate}%</div>
          <div style={styles.progressBar(completionRate)}>
            <div style={styles.progressFill(completionRate, "#C4A882")} />
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <div style={styles.pageTitle}>
              {view === "dashboard" ? "Good morning." : view === "calendar" ? "Calendar" : view === "tasks" ? "Tasks" : "Goals"}
            </div>
            <div style={styles.dateBadge}>
              {DAYS[today.getDay()]}, {MONTHS[today.getMonth()]} {today.getDate()}, {today.getFullYear()}
            </div>
          </div>
          <div style={styles.quoteBox}>"{quote}"</div>
        </div>

        {/* DASHBOARD */}
        {view === "dashboard" && (
          <>
            <div style={styles.grid}>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Tasks Remaining</div>
                <div style={styles.statNum}>{pendingTasks.length}</div>
                <div style={styles.statLabel}>of {tasks.length} total</div>
                <div style={styles.progressBar()}>
                  <div style={styles.progressFill(completionRate)} />
                </div>
              </div>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Today's Events</div>
                <div style={styles.statNum}>{todayEvents.length}</div>
                <div style={styles.statLabel}>scheduled commitments</div>
                {todayEvents.map(e => (
                  <div key={e.id} style={{ fontSize: "11px", color: "#6B5E4E", marginTop: "4px", display: "flex", gap: "6px", alignItems: "center" }}>
                    <span style={{ color: goalColor(e.goal) }}>◆</span> {e.time} — {e.title}
                  </div>
                ))}
              </div>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Best Streak</div>
                <div style={styles.statNum}>21</div>
                <div style={styles.statLabel}>days — Academics</div>
                <div style={{ fontSize: "11px", color: "#9B8B7A", marginTop: "8px" }}>All systems active</div>
              </div>
            </div>

            <div style={styles.grid2}>
              {/* Upcoming Tasks */}
              <div style={styles.card}>
                <div style={styles.cardTitle}>
                  <span>Upcoming Tasks</span>
                  <button style={styles.btnOutline} onClick={() => setShowAddTask(true)}>+ Add</button>
                </div>
                {upcomingTasks.map(task => (
                  <div key={task.id} style={styles.taskItem(task.done, task.priority)} onClick={() => toggleTask(task.id)}>
                    <div style={styles.checkbox(task.done)}>{task.done && <span style={{ fontSize: "10px", color: "#FDFAF6" }}>✓</span>}</div>
                    <div style={styles.goalDot(task.goal)} />
                    <div style={styles.taskText(task.done)}>{task.text}</div>
                    <div style={styles.priorityBadge(task.priority)}>{task.priority}</div>
                    {task.due && <div style={{ fontSize: "10px", color: "#9B8B7A", flexShrink: 0 }}>{task.due.slice(5)}</div>}
                  </div>
                ))}
              </div>

              {/* Streaks */}
              <div style={styles.card}>
                <div style={styles.cardTitle}>Accountability Streaks</div>
                <div style={styles.streakBar}>
                  {GOALS.map(g => {
                    const s = streakData[g.id];
                    const pct = Math.round((s.current / s.best) * 100);
                    return (
                      <div key={g.id} style={styles.streakRow}>
                        <div style={styles.streakLabel}>{g.icon} {g.label}</div>
                        <div style={styles.streakTrack}>
                          <div style={{ height: "6px", width: `${pct}%`, background: g.color, transition: "width 0.6s" }} />
                        </div>
                        <div style={{ fontSize: "11px", color: "#6B5E4E", minWidth: "40px", textAlign: "right" }}>
                          {s.current}d
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #EDE8E0" }}>
                  <div style={{ fontSize: "10px", color: "#9B8B7A", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Today's Focus</div>
                  {todayEvents.map(e => (
                    <div key={e.id} style={styles.eventChip(e.goal)}>
                      <span>{e.title}</span>
                      <span>{e.time}</span>
                    </div>
                  ))}
                  {todayEvents.length === 0 && <div style={{ fontSize: "12px", color: "#C0B8AC" }}>No events today</div>}
                </div>
              </div>
            </div>
          </>
        )}

        {/* CALENDAR */}
        {view === "calendar" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>
            <div style={styles.card}>
              <div style={styles.cardTitle}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#1A1612" }}
                    onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y-1); } else setCalMonth(m => m-1); }}>←</button>
                  <span style={{ fontSize: "13px", letterSpacing: "3px" }}>{MONTHS[calMonth].toUpperCase()} {calYear}</span>
                  <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#1A1612" }}
                    onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y+1); } else setCalMonth(m => m+1); }}>→</button>
                </div>
                <button style={styles.btnOutline} onClick={() => setShowAddEvent(true)}>+ Event</button>
              </div>

              {/* Day headers */}
              <div style={styles.calGrid}>
                {DAYS.map(d => (
                  <div key={d} style={{ textAlign: "center", fontSize: "10px", letterSpacing: "2px", color: "#9B8B7A", padding: "8px 0", textTransform: "uppercase" }}>{d}</div>
                ))}
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const ds = calDateStr(day);
                  const evs = eventsForDate(ds);
                  const isToday = ds === todayStr;
                  const isSelected = ds === selectedDate;
                  return (
                    <div key={day} style={styles.calDay(isToday, evs.length > 0, isSelected, false)}
                      onClick={() => setSelectedDate(isSelected ? null : ds)}>
                      <span>{day}</span>
                      <div style={{ display: "flex", gap: "2px", flexWrap: "wrap", justifyContent: "center" }}>
                        {evs.slice(0, 3).map(e => (
                          <div key={e.id} style={styles.eventDot(isToday ? "#C4A882" : goalColor(e.goal))} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Side panel */}
            <div>
              <div style={styles.card}>
                <div style={styles.cardTitle}>
                  {selectedDate ? selectedDate : "All Events"}
                </div>
                {(selectedDate ? eventsForDate(selectedDate) : events.sort((a,b) => a.date.localeCompare(b.date))).map(e => (
                  <div key={e.id} style={{ ...styles.eventChip(e.goal), marginBottom: "8px", flexDirection: "column", gap: "2px", alignItems: "flex-start" }}>
                    <div style={{ fontWeight: "600", fontSize: "12px" }}>{e.title}</div>
                    <div style={{ fontSize: "10px", opacity: 0.7 }}>{e.date} · {e.time} · {goalLabel(e.goal)}</div>
                  </div>
                ))}
                {selectedDate && eventsForDate(selectedDate).length === 0 && (
                  <div style={{ fontSize: "12px", color: "#C0B8AC" }}>No events on this day</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TASKS */}
        {view === "tasks" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={styles.card}>
              <div style={styles.cardTitle}>
                <span>Pending ({pendingTasks.length})</span>
                <button style={styles.btnOutline} onClick={() => setShowAddTask(true)}>+ Task</button>
              </div>
              {pendingTasks.length === 0 && <div style={{ fontSize: "13px", color: "#9B8B7A" }}>All caught up. Remarkable.</div>}
              {pendingTasks.map(task => (
                <div key={task.id} style={styles.taskItem(false, task.priority)} onClick={() => toggleTask(task.id)}>
                  <div style={styles.checkbox(false)} />
                  <div style={styles.goalDot(task.goal)} />
                  <div style={{ flex: 1 }}>
                    <div style={styles.taskText(false)}>{task.text}</div>
                    <div style={{ fontSize: "10px", color: "#9B8B7A", marginTop: "2px" }}>{goalLabel(task.goal)}{task.due ? ` · due ${task.due}` : ""}</div>
                  </div>
                  <div style={styles.priorityBadge(task.priority)}>{task.priority}</div>
                </div>
              ))}
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Completed ({doneTasks.length})</div>
              {doneTasks.map(task => (
                <div key={task.id} style={styles.taskItem(true, task.priority)} onClick={() => toggleTask(task.id)}>
                  <div style={styles.checkbox(true)}><span style={{ fontSize: "10px", color: "#FDFAF6" }}>✓</span></div>
                  <div style={styles.goalDot(task.goal)} />
                  <div style={styles.taskText(true)}>{task.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GOALS */}
        {view === "goals" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {GOALS.map(g => {
              const s = streakData[g.id];
              const goalTasks = tasks.filter(t => t.goal === g.id);
              const done = goalTasks.filter(t => t.done).length;
              const pct = goalTasks.length ? Math.round((done / goalTasks.length) * 100) : 0;
              const goalEvents = events.filter(e => e.goal === g.id).sort((a,b) => a.date.localeCompare(b.date));
              return (
                <div key={g.id} style={{ ...styles.card, borderLeft: `3px solid ${g.color}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <span style={{ fontSize: "20px", color: g.color }}>{g.icon}</span>
                    <div>
                      <div style={{ fontSize: "14px", letterSpacing: "1px" }}>{g.label}</div>
                      <div style={{ fontSize: "10px", color: "#9B8B7A", letterSpacing: "1px" }}>Active commitment</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                    {[
                      { label: "Streak", val: `${s.current}d` },
                      { label: "Best", val: `${s.best}d` },
                      { label: "Tasks", val: `${done}/${goalTasks.length}` },
                    ].map(stat => (
                      <div key={stat.label} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "22px", color: g.color }}>{stat.val}</div>
                        <div style={{ fontSize: "10px", color: "#9B8B7A", letterSpacing: "1px", textTransform: "uppercase" }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ fontSize: "10px", color: "#9B8B7A", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>Progress</div>
                  <div style={styles.progressBar()}>
                    <div style={{ ...styles.progressFill(pct, g.color), height: "4px" }} />
                  </div>
                  <div style={{ fontSize: "11px", color: "#9B8B7A", marginTop: "4px" }}>{pct}% tasks complete</div>

                  {goalEvents.length > 0 && (
                    <div style={{ marginTop: "16px" }}>
                      <div style={{ fontSize: "10px", color: "#9B8B7A", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Upcoming</div>
                      {goalEvents.slice(0, 2).map(e => (
                        <div key={e.id} style={{ fontSize: "11px", color: "#6B5E4E", padding: "4px 0", borderBottom: "1px solid #EDE8E0", display: "flex", justifyContent: "space-between" }}>
                          <span>{e.title}</span>
                          <span style={{ color: "#9B8B7A" }}>{e.date.slice(5)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div style={styles.modal} onClick={() => setShowAddTask(false)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>New Task</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input style={styles.input} placeholder="Task description" value={newTask.text} onChange={e => setNewTask({ ...newTask, text: e.target.value })} />
              <select style={styles.select} value={newTask.goal} onChange={e => setNewTask({ ...newTask, goal: e.target.value })}>
                {GOALS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
              <input style={styles.input} type="date" value={newTask.due} onChange={e => setNewTask({ ...newTask, due: e.target.value })} />
              <select style={styles.select} value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })}>
                <option value="high">High Priority</option>
                <option value="med">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button style={styles.btn} onClick={addTask}>Add Task</button>
                <button style={styles.btnOutline} onClick={() => setShowAddTask(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEvent && (
        <div style={styles.modal} onClick={() => setShowAddEvent(false)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>New Event</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input style={styles.input} placeholder="Event title" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />
              <select style={styles.select} value={newEvent.goal} onChange={e => setNewEvent({ ...newEvent, goal: e.target.value })}>
                {GOALS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
              <input style={styles.input} type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} />
              <input style={styles.input} type="time" value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} />
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button style={styles.btn} onClick={addEvent}>Add Event</button>
                <button style={styles.btnOutline} onClick={() => setShowAddEvent(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
