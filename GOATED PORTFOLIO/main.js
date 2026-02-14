//ustom Cursor Logic
const initCursor = () => {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  const magneticElements = document.querySelectorAll('.btn-home1, .btn-home2, .social-mini-grid a, .pill-btn, .pc-btn, .mini-icon, .stat-icon');

  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    // Background Glow 
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--mouse-x', `${x}%`);
    document.body.style.setProperty('--mouse-y', `${y}%`);
  });

  // Smooth folowing
  const render = () => {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(render);
  };
  render();

  // Magnetic Effect 
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Pull element toward mouse 
      this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;

      // Pull follower to the element 
      follower.style.transform = 'translate(-50%, -50%) scale(2.5)';
      follower.style.background = 'rgba(99, 102, 241, 0.15)';
      follower.style.borderColor = 'transparent';
    });

    el.addEventListener('mouseleave', function () {
      this.style.transform = 'translate(0, 0)';
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.background = 'transparent';
      follower.style.borderColor = 'var(--primary)';
    });
  });

  // Generic Hover effects 
  const allLinks = document.querySelectorAll('a, button');
  allLinks.forEach(link => {
    if ([...magneticElements].includes(link)) return;
    link.addEventListener('mouseenter', () => {
      follower.style.transform = 'translate(-50%, -50%) scale(1.8)';
      follower.style.background = 'rgba(99, 102, 241, 0.1)';
    });
    link.addEventListener('mouseleave', () => {
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.background = 'transparent';
    });
  });
};


// Header Scroll Effect
const initHeader = () => {
  const header = document.querySelector('.header-list');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scrollProgress").style.width = scrolled + "%";
  });
};


// Typing Animation
const initTyping = () => {
  const element = document.querySelector('.typing-target');
  if (!element) return;

  const words = ["Frontend Developer", "ML & AI Enthusiast", "UI/UX Designer", "Lifelong Learner"];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  const type = () => {
    const currentWord = words[wordIdx];
    const displayed = isDeleting
      ? currentWord.substring(0, charIdx--)
      : currentWord.substring(0, charIdx++);

    element.textContent = displayed;

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx === currentWord.length + 1) {
      isDeleting = true;
      speed = 2000; // Pause at end
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      speed = 500;
    }

    setTimeout(type, speed);
  };

  type();
};

// Skill Bars Animation
const initSkills = () => {
  const skillBars = document.querySelectorAll('.skill-bar-inner');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.style.width;
        entry.target.style.width = '0';
        setTimeout(() => {
          entry.target.style.width = targetWidth;
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => observer.observe(bar));
};


// Contact Form
const initContact = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const originalText = btn.innerHTML;

    btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
    btn.disabled = true;

    // Simulate sending (you can plug in EmailJS here if needed)
    setTimeout(() => {
      btn.innerHTML = 'Sent Successfully! <i class="fa-solid fa-check"></i>';
      btn.style.background = '#10b981';
      form.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    }, 1500);
  });
};

// Download CV
const initDownload = () => {
  const btn = document.getElementById('downloadCV');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'file/resume.pdf';
    link.download = 'resume_araf.pdf';
    link.click();
  });
};

// Live Local Time (Chittagong)
const initLiveTime = () => {
  const timeElement = document.getElementById('liveTime');
  if (!timeElement) return;

  const updateTime = () => {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Dhaka',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    timeElement.textContent = now.toLocaleTimeString('en-US', options);
  };

  setInterval(updateTime, 1000);
  updateTime();
};

// Mobile Menu
const initMobileMenu = () => {
  const toggle = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('navMenu');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  // Close menu on link click
  document.querySelectorAll('.ul-list a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('active');
    });
  });
};

// Scroll Reveal
const initScrollReveal = () => {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
};

