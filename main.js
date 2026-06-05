/* ── 1. Barra verde in cima - Mostra quanto hai scrollato ── */
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.appendChild(progressBar);
 
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});
 
 
/* ── 2. Menu hamburger Su mobile - appare e il menu si apre da destra ── */
const nav = document.querySelector('nav');
const navLinks = document.querySelector('.nav-links');
 
// Crea il pulsante hamburger
const hamburger = document.createElement('button');
hamburger.className = 'hamburger';
hamburger.setAttribute('aria-label', 'Apri menu');
hamburger.innerHTML = `
  <span></span>
  <span></span>
  <span></span>
`;
nav.appendChild(hamburger);
 
// Toggle menu
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('nav-open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-label', isOpen ? 'Chiudi menu' : 'Apri menu');
});
 
// Chiudi menu cliccando un link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('nav-open');
    hamburger.classList.remove('active');
  });
});
 
 
/* ── 3. Typing effect - Sotto al nome scorrono frasi che si scrivono da sole ── */
// Aggiunge una seconda riga al sotto del nome con ruoli che cambiano
const heroSub = document.querySelector('.hero-sub');
const roles = [
  'Web Developer Full Stack in formazione.',
  'Designer con il codice in mano.',
  'Frontend + grafica = il mio stack.',
  'Dal wireframe al deploy.',
];
 
const typingEl = document.createElement('span');
typingEl.className = 'typing-role';
// Inserisce il typing element PRIMA del testo descrittivo
heroSub.parentNode.insertBefore(typingEl, heroSub);
 
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;
 
function type() {
  const current = roles[roleIndex];
 
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
 
  let delay = isDeleting ? 40 : 70;
 
  if (!isDeleting && charIndex === current.length) {
    delay = 2000; // pausa alla fine
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
 
  typingTimeout = setTimeout(type, delay);
}
 
// Avvia dopo un secondo
setTimeout(type, 1000);
 
 
/* ── 4. Reveal direzionale - About entra da sinistra/destra, skills dal basso a cascata ── */
// Rimuove il vecchio observer e ne crea uno più ricco
const allReveals = document.querySelectorAll('.reveal');
 
// Assegna direzioni alternate automaticamente
allReveals.forEach((el, i) => {
  if (el.closest('#about')) {
    // About: sinistra e destra
    el.dataset.revealDir = i % 2 === 0 ? 'left' : 'right';
  } else if (el.closest('.skills-grid')) {
    // Skill cards: dal basso con stagger
    el.dataset.revealDir = 'up';
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
  } else {
    el.dataset.revealDir = 'up';
  }
});
 
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
 
allReveals.forEach(el => revealObserver.observe(el));
 
 
/* ── 5. Cursore - glowPallino verde + cerchio che segue il mouse, si allarga sugli elementi cliccabili ── */
// Solo su desktop (non touch)
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  const cursorDot = document.createElement('div');
  cursorDot.id = 'cursor-dot';
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);
 
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
 
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });
 
  // Smooth follow
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
 
  // Hover su elementi interattivi
  const interactives = document.querySelectorAll('a, button, .skill-tag, .hero-stat, .exp-item, .contact-link');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      cursorDot.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      cursorDot.classList.remove('cursor-hover');
    });
  });
}
 
 
/* ── 6. Parallax hero - Lo sfondo si muove più lentamente mentre scorri ── */
const heroBg = document.querySelector('.hero-bg');
 
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight * 1.5) {
    heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
}, { passive: true });
 
 
/* ── 7. Effetto glitch - Il nome trema ogni 7 secondi (e al hover) con colori acidi ── */
const heroName = document.querySelector('.hero-name');
 
if (heroName) {
  heroName.addEventListener('mouseenter', () => {
    heroName.classList.add('glitch');
  });
  heroName.addEventListener('mouseleave', () => {
    heroName.classList.remove('glitch');
  });
  // Glitch automatico ogni tanto
  setInterval(() => {
    heroName.classList.add('glitch');
    setTimeout(() => heroName.classList.remove('glitch'), 600);
  }, 7000);
}
 
 
/* ── 8. Nav attiva - Il link della sezione corrente diventa verde mentre scorri ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
 
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('nav-active', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.4 });
 
sections.forEach(s => sectionObserver.observe(s));

/* ── THEME TOGGLE ── */
const themeBtn = document.getElementById('theme-toggle');
 
// Ripristina preferenza salvata
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeBtn.textContent = '🌙';
}
 
themeBtn.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  themeBtn.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
 
  // Piccola animazione di rotazione
  themeBtn.style.transition = 'transform 0.4s ease, border-color 0.2s, background 0.2s';
  themeBtn.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    themeBtn.style.transform = '';
  }, 400);
});