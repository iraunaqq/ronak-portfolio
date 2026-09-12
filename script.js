/* Replace the values in PORTFOLIO_CONFIG to personalize the portfolio. */
const PORTFOLIO_CONFIG = {
  name: 'Ronak',
  contact: {
    email: '',
    github: '',
    linkedin: ''
  },
  timeline: [
    { year: '2026', title: 'Started BCA at JECRC University', description: 'Beginning the journey with a curious mind and an open notebook.' },
    { year: '2026', title: 'Programming & CS fundamentals', description: 'Learning the building blocks: logic, problem solving and how computers think.' },
    { year: '2026', title: 'Exploring AI & automation', description: 'Trying tools, workflows and ideas that turn questions into experiments.' },
    { year: 'Next', title: 'Build more real-world projects', description: 'A work in progress: strengthen fundamentals by making useful things.' }
  ],
  learningSkills: [
    'Programming fundamentals', 'Problem solving', 'Web development fundamentals',
    'AI tools & AI-assisted development', 'Automation workflows', 'Git & GitHub fundamentals'
  ],
  exploringSkills: [
    'Artificial Intelligence', 'Generative AI', 'APIs', 'Automation',
    'Software development', 'Modern web technologies'
  ],
  projects: [
    {
      index: '01', title: 'AI PDF Summarizer',
      description: 'An automation workflow that takes a PDF, processes its content using AI, generates a concise summary and prepares the result for delivery.',
      category: 'AI + Automation', status: 'Building', tools: 'PDF processing / AI tools / workflow automation',
      github: '', demo: '', featured: true
    },
    {
      index: '02', title: 'AI Content Repurposing System',
      description: 'An AI-powered workflow concept that analyzes long-form video content, identifies useful sections and helps transform them into short-form content.',
      category: 'AI + Automation + Content', status: 'Exploring', tools: 'AI tools / content workflows / research',
      github: '', demo: '', featured: false
    },
    {
      index: '03', title: 'More Projects Coming Soon',
      description: 'A growing space for experiments, small builds and ideas that are still finding their shape.',
      category: 'Future experiments', status: 'Open canvas', tools: 'Curiosity / persistence / new ideas',
      github: '', demo: '', featured: false, comingSoon: true
    }
  ],
  curiousAbout: [
    ['🤖', 'Artificial Intelligence'], ['⚡', 'AI Automation'], ['💻', 'Software Development'],
    ['🌐', 'Web Technologies'], ['🔗', 'APIs & Integrations'], ['🧠', 'Problem Solving'], ['🚀', 'Building Real Projects']
  ],
  goals: [
    'Strengthen programming fundamentals', 'Build meaningful projects', 'Learn full-stack development',
    'Explore AI and machine learning', 'Participate in hackathons and technical competitions',
    'Build real-world products', 'Become a strong software/AI developer'
  ]
};

const $ = (selector) => document.querySelector(selector);
const create = (tag, className, content = '') => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.innerHTML = content;
  return element;
};

function renderTimeline() {
  const timeline = $('#timeline');
  PORTFOLIO_CONFIG.timeline.forEach((item) => {
    timeline.append(create('article', 'timeline-item reveal', `
      <span class="timeline-node"></span><div class="timeline-year">${item.year}</div>
      <div class="timeline-title">${item.title}</div><div class="timeline-desc">${item.description}</div>
    `));
  });
}

function renderSkills() {
  [['#learning-skills', PORTFOLIO_CONFIG.learningSkills], ['#exploring-skills', PORTFOLIO_CONFIG.exploringSkills]].forEach(([selector, skills]) => {
    const list = $(selector);
    skills.forEach((skill) => list.append(create('div', 'skill-item', skill)));
  });
}

function safeLink(url, label) {
  return url ? `<a href="${url}" target="_blank" rel="noreferrer">${label} ↗</a>` : `<span title="Add a link in PORTFOLIO_CONFIG">${label} · soon</span>`;
}

function renderProjects() {
  const grid = $('#projects-grid');
  PORTFOLIO_CONFIG.projects.forEach((project) => {
    const cardClass = `project-card reveal ${project.featured ? 'featured' : ''} ${project.comingSoon ? 'coming-card' : ''}`;
    grid.append(create('article', cardClass, `
      <span class="project-index">${project.index}</span>
      <span class="project-status">${project.status}</span>
      <h3>${project.title}</h3><p>${project.description}</p>
      <div class="project-meta"><span class="project-tools">${project.tools}</span><span class="project-category">${project.category}</span></div>
      <div class="project-links">${safeLink(project.github, 'GitHub')} ${safeLink(project.demo, 'Live demo')}</div>
    `));
  });
}

function renderCuriousAbout() {
  const grid = $('#curious-grid');
  PORTFOLIO_CONFIG.curiousAbout.forEach(([symbol, label]) => grid.append(create('div', 'curious-item reveal', `<span class="curious-symbol">${symbol}</span>${label}`)));
}

function renderGoals() {
  const list = $('#goals-list');
  PORTFOLIO_CONFIG.goals.forEach((goal, index) => list.append(create('div', 'goal-item reveal', `<span class="goal-number">${String(index + 1).padStart(2, '0')} / goal</span><span class="goal-title">${goal}</span><span class="goal-arrow">↗</span>`)));
}

function renderContact() {
  const links = $('#contact-links');
  const contacts = [['Email', PORTFOLIO_CONFIG.contact.email, '✉'], ['GitHub', PORTFOLIO_CONFIG.contact.github, '⌁'], ['LinkedIn', PORTFOLIO_CONFIG.contact.linkedin, 'in']];
  contacts.forEach(([label, value, icon]) => {
    const href = value ? (label === 'Email' ? `mailto:${value}` : value) : '#';
    links.append(create('a', 'contact-link', `<span>${icon} &nbsp; ${label}</span><span href="${href}">${value || 'Add link in config'} ↗</span>`));
    links.lastElementChild.href = href;
    if (value && label !== 'Email') { links.lastElementChild.target = '_blank'; links.lastElementChild.rel = 'noreferrer'; }
  });
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .1 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

function setupNavigation() {
  const toggle = $('.nav-toggle');
  const nav = $('.nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));
}

function setupNetwork() {
  const canvas = $('#network-canvas');
  const context = canvas.getContext('2d');
  const particles = [];
  const resize = () => { canvas.width = window.innerWidth; canvas.height = 850; };
  resize();
  for (let index = 0; index < 46; index += 1) particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18, r: Math.random() * 1.4 + .3 });
  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
      particle.x += particle.vx; particle.y += particle.vy;
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      context.fillStyle = index % 4 === 0 ? '#e5484d' : '#8e3040';
      context.globalAlpha = .55; context.beginPath(); context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2); context.fill();
      particles.slice(index + 1).forEach((other) => { const distance = Math.hypot(particle.x - other.x, particle.y - other.y); if (distance < 125) { context.strokeStyle = '#b12635'; context.globalAlpha = (1 - distance / 125) * .08; context.beginPath(); context.moveTo(particle.x, particle.y); context.lineTo(other.x, other.y); context.stroke(); } });
    });
    requestAnimationFrame(draw);
  };
  window.addEventListener('resize', resize); draw();
}

renderTimeline(); renderSkills(); renderProjects(); renderCuriousAbout(); renderGoals(); renderContact();
$('#year').textContent = new Date().getFullYear();
setupNavigation(); setupReveal(); setupNetwork();
