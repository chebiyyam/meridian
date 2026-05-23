import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tbztpvqwiutcrvecqauj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRienRwdnF3aXV0Y3J2ZWNxYXVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1ODUwMjIsImV4cCI6MjA4ODE2MTAyMn0.ybcgn0ahWdmRbFFD5zNBXUGbLlqHnllweuE2ws6l7V0",
  { auth: { persistSession: true, autoRefreshToken: true } }
);

const MUTED_COLORS = [
  { name: "Red",         value: "#E53935" },{ name: "Blue",       value: "#1E88E5" },
  { name: "Green",       value: "#43A047" },{ name: "Orange",     value: "#FB8C00" },
  { name: "Purple",      value: "#8E24AA" },{ name: "Teal",       value: "#00ACC1" },
  { name: "Pink",        value: "#D81B60" },{ name: "Lime",       value: "#7CB342" },
  { name: "Indigo",      value: "#3949AB" },{ name: "Amber",      value: "#FFB300" },
  { name: "Cyan",        value: "#00BCD4" },{ name: "Deep Orange",value: "#F4511E" },
  { name: "Brown",       value: "#6D4C41" },{ name: "Gold",       value: "#BF5700" },
  { name: "Coral",       value: "#FF6B6B" },{ name: "Mint",       value: "#26A69A" },
  { name: "Lavender",    value: "#7986CB" },{ name: "Rose",       value: "#EC407A" },
  { name: "Sky",         value: "#29B6F6" },{ name: "Sage",       value: "#8D9B6A" },
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
  "Push yourself, because no one else is going to do it for you.",
  "Do something today that your future self will thank you for.",
  "Don't stop when you're tired. Stop when you're done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Success doesn't just find you. You have to go out and get it.",
  "In the middle of every difficulty lies opportunity.",
  "It always seems impossible until it is done.",
  "Someday is not a day of the week.",
  "Dream bigger. Do bigger.",
  "You are stronger than you think.",
  "Believe you can and you're halfway there.",
  "The future belongs to those who believe in the beauty of their dreams.",
];

const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const ROW_COLORS = ["#FFF8F0","#F0FBF4","#EFF6FF","#FDF4FF","#FFF0F3","#FFFBEA","#F0FBFB","#FFF5F0"];

function getDaysInMonth(y,m){return new Date(y,m+1,0).getDate();}
function getFirstDay(y,m){return new Date(y,m,1).getDay();}
function getGreeting(){
  const h=new Date().getHours();
  if(h>=5&&h<12)return"Good morning.";
  if(h>=12&&h<17)return"Good afternoon.";
  if(h>=17&&h<21)return"Good evening.";
  return"Working late.";
}

const T={
  bg:"#FFFFFF",bgSoft:"#F7F6F3",
  text:"#37352F",textMid:"#6B6B6B",textMute:"#9B9A97",
  border:"#E9E9E7",
  accent:"#D97706",accentBg:"#FFF8EC",
  red:"#DC2626",green:"#16A34A",blue:"#2563EB",orange:"#EA580C",
  font:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",
  serif:"'Lora',Georgia,serif",
};

const S={
  card:{background:"#FFF",border:"1px solid #E9E9E7",borderRadius:8,padding:20},
  modal:{position:"fixed",inset:0,background:"rgba(0,0,0,0.28)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300},
  modalBox:{background:"#FFF",border:"1px solid #E9E9E7",borderRadius:12,boxShadow:"0 8px 40px rgba(0,0,0,0.11)",padding:32,width:440,maxWidth:"92vw",maxHeight:"88vh",overflowY:"auto"},
  btn:{padding:"7px 16px",background:"#D97706",color:"#FFF",border:"none",borderRadius:6,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"'Inter',-apple-system,sans-serif"},
  btnOut:{padding:"6px 14px",background:"transparent",color:"#6B6B6B",border:"1px solid #E9E9E7",borderRadius:6,fontSize:13,cursor:"pointer",fontFamily:"'Inter',-apple-system,sans-serif"},
  btnDanger:{padding:"6px 14px",background:"transparent",color:"#DC2626",border:"1px solid rgba(220,38,38,0.3)",borderRadius:6,fontSize:13,cursor:"pointer",fontFamily:"'Inter',-apple-system,sans-serif"},
  input:{width:"100%",padding:"8px 10px",border:"1px solid #E9E9E7",background:"#F7F6F3",fontSize:14,fontFamily:"'Inter',-apple-system,sans-serif",color:"#37352F",outline:"none",boxSizing:"border-box",borderRadius:6},
  select:{width:"100%",padding:"8px 10px",border:"1px solid #E9E9E7",background:"#F7F6F3",fontSize:14,fontFamily:"'Inter',-apple-system,sans-serif",color:"#37352F",outline:"none",cursor:"pointer",borderRadius:6},
  label:{fontSize:12,fontWeight:500,color:"#6B6B6B",marginBottom:6,display:"block"},
};

function Confetti(){
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");
    canvas.width=window.innerWidth;canvas.height=window.innerHeight;
    const pieces=Array.from({length:80},()=>({
      x:Math.random()*canvas.width,y:Math.random()*-canvas.height,
      w:8+Math.random()*8,h:4+Math.random()*4,
      color:["#D97706","#2563EB","#16A34A","#DC2626","#8B5CF6","#EC4899"][Math.floor(Math.random()*6)],
      rot:Math.random()*360,spin:(Math.random()-.5)*6,vy:2+Math.random()*4,vx:(Math.random()-.5)*2
    }));
    let id;
    const draw=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pieces.forEach(p=>{
        ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);
        ctx.fillStyle=p.color;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();
        p.x+=p.vx;p.y+=p.vy;p.rot+=p.spin;
        if(p.y>canvas.height){p.y=-20;p.x=Math.random()*canvas.width;}
      });
      id=requestAnimationFrame(draw);
    };
    draw();return()=>cancelAnimationFrame(id);
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:999}}/>;
}

