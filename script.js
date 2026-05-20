/* ===========================
   SAHRAN HAMEED PORTFOLIO JS
=========================== */

// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ── Navbar scroll behavior ──
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 20);
  lastScroll = scrollY;

  // Active nav link based on scroll position
  updateActiveNav();
});

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Active nav link on scroll ──
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// ── Typed text effect ──
const roles = [
  'Full Stack Developer',
  'Cyber Security Enthusiast',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeText() {
  if (!typedEl) return;

  const current = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedEl.textContent = current.substring(0, charIndex);

  let speed = isDeleting ? 45 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeText, speed);
}

typeText();

// ── Reveal on scroll ──
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for sibling reveals
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) delay = idx * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ── Certifications Filter ──
const certFilters = document.querySelectorAll('.cert-filter');
const certCards = document.querySelectorAll('.cert-card');

certFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    certFilters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    certCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
        // Re-trigger reveal animation
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── Contact form ──
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    showFeedback('Please fill in all fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showFeedback('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate sending
  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Sending...';
  submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';

  await delay(1800);

  showFeedback('Message sent! I\'ll get back to you soon.', 'success');
  form.reset();
  submitBtn.disabled = false;
  submitBtn.querySelector('span').textContent = 'Send Message';
  submitBtn.querySelector('i').className = 'fas fa-paper-plane';
});

function showFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = 'form-feedback ' + type;
  setTimeout(() => {
    feedback.textContent = '';
    feedback.className = 'form-feedback';
  }, 4000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Input float label effect ──
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    if (!input.value) input.parentElement.classList.remove('focused');
  });
});

// ── Smooth scroll offset for fixed nav ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Parallax glow on mouse move ──
const heroGlow = document.querySelector('.hero-glow');
window.addEventListener('mousemove', (e) => {
  if (!heroGlow) return;
  const x = (e.clientX / window.innerWidth) * 20 - 10;
  const y = (e.clientY / window.innerHeight) * 20 - 10;
  heroGlow.style.transform = `translate(${x}px, ${y}px)`;
});
