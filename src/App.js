import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tbztpvqwiutcrvecqauj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRienRwdnF3aXV0Y3J2ZWNxYXVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1ODUwMjIsImV4cCI6MjA4ODE2MTAyMn0.ybcgn0ahWdmRbFFD5zNBXUGbLlqHnllweuE2ws6l7V0",
  { auth: { persistSession: true, autoRefreshToken: true } }
);

const COLORS = ["#E53935","#1E88E5","#43A047","#FB8C00","#8E24AA","#00ACC1","#D81B60","#7CB342","#3949AB","#FFB300","#00BCD4","#F4511E","#6D4C41","#BF5700","#FF6B6B","#26A69A","#7986CB","#EC407A","#29B6F6","#8D9B6A"];
const QUOTES = ["Clarity is the prerequisite of excellence.","Discipline is choosing between what you want now and what you want most.","The man who moves a mountain begins by carrying away small stones.","You don't rise to the level of your goals. You fall to the level of your systems.","Hard work beats talent when talent doesn't work hard.","The secret of getting ahead is getting started.","Do something today that your future self will thank you for.","Don't stop when you're tired. Stop when you're done."];
const DAYS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const ROW_BG=["#FFF8F0","#F0FBF4","#EFF6FF","#FDF4FF","#FFF0F3","#FFFBEA","#F0FBFB","#FFF5F0"];
const PRIORITY_COLOR={high:"#E53935",med:"#FB8C00",low:"#43A047"};
const PRIORITY_BG={high:"#FEE2E2",med:"#FEF3C7",low:"#DCFCE7"};

function getDaysInMonth(y,m){return new Date(y,m+1,0).getDate();}
function getFirstDay(y,m){return new Date(y,m,1).getDay();}
function getGreeting(){const h=new Date().getHours();if(h<12)return"Good morning";if(h<17)return"Good afternoon";if(h<21)return"Good evening";return"Working late";}
function fmtDate(ds){if(!ds)return"";const d=new Date(ds+"T00:00:00");return d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});}
function todayCA(){return new Date().toLocaleDateString('en-CA');}
function todayDay(){return new Date().toLocaleDateString('en-US',{weekday:'short'}).toLowerCase();}

/* ── PREMIUM INDIE DESIGN TOKENS (Linear / Craft / Things 3) ────────── */
const N={
  bg:"#FAFAF9",
  bgPage:"#FFFFFF",
  bgSoft:"#F5F4F0",
  sidebar:"#EFEDE8",
  sidebarHover:"#E8E6E1",
  sidebarActive:"#E0DDD6",
  text:"#1C1B18",
  textMid:"#6F6E69",
  textMute:"#A8A49D",
  border:"rgba(0,0,0,0.07)",
  accent:"#5B4FE8",   // indigo — opinionated, not generic blue
  accentBg:"#F0EFFE",
  red:"#D93025", green:"#1E7E5A", orange:"#C9621A", blue:"#2563EB", purple:"#7C3AED",
  font:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",
  serif:"'Georgia',serif",
};

const chip=(color)=>({display:"inline-flex",alignItems:"center",gap:4,padding:"3px 9px",borderRadius:99,background:color+"18",color,fontSize:11,fontWeight:600,letterSpacing:.2});
const badge=(p)=>({...chip(PRIORITY_COLOR[p]||N.textMute)});
const iconBtn={background:"none",border:"none",cursor:"pointer",padding:"4px 6px",borderRadius:6,color:N.textMid,fontSize:14,fontFamily:N.font,transition:"opacity .15s"};
const notionInput={width:"100%",padding:"8px 10px",border:"1.5px solid rgba(0,0,0,0.09)",borderRadius:8,fontSize:13,fontFamily:N.font,color:N.text,outline:"none",boxSizing:"border-box",background:"#FFF",transition:"border-color .15s",boxShadow:"0 1px 2px rgba(0,0,0,0.04)"};
const notionSelect={...notionInput,cursor:"pointer"};
const primaryBtn={padding:"8px 16px",background:N.accent,color:"#FFF",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:N.font,boxShadow:"0 2px 8px rgba(91,79,232,0.3)",transition:"transform .1s,box-shadow .1s",letterSpacing:.1};
const ghostBtn={padding:"7px 13px",background:"#FFF",color:N.textMid,border:"1.5px solid rgba(0,0,0,0.09)",borderRadius:8,fontSize:13,cursor:"pointer",fontFamily:N.font,boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"background .15s"};
const dangerBtn={...ghostBtn,color:N.red,borderColor:"rgba(217,48,37,0.25)",background:"#FFF9F9"};
const modal={position:"fixed",inset:0,background:"rgba(0,0,0,0.35)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400};
const modalBox={background:"#FFF",borderRadius:14,boxShadow:"0 24px 64px rgba(0,0,0,0.18)",padding:32,width:500,maxWidth:"92vw",maxHeight:"88vh",overflowY:"auto"};

/* ── CONFETTI ───────────────────────────────────────────────────────── */
function Confetti(){
  const r=useRef(null);
  useEffect(()=>{
    const c=r.current;if(!c)return;const ctx=c.getContext("2d");
    c.width=window.innerWidth;c.height=window.innerHeight;
    const p=Array.from({length:70},()=>({x:Math.random()*c.width,y:-20,w:8+Math.random()*6,h:4+Math.random()*4,color:["#2383E2","#E03E3E","#0F7B6C","#D9730D","#9065B0"][Math.floor(Math.random()*5)],rot:Math.random()*360,spin:(Math.random()-.5)*5,vy:2+Math.random()*3,vx:(Math.random()-.5)*2}));
    let id;const draw=()=>{ctx.clearRect(0,0,c.width,c.height);p.forEach(q=>{ctx.save();ctx.translate(q.x,q.y);ctx.rotate(q.rot*Math.PI/180);ctx.fillStyle=q.color;ctx.fillRect(-q.w/2,-q.h/2,q.w,q.h);ctx.restore();q.x+=q.vx;q.y+=q.vy;q.rot+=q.spin;if(q.y>c.height){q.y=-20;q.x=Math.random()*c.width;}});id=requestAnimationFrame(draw);};draw();return()=>cancelAnimationFrame(id);
  },[]);
  return <canvas ref={r} style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:999}}/>;
}