function LandingPage({onLogin}){
  const items=[
    {icon:"🎯",label:"Goals",desc:"Create and track every commitment you have"},
    {icon:"✅",label:"Tasks",desc:"Prioritize what matters. Check off what's done"},
    {icon:"📅",label:"Calendar",desc:"See your month at a glance. Never miss a deadline"},
    {icon:"⚡",label:"Schedule Builder",desc:"Input tasks and get an optimized daily plan"},
    {icon:"⏱",label:"Focus Timer",desc:"Deep work sessions with ambience sounds"},
    {icon:"📥",label:"Import from Claude",desc:"Paste any Claude plan — we parse it automatically"},
  ];
  return(
    <div style={{minHeight:"100vh",background:"#FFF",fontFamily:T.font,color:T.text}}>
      <div style={{width:"100%",height:220,background:"linear-gradient(135deg,#FFECD2 0%,#FCB69F 35%,#A1C4FD 65%,#C2E9FB 100%)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:.07,backgroundImage:"repeating-linear-gradient(90deg,#000 0,#000 3px,transparent 3px,transparent 70px),repeating-linear-gradient(180deg,#000 0,#000 1px,transparent 1px,transparent 40px)"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:60,background:"linear-gradient(to top,#fff,transparent)"}}/>
      </div>
      <div style={{maxWidth:860,margin:"0 auto",padding:"0 48px"}}>
        <div style={{fontSize:56,marginTop:-24,marginBottom:6,lineHeight:1}}>🎓</div>
        <div style={{fontSize:38,fontFamily:T.serif,fontWeight:600,color:"#1A1A2E",marginBottom:4}}>Meridian</div>
        <div style={{fontSize:15,color:T.textMute,marginBottom:28}}>Your college life, organized.</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${T.border}`,paddingBottom:10,marginBottom:32}}>
          <div style={{display:"flex",gap:4}}>
            {["Dashboard","Calendar","Tasks","Goals","Schedule"].map(t=>(
              <div key={t} style={{padding:"6px 14px",fontSize:13,color:T.textMute,borderRadius:4}}>{t}</div>
            ))}
          </div>
          <button onClick={onLogin} style={S.btn}>Sign in →</button>
        </div>
        <div style={{padding:"10px 14px",background:T.bgSoft,borderRadius:6,fontSize:13,color:T.textMid,marginBottom:28,display:"flex",gap:24,flexWrap:"wrap"}}>
          <span>📌 <strong style={{color:T.text}}>Major</strong> @ __ University</span>
          <span>📅 <strong style={{color:T.text}}>Semester</strong> Fall 2025</span>
          <span>🎯 <strong style={{color:T.text}}>Goals</strong> Active</span>
        </div>
        <div style={{fontSize:20,fontFamily:T.serif,fontWeight:600,color:T.text,marginBottom:12}}>📋 What's inside</div>
        <div style={{border:`1px solid ${T.border}`,borderRadius:8,overflow:"hidden",marginBottom:44}}>
          {items.map((item,i)=>(
            <div key={item.label} onClick={onLogin}
              style={{display:"flex",alignItems:"center",gap:14,padding:"12px 16px",
                background:ROW_COLORS[i%ROW_COLORS.length],
                borderBottom:i<items.length-1?`1px solid ${T.border}`:"none",cursor:"pointer"}}>
              <span style={{fontSize:18}}>{item.icon}</span>
              <span style={{fontSize:14,fontWeight:500,color:T.text,flex:1}}>{item.label}</span>
              <span style={{fontSize:13,color:T.textMute}}>{item.desc}</span>
              <span style={{fontSize:12,color:T.textMute}}>→</span>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",padding:"32px 0 56px"}}>
          <div style={{fontSize:28,fontFamily:T.serif,fontWeight:600,marginBottom:12,color:T.text}}>Your dashboard awaits.</div>
          <div style={{fontSize:15,color:T.textMute,marginBottom:28}}>Sign in to access your personal Meridian workspace.</div>
          <div style={{display:"flex",gap:12,justifyContent:"center"}}>
            <button onClick={onLogin} style={{...S.btn,padding:"12px 32px",fontSize:15}}>Get Started</button>
            <button onClick={onLogin} style={{...S.btnOut,padding:"12px 32px",fontSize:15}}>Sign In</button>
          </div>
        </div>
        <div style={{borderTop:`1px solid ${T.border}`,padding:"20px 0",display:"flex",justifyContent:"space-between"}}>
          <span style={{fontSize:12,color:T.textMute}}>© 2026 Chebiyyam</span>
          <span style={{fontSize:12,fontFamily:T.serif,fontStyle:"italic",color:T.textMute}}>Meridian</span>
        </div>
      </div>
    </div>
  );
}

function AuthScreen({onBack}){
  const [mode,setMode]=useState("login");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(false);
  const handle=async()=>{
    setError("");setMessage("");setLoading(true);
    if(mode==="login"){
      const{error}=await supabase.auth.signInWithPassword({email,password});
      if(error)setError(error.message);
    }else{
      const{error}=await supabase.auth.signUp({email,password});
      if(error)setError(error.message);
      else setMessage("Account created! Check your email to confirm, then sign in.");
    }
    setLoading(false);
  };
  return(
    <div style={{minHeight:"100vh",background:T.bgSoft,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.font}}>
      <div style={{width:420,padding:48,background:"#FFF",border:`1px solid ${T.border}`,borderRadius:14,boxShadow:"0 4px 32px rgba(0,0,0,0.08)"}}>
        <div style={{fontSize:36,marginBottom:4}}>🎓</div>
        <div style={{fontSize:28,fontFamily:T.serif,fontWeight:600,color:T.text,marginBottom:4}}>Meridian</div>
        <div style={{fontSize:14,color:T.textMute,marginBottom:32}}>Your college life, organized</div>
        {error&&<div style={{fontSize:13,color:T.red,marginBottom:14,padding:"10px 12px",background:"#FEE2E2",borderRadius:6}}>{error}</div>}
        {message&&<div style={{fontSize:13,color:T.green,marginBottom:14,padding:"10px 12px",background:"#DCFCE7",borderRadius:6}}>{message}</div>}
        {[["Email","email",email,setEmail],["Password","password",password,setPassword]].map(([lbl,type,val,set])=>(
          <div key={lbl} style={{marginBottom:14}}>
            <div style={S.label}>{lbl}</div>
            <input type={type} value={val} onChange={e=>set(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()} style={S.input}/>
          </div>
        ))}
        <button onClick={handle} disabled={loading} style={{...S.btn,width:"100%",padding:13,fontSize:15,marginTop:8}}>
          {loading?"...":mode==="login"?"Sign In":"Create Account"}
        </button>
        <div onClick={()=>{setMode(mode==="login"?"signup":"login");setError("");setMessage("");}}
          style={{fontSize:13,color:T.textMid,textAlign:"center",marginTop:20,cursor:"pointer"}}>
          {mode==="login"?"No account? Sign up →":"Have an account? Sign in →"}
        </div>
        {onBack&&<div onClick={onBack} style={{fontSize:12,color:T.textMute,textAlign:"center",marginTop:10,cursor:"pointer"}}>← Back to home</div>}
      </div>
    </div>
  );
}

function AIScheduler({user,refreshKey}){
  const [items,setItems]=useState([{name:"",hours:"",priority:"high",deadline:""}]);
  const [schedule,setSchedule]=useState(null);
  const [syncing,setSyncing]=useState(false);
  const isFirst=useRef(true);
  useEffect(()=>{
    (async()=>{
      const{data}=await supabase.from("schedules").select("*").eq("user_id",user.id).order("updated_at",{ascending:false}).limit(1);
      if(data&&data.length>0){if(data[0].items?.length>0)setItems(data[0].items);if(data[0].result)setSchedule(data[0].result);}
    })();
  },[user.id,refreshKey]);
  const save=async(ni,ns)=>{
    setSyncing(true);
    try{await supabase.from("schedules").upsert({user_id:user.id,items:ni,result:ns,updated_at:new Date().toISOString()},{onConflict:"user_id"});}catch(e){}
    setSyncing(false);
  };
  useEffect(()=>{
    if(isFirst.current){isFirst.current=false;return;}
    const t=setTimeout(()=>save(items,schedule),1000);return()=>clearTimeout(t);
  // eslint-disable-next-line
  },[items]);
  const addItem=()=>setItems(p=>[...p,{name:"",hours:"",priority:"high",deadline:""}]);
  const upd=(i,f,v)=>setItems(p=>p.map((t,idx)=>idx===i?{...t,[f]:v}:t));
  const rem=(i)=>setItems(p=>p.filter((_,idx)=>idx!==i));
  const build=()=>{
    const valid=items.filter(t=>t.name.trim()&&t.hours);if(!valid.length)return;
    const ps=p=>p==="high"?3:p==="med"?2:1;
    const us=d=>d<=1?10:d<=3?7:d<=7?5:d<=14?3:1;
    const now2=new Date();now2.setHours(0,0,0,0);
    const du=ds=>{if(!ds)return 999;const d=new Date(ds+"T00:00:00");return Math.ceil((d-now2)/86400000);};
    const scored=valid.map(t=>{const days=du(t.deadline);return{...t,days,hours:parseFloat(t.hours),score:ps(t.priority)*3+us(days)*2};}).sort((a,b)=>b.score-a.score);
    const r={scored};setSchedule(r);save(items,r);
  };
  const pc=p=>p==="high"?T.red:p==="med"?T.orange:T.green;
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{fontSize:13,color:T.textMid}}>Add everything you need to get done. We'll prioritize by urgency + importance.</div>
        {syncing&&<div style={{fontSize:12,color:T.accent}}>Saving…</div>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 0.7fr 0.8fr 1fr auto",gap:8,marginBottom:6}}>
        {["Task","Hours","Priority","Deadline",""].map((l,i)=><div key={i} style={{fontSize:11,fontWeight:600,color:T.textMute}}>{l}</div>)}
      </div>
      {items.map((task,i)=>(
        <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 0.7fr 0.8fr 1fr auto",gap:8,marginBottom:8,alignItems:"center"}}>
          <input style={S.input} placeholder="e.g. Write essay" value={task.name} onChange={e=>upd(i,"name",e.target.value)}/>
          <input style={S.input} placeholder="2" type="number" min="0.5" step="0.5" value={task.hours} onChange={e=>upd(i,"hours",e.target.value)}/>
          <select style={S.select} value={task.priority} onChange={e=>upd(i,"priority",e.target.value)}>
            <option value="high">High</option><option value="med">Medium</option><option value="low">Low</option>
          </select>
          <input style={S.input} type="date" min={new Date().toLocaleDateString('en-CA')} value={task.deadline} onChange={e=>upd(i,"deadline",e.target.value)}/>
          <button onClick={()=>rem(i)} style={{background:"none",border:"none",color:T.textMute,fontSize:18,cursor:"pointer",padding:"0 4px"}}>×</button>
        </div>
      ))}
      <div style={{display:"flex",gap:10,marginTop:16,marginBottom:32}}>
        <button style={S.btnOut} onClick={addItem}>+ Add Task</button>
        <button style={S.btn} onClick={build}>Build Schedule</button>
        <button style={S.btnOut} onClick={()=>save(items,schedule)} disabled={syncing}>{syncing?"Saving…":"Save"}</button>
      </div>
      {schedule&&(
        <div>
          <div style={{fontSize:14,fontWeight:600,color:T.text,marginBottom:12}}>Tackle In This Order</div>
          {schedule.scored.map((t,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${T.border}`}}>
              <div style={{fontSize:18,color:T.accent,fontWeight:600,width:24}}>{i+1}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,color:T.text}}>{t.name}</div>
                <div style={{fontSize:12,color:T.textMute,marginTop:2}}>{t.hours}h {t.days<999?`· due in ${t.days} day${t.days!==1?"s":""}`:""}</div>
              </div>
              <div style={{fontSize:11,fontWeight:500,padding:"2px 8px",borderRadius:4,background:pc(t.priority)+"18",color:pc(t.priority)}}>{t.priority}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FocusScreen({task,timerSeconds,timerRunning,setTimerRunning,focusComplete,ambience,setAmbience,focusMins,onExit,onMarkComplete,onNextSession}){
  const fmt=s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const pct=focusMins>0?Math.round(((focusMins*60-timerSeconds)/(focusMins*60))*100):0;
  return(
    <div style={{position:"fixed",inset:0,background:"#FAFAF8",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:T.font,zIndex:500}}>
      <button onClick={()=>onExit(true)} style={{position:"absolute",top:24,left:24,...S.btnOut}}>← Exit Focus</button>
      {task&&<div style={{fontSize:14,color:T.textMute,marginBottom:16,maxWidth:400,textAlign:"center"}}>Focusing on: <strong style={{color:T.text}}>{task.text}</strong></div>}
      <svg width={200} height={200} style={{marginBottom:24}}>
        <circle cx={100} cy={100} r={88} fill="none" stroke={T.border} strokeWidth={8}/>
        <circle cx={100} cy={100} r={88} fill="none" stroke={T.accent} strokeWidth={8}
          strokeDasharray={2*Math.PI*88} strokeDashoffset={2*Math.PI*88*(1-pct/100)}
          strokeLinecap="round" transform="rotate(-90 100 100)" style={{transition:"stroke-dashoffset 1s linear"}}/>
        <text x={100} y={112} textAnchor="middle" fontSize={36} fontFamily={T.serif} fill={T.text}>{fmt(timerSeconds)}</text>
      </svg>
      {!focusComplete?(
        <div style={{display:"flex",gap:12,marginBottom:32}}>
          <button style={S.btn} onClick={()=>setTimerRunning(r=>!r)}>{timerRunning?"Pause":"Resume"}</button>
          {task&&<button style={S.btnOut} onClick={onMarkComplete}>Mark Done ✓</button>}
        </div>
      ):(
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:18,fontFamily:T.serif,marginBottom:16}}>Session complete! 🎉</div>
          <div style={{display:"flex",gap:12,justifyContent:"center"}}>
            <button style={S.btn} onClick={onNextSession}>Next Session</button>
            {task&&<button style={S.btnOut} onClick={onMarkComplete}>Mark Done</button>}
            <button style={S.btnOut} onClick={()=>onExit(false)}>Done for now</button>
          </div>
        </div>
      )}
      <div style={{fontSize:12,color:T.textMute,marginBottom:10}}>Ambience</div>
      <div style={{display:"flex",gap:8}}>
        {[["🟤","brown","Brown"],["⬜","white","White"],["🩷","pink","Pink"],["🔇","off","Off"]].map(([icon,val,lbl])=>(
          <button key={val} onClick={()=>setAmbience(ambience===val||val==="off"?null:val)}
            style={{padding:"6px 14px",background:ambience===val?T.accentBg:"transparent",
              color:ambience===val?T.accent:T.textMute,border:`1px solid ${ambience===val?T.accent:T.border}`,
              borderRadius:20,fontSize:12,cursor:"pointer",fontFamily:T.font}}>
            {icon} {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}

function MeridianApp({user}){
  const [view,setView]=useState(()=>{const h=window.location.hash.replace("#","");return["dashboard","calendar","tasks","goals","scheduler"].includes(h)?h:"dashboard";});
  const navigate=v=>{setView(v);window.location.hash=v;};

  const [focusMode,setFocusMode]=useState(false);
  const [focusTask,setFocusTask]=useState(null);
  const [focusSession,setFocusSession]=useState(1);
  const [focusMins,setFocusMins]=useState(25);
  const [focusComplete,setFocusComplete]=useState(false);
  const [ambience,setAmbience]=useState(null);
  const ambienceRef=useRef(null);

  const [timerMode,setTimerMode]=useState(null);
  const [timerSeconds,setTimerSeconds]=useState(0);
  const [timerRunning,setTimerRunning]=useState(false);
  const [customMinutes,setCustomMinutes]=useState(30);
  const timerRef=useRef(null);

  const [goals,setGoals]=useState([]);
  const [tasks,setTasks]=useState([]);
  const [events,setEvents]=useState([]);
  const [loading,setLoading]=useState(true);
  const [stats,setStats]=useState({xp:0,level:1,streak:0,deep_work_minutes:0});

  const [showConfetti,setShowConfetti]=useState(false);
  const [xpPopup,setXpPopup]=useState(null);
  const [soundEnabled,setSoundEnabled]=useState(true);
  const [nonNegotiables,setNonNegotiables]=useState([]);
  const [showImport,setShowImport]=useState(false);
  const [showNNPicker,setShowNNPicker]=useState(false);
  const [importText,setImportText]=useState("");
  const [importParsed,setImportParsed]=useState(null);
  const [importLoading,setImportLoading]=useState(false);
  const [importError,setImportError]=useState("");
  const [nnComplete,setNnComplete]=useState(false);
  const [weeklySnapshots,setWeeklySnapshots]=useState([]);
  const [showWeeklyReport,setShowWeeklyReport]=useState(false);
  const [performanceScore,setPerformanceScore]=useState(null);
  const [fallingOff,setFallingOff]=useState(false);
  const [showMilestone,setShowMilestone]=useState(null);
  const [showAllGoals,setShowAllGoals]=useState(false);
  const [showFocusPicker,setShowFocusPicker]=useState(false);
  const [allTasksComplete,setAllTasksComplete]=useState(false);

  const today=new Date();
  const [calMonth,setCalMonth]=useState(today.getMonth());
  const [calYear,setCalYear]=useState(today.getFullYear());
  const [selectedDate,setSelectedDate]=useState(null);

  const [showAddTask,setShowAddTask]=useState(false);
  const [showAddEvent,setShowAddEvent]=useState(false);
  const [showAddGoal,setShowAddGoal]=useState(false);
  const [newTask,setNewTask]=useState({text:"",goal_id:"",due:"",priority:"med",hours:"",recurring:[]});
  const [newEvent,setNewEvent]=useState({title:"",goal_id:"",date:"",time:""});
  const [newGoal,setNewGoal]=useState({label:"",color:"#E53935",deadline:""});
  const [editEvent,setEditEvent]=useState(null);
  const [editTask,setEditTask]=useState(null);

  const [examNotifs,setExamNotifs]=useState([]);
  const [notifDismissed,setNotifDismissed]=useState(false);
  const [nextExam,setNextExam]=useState(null);

  const [quoteIdx,setQuoteIdx]=useState(()=>Math.floor(Math.random()*QUOTES.length));
  const [greeting]=useState(getGreeting());

  const todayStr=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

  useEffect(()=>{fetchAll();fetchStats();},[]);

  const fetchStats=async()=>{
    const{data}=await supabase.from("user_stats").select("*").eq("user_id",user.id).maybeSingle();
    if(data){
      const td=new Date().toLocaleDateString('en-CA');
      if(data.deep_work_date!==td){const u={...data,deep_work_today:0,deep_work_date:td};setStats(u);supabase.from("user_stats").update({deep_work_today:0,deep_work_date:td}).eq("user_id",user.id);}
      else setStats(data);
      if(data.non_negotiables&&Array.isArray(data.non_negotiables)){
        const td2=new Date().toLocaleDateString('en-CA');
        if(data.nn_date===td2)setNonNegotiables(data.non_negotiables);
        else{setNonNegotiables([]);supabase.from("user_stats").update({non_negotiables:[],nn_date:null}).eq("user_id",user.id);}
      }
    }else{const{data:ns}=await supabase.from("user_stats").insert({user_id:user.id}).select().single();if(ns)setStats(ns);}
    const{data:snaps}=await supabase.from("daily_snapshots").select("*").eq("user_id",user.id).order("date",{ascending:false}).limit(7);
    if(snaps){
      setWeeklySnapshots(snaps);
      if(snaps.length>0){
        const avg=Math.round(snaps.reduce((a,s)=>a+s.score,0)/snaps.length);setPerformanceScore(avg);
        if(snaps.slice(0,2).length===2&&snaps.slice(0,2).every(s=>s.score<30))setFallingOff(true);
      }
      const lw=localStorage.getItem("meridian_weekly_shown");
      const tw=new Date().toLocaleDateString('en-CA',{year:'numeric',month:'2-digit',day:'2-digit'}).slice(0,7);
      if(new Date().getDay()===0&&snaps.length>=5&&lw!==tw){setShowWeeklyReport(true);localStorage.setItem("meridian_weekly_shown",tw);}
    }
  };

  const saveDailySnapshot=async(all)=>{
    const td=new Date().toLocaleDateString('en-CA');
    const tday=new Date().toLocaleDateString('en-US',{weekday:'short'}).toLowerCase();
    const tt=all.filter(t=>{if(t.due===td)return true;if(!t.recurring)return false;try{const d=JSON.parse(t.recurring);return Array.isArray(d)&&d.includes(tday);}catch{return false;}});
    const total=tt.length,completed=tt.filter(t=>t.done).length,score=total>0?Math.round((completed/total)*100):0;
    await supabase.from("daily_snapshots").upsert({user_id:user.id,date:td,total_tasks:total,completed_tasks:completed,score},{onConflict:"user_id,date"});
  };

  const checkMilestones=all=>{
    const done=all.filter(t=>t.done).length;
    const ms=[{count:1,label:"First Step",emoji:"🚀"},{count:5,label:"Getting Going",emoji:"⚡"},{count:10,label:"In The Zone",emoji:"🎯"},{count:25,label:"On A Roll",emoji:"🔥"},{count:50,label:"Half Century",emoji:"💎"},{count:100,label:"Century",emoji:"👑"}];
    const hit=ms.find(m=>m.count===done);if(hit)setShowMilestone(hit);
  };

  const playSound=()=>{
    if(!soundEnabled)return;
    try{
      const ctx=new(window.AudioContext||window.webkitAudioContext)();
      [392,440,523].forEach((freq,i)=>{
        const o=ctx.createOscillator(),g=ctx.createGain();
        o.connect(g);g.connect(ctx.destination);o.type="sine";
        o.frequency.setValueAtTime(freq,ctx.currentTime+i*0.15);
        g.gain.setValueAtTime(0,ctx.currentTime+i*0.15);
        g.gain.linearRampToValueAtTime(0.18,ctx.currentTime+i*0.15+0.05);
        g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+i*0.15+0.6);
        o.start(ctx.currentTime+i*0.15);o.stop(ctx.currentTime+i*0.15+0.6);
      });
    }catch(e){}
  };

  const triggerXpPopup=a=>{setXpPopup(a);setTimeout(()=>setXpPopup(null),1500);};

  const addXp=async amount=>{
    const nx=Math.max(0,(stats.xp||0)+amount),nl=Math.floor(nx/100)+1;
    const updated={...stats,xp:nx,level:nl};setStats(updated);triggerXpPopup(amount);
    await supabase.from("user_stats").upsert({...updated,user_id:user.id},{onConflict:"user_id"});
    return updated;
  };

  const updateStreak=async current=>{
    const base=current||stats;
    const td=new Date().toLocaleDateString('en-CA');
    const yest=new Date(Date.now()-86400000).toLocaleDateString('en-CA');
    let streak=base.streak||0;
    if(base.last_completed_date===yest)streak+=1;
    else if(base.last_completed_date!==td)streak=1;
    const updated={...base,streak,last_completed_date:td};setStats(updated);
    await supabase.from("user_stats").upsert({...updated,user_id:user.id},{onConflict:"user_id"});
  };

  useEffect(()=>{
    if(timerRunning&&timerSeconds>0){timerRef.current=setTimeout(()=>setTimerSeconds(s=>s-1),1000);}
    else if(timerRunning&&timerSeconds===0){
      setTimerRunning(false);playSound();
      const mins=timerMode===25?25:timerMode===50?50:focusMins;
      const nmt=(stats.deep_work_minutes||0)+mins,ntt=(stats.deep_work_today||0)+mins;
      const nx=focusMode?Math.max(0,(stats.xp||0)+50):(stats.xp||0);
      const updated={...stats,deep_work_minutes:nmt,deep_work_today:ntt,deep_work_date:new Date().toLocaleDateString('en-CA'),xp:nx,level:Math.floor(nx/100)+1};
      setStats(updated);if(focusMode){triggerXpPopup(50);setFocusComplete(true);}
      supabase.from("user_stats").upsert({...updated,user_id:user.id},{onConflict:"user_id"});
    }
    return()=>clearTimeout(timerRef.current);
  // eslint-disable-next-line
  },[timerRunning,timerSeconds]);

  useEffect(()=>{
    if(!ambience){if(ambienceRef.current){ambienceRef.current.stop?.();ambienceRef.current=null;}return;}
    try{
      const ctx=new(window.AudioContext||window.webkitAudioContext)();
      const bs=ctx.sampleRate*3,buf=ctx.createBuffer(1,bs,ctx.sampleRate),data=buf.getChannelData(0);
      if(ambience==="white"){for(let i=0;i<bs;i++)data[i]=Math.random()*2-1;}
      else if(ambience==="brown"){let last=0;for(let i=0;i<bs;i++){const w=Math.random()*2-1;data[i]=(last+(0.02*w))/1.02;last=data[i];data[i]*=3.5;}}
      else if(ambience==="pink"){let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;for(let i=0;i<bs;i++){const w=Math.random()*2-1;b0=0.99886*b0+w*0.0555179;b1=0.99332*b1+w*0.0750759;b2=0.96900*b2+w*0.1538520;b3=0.86650*b3+w*0.3104856;b4=0.55000*b4+w*0.5329522;b5=-0.7616*b5-w*0.0168980;data[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.11;b6=w*0.115926;}}
      const src=ctx.createBufferSource();src.buffer=buf;src.loop=true;
      const gain=ctx.createGain();gain.gain.value=0.6;src.connect(gain);gain.connect(ctx.destination);src.start();
      ambienceRef.current={stop:()=>{try{src.stop();ctx.close();}catch(e){}}};
    }catch(e){}
    return()=>{if(ambienceRef.current){ambienceRef.current.stop?.();ambienceRef.current=null;}};
  // eslint-disable-next-line
  },[ambience]);

  const enterFocusMode=(task,mins=25)=>{setFocusTask(task);setFocusMins(mins);setFocusComplete(false);setFocusMode(true);setTimerMode(mins);setTimerSeconds(mins*60);setTimerRunning(true);};
  const exitFocusMode=()=>{setTimerRunning(false);setTimerSeconds(0);setFocusMode(false);setFocusTask(null);setFocusComplete(false);setAmbience(null);};

  useEffect(()=>{
    const tt=tasks.filter(t=>t.due===todayStr);
    if(tt.length>0&&tt.every(t=>t.done)&&!allTasksComplete){setAllTasksComplete(true);setShowConfetti(true);playSound();setTimeout(()=>setShowConfetti(false),4000);}
    else if(tt.length===0||!tt.every(t=>t.done))setAllTasksComplete(false);
  // eslint-disable-next-line
  },[tasks]);

  const isExam=title=>{const t=(title||"").toLowerCase();return t.includes("exam")||t.includes("test")||t.includes("ap ")||t.includes("final")||t.includes("quiz");};
  useEffect(()=>{
    if(!events.length)return;
    const now2=new Date();now2.setHours(0,0,0,0);
    const td2=now2.toLocaleDateString('en-CA');
    if(localStorage.getItem("meridian_notif_dismissed")===td2)setNotifDismissed(true);
    const upcoming=events.filter(e=>{if(!isExam(e.title))return false;const d=new Date(e.date+"T00:00:00");return Math.ceil((d-now2)/86400000)>=0&&Math.ceil((d-now2)/86400000)<=15;});
    const byDate={};upcoming.forEach(e=>{if(!byDate[e.date])byDate[e.date]=[];byDate[e.date].push(e);});
    setExamNotifs(Object.entries(byDate).map(([date,evs])=>({date,events:evs,daysLeft:Math.ceil((new Date(date+"T00:00:00")-now2)/86400000)})).sort((a,b)=>a.daysLeft-b.daysLeft));
    const ae=events.filter(e=>isExam(e.title)&&new Date(e.date+"T00:00:00")>=now2).sort((a,b)=>a.date.localeCompare(b.date));
    if(ae.length){const n=ae[0];setNextExam({...n,daysLeft:Math.ceil((new Date(n.date+"T00:00:00")-now2)/86400000)});}
    else setNextExam(null);
  // eslint-disable-next-line
  },[events]);

  const dismissNotif=()=>{localStorage.setItem("meridian_notif_dismissed",new Date().toLocaleDateString('en-CA'));setNotifDismissed(true);};

  const fetchAll=async()=>{
    setLoading(true);
    const [{data:g},{data:t},{data:e}]=await Promise.all([supabase.from("goals").select("*").order("created_at"),supabase.from("tasks").select("*").order("created_at"),supabase.from("events").select("*").order("date")]);
    setGoals(g||[]);setEvents(e||[]);
    const all=t||[];const td=new Date().toLocaleDateString('en-CA');const tday=new Date().toLocaleDateString('en-US',{weekday:'short'}).toLowerCase();
    const lr=localStorage.getItem("meridian_last_reset");
    if(lr!==td){
      const toReset=all.filter(task=>{if(!task.recurring||!task.done)return false;try{const d=JSON.parse(task.recurring);return Array.isArray(d)&&d.length>0&&d.includes(tday);}catch{return false;}});
      if(toReset.length>0){await Promise.all(toReset.map(task=>supabase.from("tasks").update({done:false}).eq("id",task.id)));const ids=toReset.map(t=>t.id);setTasks(all.map(t=>ids.includes(t.id)?{...t,done:false}:t));}
      else setTasks(all);
      localStorage.setItem("meridian_last_reset",td);
    }else setTasks(all);
    setLoading(false);
  };

  const addGoal=async()=>{if(!newGoal.label.trim())return;const{data}=await supabase.from("goals").insert({...newGoal,user_id:user.id}).select().single();if(data){setGoals([...goals,data]);setNewGoal({label:"",color:"#E53935",deadline:""});setShowAddGoal(false);}};
  const deleteGoal=async id=>{await supabase.from("goals").delete().eq("id",id);setGoals(goals.filter(g=>g.id!==id));setTasks(tasks.filter(t=>t.goal_id!==id));setEvents(events.filter(e=>e.goal_id!==id));};

  const toggleTask=async task=>{
    const{data}=await supabase.from("tasks").update({done:!task.done}).eq("id",task.id).select().single();
    if(data){
      const updated=tasks.map(t=>t.id===task.id?data:t);setTasks(updated);
      if(!task.done){playSound();const us=await addXp(10);await updateStreak(us);saveDailySnapshot(updated);checkMilestones(updated);setFallingOff(false);
        const{data:sched}=await supabase.from("schedules").select("*").eq("user_id",user.id).maybeSingle();
        if(sched?.items)await supabase.from("schedules").update({items:sched.items.filter(i=>i.name!==task.text),updated_at:new Date().toISOString()}).eq("user_id",user.id);
      }else saveDailySnapshot(updated);
    }
  };
  const deleteTask=async id=>{await supabase.from("tasks").delete().eq("id",id);setTasks(tasks.filter(t=>t.id!==id));};
  const saveEditTask=async()=>{
    if(!editTask)return;
    const rv=Array.isArray(editTask.recurring)&&editTask.recurring.length>0?JSON.stringify(editTask.recurring):null;
    const{data}=await supabase.from("tasks").update({text:editTask.text,goal_id:editTask.goal_id,due:editTask.due,priority:editTask.priority,hours:editTask.hours,recurring:rv}).eq("id",editTask.id).select().single();
    if(data){setTasks(tasks.map(t=>t.id===data.id?data:t));setEditTask(null);}
  };
  const addTask=async()=>{
    if(!newTask.text.trim()||!newTask.goal_id)return;
    const td={text:newTask.text,goal_id:newTask.goal_id,due:newTask.due||null,priority:newTask.priority,user_id:user.id,done:false};
    if(newTask.hours)td.hours=parseFloat(newTask.hours);
    if(newTask.recurring?.length>0)td.recurring=JSON.stringify(newTask.recurring);
    const{data}=await supabase.from("tasks").insert(td).select().single();
    if(data){
      setTasks([...tasks,data]);setNewTask({text:"",goal_id:"",due:"",priority:"med",hours:"",recurring:[]});setShowAddTask(false);
      if(newTask.hours){const si={name:newTask.text,hours:String(newTask.hours),priority:newTask.priority,deadline:newTask.due||""};const{data:ex}=await supabase.from("schedules").select("*").eq("user_id",user.id).maybeSingle();if(ex)await supabase.from("schedules").update({items:[...(ex.items||[]),si],updated_at:new Date().toISOString()}).eq("user_id",user.id);else await supabase.from("schedules").insert({user_id:user.id,items:[si],result:null});}
    }
  };
  const addEvent=async()=>{if(!newEvent.title.trim()||!newEvent.date||!newEvent.goal_id)return;const{data}=await supabase.from("events").insert({...newEvent,user_id:user.id}).select().single();if(data){setEvents([...events,data]);setNewEvent({title:"",goal_id:goals[0]?.id||"",date:"",time:""});setShowAddEvent(false);}};
  const deleteEvent=async id=>{await supabase.from("events").delete().eq("id",id);setEvents(events.filter(e=>e.id!==id));};
  const saveEditEvent=async()=>{if(!editEvent)return;const{data}=await supabase.from("events").update({title:editEvent.title,date:editEvent.date,time:editEvent.time,goal_id:editEvent.goal_id}).eq("id",editEvent.id).select().single();if(data){setEvents(events.map(e=>e.id===data.id?data:e));setEditEvent(null);}};
  const signOut=()=>supabase.auth.signOut();
  const nextQuote=()=>setQuoteIdx(i=>(i+1)%QUOTES.length);

  const parseWithClaude=async()=>{
    if(!importText.trim())return;setImportLoading(true);setImportError("");setImportParsed(null);
    try{
      const colors=["#E53935","#1E88E5","#43A047","#FB8C00","#8E24AA","#00ACC1","#D81B60","#7CB342","#3949AB","#FFB300","#00BCD4","#F4511E","#26A69A","#7986CB","#EC407A","#29B6F6","#8D9B6A","#BF5700","#FF6B6B","#6D4C41"];
      const pg=[],pt=[];let cg=null,ci=0;
      for(const line of importText.split("\n").map(l=>l.trim()).filter(Boolean)){
        const isG=line.startsWith("Goal:")||(!line.startsWith("*")&&!line.startsWith("-")&&!line.startsWith("•")&&line.endsWith(":"))||(!line.startsWith("*")&&!line.startsWith("-")&&!line.startsWith("•")&&line.includes("—")&&line.length<80);
        if(isG){const label=line.replace(/^Goal:\s*/i,"").replace(/:$/,"").replace(/\s*—.*$/,"").trim();if(label){cg={label,color:colors[ci%colors.length],deadline:null};ci++;if(!pg.find(g=>g.label===label))pg.push(cg);}continue;}
        const isT=line.startsWith("*")||line.startsWith("-")||line.startsWith("•");
        if(isT&&cg){
          let text=line.replace(/^[*\-•]\s*/,"").trim(),due=null;
          const dm=text.match(/—\s*due\s+([A-Za-z]+\s+\d+)/i)||text.match(/due\s+([A-Za-z]+\s+\d+)/i);
          if(dm){const p=new Date(`${dm[1]} 2026`);if(!isNaN(p))due=p.toLocaleDateString('en-CA');text=text.replace(/\s*—?\s*due\s+[A-Za-z]+\s+\d+/i,"").trim();}
          let priority="med";
          if(/high priority/i.test(text)){priority="high";text=text.replace(/,?\s*high priority/i,"").trim();}
          else if(/low priority/i.test(text)){priority="low";text=text.replace(/,?\s*low priority/i,"").trim();}
          else if(/past exam|practice test/i.test(text))priority="high";
          if(text)pt.push({text,goal:cg.label,priority,due});
        }
      }
      if(pg.length===0){setImportError("Couldn't detect goals. Make sure each goal line ends with a colon.");setImportLoading(false);return;}
      setImportParsed({goals:pg,tasks:pt});
    }catch(e){setImportError("Something went wrong. Try again.");}
    setImportLoading(false);
  };

  const importAll=async()=>{
    if(!importParsed)return;setImportLoading(true);
    const fuzz=label=>{const words=label.toLowerCase().split(/\s+/).filter(w=>w.length>2);return goals.find(eg=>{const el=eg.label.toLowerCase();if(el===label.toLowerCase())return true;if(label.toLowerCase().includes(el)||el.includes(label.toLowerCase()))return true;return words.some(w=>el.includes(w));});};
    const gm={};
    for(const g of importParsed.goals){const ex=fuzz(g.label);if(ex){gm[g.label]=ex.id;continue;}const{data}=await supabase.from("goals").insert({label:g.label,color:g.color,deadline:g.deadline||null,user_id:user.id}).select().single();if(data)gm[g.label]=data.id;}
    const{data:ng}=await supabase.from("goals").select("*").order("created_at");if(ng)setGoals(ng);
    const na=[];
    for(const t of importParsed.tasks){const gid=gm[t.goal];if(!gid)continue;const{data}=await supabase.from("tasks").insert({text:t.text,goal_id:gid,priority:t.priority||"med",due:t.due||null,done:false,user_id:user.id}).select().single();if(data)na.push(data);}
    setTasks(prev=>[...prev,...na]);setImportLoading(false);setShowImport(false);setImportText("");setImportParsed(null);
  };

  const seedData=async()=>{
    setImportLoading(true);
    const colors=["#E53935","#1E88E5","#43A047","#FB8C00","#8E24AA","#00ACC1","#D81B60","#7CB342","#3949AB","#FFB300","#00BCD4","#F4511E"];
    const gd=[{label:"AP Gov",color:colors[0],deadline:"2026-05-05"},{label:"AP Macro",color:colors[1],deadline:"2026-05-08"},{label:"AP Calc BC",color:colors[2],deadline:"2026-05-11"},{label:"AP Physics C Mech",color:colors[3],deadline:"2026-05-13"},{label:"AP Physics C E&M",color:colors[4],deadline:"2026-05-14"},{label:"Oxford Research",color:colors[5],deadline:"2026-05-20"},{label:"PHYS 206",color:colors[6],deadline:"2026-08-24"},{label:"MATH 251",color:colors[7],deadline:"2026-08-24"},{label:"STAT 211",color:colors[8],deadline:"2026-08-24"},{label:"ENGR 102",color:colors[9],deadline:"2026-08-24"},{label:"POLS 207",color:colors[10],deadline:"2026-08-24"},{label:"Discipline",color:colors[11],deadline:null}];
    const ig=[];
    for(const g of gd){const ex=(await supabase.from("goals").select("*").eq("user_id",user.id).eq("label",g.label).maybeSingle()).data;if(ex)ig.push(ex);else{const{data}=await supabase.from("goals").insert({...g,user_id:user.id}).select().single();if(data)ig.push(data);}}
    const fG=name=>ig.find(g=>g.label.toLowerCase()===name.toLowerCase())||ig.find(g=>name.toLowerCase().split(/\s+/).filter(w=>w.length>2).every(w=>g.label.toLowerCase().includes(w)));
    const td=[{goal:"AP Gov",text:"Unit 4 review",due:"2026-04-05",priority:"med"},{goal:"AP Gov",text:"Unit 5 review",due:"2026-04-10",priority:"med"},{goal:"AP Gov",text:"Units 1-3 revision",due:"2026-04-12",priority:"high"},{goal:"AP Gov",text:"Past exam 1",due:"2026-04-15",priority:"high"},{goal:"AP Gov",text:"Past exam 2",due:"2026-04-20",priority:"high"},{goal:"AP Gov",text:"Past exam 3",due:"2026-04-25",priority:"high"},{goal:"AP Gov",text:"Past exam 4",due:"2026-05-01",priority:"high"},{goal:"AP Macro",text:"Unit 1 review",due:"2026-04-03",priority:"med"},{goal:"AP Macro",text:"Unit 2 review",due:"2026-04-05",priority:"med"},{goal:"AP Macro",text:"Unit 3 review",due:"2026-04-07",priority:"med"},{goal:"AP Macro",text:"Unit 4 review",due:"2026-04-09",priority:"med"},{goal:"AP Macro",text:"Unit 5 review",due:"2026-04-11",priority:"med"},{goal:"AP Macro",text:"Unit 6 review",due:"2026-04-13",priority:"med"},{goal:"AP Macro",text:"Past exam 1",due:"2026-04-15",priority:"high"},{goal:"AP Macro",text:"Past exam 2",due:"2026-04-20",priority:"high"},{goal:"AP Macro",text:"Past exam 3",due:"2026-04-25",priority:"high"},{goal:"AP Macro",text:"Past exam 4",due:"2026-05-05",priority:"high"},{goal:"AP Calc BC",text:"Practice test 1",due:"2026-04-03",priority:"high"},{goal:"AP Calc BC",text:"Practice test 2",due:"2026-04-08",priority:"high"},{goal:"AP Calc BC",text:"Practice test 3",due:"2026-04-13",priority:"high"},{goal:"AP Calc BC",text:"Practice test 4",due:"2026-04-18",priority:"high"},{goal:"AP Calc BC",text:"Practice test 5",due:"2026-04-25",priority:"high"},{goal:"AP Calc BC",text:"Practice test 6",due:"2026-05-05",priority:"high"},{goal:"AP Physics C Mech",text:"Work and energy theorem",due:"2026-04-03",priority:"med"},{goal:"AP Physics C Mech",text:"Potential energy and conservation",due:"2026-04-05",priority:"med"},{goal:"AP Physics C Mech",text:"Conservation of linear momentum",due:"2026-04-07",priority:"med"},{goal:"AP Physics C Mech",text:"Rotational motion",due:"2026-04-09",priority:"med"},{goal:"AP Physics C Mech",text:"Torque and angular momentum",due:"2026-04-11",priority:"med"},{goal:"AP Physics C Mech",text:"Harmonic motion",due:"2026-04-13",priority:"med"},{goal:"AP Physics C Mech",text:"Past exam 1",due:"2026-04-15",priority:"high"},{goal:"AP Physics C Mech",text:"Past exam 2",due:"2026-04-20",priority:"high"},{goal:"AP Physics C Mech",text:"Past exam 3",due:"2026-04-25",priority:"high"},{goal:"AP Physics C Mech",text:"Past exam 4",due:"2026-05-01",priority:"high"},{goal:"AP Physics C Mech",text:"Past exam 5",due:"2026-05-08",priority:"high"},{goal:"AP Physics C E&M",text:"Past exam 1",due:"2026-04-03",priority:"high"},{goal:"AP Physics C E&M",text:"Past exam 2",due:"2026-04-08",priority:"high"},{goal:"AP Physics C E&M",text:"Past exam 3",due:"2026-04-13",priority:"high"},{goal:"AP Physics C E&M",text:"Past exam 4",due:"2026-04-20",priority:"high"},{goal:"AP Physics C E&M",text:"Past exam 5",due:"2026-05-01",priority:"high"},{goal:"AP Physics C E&M",text:"Past exam 6",due:"2026-05-08",priority:"high"},{goal:"Oxford Research",text:"Finish 3B1B neural networks",due:"2026-04-10",priority:"high"},{goal:"Oxford Research",text:"StatQuest CNN series complete",due:"2026-04-25",priority:"high"},{goal:"Oxford Research",text:"Read Oxford paper 1",due:"2026-05-01",priority:"med"},{goal:"Discipline",text:"Morning workout",due:null,priority:"high",recurring:JSON.stringify(["mon","tue","wed","thu","fri","sat","sun"])},{goal:"Discipline",text:"10-min meditation",due:null,priority:"med",recurring:JSON.stringify(["mon","tue","wed","thu","fri","sat","sun"])}];
    for(const t of td){const g=fG(t.goal);if(!g)continue;await supabase.from("tasks").insert({text:t.text,goal_id:g.id,priority:t.priority,due:t.due||null,done:false,recurring:t.recurring||null,user_id:user.id});}
    await fetchAll();setImportLoading(false);setShowImport(false);
  };

  const seedSubtasks=async()=>{
    setImportLoading(true);
    const st=[{goal:"AP Gov",text:"Units 1-3 quick recall",due:"2026-04-11",priority:"high"},{goal:"AP Macro",text:"Unit 3 review extra",due:"2026-04-07",priority:"med"},{goal:"AP Calc BC",text:"Practice test 6 timed",due:"2026-04-25",priority:"high"},{goal:"AP Physics C Mech",text:"Past exam 2 timed",due:"2026-04-20",priority:"high"},{goal:"AP Physics C E&M",text:"Past exam 3 full timed",due:"2026-04-12",priority:"high"},{goal:"Oxford Research",text:"3B1B neural networks 30min",due:null,priority:"high",recurring:JSON.stringify(["mon","tue","wed","thu","fri","sat","sun"])}];
    const{data:cg}=await supabase.from("goals").select("*").eq("user_id",user.id);
    const fG=name=>{if(!cg)return null;const ex=cg.find(g=>g.label.toLowerCase()===name.toLowerCase());if(ex)return ex;const w=name.toLowerCase().split(/\s+/).filter(w=>w.length>2);return cg.find(g=>w.every(w=>g.label.toLowerCase().includes(w)));};
    for(const t of st){const g=fG(t.goal);if(!g)continue;await supabase.from("tasks").insert({text:t.text,goal_id:g.id,priority:t.priority,due:t.due||null,done:false,recurring:t.recurring||null,user_id:user.id});}
    const{data:nt}=await supabase.from("tasks").select("*").order("created_at");if(nt)setTasks(nt);
    setImportLoading(false);setShowImport(false);
  };

  const goalColor=id=>goals.find(g=>g.id===id)?.color||"#9B9A97";
  const goalLabel=id=>goals.find(g=>g.id===id)?.label||"?";
  const pendingTasks=tasks.filter(t=>!t.done);
  const doneTasks=tasks.filter(t=>t.done);
  const completionRate=tasks.length?Math.round((doneTasks.length/tasks.length)*100):0;
  const futureEvents=events.filter(e=>e.date>=todayStr);
  const eventsForDate=ds=>futureEvents.filter(e=>e.date===ds);
  const todayEvents=eventsForDate(todayStr);
  const upcomingTasks=pendingTasks.filter(t=>t.due).sort((a,b)=>new Date(a.due)-new Date(b.due)).slice(0,5);
  const daysInMonth=getDaysInMonth(calYear,calMonth);
  const firstDay=getFirstDay(calYear,calMonth);
  const calDs=day=>`${calYear}-${String(calMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
  const noGoals=goals.length===0;

  const badge=p=>({fontSize:11,fontWeight:500,padding:"2px 8px",borderRadius:4,flexShrink:0,background:p==="high"?"#FEE2E2":p==="med"?"#FEF3C7":"#DCFCE7",color:p==="high"?T.red:p==="med"?T.orange:T.green});
  const dot=id=>({width:8,height:8,borderRadius:"50%",background:goalColor(id),flexShrink:0,marginTop:4});
  const fill=(pct,color)=>({height:4,width:`${pct}%`,background:color||T.accent,transition:"width 0.6s",borderRadius:2});
  const chip=id=>({fontSize:12,padding:"4px 10px",background:goalColor(id)+"18",color:goalColor(id),borderLeft:`3px solid ${goalColor(id)}`,marginBottom:6,display:"flex",justifyContent:"space-between",borderRadius:"0 4px 4px 0"});
  const taskRow=done=>({display:"flex",alignItems:"flex-start",gap:12,padding:"10px 14px",borderBottom:`1px solid ${T.border}`,opacity:done?0.5:1,cursor:"pointer"});
  const chk=done=>({width:16,height:16,border:`1.5px solid ${done?T.accent:T.border}`,background:done?T.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2,borderRadius:3});
  const dayCell=(isToday,isSel)=>({aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",padding:"6px 4px",borderRadius:6,background:isToday?T.accentBg:isSel?"#EFF6FF":"transparent",color:isToday?T.accent:T.text,cursor:"pointer",fontSize:12});

  if(loading)return(
    <div style={{minHeight:"100vh",background:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.font}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:40,marginBottom:12}}>🎓</div>
        <div style={{fontSize:20,fontFamily:T.serif,color:T.text}}>Meridian</div>
        <div style={{fontSize:13,color:T.textMute,marginTop:6}}>Loading your workspace…</div>
      </div>
    </div>
  );

  const isMobile=window.innerWidth<768;

  return(
    <div style={{minHeight:"100vh",background:"#FFFFFF",fontFamily:T.font,color:T.text}}>
      {showConfetti&&<Confetti/>}
      {xpPopup&&<div style={{position:"fixed",top:20,right:20,background:T.accent,color:"#FFF",padding:"8px 16px",borderRadius:8,fontSize:14,fontWeight:600,zIndex:999,pointerEvents:"none"}}>+{xpPopup} XP</div>}
      {focusMode&&<FocusScreen task={focusTask} timerSeconds={timerSeconds} timerRunning={timerRunning} setTimerRunning={setTimerRunning} focusComplete={focusComplete} ambience={ambience} setAmbience={setAmbience} focusMins={focusMins} onExit={exitFocusMode} onMarkComplete={()=>{if(focusTask)toggleTask(focusTask);exitFocusMode();}} onNextSession={()=>{setFocusSession(s=>s+1);setFocusComplete(false);setTimerSeconds(focusMins*60);setTimerRunning(true);}}/>}

      {/* COVER */}
      <div style={{width:"100%",height:isMobile?110:180,background:"linear-gradient(135deg,#FFECD2 0%,#FCB69F 30%,#A1C4FD 70%,#C2E9FB 100%)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:.07,backgroundImage:"repeating-linear-gradient(90deg,#000 0,#000 3px,transparent 3px,transparent 70px),repeating-linear-gradient(180deg,#000 0,#000 1px,transparent 1px,transparent 40px)"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:50,background:"linear-gradient(to top,#fff,transparent)"}}/>
      </div>

      {/* PAGE WRAPPER */}
      <div style={{maxWidth:920,margin:"0 auto",padding:isMobile?"0 16px":"0 56px"}}>
        <div style={{fontSize:isMobile?44:56,marginTop:-22,lineHeight:1,marginBottom:6}}>🎓</div>
        <div style={{fontSize:isMobile?26:34,fontFamily:T.serif,fontWeight:600,color:"#1A1A2E",marginBottom:2}}>Meridian</div>
        <div style={{fontSize:14,color:T.textMute,marginBottom:16}}>Your college life, organized</div>

        {/* PROPERTY BAR */}
        <div style={{display:"flex",gap:20,flexWrap:"wrap",padding:"10px 14px",background:T.bgSoft,borderRadius:6,fontSize:13,color:T.textMid,marginBottom:14,alignItems:"center"}}>
          <span>👤 {user.email}</span>
          <span>✅ <strong style={{color:T.text}}>{completionRate}%</strong> done</span>
          <span>⏱ <strong style={{color:T.text}}>{Math.floor((stats.deep_work_minutes||0)/60)}h</strong> deep work</span>
          {stats.streak>0&&<span>🔥 <strong style={{color:T.text}}>{stats.streak}</strong> day streak</span>}
          <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
            <button onClick={()=>setSoundEnabled(s=>!s)} style={{background:"none",border:"none",fontSize:16,cursor:"pointer",color:soundEnabled?T.accent:T.textMute}}>{soundEnabled?"🔊":"🔇"}</button>
            <button onClick={signOut} style={{...S.btnOut,padding:"4px 12px",fontSize:12}}>Sign out</button>
          </div>
        </div>

        {/* TOP NAV TABS */}
        <div style={{display:"flex",alignItems:"center",borderBottom:`1px solid ${T.border}`,marginBottom:24,overflowX:"auto",gap:2}}>
          {[["dashboard","🏠 Dashboard"],["calendar","📅 Calendar"],["tasks","✅ Tasks"],["goals","🎯 Goals"],["scheduler","⚡ Schedule"]].map(([id,lbl])=>(
            <button key={id} onClick={()=>navigate(id)} style={{padding:"8px 16px",background:"none",border:"none",cursor:"pointer",fontSize:13,fontWeight:view===id?600:400,color:view===id?T.text:T.textMute,borderBottom:view===id?`2px solid ${T.accent}`:"2px solid transparent",fontFamily:T.font,marginBottom:-1,whiteSpace:"nowrap"}}>{lbl}</button>
          ))}
          <button onClick={()=>setShowImport(true)} style={{padding:"8px 16px",background:"none",border:"none",cursor:"pointer",fontSize:13,color:T.accent,fontFamily:T.font,marginLeft:"auto",whiteSpace:"nowrap"}}>📥 Import</button>
        </div>

        {/* PAGE TITLE ROW */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:8}}>
          <div style={{fontSize:isMobile?20:24,fontFamily:T.serif,fontWeight:600,color:T.text}}>
            {view==="dashboard"?greeting:view==="calendar"?"📅 Calendar":view==="tasks"?"✅ Tasks":view==="goals"?"🎯 Goals":"⚡ Schedule Builder"}
          </div>
          <div onClick={nextQuote} style={{fontSize:12,fontStyle:"italic",color:T.textMute,cursor:"pointer",maxWidth:280,textAlign:"right"}}>"{QUOTES[quoteIdx]}"</div>
        </div>
        <div style={{height:1,background:T.border,marginBottom:20}}/>

        {/* ── DASHBOARD ── */}
        {view==="dashboard"&&(
          <>
            {examNotifs.length>0&&!notifDismissed&&(
              <div style={{...S.card,marginBottom:16,borderLeft:`3px solid ${T.orange}`,background:"#FFF7ED",display:"flex",alignItems:"flex-start",gap:12}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:T.orange,marginBottom:4}}>📚 Upcoming Exams</div>
                  {examNotifs.slice(0,3).map((n,i)=><div key={i} style={{fontSize:13,color:T.text,marginBottom:2}}>{n.events.map(e=>e.title).join(", ")} — <strong>{n.daysLeft===0?"Today":n.daysLeft===1?"Tomorrow":`${n.daysLeft} days`}</strong></div>)}
                </div>
                <button onClick={dismissNotif} style={{background:"none",border:"none",color:T.textMute,fontSize:18,cursor:"pointer"}}>×</button>
              </div>
            )}
            {nonNegotiables.length>0&&(
              <div style={{...S.card,marginBottom:16,borderLeft:`3px solid ${T.accent}`}}>
                <div style={{fontSize:13,fontWeight:600,color:T.accent,marginBottom:10}}>🎯 Today's Non-Negotiables {nnComplete&&"✅"}</div>
                {nonNegotiables.map(id=>{const t=tasks.find(t=>t.id===id);if(!t)return null;return(<div key={id} style={taskRow(t.done)} onClick={()=>toggleTask(t)}><div style={chk(t.done)}>{t.done&&<span style={{fontSize:10,color:"#FFF"}}>✓</span>}</div><div style={dot(t.goal_id)}/><div style={{flex:1,fontSize:13}}>{t.text}</div><div style={badge(t.priority)}>{t.priority}</div></div>);})}
              </div>
            )}
            {fallingOff&&(
              <div style={{...S.card,marginBottom:16,borderLeft:`3px solid ${T.orange}`,background:"#FFF7ED"}}>
                <div style={{fontSize:13,color:T.orange,marginBottom:4}}>📉 You were more consistent last week.</div>
                <div style={{fontSize:12,color:T.textMid}}>No pressure — let's get back on track. Even one task today counts.</div>
                <button style={{...S.btnOut,marginTop:10,borderColor:T.orange,color:T.orange}} onClick={()=>setFallingOff(false)}>Got it 💪</button>
              </div>
            )}
            <div style={{display:"flex",gap:20,flexWrap:"wrap",padding:"12px 16px",background:T.bgSoft,borderRadius:8,marginBottom:16,fontSize:13}}>
              <span><span style={{color:T.textMute}}>Tasks remaining </span><strong style={{color:pendingTasks.filter(t=>t.due&&t.due<todayStr).length>0?T.red:T.text}}>{pendingTasks.length}</strong><span style={{color:T.textMute}}> / {tasks.length}</span></span>
              <span><span style={{color:T.textMute}}>Today's events </span><strong>{todayEvents.length}</strong></span>
              <span><span style={{color:T.textMute}}>Active goals </span><strong>{goals.length}</strong></span>
              {nextExam&&<span><span style={{color:T.textMute}}>Next exam </span><strong style={{color:nextExam.daysLeft<=3?T.red:T.orange}}>{nextExam.title} in {nextExam.daysLeft}d</strong></span>}
            </div>
            {performanceScore!==null&&(
              <div style={{...S.card,marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div style={{fontSize:14,fontWeight:600}}>📈 Daily Performance</div>
                  <button style={S.btnOut} onClick={()=>setShowWeeklyReport(true)}>Weekly Report</button>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:24,flexWrap:"wrap"}}>
                  <div>
                    <div style={{fontSize:48,fontFamily:T.serif,lineHeight:1,color:performanceScore>=70?T.green:performanceScore>=40?T.orange:T.red}}>{performanceScore}</div>
                    <div style={{fontSize:12,color:T.textMute,marginTop:4}}>7-day avg · {performanceScore<30?"Getting started 💪":performanceScore<60?"Building momentum 🔥":"On a roll ⚡"}</div>
                  </div>
                  <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
                    {weeklySnapshots.slice(0,5).reverse().map((s,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                        <div style={{fontSize:11,color:T.textMute,width:36}}>{s.date.slice(5)}</div>
                        <div style={{flex:1,height:6,background:T.border,borderRadius:3}}><div style={{height:6,width:`${s.score}%`,background:T.accent,borderRadius:3,transition:"width 0.6s"}}/></div>
                        <div style={{fontSize:11,color:T.textMute,width:50}}>{s.completed_tasks}/{s.total_tasks}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {goals.length>0&&(
              <div style={{marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div style={{fontSize:14,fontWeight:600}}>🔮 Goal Forecast</div>
                  {goals.filter(g=>tasks.filter(t=>t.goal_id===g.id&&!t.done).length>0).length>5&&<button style={{background:"none",border:"none",fontSize:13,color:T.accent,cursor:"pointer",fontFamily:T.font}} onClick={()=>setShowAllGoals(s=>!s)}>{showAllGoals?"Show less":`See all (${goals.filter(g=>tasks.filter(t=>t.goal_id===g.id&&!t.done).length>0).length})`}</button>}
                </div>
                <div style={{border:`1px solid ${T.border}`,borderRadius:8,overflow:"hidden"}}>
                  {goals.filter(g=>{const gt=tasks.filter(t=>t.goal_id===g.id);return gt.length>0&&gt.filter(t=>!t.done).length>0;})
                    .sort((a,b)=>{if(a.deadline&&b.deadline)return new Date(a.deadline)-new Date(b.deadline);if(a.deadline)return-1;if(b.deadline)return 1;return 0;})
                    .filter((_,i)=>showAllGoals||i<5)
                    .map((g,idx,arr)=>{
                      const gt=tasks.filter(t=>t.goal_id===g.id);
                      const d2=gt.filter(t=>t.done).length,rem=gt.length-d2,pct=Math.round((d2/gt.length)*100);
                      let uc=g.color,fl=null;
                      if(g.deadline){const dl=new Date(g.deadline),days=Math.ceil((dl-Date.now())/86400000),tpd=days>0?(rem/days).toFixed(1):null,ds2=dl.toLocaleDateString('en-US',{month:'short',day:'numeric'});if(days<=0){uc=T.red;fl=`⚠️ Deadline passed — ${rem} left`;}else if(days<=7){uc=T.red;fl=`🔴 ${days}d left (${ds2}) · ${tpd}/day`;}else if(days<=14){uc=T.orange;fl=`🟠 ${days}d until ${ds2} · ${tpd}/day`;}else{uc=T.green;fl=`🟢 ${days}d until ${ds2} · ${tpd}/day`;}}
                      else{const est=new Date(Date.now()+Math.ceil(rem/2)*86400000).toLocaleDateString('en-US',{month:'short',day:'numeric'});fl=`~${est} at 2/day`;}
                      return(
                        <div key={g.id} style={{padding:"12px 16px",background:ROW_COLORS[idx%ROW_COLORS.length],borderBottom:idx<arr.length-1?`1px solid ${T.border}`:"none"}}>
                          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                            <div style={{width:10,height:10,borderRadius:"50%",background:g.color,flexShrink:0}}/>
                            <div style={{fontSize:13,fontWeight:500,flex:1}}>{g.label}</div>
                            <div style={{fontSize:12,color:uc}}>{fl}</div>
                          </div>
                          <div style={{height:4,background:T.border,borderRadius:2}}><div style={fill(pct,g.color)}/></div>
                          <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontSize:11,color:T.textMute}}><span>{pct}% done</span><span>{rem} remaining</span></div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1.4fr 1fr",gap:16}}>
              <div style={S.card}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div style={{fontSize:14,fontWeight:600}}>Upcoming Tasks</div>
                  <div style={{display:"flex",gap:8}}>
                    <button style={S.btnOut} onClick={()=>{if(noGoals){navigate("goals");setShowAddGoal(true);}else{setNewTask({text:"",goal_id:"",due:"",priority:"med",hours:"",recurring:[]});setShowAddTask(true);}}}>+ Add</button>
                    <button style={{...S.btnOut,borderColor:T.accent,color:T.accent}} onClick={()=>setShowNNPicker(true)}>🎯 Focus</button>
                  </div>
                </div>
                {upcomingTasks.length===0&&<div style={{fontSize:13,color:T.textMute}}>{noGoals?"Create a goal first.":"No tasks yet."}</div>}
                {upcomingTasks.map(task=>(
                  <div key={task.id} style={taskRow(task.done)} onClick={()=>toggleTask(task)}>
                    <div style={chk(task.done)}>{task.done&&<span style={{fontSize:10,color:"#FFF"}}>✓</span>}</div>
                    <div style={dot(task.goal_id)}/>
                    <div style={{flex:1,fontSize:13}}>{task.text}</div>
                    <div style={badge(task.priority)}>{task.priority}</div>
                    {task.due&&<div style={{fontSize:11,color:T.textMute,flexShrink:0}}>{task.due.slice(5)}</div>}
                    <button onClick={e=>{e.stopPropagation();enterFocusMode(task);}} style={{background:"none",border:"none",fontSize:14,cursor:"pointer",padding:0,color:T.textMute}}>⏱</button>
                  </div>
                ))}
              </div>
              <div style={S.card}>
                <div style={{fontSize:14,fontWeight:600,marginBottom:14}}>Goals Overview</div>
                {goals.length===0&&<div style={{fontSize:13,color:T.textMute}}>No goals yet.</div>}
                {goals.map(g=>{const gt=tasks.filter(t=>t.goal_id===g.id);const d2=gt.filter(t=>t.done).length;const p=gt.length?Math.round((d2/gt.length)*100):0;return(<div key={g.id} style={{marginBottom:14}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><div style={{fontSize:13}}>{g.label}</div><div style={{fontSize:11,color:T.textMute}}>{d2}/{gt.length}</div></div><div style={{height:4,background:T.border,borderRadius:2}}><div style={fill(p,g.color)}/></div></div>);})}
                <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${T.border}`}}>
                  <div style={{fontSize:12,fontWeight:600,color:T.textMid,marginBottom:8}}>Today's Events</div>
                  {todayEvents.map(e=><div key={e.id} style={chip(e.goal_id)}><span>{e.title}</span><span>{e.time}</span></div>)}
                  {todayEvents.length===0&&<div style={{fontSize:12,color:T.textMute}}>No events today</div>}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── CALENDAR ── */}
        {view==="calendar"&&(
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 300px",gap:16}}>
            <div style={S.card}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:16}}>
                  <button style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:T.text}} onClick={()=>{if(calMonth===0){setCalMonth(11);setCalYear(y=>y-1);}else setCalMonth(m=>m-1);}}>‹</button>
                  <span style={{fontSize:15,fontWeight:600}}>{MONTHS[calMonth]} {calYear}</span>
                  <button style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:T.text}} onClick={()=>{if(calMonth===11){setCalMonth(0);setCalYear(y=>y+1);}else setCalMonth(m=>m+1);}}>›</button>
                </div>
                <button style={S.btnOut} onClick={()=>{if(noGoals){navigate("goals");setShowAddGoal(true);}else setShowAddEvent(true);}}>+ Event</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
                {DAYS.map(d=><div key={d} style={{textAlign:"center",fontSize:11,fontWeight:600,color:T.textMute,padding:"6px 0"}}>{d}</div>)}
                {Array.from({length:firstDay}).map((_,i)=><div key={`e${i}`}/>)}
                {Array.from({length:daysInMonth}).map((_,i)=>{
                  const day=i+1,ds=calDs(day),evs=eventsForDate(ds),isToday=ds===todayStr,isSel=ds===selectedDate;
                  const dt=tasks.filter(t=>t.due===ds&&!t.done);const gd=goals.filter(g=>g.deadline===ds);
                  const uc=[...new Set(dt.map(t=>goalColor(t.goal_id)))].slice(0,4);
                  return(
                    <div key={day} style={dayCell(isToday,isSel)} onClick={()=>setSelectedDate(isSel?null:ds)}>
                      <span style={{fontWeight:isToday?700:400}}>{day}</span>
                      <div style={{display:"flex",gap:2,flexWrap:"wrap",justifyContent:"center",marginTop:2}}>
                        {evs.slice(0,2).map(e=><div key={e.id} style={{width:4,height:4,borderRadius:"50%",background:goalColor(e.goal_id)}}/>)}
                        {uc.map((c,i)=><div key={i} style={{width:4,height:4,borderRadius:1,background:c}}/>)}
                        {gd.slice(0,1).map(g=><div key={g.id} style={{width:5,height:5,borderRadius:"50%",background:g.color,border:"1px solid #FFF"}}/>)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={S.card}>
              <div style={{fontSize:14,fontWeight:600,marginBottom:14}}>{selectedDate||"Upcoming Events"}</div>
              {selectedDate&&goals.filter(g=>g.deadline===selectedDate).map(g=><div key={g.id} style={{...chip(g.id),flexDirection:"column",gap:2,alignItems:"flex-start",marginBottom:8,borderLeft:`3px solid ${g.color}`}}><div style={{fontWeight:600,fontSize:12}}>🏁 {g.label} deadline</div><div style={{fontSize:11,opacity:.7}}>Goal deadline</div></div>)}
              {selectedDate&&tasks.filter(t=>t.due===selectedDate&&!t.done).map(t=><div key={t.id} style={{...chip(t.goal_id),flexDirection:"column",gap:2,alignItems:"flex-start",marginBottom:8}}><div style={{fontWeight:600,fontSize:12}}>📌 {t.text}</div><div style={{fontSize:11,opacity:.7}}>Due · {goalLabel(t.goal_id)}</div></div>)}
              {(selectedDate?eventsForDate(selectedDate):[...futureEvents].sort((a,b)=>a.date.localeCompare(b.date))).map(e=>(
                <div key={e.id} style={{...chip(e.goal_id),flexDirection:"column",gap:2,alignItems:"flex-start",marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center"}}>
                    <div style={{fontWeight:600,fontSize:12}}>{e.title}</div>
                    <button onClick={()=>setEditEvent({...e})} style={{background:"none",border:"none",color:"inherit",fontSize:11,cursor:"pointer",opacity:.7}}>Edit</button>
                  </div>
                  <div style={{fontSize:11,opacity:.7}}>{selectedDate?"":e.date+" · "}{e.time} · {goalLabel(e.goal_id)}</div>
                  <button onClick={()=>deleteEvent(e.id)} style={{background:"none",border:"none",color:T.textMute,fontSize:11,cursor:"pointer",padding:0,opacity:.5}}>Remove</button>
                </div>
              ))}
              {!selectedDate&&futureEvents.length===0&&<div style={{fontSize:13,color:T.textMute}}>No upcoming events</div>}
              {selectedDate&&eventsForDate(selectedDate).length===0&&tasks.filter(t=>t.due===selectedDate&&!t.done).length===0&&goals.filter(g=>g.deadline===selectedDate).length===0&&<div style={{fontSize:13,color:T.textMute}}>Nothing on this date</div>}
            </div>
          </div>
        )}

        {/* ── TASKS ── */}
        {view==="tasks"&&(
          <>
            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:16,gap:8}}>
              <button style={S.btnOut} onClick={()=>setShowNNPicker(true)}>🎯 Set Non-Negotiables</button>
              <button style={S.btn} onClick={()=>{if(noGoals){navigate("goals");setShowAddGoal(true);}else{setNewTask({text:"",goal_id:"",due:"",priority:"med",hours:"",recurring:[]});setShowAddTask(true);}}}>+ New Task</button>
            </div>
            {goals.map((g,gi)=>{
              const gt=tasks.filter(t=>t.goal_id===g.id);if(gt.length===0)return null;
              return(
                <div key={g.id} style={{marginBottom:20}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:ROW_COLORS[gi%ROW_COLORS.length],borderRadius:"8px 8px 0 0",border:`1px solid ${T.border}`,borderBottom:"none"}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:g.color,flexShrink:0}}/>
                    <div style={{fontSize:13,fontWeight:600,flex:1}}>{g.label}</div>
                    {g.deadline&&<div style={{fontSize:12,color:T.textMute}}>Due {new Date(g.deadline+"T00:00:00").toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div>}
                    <div style={{fontSize:12,color:T.textMute}}>{gt.filter(t=>t.done).length}/{gt.length}</div>
                  </div>
                  <div style={{border:`1px solid ${T.border}`,borderRadius:"0 0 8px 8px",overflow:"hidden"}}>
                    {gt.map((task,ti)=>(
                      <div key={task.id} style={{...taskRow(task.done),borderBottom:ti<gt.length-1?`1px solid ${T.border}`:"none",borderRadius:0}} onClick={()=>toggleTask(task)}>
                        <div style={chk(task.done)}>{task.done&&<span style={{fontSize:10,color:"#FFF"}}>✓</span>}</div>
                        <div style={{flex:1,fontSize:13}}>{task.text}</div>
                        <div style={badge(task.priority)}>{task.priority}</div>
                        {task.due&&<div style={{fontSize:11,color:task.due<todayStr&&!task.done?T.red:T.textMute,flexShrink:0}}>{task.due.slice(5)}</div>}
                        <button onClick={e=>{e.stopPropagation();enterFocusMode(task);}} style={{background:"none",border:"none",fontSize:13,cursor:"pointer",padding:"0 4px",color:T.textMute}}>⏱</button>
                        <button onClick={e=>{e.stopPropagation();setEditTask({...task,recurring:task.recurring?JSON.parse(task.recurring):[]});}} style={{background:"none",border:"none",fontSize:13,cursor:"pointer",padding:"0 4px",color:T.textMute}}>✏️</button>
                        <button onClick={e=>{e.stopPropagation();deleteTask(task.id);}} style={{background:"none",border:"none",fontSize:14,cursor:"pointer",padding:"0 4px",color:T.textMute,opacity:.5}}>×</button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {tasks.length===0&&<div style={{...S.card,textAlign:"center",padding:48,color:T.textMute}}>No tasks yet. Create a goal first, then add tasks.</div>}
          </>
        )}

        {/* ── GOALS ── */}
        {view==="goals"&&(
          <>
            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:16}}>
              <button style={S.btn} onClick={()=>setShowAddGoal(true)}>+ New Goal</button>
            </div>
            <div style={{border:`1px solid ${T.border}`,borderRadius:8,overflow:"hidden",marginBottom:20}}>
              {goals.map((g,idx)=>{
                const gt=tasks.filter(t=>t.goal_id===g.id);const d2=gt.filter(t=>t.done).length;const p=gt.length?Math.round((d2/gt.length)*100):0;
                return(
                  <div key={g.id} style={{background:ROW_COLORS[idx%ROW_COLORS.length],borderBottom:idx<goals.length-1?`1px solid ${T.border}`:"none",padding:"12px 16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                      <div style={{width:12,height:12,borderRadius:"50%",background:g.color,flexShrink:0}}/>
                      <div style={{fontSize:14,fontWeight:500,flex:1}}>{g.label}</div>
                      {g.deadline&&<div style={{fontSize:12,color:T.textMute}}>{new Date(g.deadline+"T00:00:00").toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</div>}
                      <div style={{fontSize:12,fontWeight:600,color:g.color}}>{p}%</div>
                      <div style={{width:80,height:4,background:T.border,borderRadius:2,flexShrink:0}}><div style={{width:`${p}%`,height:4,background:g.color,borderRadius:2,transition:"width 0.5s"}}/></div>
                      <div style={{fontSize:12,color:T.textMute}}>{d2}/{gt.length} tasks</div>
                      <button onClick={()=>deleteGoal(g.id)} style={{background:"none",border:"none",color:T.textMute,fontSize:16,cursor:"pointer",padding:"0 0 0 4px",opacity:.4}}>×</button>
                    </div>
                  </div>
                );
              })}
              {goals.length===0&&<div style={{padding:32,textAlign:"center",color:T.textMute,fontSize:14}}>No goals yet. Add one to start tracking.</div>}
            </div>
          </>
        )}

        {/* ── SCHEDULER ── */}
        {view==="scheduler"&&(
          <div style={S.card}><AIScheduler user={user} refreshKey={doneTasks.length}/></div>
        )}

      </div>{/* end page wrapper */}

      {/* MOBILE BOTTOM NAV */}
      {isMobile&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#FFF",borderTop:`1px solid ${T.border}`,display:"flex",zIndex:100}}>
          {[["dashboard","🏠"],["calendar","📅"],["tasks","✅"],["goals","🎯"],["scheduler","⚡"]].map(([id,icon])=>(
            <button key={id} onClick={()=>navigate(id)} style={{flex:1,padding:"10px 0",background:"none",border:"none",fontSize:20,cursor:"pointer",color:view===id?T.accent:T.textMute,fontFamily:T.font}}>
              <div>{icon}</div><div style={{fontSize:9,marginTop:1}}>{id.slice(0,3).toUpperCase()}</div>
            </button>
          ))}
        </div>
      )}

      {/* ── MODALS ── */}
      {showImport&&(
        <div style={S.modal} onClick={()=>{setShowImport(false);setImportParsed(null);setImportText("");}}>
          <div style={{...S.modalBox,width:560}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:16,fontWeight:600,marginBottom:6}}>📥 Import from Claude</div>
            <div style={{fontSize:13,color:T.textMid,marginBottom:20}}>Paste any plan from Claude and we'll extract goals and tasks.</div>
            <div style={{...S.card,marginBottom:12,borderLeft:`3px solid ${T.accent}`,padding:16}}>
              <div style={{fontSize:13,fontWeight:600,color:T.accent,marginBottom:6}}>⚡ Quick Load</div>
              <div style={{fontSize:13,color:T.textMid,marginBottom:10}}>Load your full saved plan — all goals and tasks.</div>
              <button style={S.btn} onClick={seedData} disabled={importLoading}>{importLoading?"Loading…":"Load My Full Plan"}</button>
            </div>
            <div style={{...S.card,marginBottom:16,borderLeft:`3px solid ${T.blue}`,padding:16}}>
              <div style={{fontSize:13,fontWeight:600,color:T.blue,marginBottom:6}}>📅 Load Subtasks</div>
              <div style={{fontSize:13,color:T.textMid,marginBottom:10}}>Load daily breakdown tasks into existing goals.</div>
              <button style={S.btnOut} onClick={seedSubtasks} disabled={importLoading}>{importLoading?"Loading…":"Load Subtasks"}</button>
            </div>
            {!importParsed?(
              <>
                <textarea style={{...S.input,minHeight:160,resize:"vertical",lineHeight:"1.6"}} placeholder={"Goal: Oxford Internship\n- Research professors (high priority, due April 10)\n- Write personal statement"} value={importText} onChange={e=>setImportText(e.target.value)}/>
                {importError&&<div style={{fontSize:12,color:T.red,marginTop:8}}>{importError}</div>}
                <div style={{display:"flex",gap:10,marginTop:14}}>
                  <button style={S.btn} onClick={parseWithClaude} disabled={importLoading}>{importLoading?"Parsing…":"Parse Plan"}</button>
                  <button style={S.btnOut} onClick={()=>{setShowImport(false);setImportText("");}}>Cancel</button>
                </div>
              </>
            ):(
              <>
                <div style={{fontSize:13,color:T.green,marginBottom:14}}>✅ Found {importParsed.goals.length} goals and {importParsed.tasks.length} tasks.</div>
                <div style={{maxHeight:280,overflowY:"auto",marginBottom:14}}>
                  {importParsed.goals.map((g,i)=>(
                    <div key={i} style={{marginBottom:14}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                        <div style={{width:10,height:10,borderRadius:"50%",background:g.color,flexShrink:0}}/>
                        <div style={{fontSize:13,fontWeight:600}}>{g.label}</div>
                      </div>
                      {importParsed.tasks.filter(t=>t.goal===g.label).map((t,j)=>(
                        <div key={j} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 12px",background:T.bgSoft,marginBottom:4,marginLeft:20,borderRadius:4}}>
                          <div style={{fontSize:12,flex:1}}>{t.text}</div>
                          <div style={badge(t.priority)}>{t.priority}</div>
                          {t.due&&<div style={{fontSize:11,color:T.textMute}}>{t.due}</div>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button style={S.btn} onClick={importAll} disabled={importLoading}>{importLoading?"Importing…":"Import All"}</button>
                  <button style={S.btnOut} onClick={()=>setImportParsed(null)}>Re-parse</button>
                  <button style={S.btnOut} onClick={()=>{setShowImport(false);setImportParsed(null);setImportText("");}}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {showAddGoal&&(
        <div style={S.modal} onClick={()=>setShowAddGoal(false)}>
          <div style={S.modalBox} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:16,fontWeight:600,marginBottom:20}}>🎯 New Goal</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <input style={S.input} placeholder="Goal name (e.g. Oxford Internship)" value={newGoal.label} onChange={e=>setNewGoal({...newGoal,label:e.target.value})}/>
              <div><div style={S.label}>Deadline (optional)</div><input style={S.input} type="date" value={newGoal.deadline} onChange={e=>setNewGoal({...newGoal,deadline:e.target.value})}/></div>
              <div>
                <div style={S.label}>Color</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {MUTED_COLORS.map(c=><div key={c.value} onClick={()=>setNewGoal({...newGoal,color:c.value})} style={{width:28,height:28,borderRadius:"50%",background:c.value,cursor:"pointer",border:newGoal.color===c.value?`3px solid ${T.accent}`:"3px solid transparent",boxSizing:"border-box"}}/>)}
                </div>
              </div>
              <div style={{display:"flex",gap:10,marginTop:8}}>
                <button style={S.btn} onClick={addGoal}>Create Goal</button>
                <button style={S.btnOut} onClick={()=>setShowAddGoal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showAddTask&&(
        <div style={S.modal} onClick={()=>setShowAddTask(false)}>
          <div style={S.modalBox} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:16,fontWeight:600,marginBottom:20}}>✅ New Task</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <input style={S.input} placeholder="Task description" value={newTask.text} onChange={e=>setNewTask({...newTask,text:e.target.value})}/>
              <select style={S.select} value={newTask.goal_id} onChange={e=>setNewTask({...newTask,goal_id:e.target.value})}>
                <option value="">Select a goal</option>
                {goals.map(g=><option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
              <input style={S.input} type="date" min={new Date().toLocaleDateString('en-CA')} value={newTask.due} onChange={e=>setNewTask({...newTask,due:e.target.value})}/>
              <select style={S.select} value={newTask.priority} onChange={e=>setNewTask({...newTask,priority:e.target.value})}>
                <option value="high">High Priority</option><option value="med">Medium Priority</option><option value="low">Low Priority</option>
              </select>
              <input style={S.input} type="number" min="0.5" step="0.5" placeholder="Hours needed" value={newTask.hours} onChange={e=>setNewTask({...newTask,hours:e.target.value})}/>
              <div>
                <div style={S.label}>Repeat on (optional)</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day=>{const val=day.toLowerCase();const sel=(newTask.recurring||[]).includes(val);return(<div key={day} onClick={()=>{const c=newTask.recurring||[];setNewTask({...newTask,recurring:sel?c.filter(d=>d!==val):[...c,val]});}} style={{padding:"5px 12px",fontSize:12,cursor:"pointer",borderRadius:4,border:`1px solid ${sel?T.accent:T.border}`,background:sel?T.accentBg:"transparent",color:sel?T.accent:T.textMid,userSelect:"none"}}>{day}</div>);})}
                </div>
              </div>
              <div style={{display:"flex",gap:10,marginTop:8}}>
                <button style={S.btn} onClick={addTask}>Add Task</button>
                <button style={S.btnOut} onClick={()=>setShowAddTask(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showAddEvent&&(
        <div style={S.modal} onClick={()=>setShowAddEvent(false)}>
          <div style={S.modalBox} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:16,fontWeight:600,marginBottom:20}}>📅 New Event</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <input style={S.input} placeholder="Event title" value={newEvent.title} onChange={e=>setNewEvent({...newEvent,title:e.target.value})}/>
              <select style={S.select} value={newEvent.goal_id} onChange={e=>setNewEvent({...newEvent,goal_id:e.target.value})}>
                <option value="">Select a goal</option>
                {goals.map(g=><option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
              <input style={S.input} type="date" value={newEvent.date} onChange={e=>setNewEvent({...newEvent,date:e.target.value})}/>
              <input style={S.input} type="time" value={newEvent.time} onChange={e=>setNewEvent({...newEvent,time:e.target.value})}/>
              <div style={{display:"flex",gap:10,marginTop:8}}>
                <button style={S.btn} onClick={addEvent}>Add Event</button>
                <button style={S.btnOut} onClick={()=>setShowAddEvent(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {editTask&&(
        <div style={S.modal} onClick={()=>setEditTask(null)}>
          <div style={S.modalBox} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:16,fontWeight:600,marginBottom:20}}>Edit Task</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <input style={S.input} value={editTask.text} onChange={e=>setEditTask({...editTask,text:e.target.value})}/>
              <select style={S.select} value={editTask.goal_id} onChange={e=>setEditTask({...editTask,goal_id:e.target.value})}>
                {goals.map(g=><option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
              <input style={S.input} type="date" value={editTask.due||""} onChange={e=>setEditTask({...editTask,due:e.target.value})}/>
              <select style={S.select} value={editTask.priority} onChange={e=>setEditTask({...editTask,priority:e.target.value})}>
                <option value="high">High</option><option value="med">Medium</option><option value="low">Low</option>
              </select>
              <input style={S.input} type="number" min="0.5" step="0.5" placeholder="Hours" value={editTask.hours||""} onChange={e=>setEditTask({...editTask,hours:e.target.value})}/>
              <div style={{display:"flex",gap:10,marginTop:8}}>
                <button style={S.btn} onClick={saveEditTask}>Save</button>
                <button style={S.btnDanger} onClick={()=>{deleteTask(editTask.id);setEditTask(null);}}>Delete</button>
                <button style={S.btnOut} onClick={()=>setEditTask(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {editEvent&&(
        <div style={S.modal} onClick={()=>setEditEvent(null)}>
          <div style={S.modalBox} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:16,fontWeight:600,marginBottom:20}}>Edit Event</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <input style={S.input} value={editEvent.title} onChange={e=>setEditEvent({...editEvent,title:e.target.value})}/>
              <select style={S.select} value={editEvent.goal_id} onChange={e=>setEditEvent({...editEvent,goal_id:e.target.value})}>
                {goals.map(g=><option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
              <input style={S.input} type="date" value={editEvent.date} onChange={e=>setEditEvent({...editEvent,date:e.target.value})}/>
              <input style={S.input} type="time" value={editEvent.time} onChange={e=>setEditEvent({...editEvent,time:e.target.value})}/>
              <div style={{display:"flex",gap:10,marginTop:8}}>
                <button style={S.btn} onClick={saveEditEvent}>Save</button>
                <button style={S.btnOut} onClick={()=>setEditEvent(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showWeeklyReport&&weeklySnapshots.length>0&&(()=>{
        const scores=weeklySnapshots.map(s=>s.score);
        const avg=Math.round(scores.reduce((a,b)=>a+b,0)/scores.length);
        const best=weeklySnapshots.reduce((a,b)=>a.score>b.score?a:b);
        const worst=weeklySnapshots.reduce((a,b)=>a.score<b.score?a:b);
        return(
          <div style={S.modal} onClick={()=>setShowWeeklyReport(false)}>
            <div style={S.modalBox} onClick={e=>e.stopPropagation()}>
              <div style={{fontSize:16,fontWeight:600,marginBottom:4}}>📊 Weekly Report</div>
              <div style={{fontSize:13,color:T.textMid,marginBottom:20}}>Your performance over the last 7 days</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
                {[["Avg Completion",`${avg}%`,avg>=70?T.green:avg>=40?T.orange:T.red],["Day Streak",stats.streak,T.accent],["Best Day",`${best.date.slice(5)} (${best.score}%)`,T.green],["Lowest Day",`${worst.date.slice(5)} (${worst.score}%)`,T.red]].map(([lbl,val,c])=>(
                  <div key={lbl} style={{padding:16,background:T.bgSoft,borderRadius:8,textAlign:"center"}}>
                    <div style={{fontSize:24,fontFamily:T.serif,color:c}}>{val}</div>
                    <div style={{fontSize:11,color:T.textMute,marginTop:4}}>{lbl}</div>
                  </div>
                ))}
              </div>
              {weeklySnapshots.slice().reverse().map((s,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <div style={{fontSize:11,color:T.textMute,width:42}}>{s.date.slice(5)}</div>
                  <div style={{flex:1,height:8,background:T.border,borderRadius:4}}><div style={{height:8,width:`${s.score}%`,background:s.score>=70?T.green:s.score>=40?T.orange:T.red,borderRadius:4}}/></div>
                  <div style={{fontSize:11,color:T.textMute,width:36}}>{s.completed_tasks}/{s.total_tasks}</div>
                </div>
              ))}
              <button style={{...S.btn,marginTop:16}} onClick={()=>setShowWeeklyReport(false)}>Close</button>
            </div>
          </div>
        );
      })()}
      {showMilestone&&(
        <div style={S.modal} onClick={()=>setShowMilestone(null)}>
          <div style={{...S.modalBox,textAlign:"center",maxWidth:320}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:64,marginBottom:14}}>{showMilestone.emoji}</div>
            <div style={{fontSize:14,fontWeight:600,marginBottom:8}}>Milestone Unlocked</div>
            <div style={{fontSize:22,fontFamily:T.serif,marginBottom:8}}>{showMilestone.label}</div>
            <div style={{fontSize:13,color:T.textMid,marginBottom:20}}>You've completed {showMilestone.count} tasks total.</div>
            <button style={S.btn} onClick={()=>setShowMilestone(null)}>Keep Going 🚀</button>
          </div>
        </div>
      )}
      {showNNPicker&&(
        <div style={S.modal} onClick={()=>setShowNNPicker(false)}>
          <div style={S.modalBox} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:16,fontWeight:600,marginBottom:6}}>🎯 Pick Your 3 Non-Negotiables</div>
            <div style={{fontSize:13,color:T.textMid,marginBottom:18}}>The 3 tasks you MUST complete today.</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:360,overflowY:"auto"}}>
              {[...pendingTasks.filter(t=>t.due===todayStr),...pendingTasks.filter(t=>t.due!==todayStr)].map(task=>{
                const sel=nonNegotiables.includes(task.id);
                return(
                  <div key={task.id} onClick={()=>{if(sel)setNonNegotiables(nonNegotiables.filter(id=>id!==task.id));else if(nonNegotiables.length<3)setNonNegotiables([...nonNegotiables,task.id]);}}
                    style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",background:sel?T.accentBg:T.bgSoft,border:`1px solid ${sel?T.accent:T.border}`,borderRadius:6,cursor:nonNegotiables.length>=3&&!sel?"not-allowed":"pointer",opacity:nonNegotiables.length>=3&&!sel?0.4:1}}>
                    <div style={{width:14,height:14,border:`1.5px solid ${sel?T.accent:T.border}`,background:sel?T.accent:"transparent",borderRadius:3,flexShrink:0}}/>
                    <div style={{flex:1,fontSize:13}}>{task.text}</div>
                    <div style={{fontSize:11,color:T.textMute}}>{goalLabel(task.goal_id)}</div>
                    <div style={badge(task.priority)}>{task.priority}</div>
                  </div>
                );
              })}
            </div>
            <div style={{marginTop:16,display:"flex",gap:10}}>
              <button style={S.btn} onClick={async()=>{
                const td=new Date().toLocaleDateString('en-CA');setShowNNPicker(false);
                setNnComplete(nonNegotiables.length===3&&nonNegotiables.every(id=>tasks.find(t=>t.id===id)?.done));
                const u={...stats,non_negotiables:nonNegotiables,nn_date:td};setStats(u);
                await supabase.from("user_stats").upsert({...u,user_id:user.id},{onConflict:"user_id"});
              }}>Confirm ({nonNegotiables.length}/3)</button>
              <button style={S.btnOut} onClick={()=>{setNonNegotiables([]);setShowNNPicker(false);}}>Clear</button>
            </div>
          </div>
        </div>
      )}
      {showFocusPicker&&(
        <div style={S.modal} onClick={()=>setShowFocusPicker(false)}>
          <div style={{...S.modalBox,maxWidth:340}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:16,fontWeight:600,marginBottom:18}}>⏱ Start Focus Timer</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[["25 min (Pomodoro)",25],["50 min (Deep Work)",50]].map(([lbl,mins])=>(
                <button key={mins} style={{...S.btnOut,textAlign:"left",padding:"12px 16px"}} onClick={()=>{setShowFocusPicker(false);enterFocusMode(null,mins);}}>{lbl}</button>
              ))}
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input style={{...S.input,flex:1}} type="number" min="5" max="180" value={customMinutes} onChange={e=>setCustomMinutes(parseInt(e.target.value)||30)}/>
                <button style={S.btn} onClick={()=>{setShowFocusPicker(false);enterFocusMode(null,customMinutes);}}>Custom</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SanjuLoader(){
  const canvasRef=useRef(null);
  useEffect(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");
    canvas.width=window.innerWidth;canvas.height=window.innerHeight;
    const W=canvas.width,H=canvas.height;
    const img=new Image();img.crossOrigin="anonymous";
    img.src="https://tbztpvqwiutcrvecqauj.supabase.co/storage/v1/object/public/assets/Screenshot%202026-04-19%20194858.png";
    const run=()=>{
      const maxH=Math.min(H*0.65,380),ratio=img.naturalWidth/img.naturalHeight||1;
      const dH=maxH,dW=dH*ratio,dX=(W-dW)/2,dY=(H-dH)/2-40;
      const off=document.createElement("canvas");off.width=Math.round(dW);off.height=Math.round(dH);
      const oc=off.getContext("2d");oc.drawImage(img,0,0,off.width,off.height);
      const id=oc.getImageData(0,0,off.width,off.height),gap=4,particles=[];
      for(let y=0;y<off.height;y+=gap){for(let x=0;x<off.width;x+=gap){const i=(y*off.width+x)*4;if(id.data[i+3]<30)continue;particles.push({x:Math.random()*W,y:Math.random()*H,tx:dX+x,ty:dY+y,color:`rgb(${id.data[i]},${id.data[i+1]},${id.data[i+2]})`,size:gap-1,delay:Math.floor(Math.random()*60)});}}
      let frame=0,aid;
      const animate=()=>{
        ctx.fillStyle="#FFFFFF";ctx.fillRect(0,0,W,H);
        for(const p of particles){if(frame<p.delay)continue;p.x+=(p.tx-p.x)*0.05;p.y+=(p.ty-p.y)*0.05;ctx.fillStyle=p.color;ctx.fillRect(Math.round(p.x),Math.round(p.y),p.size,p.size);}
        if(frame>200){const a=Math.min(1,(frame-200)/60);ctx.globalAlpha=a;ctx.fillStyle="#D97706";ctx.font="italic 600 20px 'Lora',Georgia,serif";ctx.textAlign="center";ctx.fillText("Meridian",W/2,dY+dH+48);ctx.fillStyle="#9B9A97";ctx.font="13px 'Inter',sans-serif";ctx.fillText("HOOK 'EM  ·  UT COCKRELL  ·  MECH E",W/2,dY+dH+70);ctx.globalAlpha=1;}
        frame++;if(frame<280)aid=requestAnimationFrame(animate);
      };
      aid=requestAnimationFrame(animate);canvas._cleanup=()=>cancelAnimationFrame(aid);
    };
    if(img.complete)run();else{img.onload=run;img.onerror=run;}
    return()=>{if(canvas._cleanup)canvas._cleanup();};
  },[]);
  return(<div style={{position:"fixed",inset:0,background:"#FFFFFF",zIndex:9999}}><canvas ref={canvasRef} style={{display:"block",width:"100%",height:"100%"}}/></div>);
}

export default function App(){
  useEffect(()=>{
    const link=document.createElement("link");
    link.href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap";
    link.rel="stylesheet";document.head.appendChild(link);
  },[]);
  const [user,setUser]=useState(null);
  const [checking,setChecking]=useState(true);
  const [showAuth,setShowAuth]=useState(false);
  useEffect(()=>{
    const minDelay=new Promise(res=>setTimeout(res,4000));
    const authCheck=supabase.auth.getSession().then(({data:{session}})=>setUser(session?.user??null));
    Promise.all([minDelay,authCheck]).then(()=>setChecking(false));
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_e,session)=>{setUser(session?.user??null);if(session?.user)setShowAuth(false);});
    return()=>subscription.unsubscribe();
  },[]);
  if(checking)return <SanjuLoader/>;
  if(user)return <MeridianApp user={user}/>;
  if(showAuth)return <AuthScreen onBack={()=>setShowAuth(false)}/>;
  return <LandingPage onLogin={()=>setShowAuth(true)}/>;
}
