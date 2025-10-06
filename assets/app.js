// DesignConnect Prototype - Hardcoded data and simple UI logic
(function(){
  const seed = {
    user: {
      id: 'u_1',
      name: 'Alex',
    },
    mentors: [
      { id: 'm1', name: 'Toby', role: 'Product Designer', company: 'Netflix', months: 7 },
      { id: 'm2', name: 'Amanda', role: 'UX Researcher', company: 'Audible', months: 7 },
      { id: 'm3', name: 'Max', role: 'Product Designer', company: 'Ann Arbor Farms', months: 7 },
      { id: 'm4', name: 'Vivi', role: 'Product Designer', company: 'Georgia Pacific', months: 7 },
      { id: 'm5', name: 'Ashley', role: 'UX Researcher', company: 'Whaleshark', months: 7 },
      { id: 'm6', name: 'Cal', role: 'Design Engineer', company: 'AI.inc', months: 7 },
    ],
    courses: [
      { id: 'c1', title: 'Pitching your Design Startup', author: 'Alexis Nostafe', rating: 4.2, price: 2.99, hours: 20, level: 'Intermediate', tag: 'Trending Course' },
      { id: 'c2', title: 'Networking 101', author: 'Marche Falise', rating: 4.1, price: 8.99, hours: 30, level: 'Beginner Friendly', tag: 'Simple Learning Curve' },
      { id: 'c3', title: 'The Job Recruiting Guide', author: 'Gordon Ramsey', rating: 3.9, price: 7.99, hours: 18, level: 'Advanced Special Topics', tag: 'Best Value!' },
      { id: 'c4', title: 'UX Research Assessments', author: 'Christina Tossi', rating: 4.1, price: 5.99, hours: 8, level: 'Intermediate', tag: 'Simple Learning Curve' },
      { id: 'c5', title: 'Figma Essentials', author: 'Adin Feliz', rating: 2.1, price: 5.99, hours: 4, level: 'Beginner Friendly', tag: 'Simple Learning Curve' },
    ],
    jobs: [
      { id: 'j1', title: 'UX Design Intern', company: 'Stripe', type: 'Internship', location: 'Remote', posted: '2d', tags: ['Figma', 'Prototyping'] },
      { id: 'j2', title: 'Product Designer, New Grad', company: 'Airbnb', type: 'New Grad', location: 'San Francisco, CA', posted: '3d', tags: ['Design Systems'] },
      { id: 'j3', title: 'UX Research Intern', company: 'Notion', type: 'Internship', location: 'Remote', posted: '1d', tags: ['Research', 'Surveys'] },
      { id: 'j4', title: 'Visual Designer, New Grad', company: 'Canva', type: 'New Grad', location: 'Austin, TX', posted: '5d', tags: ['Marketing', 'Brand'] },
      { id: 'j5', title: 'Design Engineer Intern', company: 'Vercel', type: 'Internship', location: 'Remote', posted: '1d', tags: ['React', 'CSS'] },
    ],
    people: [
      { id: 'p1', name: 'Jules Ortega', title: 'Product Designer', company: 'Loom' },
      { id: 'p2', name: 'Cam Nguyen', title: 'Design Engineer', company: 'Linear' },
      { id: 'p3', name: 'Priya Shah', title: 'UX Researcher', company: 'Shopify' },
      { id: 'p4', name: 'Diego Ramos', title: 'Interaction Designer', company: 'Spotify' },
      { id: 'p5', name: 'Hannah Kim', title: 'Product Designer', company: 'Dropbox' },
      { id: 'p6', name: 'Omar Ali', title: 'Design Ops', company: 'Uber' },
    ]
  };

  const store = {
    get(key, fallback){
      try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
    },
    set(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
  };

  const state = {
    followedIds: new Set(store.get('followedIds', [])),
    savedJobIds: new Set(store.get('savedJobIds', [])),
    enrolledCourseIds: new Set(store.get('enrolledCourseIds', [])),
  };

  function persist(){
    store.set('followedIds', Array.from(state.followedIds));
    store.set('savedJobIds', Array.from(state.savedJobIds));
    store.set('enrolledCourseIds', Array.from(state.enrolledCourseIds));
  }

  function ratingStars(r){
    const full = Math.round(r);
    return Array.from({length:5}).map((_,i)=> i<full ? '★' : '☆').join('');
  }

  function makeAvatar(name){
    const initials = name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
    const el = document.createElement('div');
    el.className = 'avatar';
    el.textContent = initials;
    return el;
  }

  // Shared header injection
  function renderHeader(active) {
    const header = document.querySelector('#app-header');
    if (!header) return;
    header.innerHTML = `
      <div class="header-inner">
        <div class="brand"><a href="/index.html">DesignConnect</a></div>
        <nav class="nav">
          <a href="/index.html" ${active==='home'?'class="active"':''}>Home</a>
          <a href="/network.html" ${active==='network'?'class="active"':''}>Network</a>
          <a href="/mentorship.html" ${active==='mentorship'?'class="active"':''}>Mentorship</a>
          <a href="/courses.html" ${active==='courses'?'class="active"':''}>Courses</a>
          <a href="/jobs.html" ${active==='jobs'?'class="active"':''}>Jobs</a>
        </nav>
        <div class="search">
          <span class="icon">🔍</span>
          <input placeholder="Search designers, mentors, jobs…"/>
        </div>
      </div>
    `;
  }

  // Renderers per page
  function renderHome(){
    const mount = document.querySelector('#home');
    if(!mount) return;

    const jobs = seed.jobs.slice(0, 4);
    const people = seed.people.slice(0, 6);

    mount.innerHTML = `
      <section class="section">
        <h1>Welcome back, ${seed.user.name}</h1>
        <div class="grid cols-3">
          <div class="card">
            <div class="thumb"></div>
            <h3>Trending Course</h3>
            <div class="row space-between">
              <div>
                <div><strong>${seed.courses[0].title}</strong></div>
                <div class="muted">by ${seed.courses[0].author}</div>
              </div>
              <a class="btn" href="/courses.html">View</a>
            </div>
          </div>
          <div class="card">
            <h3>Your Weekly Progress</h3>
            <div class="kpi">4<span class="muted" style="font-size:20px;font-weight:600;">/7 days</span></div>
            <div class="row wrap">
              ${['S','M','T','W','T','F','S'].map((d,i)=>`<span class="tag" style="${i<4?'background:#111827;color:#fff;border-color:#111827':''}">${d}</span>`).join('')}
            </div>
          </div>
          <div class="card">
            <h3>Build your network</h3>
            <p class="muted">Connect with peers and mentors</p>
            <a class="btn" href="/network.html">Open Network</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="space-between">
          <h2>Suggested Job Opportunities</h2>
          <a class="btn small" href="/jobs.html">View all jobs</a>
        </div>
        <div class="grid auto-fit-250">
          ${jobs.map(j=>`
            <div class="card hover">
              <div class="row space-between"><strong>${j.title}</strong><span class="tag">${j.type}</span></div>
              <div class="muted">${j.company} • ${j.location}</div>
              <div class="row wrap" style="margin:8px 0">${j.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
              <div class="space-between">
                <span class="muted">Posted ${j.posted}</span>
                <button class="btn small ${state.savedJobIds.has(j.id)?'primary':''}" data-save-job="${j.id}">
                  ${state.savedJobIds.has(j.id)?'Saved':'Save Job'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="section">
        <div class="space-between">
          <h2>People you may know</h2>
          <a class="btn small" href="/network.html">See all</a>
        </div>
        <div class="grid auto-fit-250">
          ${people.map(p=>`
            <div class="card hover">
              <div class="row">
                <div class="avatar">${p.name[0]}</div>
                <div>
                  <div><strong>${p.name}</strong></div>
                  <div class="muted">${p.title} • ${p.company}</div>
                </div>
              </div>
              <div class="row" style="margin-top:8px">
                <button class="btn small ${state.followedIds.has(p.id)?'primary':''}" data-follow="${p.id}">
                  ${state.followedIds.has(p.id)?'Following':'Follow'}
                </button>
                <a class="btn small" href="/mentorship.html">Ask for mentorship</a>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderNetwork(){
    const mount = document.querySelector('#network');
    if(!mount) return;
    const people = seed.people;
    mount.innerHTML = `
      <section class="section">
        <h1>Network</h1>
        <div class="grid auto-fit-250">
          ${people.map(p=>`
            <div class="card hover">
              <div class="row">
                <div class="avatar">${p.name[0]}</div>
                <div>
                  <div><strong>${p.name}</strong></div>
                  <div class="muted">${p.title} • ${p.company}</div>
                </div>
              </div>
              <div class="row" style="margin-top:8px">
                <button class="btn small ${state.followedIds.has(p.id)?'primary':''}" data-follow="${p.id}">
                  ${state.followedIds.has(p.id)?'Following':'Follow'}
                </button>
                <button class="btn small">Message</button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderMentorship(){
    const mount = document.querySelector('#mentorship');
    if(!mount) return;
    const mentors = seed.mentors;
    mount.innerHTML = `
      <section class="section">
        <h1>Connect with Mentors</h1>
        <div class="grid auto-fit-250">
          ${mentors.map(m=>`
            <div class="card hover">
              <div class="row">
                <div class="avatar">${m.name[0]}</div>
                <div>
                  <div><strong>${m.name}</strong></div>
                  <div class="muted">${m.role} – ${m.company}</div>
                  <div class="muted">${m.months} months mentoring</div>
                </div>
              </div>
              <div class="row" style="margin-top:8px">
                <button class="btn small">Request Session</button>
                <button class="btn small">View Profile</button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderCourses(){
    const mount = document.querySelector('#courses');
    if(!mount) return;

    const sidebar = `
      <div class="sidebar">
        <div class="row space-between">
          <strong>Filters</strong>
          <button class="btn small ghost" id="resetFilters">Reset</button>
        </div>
        <div style="margin-top:12px">
          <div class="muted" style="margin-bottom:6px">Level</div>
          <div class="list">
            ${['Beginner Friendly','Intermediate','Advanced Special Topics'].map(l=>`<label class="row"><input type="checkbox" name="level" value="${l}"> ${l}</label>`).join('')}
          </div>
        </div>
        <div style="margin-top:12px">
          <div class="muted" style="margin-bottom:6px">Max Price</div>
          <input type="range" id="priceRange" min="0" max="20" value="20"/>
          <div class="row"><span class="muted">Up to</span> <strong id="priceLabel">$20</strong></div>
        </div>
      </div>
    `;

    mount.innerHTML = `
      <section class="section">
        <h1>Interactive Courses</h1>
        <div class="layout-2col">
          ${sidebar}
          <div id="courseList"></div>
        </div>
      </section>
    `;

    function applyFilters(){
      const checked = Array.from(document.querySelectorAll('input[name="level"]:checked')).map(el=>el.value);
      const maxPrice = Number(document.querySelector('#priceRange').value);
      const courses = seed.courses.filter(c => (checked.length? checked.includes(c.level): true) && c.price <= maxPrice);
      const list = document.querySelector('#courseList');
      list.innerHTML = `
        <div class="list">
          ${courses.map(c=>`
            <div class="list-item">
              <div class="thumb" style="width:140px"></div>
              <div style="flex:1">
                <div class="row wrap" style="justify-content:space-between">
                  <div class="row wrap" style="gap:6px">
                    <span class="badge">${c.tag}</span>
                    <strong>${c.title}</strong>
                  </div>
                  <div class="price">$${c.price.toFixed(2)}</div>
                </div>
                <div class="muted">by ${c.author}</div>
                <div class="row" style="margin:6px 0">
                  <span class="rating">${ratingStars(c.rating)}</span>
                  <span class="muted">• ${c.hours} hours</span>
                  <span class="muted">• ${c.level}</span>
                </div>
                <div class="row">
                  <button class="btn small ${state.enrolledCourseIds.has(c.id)?'primary':''}" data-enroll="${c.id}">
                    ${state.enrolledCourseIds.has(c.id)?'Enrolled':'Enroll'}
                  </button>
                  <button class="btn small">Explore</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    document.addEventListener('change', (e)=>{
      if (e.target.id === 'priceRange') {
        document.querySelector('#priceLabel').textContent = '$' + e.target.value;
        applyFilters();
      }
      if (e.target.name === 'level') applyFilters();
    });

    document.addEventListener('click', (e)=>{
      if (e.target.id === 'resetFilters') {
        document.querySelectorAll('input[name="level"]').forEach(el=> el.checked = false);
        document.querySelector('#priceRange').value = 20;
        document.querySelector('#priceLabel').textContent = '$20';
        applyFilters();
      }
    });

    applyFilters();
  }

  function renderJobs(){
    const mount = document.querySelector('#jobs');
    if(!mount) return;

    const sidebar = `
      <div class="sidebar">
        <strong>Job Filters</strong>
        <div class="list" style="margin-top:10px">
          ${['Internship','New Grad'].map(t=>`<label class="row"><input type="checkbox" name="type" value="${t}"> ${t}</label>`).join('')}
        </div>
        <div style="margin-top:12px">
          <div class="muted" style="margin-bottom:6px">Location</div>
          <input id="locationInput" placeholder="e.g. Remote, SF" style="width:100%;padding:8px;border:1px solid var(--line);border-radius:8px;"/>
        </div>
      </div>
    `;

    mount.innerHTML = `
      <section class="section">
        <h1>Jobs Board</h1>
        <div class="layout-2col">
          ${sidebar}
          <div id="jobList"></div>
        </div>
      </section>
    `;

    function applyFilters(){
      const types = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(el=>el.value);
      const loc = (document.querySelector('#locationInput').value || '').toLowerCase();
      const jobs = seed.jobs.filter(j => (types.length? types.includes(j.type): true) && (!loc || j.location.toLowerCase().includes(loc)));
      const list = document.querySelector('#jobList');
      list.innerHTML = `
        <div class="list">
          ${jobs.map(j=>`
            <div class="list-item">
              <div class="thumb" style="width:120px"></div>
              <div style="flex:1">
                <div class="row wrap" style="justify-content:space-between">
                  <div>
                    <div class="row wrap" style="gap:6px">
                      <strong>${j.title}</strong>
                      <span class="tag">${j.type}</span>
                    </div>
                    <div class="muted">${j.company} • ${j.location}</div>
                  </div>
                  <div class="row">
                    <button class="btn small ${state.savedJobIds.has(j.id)?'primary':''}" data-save-job="${j.id}">
                      ${state.savedJobIds.has(j.id)?'Saved':'Save'}
                    </button>
                    <button class="btn small">Apply</button>
                  </div>
                </div>
                <div class="row wrap" style="margin-top:8px">${j.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    document.addEventListener('keyup', (e)=>{ if (e.target.id === 'locationInput') applyFilters(); });
    document.addEventListener('change', (e)=>{ if (e.target.name === 'type') applyFilters(); });

    applyFilters();
  }

  // Global interactions
  document.addEventListener('click', (e)=>{
    const followId = e.target.getAttribute && e.target.getAttribute('data-follow');
    if (followId) {
      if (state.followedIds.has(followId)) state.followedIds.delete(followId); else state.followedIds.add(followId);
      persist();
      // Re-render shallowly by toggling class/text
      e.target.classList.toggle('primary');
      e.target.textContent = e.target.classList.contains('primary') ? 'Following' : 'Follow';
    }

    const saveJobId = e.target.getAttribute && e.target.getAttribute('data-save-job');
    if (saveJobId) {
      if (state.savedJobIds.has(saveJobId)) state.savedJobIds.delete(saveJobId); else state.savedJobIds.add(saveJobId);
      persist();
      e.target.classList.toggle('primary');
      e.target.textContent = e.target.classList.contains('primary') ? 'Saved' : (e.target.textContent.includes('Save Job') ? 'Save Job' : 'Save');
    }

    const enrollId = e.target.getAttribute && e.target.getAttribute('data-enroll');
    if (enrollId) {
      if (state.enrolledCourseIds.has(enrollId)) state.enrolledCourseIds.delete(enrollId); else state.enrolledCourseIds.add(enrollId);
      persist();
      e.target.classList.toggle('primary');
      e.target.textContent = e.target.classList.contains('primary') ? 'Enrolled' : 'Enroll';
    }
  });

  // Page bootstrap
  window.DesignConnect = {
    render(active){
      renderHeader(active);
      renderHome();
      renderNetwork();
      renderMentorship();
      renderCourses();
      renderJobs();
    }
  };
})();