/* ── LANDING ────────────────────────────────────────────────────────── */
function LandingPage({onLogin}){
  return(
    <div style={{minHeight:"100vh",background:"#FAFAF9",fontFamily:N.font,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40}}>
      <div style={{textAlign:"center",maxWidth:560}}>
        <div style={{fontSize:52,marginBottom:12}}>🎓</div>
        <div style={{fontSize:44,fontWeight:900,color:N.text,marginBottom:8,letterSpacing:-2}}>Meridian</div>
        <div style={{fontSize:17,color:N.textMid,marginBottom:40,lineHeight:1.7,maxWidth:400}}>Your college life, organized. Goals, tasks, and focus — all in one workspace built for students who mean it.</div>
        <div style={{display:"flex",gap:12,justifyContent:"center",marginBottom:48}}>
          <button onClick={onLogin} style={{...primaryBtn,padding:"12px 32px",fontSize:15}}>Get Started →</button>
          <button onClick={onLogin} style={{...ghostBtn,padding:"12px 32px",fontSize:15}}>Sign In</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
          {[["🎯","Goals as Pages","Each goal is a full workspace page"],["✅","Task Databases","Table, board, and calendar views"],["⚡","Focus Timer","Deep work with ambience sounds"]].map(([icon,title,desc])=>(
            <div key={title} style={{padding:20,background:"#FFF",borderRadius:12,textAlign:"left",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid rgba(0,0,0,0.05)"}}>
              <div style={{fontSize:24,marginBottom:8}}>{icon}</div>
              <div style={{fontSize:14,fontWeight:600,color:N.text,marginBottom:4}}>{title}</div>
              <div style={{fontSize:12,color:N.textMid,lineHeight:1.5}}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── AUTH ───────────────────────────────────────────────────────────── */
function AuthScreen({onBack}){
  const [mode,setMode]=useState("login");
  const [email,setEmail]=useState("");const [pw,setPw]=useState("");
  const [err,setErr]=useState("");const [msg,setMsg]=useState("");const [loading,setLoading]=useState(false);
  const go=async()=>{
    setErr("");setMsg("");setLoading(true);
    if(mode==="login"){const{error}=await supabase.auth.signInWithPassword({email,password:pw});if(error)setErr(error.message);}
    else{const{error}=await supabase.auth.signUp({email,password:pw});if(error)setErr(error.message);else setMsg("Check your email to confirm, then sign in.");}
    setLoading(false);
  };
  return(
    <div style={{minHeight:"100vh",background:"#F5F4FF",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:N.font}}>
      <div style={{width:400,padding:48,background:"#FFF",borderRadius:16,boxShadow:"0 16px 48px rgba(0,0,0,0.12)"}}>
        <div style={{fontSize:32,marginBottom:4}}>🎓</div>
        <div style={{fontSize:28,fontWeight:900,color:N.text,marginBottom:4,letterSpacing:-1}}>Meridian</div>
        <div style={{fontSize:13,color:N.textMid,marginBottom:28}}>Your college life, organized</div>
        {err&&<div style={{fontSize:13,color:N.red,background:"#FEE2E2",padding:"10px 12px",borderRadius:4,marginBottom:14}}>{err}</div>}
        {msg&&<div style={{fontSize:13,color:N.green,background:"#DCFCE7",padding:"10px 12px",borderRadius:4,marginBottom:14}}>{msg}</div>}
        {[["Email","email",email,setEmail],["Password","password",pw,setPw]].map(([l,t,v,s])=>(
          <div key={l} style={{marginBottom:12}}><div style={{fontSize:12,fontWeight:500,color:N.textMid,marginBottom:4}}>{l}</div><input type={t} value={v} onChange={e=>s(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} style={notionInput}/></div>
        ))}
        <button onClick={go} disabled={loading} style={{...primaryBtn,width:"100%",padding:12,fontSize:14,marginTop:8}}>{loading?"...":mode==="login"?"Sign In":"Create Account"}</button>
        <div onClick={()=>{setMode(m=>m==="login"?"signup":"login");setErr("");setMsg("");}} style={{fontSize:13,color:N.textMid,textAlign:"center",marginTop:16,cursor:"pointer"}}>{mode==="login"?"No account? Sign up →":"Have an account? Sign in →"}</div>
        {onBack&&<div onClick={onBack} style={{fontSize:12,color:N.textMute,textAlign:"center",marginTop:8,cursor:"pointer"}}>← Back</div>}
      </div>
    </div>
  );
}

/* ── FOCUS SCREEN ───────────────────────────────────────────────────── */
function FocusScreen({task,secs,running,setRunning,done,ambience,setAmbience,mins,onExit,onDone,onNext}){
  const fmt=s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const pct=mins>0?Math.round(((mins*60-secs)/(mins*60))*100):0;
  return(
    <div style={{position:"fixed",inset:0,background:"#F5F4FF",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:N.font,zIndex:500}}>
      <button onClick={()=>onExit()} style={{position:"absolute",top:24,left:24,...ghostBtn}}>← Exit</button>
      {task&&<div style={{fontSize:13,color:N.textMid,marginBottom:20,maxWidth:400,textAlign:"center"}}>Focusing: <strong style={{color:N.text}}>{task.text}</strong></div>}
      <svg width={220} height={220} style={{marginBottom:28}}>
        <circle cx={110} cy={110} r={96} fill="none" stroke={N.border} strokeWidth={8}/>
        <circle cx={110} cy={110} r={96} fill="none" stroke={N.accent} strokeWidth={8} strokeDasharray={2*Math.PI*96} strokeDashoffset={2*Math.PI*96*(1-pct/100)} strokeLinecap="round" transform="rotate(-90 110 110)" style={{transition:"stroke-dashoffset 1s linear"}}/>
        <text x={110} y={120} textAnchor="middle" fontSize={40} fontFamily={N.serif} fill={N.text}>{fmt(secs)}</text>
      </svg>
      {!done?(
        <div style={{display:"flex",gap:12,marginBottom:32}}>
          <button style={primaryBtn} onClick={()=>setRunning(r=>!r)}>{running?"Pause":"Resume"}</button>
          {task&&<button style={ghostBtn} onClick={onDone}>Mark Done ✓</button>}
        </div>
      ):(
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:20,marginBottom:16}}>Session complete! 🎉</div>
          <div style={{display:"flex",gap:12,justifyContent:"center"}}>
            <button style={primaryBtn} onClick={onNext}>Next Session</button>
            {task&&<button style={ghostBtn} onClick={onDone}>Mark Done</button>}
            <button style={ghostBtn} onClick={()=>onExit()}>Done</button>
          </div>
        </div>
      )}
      <div style={{fontSize:12,color:N.textMute,marginBottom:10}}>Ambience</div>
      <div style={{display:"flex",gap:8}}>
        {[["🟤","brown","Brown"],["⬜","white","White"],["🩷","pink","Pink"],["🔇","off","Off"]].map(([icon,val,lbl])=>(
          <button key={val} onClick={()=>setAmbience(ambience===val||val==="off"?null:val)} style={{padding:"6px 14px",background:ambience===val?N.accentBg:"transparent",color:ambience===val?N.accent:N.textMute,border:`1px solid ${ambience===val?N.accent:N.border}`,borderRadius:20,fontSize:12,cursor:"pointer",fontFamily:N.font}}>{icon} {lbl}</button>
        ))}
      </div>
    </div>
  );
}

/* ── SCHEDULER ──────────────────────────────────────────────────────── */
function Scheduler({user}){
  const [items,setItems]=useState([{name:"",hours:"",priority:"high",deadline:""}]);
  const [schedule,setSchedule]=useState(null);const [syncing,setSyncing]=useState(false);const first=useRef(true);
  useEffect(()=>{(async()=>{const{data}=await supabase.from("schedules").select("*").eq("user_id",user.id).order("updated_at",{ascending:false}).limit(1);if(data?.[0]){if(data[0].items?.length)setItems(data[0].items);if(data[0].result)setSchedule(data[0].result);}})();},[user.id]);
  const save=async(ni,ns)=>{setSyncing(true);try{await supabase.from("schedules").upsert({user_id:user.id,items:ni,result:ns,updated_at:new Date().toISOString()},{onConflict:"user_id"});}catch(e){}setSyncing(false);};
  useEffect(()=>{if(first.current){first.current=false;return;}const t=setTimeout(()=>save(items,schedule),1000);return()=>clearTimeout(t);},[items]);
  const upd=(i,f,v)=>setItems(p=>p.map((x,j)=>j===i?{...x,[f]:v}:x));
  const build=()=>{
    const valid=items.filter(t=>t.name.trim()&&t.hours);if(!valid.length)return;
    const now2=new Date();now2.setHours(0,0,0,0);
    const scored=valid.map(t=>{const days=t.deadline?Math.ceil((new Date(t.deadline+"T00:00:00")-now2)/86400000):999;const ps=t.priority==="high"?3:t.priority==="med"?2:1;const us=days<=1?10:days<=3?7:days<=7?5:days<=14?3:1;return{...t,days,hours:parseFloat(t.hours),score:ps*3+us*2};}).sort((a,b)=>b.score-a.score);
    const r={scored};setSchedule(r);save(items,r);
  };
  const pc=p=>PRIORITY_COLOR[p]||N.textMute;
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{fontSize:13,color:N.textMid}}>Add tasks and get a prioritized order to tackle them.</div>
        {syncing&&<span style={{fontSize:12,color:N.accent}}>Saving…</span>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 0.6fr 0.8fr 1fr auto",gap:8,marginBottom:6}}>
        {["Task","Hours","Priority","Deadline",""].map((l,i)=><div key={i} style={{fontSize:11,fontWeight:600,color:N.textMute}}>{l}</div>)}
      </div>
      {items.map((t,i)=>(
        <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 0.6fr 0.8fr 1fr auto",gap:8,marginBottom:8,alignItems:"center"}}>
          <input style={notionInput} placeholder="Task name" value={t.name} onChange={e=>upd(i,"name",e.target.value)}/>
          <input style={notionInput} type="number" min="0.5" step="0.5" placeholder="2" value={t.hours} onChange={e=>upd(i,"hours",e.target.value)}/>
          <select style={notionSelect} value={t.priority} onChange={e=>upd(i,"priority",e.target.value)}><option value="high">High</option><option value="med">Med</option><option value="low">Low</option></select>
          <input style={notionInput} type="date" min={todayCA()} value={t.deadline} onChange={e=>upd(i,"deadline",e.target.value)}/>
          <button onClick={()=>setItems(p=>p.filter((_,j)=>j!==i))} style={iconBtn}>×</button>
        </div>
      ))}
      <div style={{display:"flex",gap:8,marginTop:12,marginBottom:32}}>
        <button style={ghostBtn} onClick={()=>setItems(p=>[...p,{name:"",hours:"",priority:"high",deadline:""}])}>+ Add</button>
        <button style={primaryBtn} onClick={build}>Build Schedule</button>
        <button style={ghostBtn} onClick={()=>save(items,schedule)} disabled={syncing}>{syncing?"Saving…":"Save"}</button>
      </div>
      {schedule&&(
        <div>
          <div style={{fontSize:14,fontWeight:600,color:N.text,marginBottom:12}}>Recommended Order</div>
          {schedule.scored.map((t,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${N.border}`}}>
              <div style={{fontSize:16,fontWeight:700,color:N.accent,width:24}}>{i+1}</div>
              <div style={{flex:1}}><div style={{fontSize:13,color:N.text}}>{t.name}</div><div style={{fontSize:12,color:N.textMute,marginTop:2}}>{t.hours}h{t.days<999?` · due in ${t.days}d`:""}</div></div>
              <span style={badge(t.priority)}>{t.priority}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── GOAL PAGE ──────────────────────────────────────────────────────── */
function GoalPage({goal,tasks,events,goals,onToggle,onDeleteTask,onAddTask,onEditTask,onAddEvent,onDeleteEvent,onEditEvent,onFocus,onDeleteGoal,todayStr}){
  const [confirmDelete,setConfirmDelete]=useState(false);
  const [taskView,setTaskView]=useState("table"); // table | board | calendar
  const [showAdd,setShowAdd]=useState(false);
  const [showAddEv,setShowAddEv]=useState(false);
  const [newTask,setNewTask]=useState({text:"",priority:"med",due:"",hours:""});
  const [newEvent,setNewEvent]=useState({title:"",date:"",time:""});
  const [editT,setEditT]=useState(null);
  const [editEv,setEditEv]=useState(null);
  const [calMonth,setCalMonth]=useState(new Date().getMonth());
  const [calYear,setCalYear]=useState(new Date().getFullYear());
  const [filterPriority,setFilterPriority]=useState("all");
  const [filterStatus,setFilterStatus]=useState("all");
  const [sortBy,setSortBy]=useState("due");
  const [searchQ,setSearchQ]=useState("");

  const gt=tasks.filter(t=>t.goal_id===goal.id);
  const ge=events.filter(e=>e.goal_id===goal.id).sort((a,b)=>a.date.localeCompare(b.date));
  const done=gt.filter(t=>t.done).length;
  const pct=gt.length?Math.round((done/gt.length)*100):0;

  let filtered=gt;
  if(filterPriority!=="all")filtered=filtered.filter(t=>t.priority===filterPriority);
  if(filterStatus==="done")filtered=filtered.filter(t=>t.done);
  if(filterStatus==="todo")filtered=filtered.filter(t=>!t.done);
  if(searchQ)filtered=filtered.filter(t=>t.text.toLowerCase().includes(searchQ.toLowerCase()));
  if(sortBy==="due")filtered=[...filtered].sort((a,b)=>{if(!a.due&&!b.due)return 0;if(!a.due)return 1;if(!b.due)return -1;return a.due.localeCompare(b.due);});
  if(sortBy==="priority")filtered=[...filtered].sort((a,b)=>{const o={high:0,med:1,low:2};return(o[a.priority]||1)-(o[b.priority]||1);});
  if(sortBy==="name")filtered=[...filtered].sort((a,b)=>a.text.localeCompare(b.text));

  const addT=async()=>{if(!newTask.text.trim())return;await onAddTask({...newTask,goal_id:goal.id});setNewTask({text:"",priority:"med",due:"",hours:""});setShowAdd(false);};
  const addEv=async()=>{if(!newEvent.title.trim()||!newEvent.date)return;await onAddEvent({...newEvent,goal_id:goal.id});setNewEvent({title:"",date:"",time:""});setShowAddEv(false);};
  const saveEditT=async()=>{if(!editT)return;await onEditTask(editT);setEditT(null);};
  const saveEditEv=async()=>{if(!editEv)return;await onEditEvent(editEv);setEditEv(null);};

  // Calendar view helpers
  const dim=getDaysInMonth(calYear,calMonth);
  const fd=getFirstDay(calYear,calMonth);
  const calDs=d=>`${calYear}-${String(calMonth+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const evByDate=ds=>ge.filter(e=>e.date===ds);
  const taskByDate=ds=>filtered.filter(t=>t.due===ds);

  // Board view
  const cols=[{id:"todo",label:"To Do",tasks:filtered.filter(t=>!t.done)},{id:"done",label:"Done",tasks:filtered.filter(t=>t.done)}];

  const daysLeft=goal.deadline?Math.ceil((new Date(goal.deadline+"T00:00:00")-Date.now())/86400000):null;
  const urgency=daysLeft===null?null:daysLeft<0?"overdue":daysLeft<=7?"critical":daysLeft<=14?"warning":"ok";

  return(
    <div style={{flex:1,overflowY:"auto",background:N.bgPage}}>
      {/* Cover */}
      <div style={{height:160,background:`linear-gradient(160deg,${goal.color}20 0%,${goal.color}08 100%)`,position:"relative"}}>
        <div style={{position:"absolute",inset:0,opacity:.06,backgroundImage:"repeating-linear-gradient(45deg,#000 0,#000 1px,transparent 1px,transparent 12px)"}}/>
      </div>

      <div style={{maxWidth:900,margin:"0 auto",padding:"0 64px 80px"}}>
        {/* Icon + title */}
        <div style={{fontSize:48,marginTop:-24,marginBottom:8,lineHeight:1}}>🎯</div>
        <div contentEditable suppressContentEditableWarning style={{fontSize:42,fontWeight:800,color:N.text,marginBottom:4,outline:"none",fontFamily:N.font,letterSpacing:-1.5,lineHeight:1.1}}>{goal.label}</div>

        {/* Properties */}
        <div style={{display:"flex",gap:0,flexDirection:"column",marginTop:20,marginBottom:28,maxWidth:480}}>
          {[
            ["Status", <span style={{...chip(pct===100?N.green:pct>0?N.orange:N.textMute)}}>{pct===100?"✅ Complete":pct>0?`🔄 In Progress (${pct}%)`:"⬜ Not Started"}</span>],
            ["Deadline", goal.deadline?<span style={{color:urgency==="overdue"?N.red:urgency==="critical"?N.red:urgency==="warning"?N.orange:N.green,fontSize:13}}>{fmtDate(goal.deadline)}{daysLeft!==null?` · ${daysLeft<0?"overdue":daysLeft===0?"today":daysLeft===1?"1 day":daysLeft+" days"}`:""}</span>:<span style={{color:N.textMute,fontSize:13}}>No deadline</span>],
            ["Progress", <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:120,height:6,background:N.border,borderRadius:3}}><div style={{width:`${pct}%`,height:6,background:goal.color,borderRadius:3,transition:"width .5s"}}/></div><span style={{fontSize:12,color:N.textMid}}>{done}/{gt.length} tasks</span></div>],
            ["Color", <div style={{display:"flex",gap:6,alignItems:"center"}}><div style={{width:14,height:14,borderRadius:"50%",background:goal.color}}/><span style={{fontSize:13,color:N.textMid}}>{goal.color}</span></div>],
          ].map(([label,val])=>(
            <div key={label} style={{display:"flex",alignItems:"center",gap:0,padding:"6px 0",borderBottom:"1px solid rgba(0,0,0,0.05)"}}>
              <div style={{width:120,fontSize:13,color:N.textMid,fontWeight:500,flexShrink:0}}>{label}</div>
              <div style={{fontSize:13,color:N.text,padding:"4px 8px"}}>{val}</div>
            </div>
          ))}
        </div>

        {/* Delete goal */}
        <div style={{marginBottom:20}}>
          {!confirmDelete
            ? <button style={dangerBtn} onClick={()=>setConfirmDelete(true)}>🗑 Delete this goal</button>
            : <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#FFF5F5",borderRadius:10,border:"1px solid rgba(217,48,37,0.15)",boxShadow:"0 2px 8px rgba(217,48,37,0.08)"}}>
                <span style={{fontSize:13,color:N.red}}>Delete "{goal.label}" and all its tasks?</span>
                <button style={dangerBtn} onClick={()=>onDeleteGoal(goal.id)}>Yes, delete</button>
                <button style={ghostBtn} onClick={()=>setConfirmDelete(false)}>Cancel</button>
              </div>
          }
        </div>

        {/* Divider */}
        <div style={{height:1,background:"rgba(0,0,0,0.06)",marginBottom:28}}/>

        {/* Tasks database */}
        <div style={{marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <div style={{fontSize:14,fontWeight:600,color:N.text}}>📋 Tasks</div>
          <div style={{display:"flex",gap:4}}>
            {[["table","⊞ Table"],["board","⬛ Board"],["calendar","📅 Calendar"]].map(([v,l])=>(
              <button key={v} onClick={()=>setTaskView(v)} style={{...ghostBtn,padding:"4px 10px",fontSize:12,background:taskView===v?"rgba(0,0,0,0.07)":"transparent",fontWeight:taskView===v?700:400,color:taskView===v?N.text:N.textMid}}>{l}</button>
            ))}
          </div>
        </div>

        {/* Filter/sort bar */}
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
          <input style={{...notionInput,width:180,fontSize:12,background:"rgba(0,0,0,0.04)",border:"none",boxShadow:"none",borderRadius:99}} placeholder="Search tasks…" value={searchQ} onChange={e=>setSearchQ(e.target.value)}/>
          <select style={{...notionSelect,width:"auto",fontSize:12,padding:"4px 8px"}} value={filterPriority} onChange={e=>setFilterPriority(e.target.value)}>
            <option value="all">All priorities</option><option value="high">High</option><option value="med">Medium</option><option value="low">Low</option>
          </select>
          <select style={{...notionSelect,width:"auto",fontSize:12,padding:"4px 8px"}} value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
            <option value="all">All status</option><option value="todo">To do</option><option value="done">Done</option>
          </select>
          <select style={{...notionSelect,width:"auto",fontSize:12,padding:"4px 8px"}} value={sortBy} onChange={e=>setSortBy(e.target.value)}>
            <option value="due">Sort: Due date</option><option value="priority">Sort: Priority</option><option value="name">Sort: Name</option>
          </select>
          <button style={{...primaryBtn,padding:"4px 12px",fontSize:12,marginLeft:"auto"}} onClick={()=>setShowAdd(true)}>+ New Task</button>
        </div>

        {/* TABLE VIEW */}
        {taskView==="table"&&(
          <div style={{border:"1px solid rgba(0,0,0,0.07)",borderRadius:10,overflow:"hidden",marginBottom:24,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
            <div style={{display:"grid",gridTemplateColumns:"28px 1fr 90px 100px 60px 80px",gap:0,background:"rgba(0,0,0,0.025)",borderBottom:"1px solid rgba(0,0,0,0.06)",padding:"8px 14px"}}>
              {["","Name","Priority","Due","Hours",""].map((h,i)=><div key={i} style={{fontSize:11,fontWeight:600,color:N.textMute}}>{h}</div>)}
            </div>
            {filtered.length===0&&<div style={{padding:"20px 16px",fontSize:13,color:N.textMute}}>No tasks match your filters.</div>}
            {filtered.map((t,i)=>(
              <div key={t.id} style={{display:"grid",gridTemplateColumns:"28px 1fr 90px 100px 60px 80px",gap:0,padding:"8px 12px",borderBottom:i<filtered.length-1?`1px solid ${N.border}`:"none",background:t.done?"rgba(0,0,0,0.02)":"#FFF",alignItems:"center",transition:"background .1s"}}>
                <div onClick={()=>onToggle(t)} style={{width:16,height:16,border:`1.5px solid ${t.done?goal.color:N.border}`,borderRadius:3,background:t.done?goal.color:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {t.done&&<span style={{fontSize:10,color:"#FFF"}}>✓</span>}
                </div>
                <div style={{fontSize:13,color:N.text,textDecoration:t.done?"line-through":"none",opacity:t.done?.6:1}}>{t.text}</div>
                <div><span style={badge(t.priority)}>{t.priority}</span></div>
                <div style={{fontSize:12,color:t.due&&t.due<todayStr&&!t.done?N.red:N.textMid}}>{t.due?t.due.slice(5):"—"}</div>
                <div style={{fontSize:12,color:N.textMid}}>{t.hours||"—"}</div>
                <div style={{display:"flex",gap:4}}>
                  <button onClick={()=>onFocus(t)} style={iconBtn} title="Focus">⏱</button>
                  <button onClick={()=>setEditT({...t,recurring:t.recurring?JSON.parse(t.recurring):[]})} style={iconBtn}>✏️</button>
                  <button onClick={()=>onDeleteTask(t.id)} style={{...iconBtn,color:N.red,opacity:.5}}>×</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BOARD VIEW */}
        {taskView==="board"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
            {cols.map(col=>(
              <div key={col.id}>
                <div style={{fontSize:11,fontWeight:700,color:N.textMute,marginBottom:10,textTransform:"uppercase",letterSpacing:.8}}>{col.label} · {col.tasks.length}</div>
                {col.tasks.map(t=>(
                  <div key={t.id} style={{background:"#FFF",border:"1px solid rgba(0,0,0,0.07)",borderRadius:10,padding:14,marginBottom:8,cursor:"pointer",boxShadow:"0 1px 4px rgba(0,0,0,0.05)",transition:"box-shadow .15s"}} onClick={()=>onToggle(t)}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:6}}>
                      <div style={{width:14,height:14,border:`1.5px solid ${t.done?goal.color:N.border}`,borderRadius:3,background:t.done?goal.color:"transparent",flexShrink:0,marginTop:1}}>
                        {t.done&&<span style={{fontSize:9,color:"#FFF",display:"block",textAlign:"center"}}>✓</span>}
                      </div>
                      <div style={{fontSize:13,color:N.text,textDecoration:t.done?"line-through":"none",flex:1}}>{t.text}</div>
                    </div>
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      <span style={badge(t.priority)}>{t.priority}</span>
                      {t.due&&<span style={{fontSize:11,color:t.due<todayStr&&!t.done?N.red:N.textMute}}>{t.due.slice(5)}</span>}
                    </div>
                  </div>
                ))}
                {col.tasks.length===0&&<div style={{padding:20,textAlign:"center",color:N.textMute,fontSize:13,border:"1px dashed rgba(0,0,0,0.1)",borderRadius:10,fontStyle:"italic"}}>Nothing here yet</div>}
              </div>
            ))}
          </div>
        )}

        {/* CALENDAR VIEW */}
        {taskView==="calendar"&&(
          <div style={{marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
              <button style={iconBtn} onClick={()=>{if(calMonth===0){setCalMonth(11);setCalYear(y=>y-1);}else setCalMonth(m=>m-1);}}>‹</button>
              <span style={{fontSize:14,fontWeight:600}}>{MONTHS[calMonth]} {calYear}</span>
              <button style={iconBtn} onClick={()=>{if(calMonth===11){setCalMonth(0);setCalYear(y=>y+1);}else setCalMonth(m=>m+1);}}>›</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
              {DAYS.map(d=><div key={d} style={{fontSize:11,fontWeight:600,color:N.textMute,textAlign:"center",padding:"4px 0"}}>{d}</div>)}
              {Array.from({length:fd}).map((_,i)=><div key={`e${i}`}/>)}
              {Array.from({length:dim}).map((_,i)=>{
                const day=i+1,ds=calDs(day),isToday=ds===todayStr,tt2=taskByDate(ds),ev2=evByDate(ds);
                return(
                  <div key={day} style={{minHeight:64,border:"1px solid rgba(0,0,0,0.06)",borderRadius:8,padding:4,background:isToday?"#EDE9FE":"#FFF"}}>
                    <div style={{fontSize:11,fontWeight:isToday?700:400,color:isToday?N.accent:N.text,marginBottom:2}}>{day}</div>
                    {tt2.slice(0,2).map(t=><div key={t.id} style={{fontSize:10,padding:"1px 4px",borderRadius:2,marginBottom:1,background:goal.color+"22",color:goal.color,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.text}</div>)}
                    {ev2.slice(0,1).map(e=><div key={e.id} style={{fontSize:10,padding:"1px 4px",borderRadius:2,background:N.accentBg,color:N.accent,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>📅 {e.title}</div>)}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Add task inline form */}
        {showAdd&&(
          <div style={{border:"1px solid rgba(0,0,0,0.07)",borderRadius:10,padding:16,marginBottom:20,background:"#FAFAF9",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 90px 120px 80px",gap:8,marginBottom:10}}>
              <input style={notionInput} placeholder="Task name" autoFocus value={newTask.text} onChange={e=>setNewTask({...newTask,text:e.target.value})} onKeyDown={e=>e.key==="Enter"&&addT()}/>
              <select style={notionSelect} value={newTask.priority} onChange={e=>setNewTask({...newTask,priority:e.target.value})}><option value="high">High</option><option value="med">Med</option><option value="low">Low</option></select>
              <input style={notionInput} type="date" min={todayCA()} value={newTask.due} onChange={e=>setNewTask({...newTask,due:e.target.value})}/>
              <input style={notionInput} type="number" min="0.5" step="0.5" placeholder="hrs" value={newTask.hours} onChange={e=>setNewTask({...newTask,hours:e.target.value})}/>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={primaryBtn} onClick={addT}>Add</button>
              <button style={ghostBtn} onClick={()=>setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Events section */}
        <div style={{height:1,background:"rgba(0,0,0,0.06)",margin:"28px 0"}}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{fontSize:14,fontWeight:600,color:N.text}}>📅 Events & Deadlines</div>
          <button style={{...primaryBtn,padding:"4px 12px",fontSize:12}} onClick={()=>setShowAddEv(true)}>+ Event</button>
        </div>
        {ge.length===0&&<div style={{fontSize:13,color:N.textMute}}>No events yet.</div>}
        {ge.map(e=>(
          <div key={e.id} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 12px",border:"1px solid rgba(0,0,0,0.07)",borderRadius:10,marginBottom:6,background:"#FFF",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
            <div style={{width:4,height:32,borderRadius:2,background:goal.color,flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:500}}>{e.title}</div>
              <div style={{fontSize:12,color:N.textMid}}>{fmtDate(e.date)}{e.time?` · ${e.time}`:""}</div>
            </div>
            <button onClick={()=>setEditEv({...e})} style={iconBtn}>✏️</button>
            <button onClick={()=>onDeleteEvent(e.id)} style={{...iconBtn,color:N.red,opacity:.5}}>×</button>
          </div>
        ))}
        {showAddEv&&(
          <div style={{border:"1px solid rgba(0,0,0,0.07)",borderRadius:10,padding:16,marginTop:8,background:"#FAFAF9",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 160px 100px",gap:8,marginBottom:10}}>
              <input style={notionInput} placeholder="Event title" autoFocus value={newEvent.title} onChange={e=>setNewEvent({...newEvent,title:e.target.value})}/>
              <input style={notionInput} type="date" value={newEvent.date} onChange={e=>setNewEvent({...newEvent,date:e.target.value})}/>
              <input style={notionInput} type="time" value={newEvent.time} onChange={e=>setNewEvent({...newEvent,time:e.target.value})}/>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={primaryBtn} onClick={addEv}>Add</button>
              <button style={ghostBtn} onClick={()=>setShowAddEv(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* Edit task modal */}
      {editT&&(
        <div style={modal} onClick={()=>setEditT(null)}>
          <div style={modalBox} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Edit Task</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <input style={notionInput} value={editT.text} onChange={e=>setEditT({...editT,text:e.target.value})}/>
              <select style={notionSelect} value={editT.priority} onChange={e=>setEditT({...editT,priority:e.target.value})}><option value="high">High</option><option value="med">Medium</option><option value="low">Low</option></select>
              <input style={notionInput} type="date" value={editT.due||""} onChange={e=>setEditT({...editT,due:e.target.value})}/>
              <input style={notionInput} type="number" min="0.5" step="0.5" placeholder="Hours" value={editT.hours||""} onChange={e=>setEditT({...editT,hours:e.target.value})}/>
              <div style={{display:"flex",gap:8,marginTop:8}}>
                <button style={primaryBtn} onClick={saveEditT}>Save</button>
                <button style={dangerBtn} onClick={()=>{onDeleteTask(editT.id);setEditT(null);}}>Delete</button>
                <button style={ghostBtn} onClick={()=>setEditT(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {editEv&&(
        <div style={modal} onClick={()=>setEditEv(null)}>
          <div style={modalBox} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Edit Event</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <input style={notionInput} value={editEv.title} onChange={e=>setEditEv({...editEv,title:e.target.value})}/>
              <input style={notionInput} type="date" value={editEv.date} onChange={e=>setEditEv({...editEv,date:e.target.value})}/>
              <input style={notionInput} type="time" value={editEv.time||""} onChange={e=>setEditEv({...editEv,time:e.target.value})}/>
              <div style={{display:"flex",gap:8,marginTop:8}}>
                <button style={primaryBtn} onClick={saveEditEv}>Save</button>
                <button style={ghostBtn} onClick={()=>setEditEv(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── HOME PAGE ──────────────────────────────────────────────────────── */
function HomePage({user,goals,tasks,events,stats,onNavigate,onAddGoal,todayStr,nextExam,weeklySnapshots,performanceScore,onFocus}){
  const [quoteIdx]=useState(()=>Math.floor(Math.random()*QUOTES.length));
  const pendingTasks=tasks.filter(t=>!t.done);
  const todayTasks=tasks.filter(t=>t.due===todayStr&&!t.done);
  const completionRate=tasks.length?Math.round((tasks.filter(t=>t.done).length/tasks.length)*100):0;
  const goalColor=id=>goals.find(g=>g.id===id)?.color||N.textMute;
  return(
    <div style={{flex:1,overflowY:"auto",background:N.bgPage}}>
      {/* Cover */}
      <div style={{height:160,background:"linear-gradient(160deg,#EDE9FE 0%,#F5F3FF 50%,#FAFAF9 100%)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:.06,backgroundImage:"repeating-linear-gradient(90deg,#000 0,#000 2px,transparent 2px,transparent 60px)"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:40,background:"linear-gradient(to top,#fff,transparent)"}}/>
      </div>
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 64px 80px"}}>
        <div style={{fontSize:52,marginTop:-22,marginBottom:6,lineHeight:1}}>🎓</div>
        <div style={{fontSize:40,fontWeight:800,color:N.text,fontFamily:N.font,marginBottom:2,letterSpacing:-1.5,lineHeight:1.1}}>{getGreeting()}</div>
        <div style={{fontSize:14,color:N.textMid,marginBottom:4}}>{user.email}</div>
        <div style={{fontSize:13,fontStyle:"italic",color:N.textMute,marginBottom:28}}>{QUOTES[quoteIdx]}</div>

        <div style={{height:1,background:"rgba(0,0,0,0.06)",marginBottom:28}}/>

        {/* Stats row */}
        <div style={{display:"flex",gap:32,marginBottom:36,flexWrap:"wrap"}}>
          {[
            ["due today",todayTasks.length,N.orange],
            ["remaining",pendingTasks.length,N.text],
            ["done",`${completionRate}%`,N.green],
            ["streak",stats.streak>0?`${stats.streak}d`:"—",N.accent],
          ].map(([l,v,c])=>(
            <div key={l}>
              <div style={{fontSize:32,fontWeight:800,color:c,lineHeight:1,letterSpacing:-1}}>{v}</div>
              <div style={{fontSize:12,color:N.textMute,marginTop:3,fontWeight:500}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Goal forecast */}
        {goals.length>0&&(
          <div style={{marginBottom:28}}>
            <div style={{fontSize:12,fontWeight:700,color:N.textMute,textTransform:"uppercase",letterSpacing:.8,marginBottom:12}}>Goals</div>
            <div style={{border:`1px solid ${N.border}`,borderRadius:6,overflow:"hidden"}}>
              {goals.map((g,i)=>{
                const gt=tasks.filter(t=>t.goal_id===g.id);
                const d=gt.filter(t=>t.done).length,p=gt.length?Math.round((d/gt.length)*100):0;
                const days=g.deadline?Math.ceil((new Date(g.deadline+"T00:00:00")-Date.now())/86400000):null;
                const uc=days===null?N.textMute:days<0?N.red:days<=7?N.red:days<=14?N.orange:N.green;
                return(
                  <div key={g.id} onClick={()=>onNavigate("goal",g.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:i%2===0?"#FAFAF9":"#FFF",borderBottom:`1px solid rgba(0,0,0,0.05)`,cursor:"pointer",transition:"background .1s"}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:g.color,flexShrink:0}}/>
                    <div style={{fontSize:13,fontWeight:500,flex:1,color:N.text}}>{g.label}</div>
                    {g.deadline&&<span style={{fontSize:12,color:uc}}>{days<0?"Overdue":days===0?"Today":days===1?"1d":days+"d"}</span>}
                    <div style={{width:80,height:4,background:N.border,borderRadius:2,flexShrink:0}}><div style={{width:`${p}%`,height:4,background:g.color,borderRadius:2,transition:"width .5s"}}/></div>
                    <span style={{fontSize:12,color:N.textMid,width:40,textAlign:"right"}}>{p}%</span>
                    <span style={{fontSize:11,color:N.textMute}}>→</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {goals.length===0&&(
          <div style={{padding:40,textAlign:"center",border:`1px dashed ${N.border}`,borderRadius:8,marginBottom:28}}>
            <div style={{fontSize:32,marginBottom:8}}>🎯</div>
            <div style={{fontSize:15,fontWeight:600,color:N.text,marginBottom:8}}>No goals yet</div>
            <div style={{fontSize:13,color:N.textMid,marginBottom:16}}>Add a goal from the sidebar to get started.</div>
            <button style={primaryBtn} onClick={onAddGoal}>+ New Goal</button>
          </div>
        )}

        {/* Today's tasks */}
        {todayTasks.length>0&&(
          <div style={{marginBottom:28}}>
            <div style={{fontSize:12,fontWeight:700,color:N.textMute,textTransform:"uppercase",letterSpacing:.8,marginBottom:12}}>Due Today</div>
            <div style={{border:`1px solid ${N.border}`,borderRadius:6,overflow:"hidden"}}>
              {todayTasks.map((t,i)=>(
                <div key={t.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#FFF",borderBottom:i<todayTasks.length-1?`1px solid ${N.border}`:"none"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:goalColor(t.goal_id),flexShrink:0}}/>
                  <div style={{fontSize:13,flex:1,color:N.text}}>{t.text}</div>
                  <span style={badge(t.priority)}>{t.priority}</span>
                  <button onClick={()=>onFocus(t)} style={{...iconBtn,fontSize:13}}>⏱</button>
                  <div style={{fontSize:11,color:N.textMute}}>{goals.find(g=>g.id===t.goal_id)?.label||""}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next exam */}
        {nextExam&&(
          <div style={{padding:16,border:"1px solid rgba(0,0,0,0.07)",borderRadius:10,marginBottom:28,boxShadow:"0 2px 8px rgba(0,0,0,0.04)",background:nextExam.daysLeft<=3?"#FEF2F2":"#FFF",borderLeft:`4px solid ${nextExam.daysLeft<=3?N.red:N.orange}`}}>
            <div style={{fontSize:12,fontWeight:600,color:nextExam.daysLeft<=3?N.red:N.orange,marginBottom:4}}>📚 Next Exam</div>
            <div style={{fontSize:15,fontWeight:600,color:N.text}}>{nextExam.title}</div>
            <div style={{fontSize:13,color:N.textMid,marginTop:2}}>{fmtDate(nextExam.date)} · {nextExam.daysLeft===0?"Today":nextExam.daysLeft===1?"Tomorrow":`${nextExam.daysLeft} days away`}</div>
          </div>
        )}

        {/* Performance */}
        {performanceScore!==null&&weeklySnapshots.length>0&&(
          <div style={{border:"1px solid rgba(0,0,0,0.07)",borderRadius:12,padding:24,background:"#FFF",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
            <div style={{fontSize:12,fontWeight:700,color:N.textMute,textTransform:"uppercase",letterSpacing:.8,marginBottom:16}}>Performance</div>
            <div style={{display:"flex",alignItems:"center",gap:24}}>
              <div>
                <div style={{fontSize:48,fontWeight:700,color:performanceScore>=70?N.green:performanceScore>=40?N.orange:N.red,lineHeight:1}}>{performanceScore}</div>
                <div style={{fontSize:12,color:N.textMid,marginTop:4}}>7-day avg</div>
              </div>
              <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
                {weeklySnapshots.slice(0,5).reverse().map((s,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{fontSize:11,color:N.textMute,width:36}}>{s.date.slice(5)}</div>
                    <div style={{flex:1,height:6,background:N.border,borderRadius:3}}><div style={{height:6,width:`${s.score}%`,background:s.score>=70?N.green:s.score>=40?N.orange:N.red,borderRadius:3}}/></div>
                    <div style={{fontSize:11,color:N.textMute,width:36}}>{s.completed_tasks}/{s.total_tasks}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── ALL TASKS PAGE ─────────────────────────────────────────────────── */
function AllTasksPage({goals,tasks,events,onToggle,onDeleteTask,onAddTask,onEditTask,onFocus,todayStr,user}){
  const [showAdd,setShowAdd]=useState(false);
  const [newTask,setNewTask]=useState({text:"",goal_id:"",priority:"med",due:"",hours:"",recurring:[]});
  const [editT,setEditT]=useState(null);
  const [filterGoal,setFilterGoal]=useState("all");
  const [filterPriority,setFilterPriority]=useState("all");
  const [filterStatus,setFilterStatus]=useState("all");
  const [sortBy,setSortBy]=useState("due");
  const [searchQ,setSearchQ]=useState("");

  let filtered=tasks;
  if(filterGoal!=="all")filtered=filtered.filter(t=>t.goal_id===filterGoal);
  if(filterPriority!=="all")filtered=filtered.filter(t=>t.priority===filterPriority);
  if(filterStatus==="done")filtered=filtered.filter(t=>t.done);
  if(filterStatus==="todo")filtered=filtered.filter(t=>!t.done);
  if(searchQ)filtered=filtered.filter(t=>t.text.toLowerCase().includes(searchQ.toLowerCase()));
  if(sortBy==="due")filtered=[...filtered].sort((a,b)=>{if(!a.due&&!b.due)return 0;if(!a.due)return 1;if(!b.due)return -1;return a.due.localeCompare(b.due);});
  if(sortBy==="priority")filtered=[...filtered].sort((a,b)=>({high:0,med:1,low:2}[a.priority]||1)-({high:0,med:1,low:2}[b.priority]||1));
  if(sortBy==="goal")filtered=[...filtered].sort((a,b)=>{const ga=goals.find(g=>g.id===a.goal_id)?.label||"";const gb=goals.find(g=>g.id===b.goal_id)?.label||"";return ga.localeCompare(gb);});

  const goalColor=id=>goals.find(g=>g.id===id)?.color||N.textMute;
  const goalLabel=id=>goals.find(g=>g.id===id)?.label||"?";

  const addT=async()=>{if(!newTask.text.trim()||!newTask.goal_id)return;await onAddTask(newTask);setNewTask({text:"",goal_id:"",priority:"med",due:"",hours:"",recurring:[]});setShowAdd(false);};
  const saveEdit=async()=>{if(!editT)return;await onEditTask(editT);setEditT(null);};

  // Group by goal
  const grouped=goals.map(g=>({goal:g,tasks:filtered.filter(t=>t.goal_id===g.id)})).filter(g=>g.tasks.length>0);

  return(
    <div style={{flex:1,overflowY:"auto",background:N.bgPage,padding:"48px 64px 80px",maxWidth:960,margin:"0 auto",width:"100%",boxSizing:"border-box"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <div style={{fontSize:32,fontWeight:700,color:N.text}}>✅ All Tasks</div>
        <button style={primaryBtn} onClick={()=>setShowAdd(s=>!s)}>+ New Task</button>
      </div>

      {/* Add inline */}
      {showAdd&&(
        <div style={{border:"1px solid rgba(0,0,0,0.07)",borderRadius:10,padding:16,marginBottom:20,background:"#FAFAF9",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 180px 90px 120px 80px",gap:8,marginBottom:10}}>
            <input style={notionInput} placeholder="Task name" autoFocus value={newTask.text} onChange={e=>setNewTask({...newTask,text:e.target.value})} onKeyDown={e=>e.key==="Enter"&&addT()}/>
            <select style={notionSelect} value={newTask.goal_id} onChange={e=>setNewTask({...newTask,goal_id:e.target.value})}>
              <option value="">Select goal</option>
              {goals.map(g=><option key={g.id} value={g.id}>{g.label}</option>)}
            </select>
            <select style={notionSelect} value={newTask.priority} onChange={e=>setNewTask({...newTask,priority:e.target.value})}><option value="high">High</option><option value="med">Med</option><option value="low">Low</option></select>
            <input style={notionInput} type="date" min={todayCA()} value={newTask.due} onChange={e=>setNewTask({...newTask,due:e.target.value})}/>
            <input style={notionInput} type="number" min="0.5" step="0.5" placeholder="hrs" value={newTask.hours} onChange={e=>setNewTask({...newTask,hours:e.target.value})}/>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button style={primaryBtn} onClick={addT}>Add</button>
            <button style={ghostBtn} onClick={()=>setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
        <input style={{...notionInput,width:180,fontSize:12,background:"rgba(0,0,0,0.04)",border:"none",boxShadow:"none",borderRadius:99}} placeholder="Search…" value={searchQ} onChange={e=>setSearchQ(e.target.value)}/>
        <select style={{...notionSelect,width:"auto",fontSize:12,padding:"5px 8px"}} value={filterGoal} onChange={e=>setFilterGoal(e.target.value)}>
          <option value="all">All goals</option>
          {goals.map(g=><option key={g.id} value={g.id}>{g.label}</option>)}
        </select>
        <select style={{...notionSelect,width:"auto",fontSize:12,padding:"5px 8px"}} value={filterPriority} onChange={e=>setFilterPriority(e.target.value)}>
          <option value="all">All priorities</option><option value="high">High</option><option value="med">Med</option><option value="low">Low</option>
        </select>
        <select style={{...notionSelect,width:"auto",fontSize:12,padding:"5px 8px"}} value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
          <option value="all">All status</option><option value="todo">To do</option><option value="done">Done</option>
        </select>
        <select style={{...notionSelect,width:"auto",fontSize:12,padding:"5px 8px"}} value={sortBy} onChange={e=>setSortBy(e.target.value)}>
          <option value="due">Sort: Due</option><option value="priority">Sort: Priority</option><option value="goal">Sort: Goal</option>
        </select>
      </div>

      {/* Grouped by goal */}
      {grouped.map(({goal,tasks:gt},gi)=>(
        <div key={goal.id} style={{marginBottom:24}}>
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:ROW_BG[gi%ROW_BG.length],borderRadius:"6px 6px 0 0",border:`1px solid ${N.border}`,borderBottom:"none"}}>
            <div style={{width:10,height:10,borderRadius:"50%",background:goal.color}}/>
            <div style={{fontSize:13,fontWeight:700,flex:1}}>{goal.label}</div>
            {goal.deadline&&<div style={{fontSize:12,color:N.textMid}}>{fmtDate(goal.deadline)}</div>}
            <div style={{fontSize:12,color:N.textMute}}>{gt.filter(t=>t.done).length}/{gt.length}</div>
          </div>
          <div style={{border:`1px solid ${N.border}`,borderRadius:"0 0 6px 6px",overflow:"hidden"}}>
            {gt.map((t,i)=>(
              <div key={t.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 14px",background:t.done?"#F7F6F3":"#FFF",borderBottom:i<gt.length-1?`1px solid ${N.border}`:"none"}}>
                <div onClick={()=>onToggle(t)} style={{width:15,height:15,border:`1.5px solid ${t.done?goal.color:N.border}`,borderRadius:3,background:t.done?goal.color:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {t.done&&<span style={{fontSize:9,color:"#FFF"}}>✓</span>}
                </div>
                <div style={{flex:1,fontSize:13,color:N.text,textDecoration:t.done?"line-through":"none",opacity:t.done?.6:1}}>{t.text}</div>
                <span style={badge(t.priority)}>{t.priority}</span>
                {t.due&&<span style={{fontSize:11,color:t.due<todayStr&&!t.done?N.red:N.textMute,flexShrink:0}}>{t.due.slice(5)}</span>}
                <button onClick={()=>onFocus(t)} style={iconBtn}>⏱</button>
                <button onClick={()=>setEditT({...t,recurring:t.recurring?JSON.parse(t.recurring):[]})} style={iconBtn}>✏️</button>
                <button onClick={()=>onDeleteTask(t.id)} style={{...iconBtn,color:N.red,opacity:.4}}>×</button>
              </div>
            ))}
          </div>
        </div>
      ))}
      {grouped.length===0&&<div style={{padding:64,textAlign:"center",color:N.textMute,fontSize:14,fontStyle:"italic"}}>No tasks match those filters</div>}

      {editT&&(
        <div style={modal} onClick={()=>setEditT(null)}>
          <div style={modalBox} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>Edit Task</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <input style={notionInput} value={editT.text} onChange={e=>setEditT({...editT,text:e.target.value})}/>
              <select style={notionSelect} value={editT.goal_id} onChange={e=>setEditT({...editT,goal_id:e.target.value})}>
                {goals.map(g=><option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
              <select style={notionSelect} value={editT.priority} onChange={e=>setEditT({...editT,priority:e.target.value})}><option value="high">High</option><option value="med">Medium</option><option value="low">Low</option></select>
              <input style={notionInput} type="date" value={editT.due||""} onChange={e=>setEditT({...editT,due:e.target.value})}/>
              <input style={notionInput} type="number" step="0.5" placeholder="Hours" value={editT.hours||""} onChange={e=>setEditT({...editT,hours:e.target.value})}/>
              <div style={{display:"flex",gap:8,marginTop:8}}>
                <button style={primaryBtn} onClick={saveEdit}>Save</button>
                <button style={dangerBtn} onClick={()=>{onDeleteTask(editT.id);setEditT(null);}}>Delete</button>
                <button style={ghostBtn} onClick={()=>setEditT(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── MAIN APP ───────────────────────────────────────────────────────── */
function MeridianApp({user}){
  const [page,setPage]=useState({type:"home"});
  const [sidebarOpen,setSidebarOpen]=useState(true);
  const [goals,setGoals]=useState([]);
  const [tasks,setTasks]=useState([]);
  const [events,setEvents]=useState([]);
  const [stats,setStats]=useState({xp:0,level:1,streak:0,deep_work_minutes:0});
  const [loading,setLoading]=useState(true);
  const [showConfetti,setShowConfetti]=useState(false);
  const [showAddGoal,setShowAddGoal]=useState(false);
  const [newGoal,setNewGoal]=useState({label:"",color:"#E53935",deadline:""});
  const [showImport,setShowImport]=useState(false);
  const [importText,setImportText]=useState("");
  const [importParsed,setImportParsed]=useState(null);
  const [importLoading,setImportLoading]=useState(false);
  const [importError,setImportError]=useState("");
  const [weeklySnapshots,setWeeklySnapshots]=useState([]);
  const [performanceScore,setPerformanceScore]=useState(null);
  const [nextExam,setNextExam]=useState(null);
  const [xpPopup,setXpPopup]=useState(null);
  const [soundEnabled,setSoundEnabled]=useState(true);

  // Focus
  const [focusMode,setFocusMode]=useState(false);
  const [focusTask,setFocusTask]=useState(null);
  const [focusMins,setFocusMins]=useState(25);
  const [focusComplete,setFocusComplete]=useState(false);
  const [ambience,setAmbience]=useState(null);
  const ambienceRef=useRef(null);
  const [timerSecs,setTimerSecs]=useState(0);
  const [timerRunning,setTimerRunning]=useState(false);
  const timerRef=useRef(null);
  const [showFocusPicker,setShowFocusPicker]=useState(false);
  const [focusPickTask,setFocusPickTask]=useState(null);
  const [customMins,setCustomMins]=useState(30);

  const todayStr=todayCA();

  useEffect(()=>{fetchAll();fetchStats();},[]);

  const fetchStats=async()=>{
    const{data}=await supabase.from("user_stats").select("*").eq("user_id",user.id).maybeSingle();
    if(data){const td=todayCA();if(data.deep_work_date!==td){const u={...data,deep_work_today:0,deep_work_date:td};setStats(u);supabase.from("user_stats").update({deep_work_today:0,deep_work_date:td}).eq("user_id",user.id);}else setStats(data);}
    else{const{data:ns}=await supabase.from("user_stats").insert({user_id:user.id}).select().single();if(ns)setStats(ns);}
    const{data:snaps}=await supabase.from("daily_snapshots").select("*").eq("user_id",user.id).order("date",{ascending:false}).limit(7);
    if(snaps){setWeeklySnapshots(snaps);if(snaps.length>0)setPerformanceScore(Math.round(snaps.reduce((a,s)=>a+s.score,0)/snaps.length));}
  };

  const fetchAll=async()=>{
    setLoading(true);
    const [{data:g},{data:t},{data:e}]=await Promise.all([supabase.from("goals").select("*").order("created_at"),supabase.from("tasks").select("*").order("created_at"),supabase.from("events").select("*").order("date")]);
    setGoals(g||[]);setEvents(e||[]);
    const all=t||[];const lr=localStorage.getItem("meridian_last_reset");const td=todayCA();const dd=todayDay();
    if(lr!==td){const toReset=all.filter(task=>{if(!task.recurring||!task.done)return false;try{const d=JSON.parse(task.recurring);return Array.isArray(d)&&d.includes(dd);}catch{return false;}});if(toReset.length){await Promise.all(toReset.map(task=>supabase.from("tasks").update({done:false}).eq("id",task.id)));const ids=toReset.map(t=>t.id);setTasks(all.map(t=>ids.includes(t.id)?{...t,done:false}:t));}else setTasks(all);localStorage.setItem("meridian_last_reset",td);}else setTasks(all);
    setLoading(false);
  };

  // Exam detection
  useEffect(()=>{
    if(!events.length)return;
    const now2=new Date();now2.setHours(0,0,0,0);
    const isExam=t=>{const s=(t||"").toLowerCase();return s.includes("exam")||s.includes("test")||s.includes("final")||s.includes("ap ")||s.includes("quiz");};
    const ae=events.filter(e=>isExam(e.title)&&new Date(e.date+"T00:00:00")>=now2).sort((a,b)=>a.date.localeCompare(b.date));
    if(ae.length){const n=ae[0];setNextExam({...n,daysLeft:Math.ceil((new Date(n.date+"T00:00:00")-now2)/86400000)});}else setNextExam(null);
  },[events]);

  const playSound=()=>{
    if(!soundEnabled)return;
    try{const ctx=new(window.AudioContext||window.webkitAudioContext)();[392,440,523].forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.type="sine";o.frequency.setValueAtTime(f,ctx.currentTime+i*.15);g.gain.setValueAtTime(0,ctx.currentTime+i*.15);g.gain.linearRampToValueAtTime(.18,ctx.currentTime+i*.15+.05);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+i*.15+.6);o.start(ctx.currentTime+i*.15);o.stop(ctx.currentTime+i*.15+.6);});}catch(e){}
  };
  const triggerXp=a=>{setXpPopup(a);setTimeout(()=>setXpPopup(null),1500);};
  const addXp=async a=>{const nx=Math.max(0,(stats.xp||0)+a),nl=Math.floor(nx/100)+1;const u={...stats,xp:nx,level:nl};setStats(u);triggerXp(a);await supabase.from("user_stats").upsert({...u,user_id:user.id},{onConflict:"user_id"});return u;};
  const updateStreak=async cur=>{const b=cur||stats;const td=todayCA();const yest=new Date(Date.now()-86400000).toLocaleDateString('en-CA');let s=b.streak||0;if(b.last_completed_date===yest)s+=1;else if(b.last_completed_date!==td)s=1;const u={...b,streak:s,last_completed_date:td};setStats(u);await supabase.from("user_stats").upsert({...u,user_id:user.id},{onConflict:"user_id"});};

  // Timer
  useEffect(()=>{
    if(timerRunning&&timerSecs>0){timerRef.current=setTimeout(()=>setTimerSecs(s=>s-1),1000);}
    else if(timerRunning&&timerSecs===0){setTimerRunning(false);playSound();const mins=focusMins;const nmt=(stats.deep_work_minutes||0)+mins;const nx=Math.max(0,(stats.xp||0)+50);const u={...stats,deep_work_minutes:nmt,deep_work_today:(stats.deep_work_today||0)+mins,deep_work_date:todayCA(),xp:nx,level:Math.floor(nx/100)+1};setStats(u);triggerXp(50);setFocusComplete(true);supabase.from("user_stats").upsert({...u,user_id:user.id},{onConflict:"user_id"});}
    return()=>clearTimeout(timerRef.current);
  },[timerRunning,timerSecs]);

  // Ambience
  useEffect(()=>{
    if(!ambience){if(ambienceRef.current){ambienceRef.current.stop?.();ambienceRef.current=null;}return;}
    try{const ctx=new(window.AudioContext||window.webkitAudioContext)();const bs=ctx.sampleRate*3,buf=ctx.createBuffer(1,bs,ctx.sampleRate),d=buf.getChannelData(0);if(ambience==="white"){for(let i=0;i<bs;i++)d[i]=Math.random()*2-1;}else if(ambience==="brown"){let l=0;for(let i=0;i<bs;i++){const w=Math.random()*2-1;d[i]=(l+(.02*w))/1.02;l=d[i];d[i]*=3.5;}}else if(ambience==="pink"){let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;for(let i=0;i<bs;i++){const w=Math.random()*2-1;b0=.99886*b0+w*.0555179;b1=.99332*b1+w*.0750759;b2=.969*b2+w*.153852;b3=.8665*b3+w*.3104856;b4=.55*b4+w*.5329522;b5=-.7616*b5-w*.016898;d[i]=(b0+b1+b2+b3+b4+b5+b6+w*.5362)*.11;b6=w*.115926;}}const src=ctx.createBufferSource();src.buffer=buf;src.loop=true;const gain=ctx.createGain();gain.gain.value=.6;src.connect(gain);gain.connect(ctx.destination);src.start();ambienceRef.current={stop:()=>{try{src.stop();ctx.close();}catch(e){}}};}catch(e){}
    return()=>{if(ambienceRef.current){ambienceRef.current.stop?.();ambienceRef.current=null;}};
  },[ambience]);

  const enterFocus=(task,mins=25)=>{setFocusTask(task);setFocusMins(mins);setFocusComplete(false);setFocusMode(true);setTimerSecs(mins*60);setTimerRunning(true);};
  const exitFocus=()=>{setTimerRunning(false);setTimerSecs(0);setFocusMode(false);setFocusTask(null);setFocusComplete(false);setAmbience(null);};
  const handleFocusClick=(task)=>{setFocusPickTask(task);setShowFocusPicker(true);};

  /* DATA OPS */
  const addGoal=async()=>{if(!newGoal.label.trim())return;const{data}=await supabase.from("goals").insert({...newGoal,user_id:user.id}).select().single();if(data){setGoals([...goals,data]);setNewGoal({label:"",color:"#E53935",deadline:""});setShowAddGoal(false);}};
  const deleteGoal=async id=>{await supabase.from("goals").delete().eq("id",id);setGoals(goals.filter(g=>g.id!==id));setTasks(tasks.filter(t=>t.goal_id!==id));setEvents(events.filter(e=>e.goal_id!==id));if(page.type==="goal"&&page.goalId===id)setPage({type:"home"});};
  const toggleTask=async task=>{const{data}=await supabase.from("tasks").update({done:!task.done}).eq("id",task.id).select().single();if(data){const updated=tasks.map(t=>t.id===task.id?data:t);setTasks(updated);if(!task.done){playSound();const us=await addXp(10);await updateStreak(us);supabase.from("daily_snapshots").upsert({user_id:user.id,date:todayCA(),total_tasks:updated.filter(t=>t.due===todayCA()).length,completed_tasks:updated.filter(t=>t.due===todayCA()&&t.done).length,score:updated.filter(t=>t.due===todayCA()).length?Math.round((updated.filter(t=>t.due===todayCA()&&t.done).length/updated.filter(t=>t.due===todayCA()).length)*100):0},{onConflict:"user_id,date"});const tt=updated.filter(t=>t.due===todayCA());if(tt.length>0&&tt.every(t=>t.done)){setShowConfetti(true);setTimeout(()=>setShowConfetti(false),4000);}}}};
  const deleteTask=async id=>{await supabase.from("tasks").delete().eq("id",id);setTasks(tasks.filter(t=>t.id!==id));};
  const addTask=async(nt)=>{if(!nt.text.trim()||!nt.goal_id)return;const td={text:nt.text,goal_id:nt.goal_id,due:nt.due||null,priority:nt.priority||"med",user_id:user.id,done:false};if(nt.hours)td.hours=parseFloat(nt.hours);if(nt.recurring?.length>0)td.recurring=JSON.stringify(nt.recurring);const{data}=await supabase.from("tasks").insert(td).select().single();if(data)setTasks([...tasks,data]);};
  const editTask=async(et)=>{const rv=Array.isArray(et.recurring)&&et.recurring.length>0?JSON.stringify(et.recurring):null;const{data}=await supabase.from("tasks").update({text:et.text,goal_id:et.goal_id,due:et.due||null,priority:et.priority,hours:et.hours,recurring:rv}).eq("id",et.id).select().single();if(data)setTasks(tasks.map(t=>t.id===data.id?data:t));};
  const addEvent=async(ne)=>{if(!ne.title.trim()||!ne.date||!ne.goal_id)return;const{data}=await supabase.from("events").insert({...ne,user_id:user.id}).select().single();if(data)setEvents([...events,data]);};
  const editEvent=async(ee)=>{const{data}=await supabase.from("events").update({title:ee.title,date:ee.date,time:ee.time,goal_id:ee.goal_id}).eq("id",ee.id).select().single();if(data)setEvents(events.map(e=>e.id===data.id?data:e));};
  const deleteEvent=async id=>{await supabase.from("events").delete().eq("id",id);setEvents(events.filter(e=>e.id!==id));};
  const signOut=()=>supabase.auth.signOut();

  const parsePlan=async()=>{
    if(!importText.trim())return;setImportLoading(true);setImportError("");setImportParsed(null);
    try{
      const pg=[],pt=[];let cg=null,ci=0;
      for(const line of importText.split("\n").map(l=>l.trim()).filter(Boolean)){
        const isG=line.startsWith("Goal:")||(!line.startsWith("*")&&!line.startsWith("-")&&!line.startsWith("•")&&line.endsWith(":"))||(!line.startsWith("*")&&!line.startsWith("-")&&!line.startsWith("•")&&line.includes("—")&&line.length<80);
        if(isG){const label=line.replace(/^Goal:\s*/i,"").replace(/:$/,"").replace(/\s*—.*$/,"").trim();if(label){cg={label,color:COLORS[ci%COLORS.length],deadline:null};ci++;if(!pg.find(g=>g.label===label))pg.push(cg);}continue;}
        if((line.startsWith("*")||line.startsWith("-")||line.startsWith("•"))&&cg){
          let text=line.replace(/^[*\-•]\s*/,"").trim(),due=null,priority="med";
          const dm=text.match(/—\s*due\s+([A-Za-z]+\s+\d+)/i)||text.match(/due\s+([A-Za-z]+\s+\d+)/i);
          if(dm){const p=new Date(`${dm[1]} 2026`);if(!isNaN(p))due=p.toLocaleDateString('en-CA');text=text.replace(/\s*—?\s*due\s+[A-Za-z]+\s+\d+/i,"").trim();}
          if(/high priority/i.test(text)){priority="high";text=text.replace(/,?\s*high priority/i,"").trim();}
          else if(/low priority/i.test(text)){priority="low";text=text.replace(/,?\s*low priority/i,"").trim();}
          else if(/past exam|practice test/i.test(text))priority="high";
          if(text)pt.push({text,goal:cg.label,priority,due});
        }
      }
      if(!pg.length){setImportError("No goals detected. Format: goal name ending with colon, then bullet points.");setImportLoading(false);return;}
      setImportParsed({goals:pg,tasks:pt});
    }catch(e){setImportError("Something went wrong.");}
    setImportLoading(false);
  };

  const importAll=async()=>{
    if(!importParsed)return;setImportLoading(true);
    const fuzz=label=>{const w=label.toLowerCase().split(/\s+/).filter(x=>x.length>2);return goals.find(g=>{const el=g.label.toLowerCase();return el===label.toLowerCase()||label.toLowerCase().includes(el)||el.includes(label.toLowerCase())||w.some(x=>el.includes(x));});};
    const gm={};
    for(const g of importParsed.goals){const ex=fuzz(g.label);if(ex){gm[g.label]=ex.id;continue;}const{data}=await supabase.from("goals").insert({label:g.label,color:g.color,deadline:g.deadline||null,user_id:user.id}).select().single();if(data)gm[g.label]=data.id;}
    const{data:ng}=await supabase.from("goals").select("*").order("created_at");if(ng)setGoals(ng);
    const na=[];
    for(const t of importParsed.tasks){const gid=gm[t.goal];if(!gid)continue;const{data}=await supabase.from("tasks").insert({text:t.text,goal_id:gid,priority:t.priority||"med",due:t.due||null,done:false,user_id:user.id}).select().single();if(data)na.push(data);}
    setTasks(prev=>[...prev,...na]);setImportLoading(false);setShowImport(false);setImportText("");setImportParsed(null);
  };

  const seedData=async()=>{
    setImportLoading(true);
    const gd=[{label:"AP Gov",color:COLORS[0],deadline:"2026-05-05"},{label:"AP Macro",color:COLORS[1],deadline:"2026-05-08"},{label:"AP Calc BC",color:COLORS[2],deadline:"2026-05-11"},{label:"AP Physics C Mech",color:COLORS[3],deadline:"2026-05-13"},{label:"AP Physics C E&M",color:COLORS[4],deadline:"2026-05-14"},{label:"Oxford Research",color:COLORS[5],deadline:"2026-05-20"},{label:"Discipline",color:COLORS[11],deadline:null}];
    const ig=[];for(const g of gd){const ex=(await supabase.from("goals").select("*").eq("user_id",user.id).eq("label",g.label).maybeSingle()).data;if(ex)ig.push(ex);else{const{data}=await supabase.from("goals").insert({...g,user_id:user.id}).select().single();if(data)ig.push(data);}}
    const fG=name=>ig.find(g=>g.label===name)||ig.find(g=>name.split(" ").filter(w=>w.length>2).every(w=>g.label.toLowerCase().includes(w.toLowerCase())));
    const td=[{goal:"AP Gov",text:"Unit 4 review",due:"2026-04-05",priority:"med"},{goal:"AP Gov",text:"Unit 5 review",due:"2026-04-10",priority:"med"},{goal:"AP Gov",text:"Past exam 1",due:"2026-04-15",priority:"high"},{goal:"AP Gov",text:"Past exam 2",due:"2026-04-20",priority:"high"},{goal:"AP Gov",text:"Past exam 3",due:"2026-04-25",priority:"high"},{goal:"AP Macro",text:"Unit 1-3 review",due:"2026-04-05",priority:"med"},{goal:"AP Macro",text:"Past exam 1",due:"2026-04-15",priority:"high"},{goal:"AP Macro",text:"Past exam 2",due:"2026-04-25",priority:"high"},{goal:"AP Calc BC",text:"Practice test 1",due:"2026-04-03",priority:"high"},{goal:"AP Calc BC",text:"Practice test 2",due:"2026-04-10",priority:"high"},{goal:"AP Calc BC",text:"Practice test 3",due:"2026-04-20",priority:"high"},{goal:"AP Physics C Mech",text:"Work and energy",due:"2026-04-05",priority:"med"},{goal:"AP Physics C Mech",text:"Past exam 1",due:"2026-04-15",priority:"high"},{goal:"AP Physics C Mech",text:"Past exam 2",due:"2026-04-25",priority:"high"},{goal:"AP Physics C E&M",text:"Past exam 1",due:"2026-04-05",priority:"high"},{goal:"AP Physics C E&M",text:"Past exam 2",due:"2026-04-15",priority:"high"},{goal:"AP Physics C E&M",text:"Past exam 3",due:"2026-04-25",priority:"high"},{goal:"Oxford Research",text:"Finish 3B1B neural networks",due:"2026-04-10",priority:"high"},{goal:"Oxford Research",text:"Read Oxford paper 1",due:"2026-05-01",priority:"med"},{goal:"Discipline",text:"Morning workout",due:null,priority:"high",recurring:JSON.stringify(["mon","tue","wed","thu","fri","sat","sun"])},{goal:"Discipline",text:"10-min meditation",due:null,priority:"med",recurring:JSON.stringify(["mon","tue","wed","thu","fri","sat","sun"])}];
    for(const t of td){const g=fG(t.goal);if(!g)continue;await supabase.from("tasks").insert({text:t.text,goal_id:g.id,priority:t.priority,due:t.due||null,done:false,recurring:t.recurring||null,user_id:user.id});}
    await fetchAll();setImportLoading(false);setShowImport(false);
  };

  if(loading)return(<div style={{minHeight:"100vh",background:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:N.font}}><div style={{textAlign:"center"}}><div style={{fontSize:40,marginBottom:12}}>🎓</div><div style={{fontSize:20,fontWeight:700,color:N.text}}>Meridian</div><div style={{fontSize:13,color:N.textMute,marginTop:6}}>Loading…</div></div></div>);

  const currentGoal=page.type==="goal"?goals.find(g=>g.id===page.goalId):null;
  const isMobile=window.innerWidth<768;

  return(
    <div style={{display:"flex",height:"100vh",fontFamily:N.font,color:N.text,overflow:"hidden"}}>
      {showConfetti&&<Confetti/>}
      {xpPopup&&<div style={{position:"fixed",top:20,right:20,background:N.accent,color:"#FFF",padding:"8px 16px",borderRadius:8,fontSize:14,fontWeight:600,zIndex:999,pointerEvents:"none"}}>+{xpPopup} XP</div>}
      {focusMode&&<FocusScreen task={focusTask} secs={timerSecs} running={timerRunning} setRunning={setTimerRunning} done={focusComplete} ambience={ambience} setAmbience={setAmbience} mins={focusMins} onExit={exitFocus} onDone={()=>{if(focusTask)toggleTask(focusTask);exitFocus();}} onNext={()=>{setFocusComplete(false);setTimerSecs(focusMins*60);setTimerRunning(true);}}/>}

      {/* ── SIDEBAR ─────────────────────────────────────── */}
      {(!isMobile||sidebarOpen)&&(
        <div style={{width:240,background:N.sidebar,boxShadow:"inset -1px 0 0 rgba(0,0,0,0.06)",display:"flex",flexDirection:"column",flexShrink:0,overflowY:"auto",height:"100vh"}}>
          {/* Workspace header */}
          <div style={{padding:"18px 16px 12px",borderBottom:"1px solid rgba(0,0,0,0.06)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
              <div style={{width:28,height:28,borderRadius:7,background:"linear-gradient(135deg,#5B4FE8,#8B7FF5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>🎓</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:700,color:N.text,letterSpacing:-.3}}>Meridian</div>
                <div style={{fontSize:11,color:N.textMute,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.email}</div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div style={{padding:"8px 12px"}}>
            <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 10px",background:N.sidebarHover,borderRadius:4,fontSize:13,color:N.textMute,cursor:"pointer"}} onClick={()=>setPage({type:"tasks"})}>
              🔍 Search tasks
            </div>
          </div>

          {/* Nav items */}
          <div style={{padding:"4px 12px"}}>
            {[
              {icon:"🏠",label:"Home",p:{type:"home"}},
              {icon:"✅",label:"All Tasks",p:{type:"tasks"}},
              {icon:"⚡",label:"Schedule Builder",p:{type:"scheduler"}},
              {icon:"⏱",label:"Focus Timer",p:{type:"focus"}},
            ].map(({icon,label,p})=>{
              const active=page.type===p.type;
              return(
                <div key={label} onClick={()=>setPage(p)} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",borderRadius:8,marginBottom:2,cursor:"pointer",background:active?"rgba(0,0,0,0.07)":"transparent",color:active?N.text:N.textMid,fontSize:13,fontWeight:active?600:400,transition:"background .1s"}}>
                  <span style={{fontSize:14,opacity:active?1:.7}}>{icon}</span>{label}
                </div>
              );
            })}
          </div>

          {/* Goals section */}
          <div style={{padding:"12px 14px 4px",marginTop:4}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
              <div style={{fontSize:11,fontWeight:700,color:N.textMute,textTransform:"uppercase",letterSpacing:.8}}>Goals</div>
              <button onClick={()=>setShowAddGoal(true)} style={{...iconBtn,fontSize:16,padding:"0 4px",color:N.textMute}}>+</button>
            </div>
            {goals.map(g=>{
              const active=page.type==="goal"&&page.goalId===g.id;
              const gt=tasks.filter(t=>t.goal_id===g.id);
              const pct=gt.length?Math.round((gt.filter(t=>t.done).length/gt.length)*100):0;
              return(
                <div key={g.id} onClick={()=>setPage({type:"goal",goalId:g.id})}
                  style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",borderRadius:8,marginBottom:2,cursor:"pointer",background:active?"rgba(0,0,0,0.07)":"transparent",color:active?N.text:N.textMid,fontSize:13,transition:"background .1s"}}>
                  <div style={{width:9,height:9,borderRadius:"50%",background:g.color,flexShrink:0,boxShadow:`0 0 0 2px ${g.color}30`}}/>
                  <div style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:active?600:400}}>{g.label}</div>
                  <div style={{fontSize:11,color:N.textMute,fontWeight:500}}>{pct}%</div>
                </div>
              );
            })}
            {goals.length===0&&<div style={{fontSize:12,color:N.textMute,padding:"6px 10px",fontStyle:"italic"}}>No goals yet — add one ↑</div>}
          </div>

          {/* Bottom */}
          <div style={{marginTop:"auto",borderTop:"1px solid rgba(0,0,0,0.06)",padding:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <button onClick={()=>setShowImport(true)} style={{...ghostBtn,flex:1,fontSize:12,padding:"6px 10px",textAlign:"left",background:"transparent",border:"none",boxShadow:"none",color:N.textMid}}>📥 Import</button>
              <button onClick={()=>setSoundEnabled(s=>!s)} style={{...iconBtn,fontSize:16,opacity:.7}}>{soundEnabled?"🔊":"🔇"}</button>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
              <div style={{fontSize:11,color:N.textMute}}>Lvl {stats.level}</div>
              <div style={{flex:1,height:3,background:"rgba(0,0,0,0.08)",borderRadius:2}}><div style={{height:3,width:`${stats.xp%100}%`,background:N.accent,borderRadius:2,transition:"width .5s"}}/></div>
              <div style={{fontSize:11,color:N.textMute}}>{stats.streak>0?`🔥 ${stats.streak}d`:""}</div>
            </div>
            <button onClick={signOut} style={{...ghostBtn,width:"100%",fontSize:12,textAlign:"center",background:"transparent",border:"none",boxShadow:"none",color:N.textMute,padding:"6px 0"}}>Sign out</button>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ────────────────────────────────── */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",background:N.bgPage}}>
        {isMobile&&(
          <div style={{padding:"10px 16px",borderBottom:`1px solid ${N.border}`,display:"flex",alignItems:"center",gap:8,background:N.sidebar}}>
            <button onClick={()=>setSidebarOpen(s=>!s)} style={iconBtn}>☰</button>
            <span style={{fontSize:14,fontWeight:600}}>Meridian</span>
          </div>
        )}

        {page.type==="home"&&<HomePage user={user} goals={goals} tasks={tasks} events={events} stats={stats} onNavigate={(t,id)=>setPage({type:t,goalId:id})} onAddGoal={()=>setShowAddGoal(true)} todayStr={todayStr} nextExam={nextExam} weeklySnapshots={weeklySnapshots} performanceScore={performanceScore} onFocus={handleFocusClick}/>}

        {page.type==="goal"&&currentGoal&&<GoalPage goal={currentGoal} tasks={tasks} events={events} goals={goals} onToggle={toggleTask} onDeleteTask={deleteTask} onAddTask={addTask} onEditTask={editTask} onAddEvent={addEvent} onDeleteEvent={deleteEvent} onEditEvent={editEvent} onFocus={handleFocusClick} onDeleteGoal={deleteGoal} todayStr={todayStr}/>}

        {page.type==="tasks"&&<AllTasksPage goals={goals} tasks={tasks} events={events} onToggle={toggleTask} onDeleteTask={deleteTask} onAddTask={addTask} onEditTask={editTask} onFocus={handleFocusClick} todayStr={todayStr} user={user}/>}

        {page.type==="scheduler"&&(
          <div style={{flex:1,overflowY:"auto",padding:"48px 64px",maxWidth:900,margin:"0 auto",width:"100%",boxSizing:"border-box"}}>
            <div style={{fontSize:38,fontWeight:800,color:N.text,marginBottom:24,letterSpacing:-1.2}}>Schedule</div>
            <Scheduler user={user}/>
          </div>
        )}

        {page.type==="focus"&&(
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40}}>
            <div style={{fontSize:38,fontWeight:800,color:N.text,marginBottom:8,letterSpacing:-1.2}}>Focus</div>
            <div style={{fontSize:14,color:N.textMid,marginBottom:32}}>Start a deep work session</div>
            <div style={{display:"flex",flexDirection:"column",gap:10,width:280}}>
              {[["25 min — Pomodoro",25],["50 min — Deep Work",50]].map(([l,m])=>(
                <button key={m} style={{...ghostBtn,padding:"14px 20px",textAlign:"left",fontSize:14}} onClick={()=>enterFocus(null,m)}>{l}</button>
              ))}
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input style={{...notionInput,flex:1}} type="number" min="5" max="180" value={customMins} onChange={e=>setCustomMins(parseInt(e.target.value)||30)}/>
                <button style={primaryBtn} onClick={()=>enterFocus(null,customMins)}>Custom</button>
              </div>
              <div style={{fontSize:12,color:N.textMute,marginTop:4}}>Or open a goal page and click ⏱ on any task to focus on it directly.</div>
            </div>
          </div>
        )}
      </div>

      {/* ── FOCUS PICKER MODAL ─────────────────────────── */}
      {showFocusPicker&&(
        <div style={modal} onClick={()=>setShowFocusPicker(false)}>
          <div style={{...modalBox,maxWidth:320}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:16}}>⏱ Focus on: {focusPickTask?.text||"Free session"}</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[["25 min",25],["50 min",50]].map(([l,m])=>(
                <button key={m} style={{...ghostBtn,textAlign:"left",padding:"10px 14px"}} onClick={()=>{setShowFocusPicker(false);enterFocus(focusPickTask,m);}}>{l}</button>
              ))}
              <div style={{display:"flex",gap:8}}>
                <input style={{...notionInput,flex:1}} type="number" min="5" max="180" value={customMins} onChange={e=>setCustomMins(parseInt(e.target.value)||30)}/>
                <button style={primaryBtn} onClick={()=>{setShowFocusPicker(false);enterFocus(focusPickTask,customMins);}}>Go</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD GOAL MODAL ─────────────────────────────── */}
      {showAddGoal&&(
        <div style={modal} onClick={()=>setShowAddGoal(false)}>
          <div style={modalBox} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:20}}>🎯 New Goal</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <input style={notionInput} placeholder="Goal name" autoFocus value={newGoal.label} onChange={e=>setNewGoal({...newGoal,label:e.target.value})} onKeyDown={e=>e.key==="Enter"&&addGoal()}/>
              <div><div style={{fontSize:12,fontWeight:500,color:N.textMid,marginBottom:6}}>Deadline (optional)</div><input style={notionInput} type="date" value={newGoal.deadline} onChange={e=>setNewGoal({...newGoal,deadline:e.target.value})}/></div>
              <div><div style={{fontSize:12,fontWeight:500,color:N.textMid,marginBottom:8}}>Color</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {COLORS.map(c=><div key={c} onClick={()=>setNewGoal({...newGoal,color:c})} style={{width:26,height:26,borderRadius:"50%",background:c,cursor:"pointer",border:newGoal.color===c?"3px solid #2383E2":"3px solid transparent",boxSizing:"border-box"}}/>)}
                </div>
              </div>
              <div style={{display:"flex",gap:8,marginTop:8}}>
                <button style={primaryBtn} onClick={addGoal}>Create</button>
                <button style={ghostBtn} onClick={()=>setShowAddGoal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── IMPORT MODAL ───────────────────────────────── */}
      {showImport&&(
        <div style={modal} onClick={()=>{setShowImport(false);setImportParsed(null);setImportText("");}}>
          <div style={{...modalBox,width:540}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:15,fontWeight:600,marginBottom:6}}>📥 Import</div>
            <div style={{fontSize:13,color:N.textMid,marginBottom:16}}>Paste a plan from Claude or use quick load.</div>
            <div style={{padding:14,border:"1px solid rgba(91,79,232,0.15)",borderRadius:10,marginBottom:14,background:"#F6F4FF"}}>
              <div style={{fontSize:13,fontWeight:600,color:N.accent,marginBottom:8}}>⚡ Quick Load — Full Plan</div>
              <button style={primaryBtn} onClick={seedData} disabled={importLoading}>{importLoading?"Loading…":"Load My Plan"}</button>
            </div>
            {!importParsed?(
              <>
                <textarea style={{...notionInput,minHeight:140,resize:"vertical",lineHeight:1.6,marginBottom:10}} placeholder={"Goal: AP Gov\n- Unit 4 review (high priority, due April 5)\n- Past exam 1\n\nGoal: Oxford Research\n- Finish neural networks"} value={importText} onChange={e=>setImportText(e.target.value)}/>
                {importError&&<div style={{fontSize:12,color:N.red,marginBottom:8}}>{importError}</div>}
                <div style={{display:"flex",gap:8}}>
                  <button style={primaryBtn} onClick={parsePlan} disabled={importLoading}>{importLoading?"Parsing…":"Parse"}</button>
                  <button style={ghostBtn} onClick={()=>{setShowImport(false);setImportText("");}}>Cancel</button>
                </div>
              </>
            ):(
              <>
                <div style={{fontSize:13,color:N.green,marginBottom:12}}>Found {importParsed.goals.length} goals, {importParsed.tasks.length} tasks</div>
                <div style={{maxHeight:240,overflowY:"auto",marginBottom:14}}>
                  {importParsed.goals.map((g,i)=>(
                    <div key={i} style={{marginBottom:12}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><div style={{width:8,height:8,borderRadius:"50%",background:g.color}}/><div style={{fontSize:13,fontWeight:600}}>{g.label}</div></div>
                      {importParsed.tasks.filter(t=>t.goal===g.label).map((t,j)=>(
                        <div key={j} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 10px",background:N.bgSoft,borderRadius:4,marginBottom:3,marginLeft:16,fontSize:12}}>
                          <div style={{flex:1}}>{t.text}</div>
                          <span style={badge(t.priority)}>{t.priority}</span>
                          {t.due&&<span style={{color:N.textMute}}>{t.due}</span>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button style={primaryBtn} onClick={importAll} disabled={importLoading}>{importLoading?"Importing…":"Import All"}</button>
                  <button style={ghostBtn} onClick={()=>setImportParsed(null)}>Re-parse</button>
                  <button style={ghostBtn} onClick={()=>{setShowImport(false);setImportParsed(null);setImportText("");}}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── LOADER ─────────────────────────────────────────────────────────── */
function SanjuLoader(){
  const r=useRef(null);
  useEffect(()=>{
    const c=r.current;if(!c)return;const ctx=c.getContext("2d");c.width=window.innerWidth;c.height=window.innerHeight;const W=c.width,H=c.height;
    const img=new Image();img.crossOrigin="anonymous";img.src="https://tbztpvqwiutcrvecqauj.supabase.co/storage/v1/object/public/assets/Screenshot%202026-04-19%20194858.png";
    const run=()=>{const maxH=Math.min(H*.65,380),ratio=img.naturalWidth/img.naturalHeight||1,dH=maxH,dW=dH*ratio,dX=(W-dW)/2,dY=(H-dH)/2-40;const off=document.createElement("canvas");off.width=Math.round(dW);off.height=Math.round(dH);const oc=off.getContext("2d");oc.drawImage(img,0,0,off.width,off.height);const id2=oc.getImageData(0,0,off.width,off.height),gap=4,particles=[];for(let y=0;y<off.height;y+=gap)for(let x=0;x<off.width;x+=gap){const i=(y*off.width+x)*4;if(id2.data[i+3]<30)continue;particles.push({x:Math.random()*W,y:Math.random()*H,tx:dX+x,ty:dY+y,color:`rgb(${id2.data[i]},${id2.data[i+1]},${id2.data[i+2]})`,size:gap-1,delay:Math.floor(Math.random()*60)});}let frame=0,aid;const animate=()=>{ctx.fillStyle="#FAFAF9";ctx.fillRect(0,0,W,H);for(const p of particles){if(frame<p.delay)continue;p.x+=(p.tx-p.x)*.05;p.y+=(p.ty-p.y)*.05;ctx.fillStyle=p.color;ctx.fillRect(Math.round(p.x),Math.round(p.y),p.size,p.size);}if(frame>200){const a=Math.min(1,(frame-200)/60);ctx.globalAlpha=a;ctx.fillStyle="#5B4FE8";ctx.font="900 20px 'Inter',sans-serif";ctx.textAlign="center";ctx.fillText("Meridian",W/2,dY+dH+48);ctx.fillStyle="#A8A49D";ctx.font="500 11px 'Inter',sans-serif";ctx.fillText("UT COCKRELL  ·  MECH E",W/2,dY+dH+68);ctx.globalAlpha=1;}frame++;if(frame<280)aid=requestAnimationFrame(animate);};aid=requestAnimationFrame(animate);c._cleanup=()=>cancelAnimationFrame(aid);};
    if(img.complete)run();else{img.onload=run;img.onerror=run;}return()=>{if(c._cleanup)c._cleanup();};
  },[]);
  return(<div style={{position:"fixed",inset:0,background:"#FAFAF9",zIndex:9999}}><canvas ref={r} style={{display:"block",width:"100%",height:"100%"}}/></div>);
}

/* ── ROOT ───────────────────────────────────────────────────────────── */
export default function App(){
  useEffect(()=>{const l=document.createElement("link");l.href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap";l.rel="stylesheet";document.head.appendChild(l);},[]);
  const [user,setUser]=useState(null);const [checking,setChecking]=useState(true);const [showAuth,setShowAuth]=useState(false);
  useEffect(()=>{
    const min=new Promise(r=>setTimeout(r,4000));
    const auth=supabase.auth.getSession().then(({data:{session}})=>setUser(session?.user??null));
    Promise.all([min,auth]).then(()=>setChecking(false));
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{setUser(session?.user??null);if(session?.user)setShowAuth(false);});
    return()=>subscription.unsubscribe();
  },[]);
  if(checking)return <SanjuLoader/>;
  if(user)return <MeridianApp user={user}/>;
  if(showAuth)return <AuthScreen onBack={()=>setShowAuth(false)}/>;
  return <LandingPage onLogin={()=>setShowAuth(true)}/>;
}
