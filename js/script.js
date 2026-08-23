const skills=[
 {title:'Frontend',items:['HTML','CSS','JavaScript','React','Next.js','TypeScript']},
 {title:'Backend',items:['Node.js','Express.js','REST APIs','Authentication','Server-side development']},
 {title:'Database',items:['MongoDB','MySQL','PostgreSQL']},
 {title:'Tools & Technologies',items:['Git','GitHub','Docker','VS Code','Linux']}
];
const projects=[
 {name:'Portfolio Website',cat:['web','fullstack'],desc:'A personal developer portfolio with responsive sections, theme switching, animations, contact interactions, and reusable content.',tech:['HTML','CSS','JavaScript'],image:'assets/project-portfolio.svg'},
 {name:'Video Streaming App',cat:['web','fullstack'],desc:'Editable placeholder for a video platform concept covering browsing, playback UI, user flows, and backend-ready architecture.',tech:['MERN','Next.js'],image:'assets/project-streaming.svg'},
 {name:'Student Management App',cat:['fullstack'],desc:'Editable placeholder for a student management system with records, dashboards, authentication, and database operations.',tech:['MERN','REST API'],image:'assets/project-student.svg'},
 {name:'Todo App',cat:['web','fullstack'],desc:'A focused productivity application placeholder demonstrating CRUD flows, filtering, local persistence, and clean UI.',tech:['JavaScript','LocalStorage'],image:'assets/project-todo.svg'}
];
const workflow=['Idea','UI / UX','Frontend','API','Backend','Database','Deployment'];

const skillsGrid=document.querySelector('#skillsGrid');
skills.forEach(s=>skillsGrid.insertAdjacentHTML('beforeend',`<article class="skill-card reveal"><h3>${s.title}</h3><div class="skill-list">${s.items.map(x=>`<span>${x}</span>`).join('')}</div></article>`));
const workflowGrid=document.querySelector('#workflowGrid');
workflow.forEach((x,i)=>workflowGrid.insertAdjacentHTML('beforeend',`<div class="workflow-step reveal"><strong>${x}</strong><span>0${i+1}</span></div>`));

const projectsGrid=document.querySelector('#projectsGrid');
function renderProjects(filter='all'){
 projectsGrid.innerHTML='';
 projects.filter(p=>filter==='all'||p.cat.includes(filter)).forEach((p,i)=>{
  const card=document.createElement('article'); card.className='project-card reveal visible';
  card.innerHTML=`<div class="project-image"><img src="${p.image}" alt="${p.name} project illustration"></div><div class="project-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="project-meta"><span>${p.tech.join(' · ')}</span><span>View ↗</span></div></div>`;
  card.addEventListener('click',()=>openModal(p)); projectsGrid.appendChild(card);
 });
}
renderProjects();
document.querySelectorAll('#filters button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('#filters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderProjects(btn.dataset.filter)}));

const modal=document.querySelector('#projectModal');
function openModal(p){document.querySelector('#modalKicker').textContent='PROJECT / '+p.tech[0];document.querySelector('#modalTitle').textContent=p.name;document.querySelector('#modalDescription').textContent=p.desc;document.querySelector('#modalTech').innerHTML=p.tech.map(x=>`<span>${x}</span>`).join('');document.querySelector('#modalLink').href='#contact';modal.classList.add('open');modal.setAttribute('aria-hidden','false')}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
document.querySelector('#modalClose').addEventListener('click',closeModal);document.querySelector('.modal-backdrop').addEventListener('click',closeModal);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const header=document.querySelector('#header'),progress=document.querySelector('#scrollProgress');
window.addEventListener('scroll',()=>{header.classList.toggle('scrolled',scrollY>20);progress.style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+'%'});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const themeToggle=document.querySelector('#themeToggle');
const saved=localStorage.getItem('aakash-theme');if(saved==='light')document.body.classList.add('light');
function updateThemeIcon(){themeToggle.textContent=document.body.classList.contains('light')?'☾':'☼'} updateThemeIcon();
themeToggle.addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('aakash-theme',document.body.classList.contains('light')?'light':'dark');updateThemeIcon()});

const menuBtn=document.querySelector('#menuBtn'),navLinks=document.querySelector('#navLinks');menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

const glow=document.querySelector('#cursorGlow');window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});

const form=document.querySelector('#contactForm'),status=document.querySelector('#formStatus');
form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const name=(data.get('name')||'').trim(),email=(data.get('email')||'').trim(),subject=(data.get('subject')||'').trim(),message=(data.get('message')||'').trim();if(!name||!subject||!message||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){status.textContent='Please complete all fields with a valid email.';return}status.textContent='Opening your email app…';const body=encodeURIComponent(`Hi Aakash,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);window.location.href=`mailto:aakashpc123@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;form.reset()});

// If the Google Drive profile is unavailable, use the supplied local avatar.
const profile=document.querySelector('#profileImage');profile.addEventListener('error',()=>{profile.src='assets/profile.png'},{once:true});