// Araf AI Chatbot Logic
const initChatbot = () => {
  const trigger = document.getElementById('chatTrigger');
  const windowEl = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatClose');
  const messages = document.getElementById('chatMessages');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');
  const quickReplies = document.querySelectorAll('.quick-reply-btn');

  if (!trigger || !windowEl) return;

  // Toggle Chat
  trigger.addEventListener('click', () => windowEl.classList.toggle('active'));
  closeBtn.addEventListener('click', () => windowEl.classList.remove('active'));

  const botResponses = {
    projects: "I've worked on many exciting projects! You can see the main ones in the 'Recent Projects' section. My current highlight is this professional portfolio!",
    skills: "My tech stack includes JavaScript, React, Python, ML cores, and CSS3 aesthetics. I'm currently expanding into AI-driven web technologies.",
    hire: "That's great! You can reach Araf via the contact form at the bottom, or directly at myselfaraf1457@gmail.com.",
    default: "That's interesting! I'm still learning, but I'd love to help you navigate Araf's work. Feel free to use the quick buttons below!"
  };

  const addMessage = (text, sender, isStreaming = false) => {
    const msg = document.createElement('div');
    msg.className = `message ${sender} ${isStreaming ? 'streaming' : ''}`;
    msg.innerHTML = `<div class="message-content">${text}</div>`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
    return msg;
  };

  const botReply = (query) => {
    const response = botResponses[query] || botResponses['default'];

    const msgElement = addMessage("", 'bot', true);
    const contentArea = msgElement.querySelector('.message-content');

    let charIdx = 0;
    const stream = () => {
      if (charIdx < response.length) {
        contentArea.textContent += response.charAt(charIdx);
        charIdx++;
        messages.scrollTop = messages.scrollHeight;
        setTimeout(stream, 20);
      } else {
        msgElement.classList.remove('streaming');
      }
    };
    stream();
  };

  const handleUserMessage = () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    const lower = text.toLowerCase();
    let query = 'default';
    if (lower.includes('project')) query = 'projects';
    else if (lower.includes('skill') || lower.includes('stack')) query = 'skills';
    else if (lower.includes('hire') || lower.includes('contact') || lower.includes('job')) query = 'hire';

    setTimeout(() => botReply(query), 500);
  };

  sendBtn.addEventListener('click', handleUserMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserMessage();
  });

  quickReplies.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-query');
      addMessage(btn.textContent, 'user');
      setTimeout(() => botReply(query), 500);
    });
  });
};

