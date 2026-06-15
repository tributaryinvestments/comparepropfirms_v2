/* cpf-chrome.js — shared chrome behavior: theme toggle, footer disclosures,
   sticky-header shadow, Futures mega-menu. Load once on every page (defer/end of body).
   NOTE: the theme bootstrap (read localStorage before paint) stays inline in <head> — see README. */

  // Theme toggle
  (function(){
    var t = document.getElementById('themeToggle');
    if(t){ t.addEventListener('click', function(){
      var dark = document.documentElement.classList.toggle('dark');
      try { localStorage.setItem('cpf-theme', dark ? 'dark' : 'light'); } catch(e){}
    }); }
  })();

  // Footer disclosures accordion
  (function(){
    var disc = document.getElementById('footDisc');
    var btn = document.getElementById('discToggle');
    if(disc && btn){ btn.addEventListener('click', function(){
      var open = disc.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }); }
  })();

  // Sticky header shadow on scroll
  (function(){
    var nav = document.getElementById('siteNav');
    if(!nav) return;
    var onScroll = function(){ nav.classList.toggle('stuck', window.scrollY > 4); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  // Futures mega-menu dropdown (hover on desktop, tap on touch)
  (function(){
    var dd = document.getElementById('futuresDD');
    var trigger = document.getElementById('futuresTrigger');
    if(!dd || !trigger) return;
    var hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    function open(){ dd.classList.add('open'); trigger.setAttribute('aria-expanded','true'); }
    function close(){ dd.classList.remove('open'); trigger.setAttribute('aria-expanded','false'); }
    if(hoverCapable){
      dd.addEventListener('mouseenter', open);
      dd.addEventListener('mouseleave', close);
      trigger.addEventListener('click', function(e){ e.preventDefault(); open(); });
    } else {
      trigger.addEventListener('click', function(e){ e.preventDefault(); dd.classList.contains('open') ? close() : open(); });
    }
    document.addEventListener('click', function(e){ if(!dd.contains(e.target)) close(); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });
  })();

  // Mobile nav drawer + Futures accordion
  (function(){
    var burger  = document.getElementById('mobileBurger') || document.querySelector('.mobile-burger');
    var drawer  = document.getElementById('mobileNav');
    var overlay = document.getElementById('mobileNavOverlay');
    var closeB  = document.getElementById('mobileNavClose');
    if(!burger || !drawer || !overlay) return;
    function open(){
      drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false');
      overlay.hidden = false; requestAnimationFrame(function(){ overlay.classList.add('open'); });
      document.body.style.overflow = 'hidden';
    }
    function close(){
      drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true');
      overlay.classList.remove('open'); setTimeout(function(){ overlay.hidden = true; }, 300);
      document.body.style.overflow = '';
    }
    burger.addEventListener('click', open);
    if(closeB) closeB.addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && drawer.classList.contains('open')) close(); });
    var trig = drawer.querySelector('.m-acc-trigger');
    var acc  = trig ? trig.closest('.m-acc') : null;
    if(trig && acc){ trig.addEventListener('click', function(){
      var isOpen = acc.classList.toggle('open');
      trig.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }); }
  })();


/* ---- Footer email subscribe -> Klaviyo (public key + single-opt-in list) ---- */
(function(){
  var PUBLIC = "WU7kHX", LIST = "XjQSvh", REV = "2025-10-15";
  function emailOk(e){ return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e); }
  function wire(){
    var btn = document.querySelector('.foot-subscribe'),
        inp = document.querySelector('.foot-input');
    if(!btn || !inp || btn.dataset.kvWired) return;
    btn.dataset.kvWired = "1";
    function msg(text, ok){
      var form = btn.closest('.foot-form');
      if(form){ form.innerHTML = '<p class="foot-form-msg" style="margin:0;font-size:14px;font-weight:600;color:'+(ok?'var(--blue)':'#c0392b')+'">'+text+'</p>'; }
    }
    btn.addEventListener('click', function(){
      var email = (inp.value || '').trim();
      if(!emailOk(email)){ inp.focus(); inp.style.borderColor = '#c0392b'; return; }
      btn.disabled = true; var label = btn.textContent; btn.textContent = '\u2026';
      fetch('https://a.klaviyo.com/client/subscriptions/?company_id=' + PUBLIC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'revision': REV },
        body: JSON.stringify({ data: { type: 'subscription', attributes: { profile: { data: { type: 'profile', attributes: { email: email } } } }, relationships: { list: { data: { type: 'list', id: LIST } } } } })
      }).then(function(r){
        if(r.status === 202 || r.ok){ msg("Thanks \u2014 you're subscribed!", true); }
        else { btn.disabled = false; btn.textContent = label; msg('Something went wrong. Please try again.', false); }
      }).catch(function(){ btn.disabled = false; btn.textContent = label; msg('Network error. Please try again.', false); });
    });
  }
  if(document.readyState !== 'loading') wire();
  else document.addEventListener('DOMContentLoaded', wire);
})();


/* ===== Scroll reveal (shared) — articles rely on this; ported from homepage =====
   Without this, .reveal elements (incl. the article hero) stay opacity:0 forever. */
(function(){
  function revealInit(){
    var els = document.querySelectorAll('.reveal');
    if(!els.length) return;
    if(!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      els.forEach(function(el){ el.classList.add('in'); }); return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function(el){ io.observe(el); });
  }
  if(document.readyState !== 'loading') revealInit();
  else document.addEventListener('DOMContentLoaded', revealInit);
})();
