/* Boadman App — dependency-free interactions (Operate mode).
   count-ups, live countdowns, filters, dropdowns, mobile drawer, fast reveal. */
(function(){
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function(s,c){return (c||document).querySelector(s);};
  var $$ = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));};

  /* ---------- mobile drawer ---------- */
  (function(){
    var rail = $(".rail"), burger = $("#burger"); if(!rail||!burger) return;
    var scrim = document.createElement("div"); scrim.className = "drawer-scrim"; document.body.appendChild(scrim);
    function open(o){ rail.classList.toggle("open",o); scrim.classList.toggle("on",o); burger.setAttribute("aria-expanded",String(o)); }
    burger.addEventListener("click", function(){ open(!rail.classList.contains("open")); });
    scrim.addEventListener("click", function(){ open(false); });
    addEventListener("keydown", function(e){ if(e.key==="Escape") open(false); });
    $$(".rail .navi").forEach(function(a){ a.addEventListener("click", function(){ open(false); }); });
  })();

  /* ---------- count-ups (comma-grouped, money-safe) ---------- */
  function fmt(n){ return Math.round(n).toLocaleString("en-GB"); }
  function countUp(el){
    var tg = parseFloat(el.getAttribute("data-count")); if(isNaN(tg)) return;
    var pre = el.getAttribute("data-prefix")||"", suf = el.getAttribute("data-suffix")||"";
    if(reduce){ el.textContent = pre+fmt(tg)+suf; return; }
    var dur = 900, t0 = null;
    function step(t){ if(!t0) t0=t; var p = Math.min(1,(t-t0)/dur); var e = 1-Math.pow(1-p,3);
      el.textContent = pre+fmt(tg*e)+suf; if(p<1) requestAnimationFrame(step); else el.textContent = pre+fmt(tg)+suf; }
    requestAnimationFrame(step);
  }
  // Off-screen figures are prefilled with their real value immediately (never a stuck "0"
  // where money belongs), then still count up when scrolled into view for the effect.
  function setFinal(el){ var tg=parseFloat(el.getAttribute("data-count")); if(!isNaN(tg)) el.textContent=(el.getAttribute("data-prefix")||"")+fmt(tg)+(el.getAttribute("data-suffix")||""); }
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ countUp(en.target); io.unobserve(en.target); } }); },{threshold:.35});
    $$("[data-count]").forEach(function(el){
      var r = el.getBoundingClientRect();
      if(r.top >= innerHeight || r.bottom <= 0) setFinal(el);   // below/above fold: show real value now
      io.observe(el);                                            // and animate when it enters view
    });
  } else { $$("[data-count]").forEach(countUp); }

  /* ---------- live countdowns (designed expired state) ---------- */
  $$("[data-countdown]").forEach(function(el){
    var parts = el.getAttribute("data-countdown").split(":").map(Number);
    var s = (parts[0]||0)*3600 + (parts[1]||0)*60 + (parts[2]||0);
    var expired = el.getAttribute("data-expired") || "Ended";
    function pad(n){ return (n<10?"0":"")+n; }
    function render(){
      if(s<=0){ el.textContent = expired; el.classList.add("is-expired"); return; }
      var h = Math.floor(s/3600), m = Math.floor((s%3600)/60), c = s%60;
      el.textContent = (h>0? pad(h)+":" : "") + pad(m) + ":" + pad(c);
      s--;
    }
    render(); if(s>=0){ var iv = setInterval(function(){ render(); if(s<0){ render(); clearInterval(iv); } }, 1000); }
  });

  /* ---------- filter pills (game = single, status = multi) ---------- */
  $$("[data-filter='single']").forEach(function(grp){
    $$(".pill", grp).forEach(function(p){ p.addEventListener("click", function(){
      $$(".pill", grp).forEach(function(x){ x.setAttribute("aria-pressed","false"); });
      p.setAttribute("aria-pressed","true");
    }); });
  });
  $$("[data-filter='multi'] .pill").forEach(function(p){
    p.addEventListener("click", function(){ p.setAttribute("aria-pressed", p.getAttribute("aria-pressed")==="true"?"false":"true"); });
  });
  // segmented controls (single-select)
  $$("[data-seg]").forEach(function(seg){
    $$("button", seg).forEach(function(b){ b.addEventListener("click", function(){
      $$("button", seg).forEach(function(x){ x.setAttribute("aria-pressed","false"); });
      b.setAttribute("aria-pressed","true");
    }); });
  });

  /* ---------- select menus (fixed-position, escape overflow) ---------- */
  var openMenu = null;
  function closeMenus(){ if(openMenu){ openMenu.classList.remove("open"); openMenu=null; } }
  $$(".selm").forEach(function(sel){
    var btn = $(".selm__btn", sel), menu = $(".selm__menu", sel), val = $(".selm__val", sel);
    if(!btn||!menu) return;
    btn.setAttribute("aria-haspopup","listbox"); btn.setAttribute("aria-expanded","false");
    btn.addEventListener("click", function(e){ e.stopPropagation();
      var isOpen = sel.classList.contains("open"); closeMenus();
      if(!isOpen){ var r = btn.getBoundingClientRect(); menu.style.left = r.left+"px"; menu.style.top = (r.bottom+6)+"px";
        sel.classList.add("open"); openMenu = sel; btn.setAttribute("aria-expanded","true"); }
      else btn.setAttribute("aria-expanded","false");
    });
    $$("button", menu).forEach(function(opt){ opt.addEventListener("click", function(){
      $$("button", menu).forEach(function(o){ o.setAttribute("aria-selected","false"); });
      opt.setAttribute("aria-selected","true");
      if(val) val.textContent = opt.getAttribute("data-label") || opt.textContent.trim();
      closeMenus(); btn.setAttribute("aria-expanded","false");
    }); });
  });
  addEventListener("click", closeMenus);
  addEventListener("keydown", function(e){ if(e.key==="Escape") closeMenus(); });
  addEventListener("scroll", closeMenus, true);

  /* ---------- avatar / notification dropdowns (simple toggle) ---------- */
  $$("[data-pop]").forEach(function(trigger){
    var pop = document.getElementById(trigger.getAttribute("data-pop")); if(!pop) return;
    trigger.addEventListener("click", function(e){ e.stopPropagation();
      var open = pop.classList.toggle("open"); trigger.setAttribute("aria-expanded",String(open)); });
    addEventListener("click", function(){ pop.classList.remove("open"); trigger.setAttribute("aria-expanded","false"); });
  });

  /* ---------- fast first-paint reveal (state, not choreography) ---------- */
  var reveals = $$("[data-reveal]");
  if(reduce){ reveals.forEach(function(el){ el.classList.add("reveal","in"); }); }
  else { reveals.forEach(function(el){ el.classList.add("reveal"); });
    requestAnimationFrame(function(){ reveals.forEach(function(el,i){ setTimeout(function(){ el.classList.add("in"); }, Math.min(i*45,260)); }); }); }

  /* ---------- prize breakdown ↔ distribution bar link ---------- */
  $$(".pbreak").forEach(function(pb){
    var sec = pb.closest("section"); if(!sec) return;
    var bar = sec.querySelector(".distbar"); if(!bar) return;
    var segs = $$("i", bar), rows = $$(".pbreak__row", pb);
    rows.forEach(function(row, i){ row.addEventListener("mouseenter", function(){
      segs.forEach(function(s, j){ s.style.opacity = (j===i)?"1":".25"; s.style.transform = (j===i)?"scaleY(1.55)":"scaleY(.8)"; });
    }); });
    pb.addEventListener("mouseleave", function(){ segs.forEach(function(s){ s.style.opacity=""; s.style.transform=""; }); });
  });

  /* ---------- loading demo: buttons with data-loading show spinner briefly ---------- */
  $$("[data-demo-load]").forEach(function(b){ b.addEventListener("click", function(e){
    if(b.getAttribute("href")==="#") e.preventDefault();
    if(b.classList.contains("is-loading")) return;
    b.classList.add("is-loading"); setTimeout(function(){ b.classList.remove("is-loading"); }, 1100);
  }); });
})();
