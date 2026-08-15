(function(){
  "use strict";
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover=window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if(canHover) document.documentElement.classList.add("can-hover");
  var hasGSAP=typeof window.gsap!=="undefined";
  if(hasGSAP&&window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  var overdrive=false; // toggled by the Konami easter egg; read by the ember canvas
  var $=function(s,c){return (c||document).querySelector(s);};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));};

  /* ---------- SOUND ENGINE ---------- */
  var Sound=(function(){
    var ctx=null,master=null,on=false,showMode=false,step=0,padTimer=null,arpTimer=null;
    function ensure(){ if(ctx) return; var AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
      ctx=new AC(); master=ctx.createGain(); master.gain.value=0; master.connect(ctx.destination); }
    function now(){return ctx?ctx.currentTime:0;}
    function tone(f,d,t,v,slide){ if(!ctx||(!on&&!showMode)) return; var o=ctx.createOscillator(),g=ctx.createGain();
      o.type=t||"sine"; o.frequency.setValueAtTime(f,now()); if(slide) o.frequency.exponentialRampToValueAtTime(slide,now()+d);
      g.gain.setValueAtTime(.0001,now()); g.gain.exponentialRampToValueAtTime(v||.15,now()+.008); g.gain.exponentialRampToValueAtTime(.0001,now()+d);
      o.connect(g); g.connect(master); o.start(); o.stop(now()+d+.02); }
    function noise(d,v){ if(!ctx||(!on&&!showMode)) return; var n=Math.floor(ctx.sampleRate*d),b=ctx.createBuffer(1,n,ctx.sampleRate),dt=b.getChannelData(0);
      for(var i=0;i<n;i++) dt[i]=(Math.random()*2-1)*(1-i/n); var s=ctx.createBufferSource(); s.buffer=b;
      var bp=ctx.createBiquadFilter(); bp.type="bandpass"; bp.frequency.setValueAtTime(1200,now()); bp.frequency.exponentialRampToValueAtTime(400,now()+d);
      var g=ctx.createGain(); g.gain.setValueAtTime(v||.08,now()); g.gain.exponentialRampToValueAtTime(.0001,now()+d);
      s.connect(bp); bp.connect(g); g.connect(master); s.start(); s.stop(now()+d+.02); }
    var sfx={ hover:function(){tone(880,.06,"triangle",.05);},
      click:function(){tone(300,.09,"square",.1,140); noise(.05,.04);},
      coin:function(){tone(680,.07,"square",.1); setTimeout(function(){tone(1020,.12,"square",.1);},70);},
      tick:function(){tone(1400,.03,"sine",.03);},
      powerup:function(){ [0,1,2,4].forEach(function(n,i){ setTimeout(function(){tone(294*Math.pow(1.1225,n),.18,"square",.07);},i*70); }); },
      impact:function(){ tone(120,.28,"sine",.24,44); noise(.14,.16); },
      swoosh:function(){ if(!ctx||(!on&&!showMode)) return; var d=.5,n=Math.floor(ctx.sampleRate*d),b=ctx.createBuffer(1,n,ctx.sampleRate),dt=b.getChannelData(0);
        for(var i=0;i<n;i++) dt[i]=(Math.random()*2-1)*(1-i/n); var s=ctx.createBufferSource(); s.buffer=b;
        var lp=ctx.createBiquadFilter(); lp.type="lowpass"; lp.frequency.setValueAtTime(6000,now()); lp.frequency.exponentialRampToValueAtTime(320,now()+d);
        var g=ctx.createGain(); g.gain.setValueAtTime(.16,now()); g.gain.exponentialRampToValueAtTime(.0001,now()+d);
        s.connect(lp); lp.connect(g); g.connect(master); s.start(); s.stop(now()+d+.02); },
      crowd:function(){ if(!ctx||(!on&&!showMode)) return; var d=1.7,n=Math.floor(ctx.sampleRate*d),b=ctx.createBuffer(1,n,ctx.sampleRate),dt=b.getChannelData(0);
        for(var i=0;i<n;i++) dt[i]=(Math.random()*2-1); var s=ctx.createBufferSource(); s.buffer=b;
        var bp=ctx.createBiquadFilter(); bp.type="bandpass"; bp.frequency.value=680; bp.Q.value=.7;
        var g=ctx.createGain(); g.gain.setValueAtTime(.0001,now()); g.gain.linearRampToValueAtTime(.05,now()+.6); g.gain.linearRampToValueAtTime(.0001,now()+d);
        s.connect(bp); bp.connect(g); g.connect(master); s.start(); s.stop(now()+d); } };
    var scale=[220,261.63,293.66,329.63,392,440,523.25];
    function pad(){ if(!ctx||!on) return; [146.83,220,277.18].forEach(function(f,i){ var o=ctx.createOscillator(),g=ctx.createGain(),lp=ctx.createBiquadFilter();
      o.type="sawtooth"; o.frequency.value=f*(i?1:.5); o.detune.value=(i-1)*6; lp.type="lowpass"; lp.frequency.value=520;
      g.gain.setValueAtTime(.0001,now()); g.gain.linearRampToValueAtTime(.03,now()+2.2); g.gain.linearRampToValueAtTime(.0001,now()+7);
      o.connect(lp); lp.connect(g); g.connect(master); o.start(); o.stop(now()+7.1); }); }
    function arp(){ if(!ctx||!on) return; var f=scale[step%scale.length]*(step%9<5?1:.5); step++;
      var o=ctx.createOscillator(),g=ctx.createGain(); o.type="triangle"; o.frequency.value=f;
      g.gain.setValueAtTime(.0001,now()); g.gain.exponentialRampToValueAtTime(.05,now()+.02); g.gain.exponentialRampToValueAtTime(.0001,now()+.5);
      o.connect(g); g.connect(master); o.start(); o.stop(now()+.55); }
    function music(s){ if(s){ pad(); padTimer=setInterval(pad,6600); arpTimer=setInterval(arp,520);} else {clearInterval(padTimer);clearInterval(arpTimer);} }
    return { toggle:function(){ ensure(); if(!ctx) return false; on=!on;
        if(on){ if(ctx.state==="suspended") ctx.resume(); master.gain.linearRampToValueAtTime(.9,now()+.4); music(true); }
        else { master.gain.linearRampToValueAtTime(0,now()+.3); setTimeout(function(){music(false);},320); } return on; },
      play:function(n){ if((on||showMode)&&sfx[n]) sfx[n](); }, isOn:function(){return on;},
      enable:function(){ ensure(); if(!ctx||on) return false; on=true; if(ctx.state==="suspended") ctx.resume();
        master.gain.cancelScheduledValues(now()); master.gain.setValueAtTime(Math.max(master.gain.value,.0001),now()); master.gain.linearRampToValueAtTime(.9,now()+.4); music(true); return true; },
      startShow:function(){ ensure(); if(!ctx) return; showMode=true; if(ctx.state==="suspended") ctx.resume();
        master.gain.cancelScheduledValues(now()); master.gain.setValueAtTime(Math.max(master.gain.value,.0001),now()); master.gain.linearRampToValueAtTime(.9,now()+.25); },
      endShow:function(){ showMode=false; if(!on&&ctx){ master.gain.linearRampToValueAtTime(0,now()+.4); } },
      setShowVol:function(v){ if(ctx) master.gain.linearRampToValueAtTime(v,now()+.15); } };
  })();
  var sndBtn=$("#snd"),sndTxt=$("#sndTxt");
  var sndAutoArmed=true, sndEvs=["pointerdown","mousedown","keydown","touchstart","click"];
  function sndUI(){ var s=Sound.isOn(); sndBtn.classList.toggle("on",s); sndBtn.setAttribute("aria-pressed",String(s)); sndTxt.textContent=s?"Sound on":"Sound off"; }
  function sndDisarm(){ sndAutoArmed=false; sndEvs.forEach(function(ev){ window.removeEventListener(ev,sndAutoStart,true); }); }
  // music ON by default: shows on now; browsers only allow audio after a gesture, so it starts on the first interaction
  sndBtn.classList.add("on"); sndBtn.setAttribute("aria-pressed","true"); sndTxt.textContent="Sound on";
  function sndAutoStart(e){ if(!sndAutoArmed) return;
    if(e&&e.target&&e.target.closest&&e.target.closest("#snd")) return; // the toggle handles itself
    sndDisarm();
    if(!Sound.isOn()){ Sound.enable(); toast("♪ Music on // tap to mute"); }
    sndUI(); }
  sndEvs.forEach(function(ev){ window.addEventListener(ev,sndAutoStart,true); });
  sndBtn.addEventListener("click",function(){ sndDisarm();
    if(Sound.isOn()){ Sound.toggle(); }
    else { Sound.enable(); Sound.play("powerup"); if(!sndBtn._greeted){ sndBtn._greeted=1; toast("Sound engaged // ambient + SFX"); } }
    sndUI(); });
  $$("[data-cursor],a.btn,.nav__links a").forEach(function(el){ el.addEventListener("mouseenter",function(){Sound.play("hover");}); });
  $$("[data-sfx]").forEach(function(el){ el.addEventListener("click",function(){Sound.play(el.getAttribute("data-sfx"));}); });

  /* ---------- SMOOTH SCROLL (Lenis) ---------- */
  var lenis=null;
  if(!reduce && window.Lenis && hasGSAP){
    lenis=new Lenis({lerp:.09,wheelMultiplier:1,smoothWheel:true});
    lenis.on("scroll",function(){ if(window.ScrollTrigger) ScrollTrigger.update(); });
    gsap.ticker.add(function(t){ lenis.raf(t*1000); });
    gsap.ticker.lagSmoothing(0);
  }
  // anchor links -> smooth scroll
  $$('a[href^="#"]').forEach(function(a){
    a.addEventListener("click",function(e){
      var id=a.getAttribute("href"); if(id.length<2){ e.preventDefault(); return; } var t=document.querySelector(id); if(!t) return;
      e.preventDefault();
      if(lenis) lenis.scrollTo(t,{offset:-70}); else t.scrollIntoView({behavior:reduce?"auto":"smooth"});
    });
  });

  /* ---------- RETICLE ---------- */
  if(canHover && !reduce){
    var ret=$("#reticle");
    var mx=hasGSAP?gsap.quickTo(ret,"x",{duration:.35,ease:"power3"}):null;
    var my=hasGSAP?gsap.quickTo(ret,"y",{duration:.35,ease:"power3"}):null;
    window.addEventListener("mousemove",function(e){ ret.classList.add("on"); if(mx){mx(e.clientX);my(e.clientY);} else {ret.style.transform="translate("+e.clientX+"px,"+e.clientY+"px)";} });
    document.addEventListener("mouseleave",function(){ret.classList.remove("on");});
    $$("[data-cursor],a,button").forEach(function(el){ el.addEventListener("mouseenter",function(){ret.classList.add("big");}); el.addEventListener("mouseleave",function(){ret.classList.remove("big");}); });
  }

  /* ---------- NAV + PROGRESS ---------- */
  var nav=$("#nav"),prog=$("#prog");
  function onScroll(){ nav.classList.toggle("stuck",window.scrollY>24);
    var h=document.documentElement.scrollHeight-window.innerHeight; var p=h>0?window.scrollY/h:0;
    if(prog) prog.style.transform="scaleX("+p.toFixed(4)+")"; }
  onScroll(); window.addEventListener("scroll",onScroll,{passive:true});

  /* ---------- TICKER ---------- */
  (function(){ var items=[['LIVE','Friday Night Sprint Cup','ENDS 02:18:44','PRIZE POOL £12,400'],['OPEN','No-Scope Showdown','STARTS 04:37:12','PRIZE POOL £800'],['SOON','Arena Championship','STARTS 06:50:21','PRIZE POOL £1,500'],['LIVE','1v1 Ladder','24 MATCHES SETTLED TODAY','ESCROW SECURED']];
    var h=""; for(var p=0;p<2;p++){ items.forEach(function(it){ h+='<div class="cell"><span class="liv">'+it[0]+'</span><span class="div">/</span><b>'+it[1]+'</b><span class="div">·</span><span class="mono">'+it[2]+'</span><span class="div">·</span>'+it[3]+'</div>'; }); } var tk=$("#ticker"); if(tk) tk.innerHTML=h; })();

  /* ---------- STATUS WAVE ---------- */
  (function(){ var poly=$("#wavePath"); if(!poly) return; var W=260,H=30,t=0;
    function frame(){ t+=.08; var s=""; for(var x=0;x<=W;x+=6){ var y=H/2+Math.sin(x*.09+t)*4*Math.sin(t*.5)+(Math.random()*2-1)*.8; s+=x+","+y.toFixed(1)+" "; } poly.setAttribute("points",s); if(!reduce) requestAnimationFrame(frame); }
    if(reduce){ var s2=""; for(var x=0;x<=W;x+=6){ s2+=x+","+(H/2+Math.sin(x*.09)*3).toFixed(1)+" "; } poly.setAttribute("points",s2); } else frame(); })();

  /* ---------- COUNTDOWNS ---------- */
  $$("[data-countdown]").forEach(function(el){ var p=el.getAttribute("data-countdown").split(":").map(Number); var s=p[0]*3600+p[1]*60+p[2];
    function pad(n){return (n<10?"0":"")+n;} setInterval(function(){ s=s>0?s-1:0; el.textContent=pad(Math.floor(s/3600))+":"+pad(Math.floor((s%3600)/60))+":"+pad(s%60); },1000); });

  /* ---------- SCRAMBLE ---------- */
  var glyphs="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*<>";
  function scramble(el){ if(reduce) return; var fin=el.getAttribute("data-final")||el.textContent; el.setAttribute("data-final",fin);
    var len=fin.length,fr=0,dur=Math.min(30,10+len);
    var id=setInterval(function(){ fr++; var o=""; for(var i=0;i<len;i++){ if(fin[i]===" "){o+=" ";continue;} if(i<(fr/dur)*len) o+=fin[i]; else o+=glyphs[Math.floor(Math.random()*glyphs.length)]; } el.textContent=o; if(fr>=dur){clearInterval(id); el.textContent=fin;} },40); }

  function countUp(el){ var tg=parseFloat(el.getAttribute("data-count"))||0,pre=el.getAttribute("data-prefix")||"";
    if(reduce||!hasGSAP){ el.textContent=pre+tg; return; } var o={v:0}; gsap.to(o,{v:tg,duration:1.4,ease:"power2.out",onUpdate:function(){ el.textContent=pre+Math.round(o.v); }}); }

  /* ---------- CAROUSEL ---------- */
  (function(){ var rail=$("#rail"),prev=$("#railPrev"),next=$("#railNext"),dw=$("#dots"); if(!rail) return;
    var cards=$$(".card",rail);
    cards.forEach(function(_,i){ var b=document.createElement("button"); b.setAttribute("aria-label","Go to tournament "+(i+1)); b.addEventListener("click",function(){ cards[i].scrollIntoView({behavior:reduce?"auto":"smooth",inline:"start",block:"nearest"}); }); dw.appendChild(b); });
    var dots=$$("button",dw);
    function stepw(){ return cards[1]? cards[1].offsetLeft-cards[0].offsetLeft : cards[0].offsetWidth+19; }
    prev.addEventListener("click",function(){ rail.scrollBy({left:-stepw(),behavior:reduce?"auto":"smooth"}); });
    next.addEventListener("click",function(){ rail.scrollBy({left:stepw(),behavior:reduce?"auto":"smooth"}); });
    function sync(){ var idx=Math.round(rail.scrollLeft/stepw()); idx=Math.max(0,Math.min(cards.length-1,idx)); dots.forEach(function(d,i){d.classList.toggle("on",i===idx);}); prev.disabled=rail.scrollLeft<=2; next.disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-2; }
    rail.addEventListener("scroll",sync,{passive:true}); window.addEventListener("resize",sync); sync(); })();

  /* ---------- MAGNETIC BUTTONS ---------- */
  if(canHover && !reduce && hasGSAP){ $$(".btn--primary,.btn--ember").forEach(function(b){
    b.addEventListener("mousemove",function(e){ var r=b.getBoundingClientRect(); gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.25,y:(e.clientY-r.top-r.height/2)*.35,duration:.4,ease:"power3"}); });
    b.addEventListener("mouseleave",function(){ gsap.to(b,{x:0,y:0,duration:.5,ease:"elastic.out(1,.4)"}); }); }); }

  /* ---------- FAQ ---------- */
  $$(".acc__item").forEach(function(item){ var q=$(".acc__q",item),a=$(".acc__a",item);
    q.addEventListener("click",function(){ var open=item.classList.contains("open"); Sound.play("tick");
      if(open){ item.classList.remove("open"); q.setAttribute("aria-expanded","false"); if(hasGSAP&&!reduce) gsap.to(a,{height:0,duration:.4,ease:"power2.inOut"}); else a.style.height="0px"; }
      else { item.classList.add("open"); q.setAttribute("aria-expanded","true"); if(hasGSAP&&!reduce){ gsap.set(a,{height:"auto"}); gsap.from(a,{height:0,duration:.45,ease:"power2.out"}); } else a.style.height="auto"; } }); });

  /* ---------- EMBERS ---------- */
  (function(){ if(reduce) return; var cv=$("#embers"); if(!cv) return; var cx=cv.getContext("2d"),parts=[],N=Math.min(46,Math.round(innerWidth/32));
    function size(){ cv.width=innerWidth; cv.height=Math.min(innerHeight,900); } size(); window.addEventListener("resize",size);
    for(var i=0;i<N;i++) parts.push({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.6+.3,vy:-(Math.random()*.5+.15),vx:(Math.random()-.5)*.2,a:Math.random()*.5+.1});
    function loop(){ cx.clearRect(0,0,cv.width,cv.height); var od=overdrive?2.6:1; for(var i=0;i<parts.length;i++){ var p=parts[i]; p.y+=p.vy*od; p.x+=p.vx*od; if(p.y<-4){p.y=cv.height+4;p.x=Math.random()*cv.width;} cx.beginPath(); cx.arc(p.x,p.y,p.r*(overdrive?1.7:1),0,6.28); cx.fillStyle="rgba(255,"+Math.floor(80+p.a*90)+","+(overdrive?95:40)+","+Math.min(1,p.a*(overdrive?1.9:1))+")"; cx.fill(); } requestAnimationFrame(loop); } loop(); })();

  /* ---------- REVEALS + PARALLAX ---------- */
  function initReveals(){
    if(!hasGSAP||!window.ScrollTrigger) return;
    if(!reduce){
      // hero depth on mouse
      if(canHover){ var bg=$("#heroBg"); if(bg) window.addEventListener("mousemove",function(e){ var dx=e.clientX/innerWidth-.5,dy=e.clientY/innerHeight-.5; gsap.to(bg,{x:dx*-26,y:dy*-18,duration:1,ease:"power2"}); }); }
      // scrub parallax layers
      var hbImg=$("#heroBg img"); if(hbImg) gsap.to(hbImg,{yPercent:-10,ease:"none",scrollTrigger:{trigger:"#hero-top",start:"top top",end:"bottom top",scrub:true}});
      var bbImg=$("#bandBg img"); if(bbImg) gsap.to(bbImg,{yPercent:-12,ease:"none",scrollTrigger:{trigger:".band",start:"top bottom",end:"bottom top",scrub:true}});
      $$("[data-par-wash]").forEach(function(el){ gsap.fromTo(el,{yPercent:-10},{yPercent:12,ease:"none",scrollTrigger:{trigger:el.closest(".sec"),start:"top bottom",end:"bottom top",scrub:true}}); });
      $$("[data-par-card]").forEach(function(el){ gsap.fromTo(el,{yPercent:-6},{yPercent:6,ease:"none",scrollTrigger:{trigger:el.closest(".card"),start:"top bottom",end:"bottom top",scrub:true}}); });
      // reveals
      $$("[data-reveal]").forEach(function(el){ gsap.from(el,{opacity:0,y:26,duration:.8,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}}); });
      $$("[data-stagger]").forEach(function(g){ gsap.from(g.children,{opacity:0,y:30,duration:.7,ease:"power3.out",stagger:.08,scrollTrigger:{trigger:g,start:"top 85%",once:true}}); });
      $$("[data-scramble]").forEach(function(el){ if(el.closest(".hero")) return; ScrollTrigger.create({trigger:el,start:"top 90%",once:true,onEnter:function(){scramble(el);}}); });
      $$("[data-count]").forEach(function(el){ ScrollTrigger.create({trigger:el,start:"top 92%",once:true,onEnter:function(){countUp(el);}}); });
      // band words
      var bandH=$("[data-band]"); if(bandH) gsap.from(bandH.children,{opacity:0,y:40,duration:.9,ease:"power4.out",stagger:.12,scrollTrigger:{trigger:".band",start:"top 75%",once:true}});
    }
  }

  /* ---------- HERO INTRO ---------- */
  function heroIn(){
    if(reduce||!hasGSAP) return;
    var tl=gsap.timeline();
    tl.from("#heroBg",{scale:1.12,duration:1.6,ease:"power3.out"},0)
      .from(".hero__scrim",{opacity:0,duration:1},0)
      .from(".sig",{opacity:0,y:16,duration:.6,ease:"power3"},.2)
      .from(".hero h1 .ln>*",{yPercent:110,duration:.8,ease:"power4.out",stagger:.09},.3)
      .from(".hero__sub",{opacity:0,y:18,duration:.6},"-=.35")
      .from(".hero__cta",{opacity:0,y:18,duration:.6},"-=.4")
      .from(".trust li",{opacity:0,y:12,duration:.4,stagger:.06},"-=.4")
      .from(".hero__status",{opacity:0,x:30,duration:.7,ease:"power3"},"-=.5")
      .from(".hero__tag",{opacity:0,y:-10,duration:.5},"-=.5");
    gsap.delayedCall(.55,function(){ $$(".hero [data-scramble]").forEach(function(el,i){ setTimeout(function(){scramble(el);},i*120); }); });
  }

  /* ---------- BOOT (arming sequence) ---------- */
  (function(){
    var boot=$("#boot"),bar=$("#bootBar"),pct=$("#bootPct"),log=$("#bootLog"),
        stat=$("#bootStat"),head=$("#bootHead"),stream=$("#bootStream"),
        target=$("#bootTarget"),bloom=$("#bootBloom"),beam=$("#bootBeam"),
        armed=$("#bootArmed"),flash=$("#bootFlash"),consoleEl=$("#bootConsole"),
        corners=$$(".boot__corner"),locks=$$(".boot__lk"),ghosts=$$(".boot__ghost");
    if(!boot){ heroIn(); if(window.ScrollTrigger) ScrollTrigger.refresh(); return; } // pages without a boot overlay skip straight to the hero intro
    var lines=["Mounting escrow ledger","Verifying KYC gateway","Syncing arena feed","Arming dispute engine","All systems operational"];
    function hex(){ return "0x"+("000"+Math.floor(Math.random()*65536).toString(16).toUpperCase()).slice(-4); }
    function finish(){ if(boot._done) return; boot._done=true; if(boot._tl) boot._tl.kill();
      document.body.style.overflow=""; if(lenis) lenis.start();
      if(hasGSAP&&!reduce) gsap.to(boot,{yPercent:-100,duration:.7,ease:"power4.inOut",onComplete:function(){boot.style.display="none";}}); else boot.style.display="none";
      heroIn(); if(window.ScrollTrigger) ScrollTrigger.refresh(); }
    boot.addEventListener("click",finish);
    if(reduce||!hasGSAP){ boot.style.display="none"; heroIn(); return; }
    document.body.style.overflow="hidden"; if(lenis) lenis.stop();

    var pr={v:0},dev={v:0},tl=gsap.timeline(); boot._tl=tl;

    tl.to(corners,{opacity:1,duration:.4,stagger:.05,ease:"power2.out"},0)
      .to(".boot__head",{opacity:1,duration:.4,ease:"power2.out"},.08)
      /* lock brackets fly in and snap onto the wordmark */
      .fromTo(locks,{opacity:0,scale:1.9,x:function(i){return [-20,20,-20,20][i];},y:function(i){return [-15,-15,15,15][i];}},
                    {opacity:1,scale:1,x:0,y:0,duration:.5,stagger:.03,ease:"power4.out"},.16)
      /* scan beam develops the logo left to right */
      .to(dev,{v:1,duration:.5,ease:"power2.inOut",
          onStart:function(){beam.style.opacity=1;},
          onUpdate:function(){target.style.setProperty("--dev",dev.v);},
          onComplete:function(){beam.style.opacity=0;}},.28)
      .call(function(){stat.textContent="Arming";},null,.6)
      /* power-on RGB glitch + ember bloom on lock */
      .to(ghosts,{opacity:.6,duration:.03},.6)
      .to(ghosts[0],{x:3,duration:.05},.61).to(ghosts[1],{x:-3,duration:.05},.61)
      .to(ghosts,{opacity:0,x:0,duration:.2,ease:"power2.out"},.7)
      .fromTo(bloom,{opacity:0,scale:.6},{opacity:.85,scale:1.15,duration:.24,ease:"power2.out"},.58)
      .to(bloom,{opacity:.3,scale:1,duration:.5,ease:"power2.out"},.82)
      /* arm the meter: segmented bar + counter + scan head + telemetry */
      .to(bar,{scaleX:1,duration:1.2,ease:"power2.inOut"},.66)
      .to(pr,{v:100,duration:1.2,ease:"power2.inOut",
          onUpdate:function(){ var v=pr.v; pct.innerHTML=(v<10?"0":"")+Math.round(v)+"<b>%</b>";
            head.style.opacity=1; head.style.left=v+"%";
            stream.innerHTML="Link ▸ "+hex()+" · "+hex()+" ▸ <b>secure</b>"; },
          onComplete:function(){ head.style.opacity=0; }},.66);

    /* system-check log resolves line by line */
    lines.forEach(function(t,i){
      tl.call(function(){
        var d=document.createElement("div"); d.className="ln";
        d.innerHTML='<span class="dot"></span><span class="t">'+t+'</span><span class="ok">'+(i===lines.length-1?"Online":"Cleared")+'</span>';
        log.appendChild(d); while(log.children.length>3) log.removeChild(log.firstChild);
        requestAnimationFrame(function(){ d.classList.add("in"); });
        gsap.delayedCall(.26,function(){ d.classList.add("done"); });
      },null,.72+i*.26);
    });

    /* armed handoff: lock punch, coral flash, stamp, curtain up */
    tl.call(function(){ stat.textContent="Armed"; stat.classList.add("armed"); },null,2.05)
      .to(locks,{scale:.82,duration:.11,ease:"power3.out",yoyo:true,repeat:1},2.05)
      .fromTo(consoleEl,{opacity:1,filter:"blur(0px)"},{opacity:.22,filter:"blur(3px)",duration:.3,ease:"power2.out"},2.12)
      .fromTo(flash,{opacity:0},{opacity:.9,duration:.12,ease:"power2.out"},2.12).to(flash,{opacity:0,duration:.5,ease:"power2.in"},2.24)
      .fromTo(armed,{opacity:0,scale:.94,letterSpacing:"0.6em"},{opacity:1,scale:1,letterSpacing:"0.42em",duration:.4,ease:"power3.out"},2.16)
      .to(armed,{opacity:.25,duration:.05,yoyo:true,repeat:3},2.44)
      .to(armed,{opacity:0,duration:.3,ease:"power2.in"},2.74)
      .call(finish,null,2.8);
  })();

  /* ---------- TOAST ---------- */
  function toast(msg){ var t=document.createElement("div"); t.className="toast"; t.setAttribute("role","status");
    t.innerHTML='<span class="d" aria-hidden="true"></span>'+msg; document.body.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add("show"); });
    setTimeout(function(){ t.classList.remove("show"); setTimeout(function(){ t.remove(); },520); },2600); }

  /* ---------- COIN BURST (micro-celebration on the primary CTA) ---------- */
  function coinBurst(x,y){ if(reduce||!hasGSAP) return;
    var ring=document.createElement("span"); ring.className="coin-ring"; ring.style.left=x+"px"; ring.style.top=y+"px"; document.body.appendChild(ring);
    gsap.fromTo(ring,{scale:0,opacity:.95},{scale:1.4,opacity:0,duration:.55,ease:"power2.out",onComplete:function(){ ring.remove(); }});
    for(var i=0;i<16;i++){ var s=document.createElement("span"); s.className="coin-fx"; s.textContent="◈";
      s.style.left=x+"px"; s.style.top=y+"px"; s.style.fontSize=(14+Math.random()*16)+"px"; document.body.appendChild(s);
      var ang=(-Math.PI/2)+(Math.random()-.5)*1.8, dist=80+Math.random()*130;
      gsap.fromTo(s,{scale:0,opacity:1},{x:Math.cos(ang)*dist,y:Math.sin(ang)*dist-24,rotation:(Math.random()-.5)*440,scale:1,opacity:0,
        duration:.85+Math.random()*.5,ease:"power2.out",onComplete:function(){ this.targets()[0].remove(); }}); } }
  $$('[data-sfx="coin"]').forEach(function(el){ el.addEventListener("click",function(e){
    var x=e.clientX,y=e.clientY; if(!x&&!y){ var r=el.getBoundingClientRect(); x=r.left+r.width/2; y=r.top+r.height/2; } coinBurst(x,y); }); });

  /* ---------- SCROLL-SPY NAV (generic across pages) ---------- */
  (function(){ if(!("IntersectionObserver" in window)) return;
    var links=$$('.nav__links a[href^="#"]'); if(!links.length) return;
    var map={},secs=[];
    links.forEach(function(a){ var id=a.getAttribute("href").slice(1); var el=id&&document.getElementById(id); if(el){ map[id]=a; secs.push(el); } });
    if(!secs.length) return;
    var io=new IntersectionObserver(function(ents){ ents.forEach(function(en){ if(en.isIntersecting){
      $$(".nav__links a").forEach(function(a){ a.classList.remove("active"); });
      if(map[en.target.id]) map[en.target.id].classList.add("active"); } }); },{rootMargin:"-45% 0px -50% 0px"});
    secs.forEach(function(s){ io.observe(s); }); })();

  /* ---------- KONAMI: OVERDRIVE ---------- */
  function fireOverdrive(){ if(document.body.classList.contains("overdrive")) return;
    document.body.classList.add("overdrive"); overdrive=true; toast("⚡ Overdrive engaged");
    Sound.play("coin"); Sound.play("powerup");
    setTimeout(function(){ document.body.classList.remove("overdrive"); overdrive=false; },6000); }
  (function(){ var seq=[38,38,40,40,37,39,37,39,66,65],i=0;
    window.addEventListener("keydown",function(e){ var k=e.keyCode||e.which; i=(k===seq[i])?i+1:(k===seq[0]?1:0); if(i===seq.length){ i=0; fireOverdrive(); } }); })();

  /* ---------- DEV CONSOLE GREETING ---------- */
  try{ console.log("%cBOADMAN","color:#FF3D1F;font:900 40px Chakra Petch,Saira,sans-serif;text-shadow:0 0 12px rgba(255,61,31,.6)");
    console.log("%cCompete with discipline. You opened the console, so you already play to win.\nEscrow, 48h holds, named payouts, 5-year audit trail: all real, all in the open.\nBuilt with GSAP + Lenis + Web Audio. Try the Konami code.","color:#8C8C97;font:13px Chakra Petch,monospace;line-height:1.5"); }catch(e){}

  /* ---------- SPECTATE MODE (arena broadcast) ---------- */
  (function(){
    var overlay=$("#spectate"), stage=$("#specStage"), cue=$("#specCue"), outro=$("#specOutro");
    var closeBtn=$("#specClose"), muteBtn=$("#specMute"), joinBtn=$("#specJoin");
    if(!overlay||!cue||!stage) return;
    var progEls=$$("#specProg b");
    var built=false, tl=null, isOpen=false, lastFocus=null, muted=false, SCENE=4.4;
    var scenes=[
      {img:"images/spectate-racing.png",  kind:"Racing",       title:"Friday Night Sprint Cup", meta:"Prize 12,400 · 74/128",
       feed:[["Lap 12 / 20",0],["Overtake — Turn 3",0],["Fastest lap 1:42.7",0],["P1 takes the lead",1]]},
      {img:"images/spectate-shooter.png", kind:"Shooter · 1v1", title:"No-Scope Showdown",      meta:"Prize 8,000 · 32/64",
       feed:[["Round 4 / 6",0],["Headshot — P1",0],["Clutch 1v2",0],["Round won — P1",1]]},
      {img:"images/spectate-fighting.png",kind:"Fighting · 1v1",title:"Arena Championship",     meta:"Prize 15,000 · 18/32",
       feed:[["Round 2 / 3",0],["Counter hit",0],["Perfect — 12 hits",0],["K.O. — P1 wins",1]]}
    ];
    function build(){ if(built) return; built=true;
      scenes.forEach(function(sc){ var el=document.createElement("div"); el.className="scene";
        el.innerHTML='<div class="scene__bg"><div class="ph"></div><img loading="lazy" decoding="async" src="'+sc.img+'" alt="" onerror="this.remove()"></div>'
          +'<div class="scene__grade"></div><div class="scene__scan"></div><div class="scene__feed"></div>'
          +'<div class="scene__hud"><span class="scene__tag"><span class="d"></span>Live · '+sc.kind+'</span>'
          +'<h3 class="scene__title">'+sc.title+'</h3><div class="scene__bar"><i></i></div>'
          +'<div class="scene__row"><span class="scene__score">P1 <b class="s1">0</b><small>vs</small><b class="s2">0</b> P2</span>'
          +'<span class="scene__meta">'+sc.meta+'</span></div></div>';
        stage.appendChild(el); }); }
    function els(){ return $$(".scene",stage); }
    function revealScene(i){
      els().forEach(function(e,idx){ if(idx!==i) e.style.display="none"; });
      var el=els()[i]; if(!el) return;
      $(".scene__feed",el).innerHTML=""; $(".s1",el).textContent="0"; $(".s2",el).textContent="0"; $(".scene__bar i",el).style.width="0%";
      el.style.display="block";
      if(!reduce&&hasGSAP){
        gsap.fromTo(el,{opacity:0,clipPath:"inset(0 100% 0 0)"},{opacity:1,clipPath:"inset(0 0% 0 0)",duration:.6,ease:"power3.out"});
        gsap.fromTo($(".scene__bg",el),{scale:1.04,xPercent:1.5},{scale:1.2,xPercent:-1.5,duration:SCENE+.5,ease:"none"});
        gsap.to($(".scene__bar i",el),{width:"100%",duration:SCENE-.4,ease:"none"});
      } else { el.style.opacity=1; $(".scene__bar i",el).style.width="100%"; }
      if(progEls[i]){ if(!reduce&&hasGSAP) gsap.fromTo(progEls[i],{width:"0%"},{width:"100%",duration:SCENE,ease:"none"}); else progEls[i].style.width="100%"; }
      Sound.play("impact"); Sound.play("crowd");
    }
    function pushFeed(i,item,fi){ var el=els()[i]; if(!el) return;
      var line=document.createElement("div"); line.className="scene__evt"+(item[1]?" big":"");
      line.innerHTML='<span class="dot" aria-hidden="true"></span>'+item[0]; $(".scene__feed",el).appendChild(line);
      var s1=$(".s1",el), s2=$(".s2",el);
      if(item[1]){ s1.textContent=(+s1.textContent+1); Sound.play("impact"); flash(el); }
      else { if(fi%2===0) s1.textContent=(+s1.textContent+1); else s2.textContent=(+s2.textContent+1); Sound.play("tick"); }
    }
    function flash(el){ if(reduce||!hasGSAP) return; var f=document.createElement("div");
      f.style.cssText="position:absolute;inset:0;background:rgba(255,61,31,.25);pointer-events:none;z-index:4";
      el.appendChild(f); gsap.to(f,{opacity:0,duration:.5,ease:"power2.out",onComplete:function(){f.remove();}}); }
    function hideScene(i){ var el=els()[i]; if(!el) return;
      if(!reduce&&hasGSAP) gsap.to(el,{opacity:0,duration:.4,onComplete:function(){el.style.display="none";}}); else el.style.display="none";
      Sound.play("swoosh"); }
    function showOutro(){ outro.classList.add("show"); Sound.play("swoosh"); Sound.play("powerup");
      if(!reduce&&hasGSAP) gsap.from(outro.children,{opacity:0,y:24,duration:.6,stagger:.1,ease:"power3.out"}); }
    function sequence(){ tl=gsap.timeline({onComplete:showOutro});
      scenes.forEach(function(sc,i){ var t=i*SCENE;
        tl.call(function(){ revealScene(i); },null,t);
        sc.feed.forEach(function(item,fi){ tl.call(function(){ pushFeed(i,item,fi); },null,t+.7+fi*.8); });
        if(i<scenes.length-1) tl.call(function(){ hideScene(i); },null,t+SCENE-.5);
      }); }
    function launch(){ if(isOpen) return; isOpen=true; lastFocus=document.activeElement; build();
      document.body.classList.add("spectating"); overlay.hidden=false; overlay.classList.add("open");
      outro.classList.remove("show"); progEls.forEach(function(b){ b.style.width="0%"; });
      if(lenis) lenis.stop(); document.body.style.overflow="hidden";
      Sound.startShow(); muted=false; muteBtn.textContent="♪ Sound"; Sound.play("swoosh");
      if(!reduce&&hasGSAP) gsap.fromTo(overlay,{opacity:0},{opacity:1,duration:.4}); else overlay.style.opacity=1;
      closeBtn.focus();
      if(hasGSAP&&!reduce){ gsap.delayedCall(.35,sequence); }
      else { var i=0; revealScene(0); scenes[0].feed.forEach(function(it,fi){ pushFeed(0,it,fi); });
        overlay._iv=setInterval(function(){ i++; if(i>=scenes.length){ clearInterval(overlay._iv); showOutro(); return; }
          revealScene(i); scenes[i].feed.forEach(function(it,fi){ pushFeed(i,it,fi); }); }, reduce?2600:SCENE*1000); }
    }
    function close(){ if(!isOpen) return; isOpen=false; document.body.classList.remove("spectating");
      if(tl){ tl.kill(); tl=null; } if(overlay._iv){ clearInterval(overlay._iv); overlay._iv=null; }
      if(hasGSAP) gsap.killTweensOf(".scene, .scene__bg, .scene__bar i, #specProg b");
      Sound.play("tick"); Sound.endShow();
      var done=function(){ overlay.classList.remove("open"); overlay.hidden=true; overlay.style.opacity=""; };
      if(!reduce&&hasGSAP) gsap.to(overlay,{opacity:0,duration:.35,onComplete:done}); else done();
      if(lenis) lenis.start(); document.body.style.overflow="";
      if(lastFocus&&lastFocus.focus) lastFocus.focus();
    }
    cue.addEventListener("click",launch);
    closeBtn.addEventListener("click",close);
    joinBtn.addEventListener("click",function(e){ e.preventDefault(); close(); });
    muteBtn.addEventListener("click",function(){ muted=!muted; Sound.setShowVol(muted?0:.9);
      muteBtn.textContent=muted?"✕ Muted":"♪ Sound"; muteBtn.setAttribute("aria-label",muted?"Unmute audio":"Mute audio"); });
    window.addEventListener("keydown",function(e){ if(isOpen&&e.key==="Escape") close(); });
    // reveal cue after boot settles
    if(hasGSAP) gsap.delayedCall(2.6,function(){ cue.classList.add("ready"); }); else setTimeout(function(){ cue.classList.add("ready"); },2600);
    // typed "boadman" combo
    var buf="";
    window.addEventListener("keydown",function(e){ if(e.metaKey||e.ctrlKey||e.altKey||isOpen) return;
      var k=(e.key||"").toLowerCase(); if(k.length===1&&k>="a"&&k<="z"){ buf=(buf+k).slice(-7); if(buf==="boadman"){ buf=""; launch(); } } else buf=""; });
  })();

  if(document.readyState==="complete") initReveals(); else window.addEventListener("load",initReveals);
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(function(){ if(window.ScrollTrigger) ScrollTrigger.refresh(); });
})();