// GitHub Pulse Logic & Interactive Footprint Slider
const initGitHubPulse = async () => {
  const slider = document.getElementById('footprintSlider');
  const tabs = document.querySelectorAll('.footprint-tab');
  const githubContainer = document.getElementById('github-pulse-grid');
  const leetcodeContainer = document.getElementById('leetcode-pulse');
  const codeforcesContainer = document.getElementById('codeforces-pulse');

  if (!slider || !githubContainer) return;

  // 1. Tab Switching Logic
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      slider.style.transform = `translateX(-${index * 33.333}%)`;
    });
  });

  const handles = {
    github: 'Araf1011',
    leetcode: 'ARAF__07',
    codeforces: 'ARAF_007'
  };

  // 2. Fetch GitHub Data
  const fetchGitHub = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${handles.github}/events/public`);
      const events = await response.json();
      if (events.length > 0) {
        githubContainer.innerHTML = events.slice(0, 3).map(event => {
          let action = 'Activity in', icon = 'fa-code-branch', repo = event.repo.name.split('/')[1], tag = 'GitHub';
          if (event.type === 'PushEvent') { action = 'Pushed to'; icon = 'fa-code-commit'; tag = 'Commit'; }
          else if (event.type === 'CreateEvent') { action = 'Created'; icon = 'fa-plus'; tag = 'Repo'; }

          return `
                        <div class="pulse-card">
                            <div class="card-body">
                                <div class="p-icon"><i class="fa-brands fa-github"></i></div>
                                <div class="p-info">
                                    <span class="p-tag">${tag}</span>
                                    <h4><strong>${action}</strong> ${repo}</h4>
                                    <p>${new Date(event.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>
                    `;
        }).join('');
      }
    } catch (e) { githubContainer.innerHTML = '<p>GitHub Offline</p>'; }
  };

  // 3. Fetch LeetCode Data (Using a public stats proxy)
  const fetchLeetCode = async () => {
    try {
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${handles.leetcode}`);
      const data = await response.json();
      if (data.status === 'success') {
        // Update Numeric Stats
        leetcodeContainer.innerHTML = `
            <div class="pulse-card">
                <div class="card-body">
                    <div class="p-icon" style="background: rgba(255, 161, 22, 0.1); color: #ffa116;"><i class="fa-solid fa-code"></i></div>
                    <div class="p-info">
                        <span class="p-tag" style="color: #ffa116;">Efficiency</span>
                        <h4><strong>Acceptance</strong> ${data.acceptanceRate}%</h4>
                        <p>Rank: ${data.ranking}</p>
                    </div>
                </div>
            </div>
            <div class="pulse-card">
                <div class="card-body">
                    <div class="p-icon" style="background: rgba(0, 184, 163, 0.1); color: #00b8a3;"><i class="fa-solid fa-check-double"></i></div>
                    <div class="p-info">
                        <span class="p-tag" style="color: #00b8a3;">Difficulty</span>
                        <p>Easy: ${data.easySolved} | Med: ${data.mediumSolved} | Hard: ${data.hardSolved}</p>
                    </div>
                </div>
            </div>
        `;

        // Update Visual Radial Progress
        const solvedCount = document.getElementById('lcSolvedCount');
        const lcVisual = document.getElementById('lcVisual');
        if (solvedCount && lcVisual) {
          solvedCount.textContent = data.totalSolved;
          const percent = (data.totalSolved / data.totalQuestions) * 100;
          lcVisual.style.background = `conic-gradient(var(--primary) ${percent}%, rgba(255,255,255,0.05) ${percent}%)`;
          lcVisual.innerHTML = `<span>${data.totalSolved}</span><div style="position:absolute; width: 140px; height: 140px; background: var(--card-bg); border-radius: 50%;"></div>`;
          lcVisual.firstChild.style.zIndex = "10";
        }
      }
    } catch (e) { leetcodeContainer.innerHTML = '<p>LeetCode API Error</p>'; }
  };

  // 4. Fetch Codeforces Data
  const fetchCodeforces = async () => {
    try {
      // Recent submissions
      const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${handles.codeforces}&from=1&count=2`);
      const statusData = await statusRes.json();

      // Rating & Info
      const infoRes = await fetch(`https://codeforces.com/api/user.info?handles=${handles.codeforces}`);
      const infoData = await infoRes.json();

      if (statusData.status === 'OK') {
        codeforcesContainer.innerHTML = statusData.result.map(sub => {
          const verdict = sub.verdict === 'OK' ? 'Accepted' : sub.verdict.replace(/_/g, ' ');
          const color = sub.verdict === 'OK' ? '#4ade80' : '#f87171';
          return `
                <div class="pulse-card">
                    <div class="card-body">
                        <div class="p-icon" style="background: rgba(255, 255, 255, 0.05); color: #3b82f6;"><i class="fa-solid fa-terminal"></i></div>
                        <div class="p-info">
                            <span class="p-tag" style="color: #3b82f6;">Submission</span>
                            <h4><strong>${sub.problem.name}</strong></h4>
                            <p style="color: ${color}">${verdict}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
      }

      if (infoData.status === 'OK') {
        const user = infoData.result[0];
        const ratingEl = document.getElementById('cfRatingValue');
        const rankEl = document.getElementById('cfRankLabel');
        if (ratingEl) ratingEl.textContent = user.rating || '0';
        if (rankEl) {
          rankEl.textContent = (user.rank || 'Unrated').toUpperCase();
          rankEl.style.color = '#3b82f6';
        }
      }
    } catch (e) { codeforcesContainer.innerHTML = '<p>Codeforces Offline</p>'; }
  };

  fetchGitHub();
  fetchLeetCode();
  fetchCodeforces();
};

// Init All
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initHeader();
  initSkills();
  initContact();
  initDownload();
  initTyping();
  initMobileMenu();
  initLiveTime();
  initChatbot();
  initGitHubPulse();
  initScrollReveal();
});

