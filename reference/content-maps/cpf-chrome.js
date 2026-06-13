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
