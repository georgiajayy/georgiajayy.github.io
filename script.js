/* =========================================
   GEORGIA J. SUMMERS
   PORTFOLIO INTERACTIONS — v3
========================================= */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

/* MOBILE MENU */

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.remove("active"));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu) {
    mobileMenu.classList.remove("active");
  }
});

/* TOP NAV SCROLLSPY */

const trackedSections = document.querySelectorAll(
  "#top, #about, #work, #experience, #contact",
);
const topNavLinks = document.querySelectorAll(".top-nav a");

if (trackedSections.length && "IntersectionObserver" in window) {
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          topNavLinks.forEach((link) => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${id}`,
            );
          });
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" },
  );

  trackedSections.forEach((section) => spyObserver.observe(section));
}

/* SITE SEARCH */

const searchInput = document.getElementById("siteSearch");
const searchResults = document.getElementById("searchResults");

const searchIndex = [
  { label: "About / Profile", section: "Profile", id: "about", keywords: "about profile bio hi georgia junior data analyst freelance creative production editing videography arsenal bbc itv fa nike adidas uefa bfi film institute" },
  { label: "Education — UCL", section: "Profile", id: "about", keywords: "ucl university college london ba media film production 2:1 education" },
  { label: "Education — Generation UK", section: "Profile", id: "about", keywords: "generation uk data analytics programme education" },
  { label: "Work / Showreel", section: "Work", id: "work", keywords: "work fixtures projects showreel video production edit" },
  { label: "Lionesses Euro 2025 — data project", section: "Work", id: "lionesses", keywords: "lionesses euro 2025 england women football dashboard streamlit statsbomb xg shot map data story video youtube project" },
  { label: "YouTube — Data with Georgia Jayy", section: "Contact", id: "contact", keywords: "youtube channel video data story datawithgeorgiajayy" },
  { label: "Experience / CV", section: "Work", id: "experience", keywords: "experience cv curriculum vitae download view pdf" },
  { label: "SQL", section: "About", id: "about", keywords: "sql database query" },
  { label: "Python", section: "About", id: "about", keywords: "python" },
  { label: "Power BI", section: "About", id: "about", keywords: "power bi powerbi dashboard" },
  { label: "Excel", section: "About", id: "about", keywords: "excel spreadsheet" },
  { label: "HTML / CSS", section: "About", id: "about", keywords: "html css" },
  { label: "JavaScript", section: "About", id: "about", keywords: "javascript js" },
  { label: "Git / GitHub", section: "About", id: "about", keywords: "git github" },
  { label: "Production", section: "About", id: "about", keywords: "production" },
  { label: "Editing", section: "About", id: "about", keywords: "editing edit" },
  { label: "Videography", section: "About", id: "about", keywords: "videography video camera" },
  { label: "Contact", section: "Contact", id: "contact", keywords: "contact email github linkedin youtube talk reach out" },
];

function renderResults(query) {
  if (!searchResults) return;

  const q = query.trim().toLowerCase();

  if (!q) {
    searchResults.innerHTML = "";
    searchResults.classList.remove("open");
    return;
  }

  const matches = searchIndex.filter(
    (item) =>
      item.label.toLowerCase().includes(q) || item.keywords.includes(q),
  );

  if (!matches.length) {
    searchResults.innerHTML = `<div class="r-empty">no matches for "${query}"</div>`;
    searchResults.classList.add("open");
    return;
  }

  searchResults.innerHTML = matches
    .slice(0, 8)
    .map(
      (item, i) =>
        `<button type="button" data-target="${item.id}" data-index="${i}">
          <span>${item.label}</span>
          <span class="r-section">${item.section}</span>
        </button>`,
    )
    .join("");

  searchResults.classList.add("open");
}

function goToResult(id) {
  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });

  const head = target.querySelector(".section-head");
  if (head) {
    head.classList.remove("flash");
    // eslint-disable-next-line no-unused-expressions
    void head.offsetWidth;
    head.classList.add("flash");
  }

  if (searchResults) {
    searchResults.classList.remove("open");
  }
  if (searchInput) {
    searchInput.blur();
  }
}

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    renderResults(event.target.value);
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const firstBtn = searchResults && searchResults.querySelector("button");
      if (firstBtn) {
        goToResult(firstBtn.getAttribute("data-target"));
      }
    }
    if (event.key === "Escape") {
      searchInput.value = "";
      renderResults("");
      searchInput.blur();
    }
  });
}

if (searchResults) {
  searchResults.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-target]");
    if (btn) {
      goToResult(btn.getAttribute("data-target"));
    }
  });
}

/* TOP SEARCH TOGGLE */

const searchToggle = document.getElementById("searchToggle");
const topSearchPanel = document.getElementById("topSearchPanel");

if (searchToggle && topSearchPanel) {
  searchToggle.addEventListener("click", () => {
    const isOpen = topSearchPanel.classList.toggle("open");
    searchToggle.setAttribute("aria-expanded", String(isOpen));

    if (isOpen && searchInput) {
      searchInput.focus();
    } else if (searchInput) {
      searchInput.value = "";
      renderResults("");
    }
  });
}

document.addEventListener("click", (event) => {
  if (
    topSearchPanel &&
    topSearchPanel.classList.contains("open") &&
    !event.target.closest(".top-search-panel") &&
    !event.target.closest("#searchToggle")
  ) {
    topSearchPanel.classList.remove("open");
    if (searchToggle) searchToggle.setAttribute("aria-expanded", "false");
  }

  if (
    searchResults &&
    !event.target.closest(".top-search-panel")
  ) {
    searchResults.classList.remove("open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && topSearchPanel) {
    topSearchPanel.classList.remove("open");
    if (searchToggle) searchToggle.setAttribute("aria-expanded", "false");
  }
});

/* PENALTY SHOOTOUT MINI-GAME */

const heroGame = document.getElementById("heroGame");

if (heroGame) {
  const keeper = document.getElementById("keeper");
  const ball = document.getElementById("ball");
  const net = heroGame.querySelector(".net");
  const shotButtons = heroGame.querySelectorAll(".shot-buttons button");
  const scoreEl = document.getElementById("gameScore");
  const bestEl = document.getElementById("gameBest");
  const resultEl = document.getElementById("gameResult");
  const streakEl = document.getElementById("gameStreak");

  const zones = ["left", "center", "right"];
  const goalLines = [
    "GOAL!",
    "TOP BINS!",
    "SCREAMER!",
    "IN OFF THE POST!",
    "SMASHED IT!",
  ];
  const saveLines = [
    "saved.",
    "denied.",
    "the keeper read it.",
    "straight at the keeper.",
    "off the crossbar!",
  ];

  let goals = 0;
  let shots = 0;
  let best = 0;
  let streak = 0;
  let busy = false;

  try {
    const stored = localStorage.getItem("gjs-penalty-best");
    if (stored) best = parseInt(stored, 10) || 0;
  } catch (e) {
    best = 0;
  }

  let audioCtx = null;

  function beep(freq, duration, delay = 0) {
    if (prefersReducedMotion) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.value = 0.06;
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const startAt = audioCtx.currentTime + delay;
      osc.start(startAt);
      gain.gain.exponentialRampToValueAtTime(0.001, startAt + duration);
      osc.stop(startAt + duration);
    } catch (e) {
      /* audio unavailable, skip */
    }
  }

  function updateScore() {
    if (scoreEl) {
      scoreEl.textContent = `${goals} / ${shots}`;
    }
    if (bestEl) {
      bestEl.textContent = best ? `best streak ${best}` : "";
    }
  }

  function updateStreakLine() {
    if (!streakEl) return;
    if (streak >= 5) {
      streakEl.textContent = `🔥🔥 unstoppable — ${streak} in a row`;
      streakEl.style.color = "var(--accent)";
    } else if (streak >= 3) {
      streakEl.textContent = `🔥 on fire — ${streak} in a row`;
      streakEl.style.color = "var(--accent)";
    } else {
      streakEl.textContent = "";
      streakEl.style.color = "";
    }
  }

  function setZoneClass(el, zone) {
    zones.forEach((z) => el.classList.remove(`zone-${z}`));
    el.classList.add(`zone-${zone}`);
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function takeShot(zone) {
    if (busy) return;
    busy = true;
    shotButtons.forEach((btn) => btn.setAttribute("disabled", "true"));

    const keeperZone = zones[Math.floor(Math.random() * zones.length)];

    setZoneClass(ball, zone);
    setZoneClass(keeper, keeperZone);

    setTimeout(() => {
      shots++;
      const isGoal = keeperZone !== zone;

      if (isGoal) {
        goals++;
        streak++;
        if (streak > best) {
          best = streak;
          try {
            localStorage.setItem("gjs-penalty-best", String(best));
          } catch (e) {
            /* storage unavailable, skip */
          }
        }
        if (resultEl) {
          resultEl.textContent = pick(goalLines);
          resultEl.className = "game-result goal";
        }
        if (net) {
          net.classList.remove("flash");
          void net.offsetWidth;
          net.classList.add("flash");
        }
        beep(660, 0.12);
        beep(880, 0.16, 0.1);
      } else {
        streak = 0;
        if (resultEl) {
          resultEl.textContent = pick(saveLines);
          resultEl.className = "game-result saved";
        }
        if (net) {
          net.classList.remove("shake");
          void net.offsetWidth;
          net.classList.add("shake");
        }
        beep(180, 0.2);
      }

      updateScore();
      updateStreakLine();

      setTimeout(() => {
        ball.classList.remove(...zones.map((z) => `zone-${z}`));
        keeper.classList.remove(...zones.map((z) => `zone-${z}`));
        if (resultEl) {
          setTimeout(() => {
            if (resultEl.textContent !== "take a penalty →") {
              resultEl.textContent = "take another →";
              resultEl.className = "game-result";
            }
          }, 900);
        }
        shotButtons.forEach((btn) => btn.removeAttribute("disabled"));
        busy = false;
      }, 700);
    }, 450);
  }

  shotButtons.forEach((btn) => {
    btn.addEventListener("click", () => takeShot(btn.getAttribute("data-zone")));
  });

  updateScore();
}

/* BACK TO TOP */

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });

  window.addEventListener(
    "scroll",
    () => {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    },
    { passive: true },
  );
}

/* SCROLL PROGRESS BAR (top) */

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;
  scrollProgress.style.transform = `scaleX(${Math.min(progress, 1)})`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

/* CUSTOM CURSOR */

const cursorDot = document.getElementById("cursorDot");
const cursorFollower = document.getElementById("cursorFollower");

if (cursorDot && cursorFollower && !prefersReducedMotion) {
  let mx = 0;
  let my = 0;
  let fx = 0;
  let fy = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursorDot.style.left = `${mx}px`;
    cursorDot.style.top = `${my}px`;
  });

  function animateFollower() {
    fx += (mx - fx) * 0.15;
    fy += (my - fy) * 0.15;
    cursorFollower.style.left = `${fx}px`;
    cursorFollower.style.top = `${fy}px`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button, .skill-big, .contact-box")) {
      document.body.classList.add("cursor-hover");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a, button, .skill-big, .contact-box")) {
      document.body.classList.remove("cursor-hover");
    }
  });
}

/* THEME TOGGLE (dark / light) */

const themeToggle = document.getElementById("themeToggle");
const rootEl = document.documentElement;

function applyTheme(theme) {
  if (theme === "dark") {
    rootEl.setAttribute("data-theme", "dark");
  } else {
    rootEl.removeAttribute("data-theme");
  }
}

(function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem("gjs-theme");
  } catch (e) {
    saved = null;
  }

  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }
})();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = rootEl.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("gjs-theme", next);
    } catch (e) {
      /* storage unavailable, skip */
    }
  });
}

/* WELCOME OVERLAY + RETRO LOADER */

const welcome = document.getElementById("welcome");
const welcomeForm = document.getElementById("welcomeForm");
const welcomeName = document.getElementById("welcomeName");
const welcomeSkip = document.getElementById("welcomeSkip");
const loader = document.getElementById("loader");
const loaderFill = document.getElementById("loaderFill");
const loaderText = document.getElementById("loaderText");
const hiTypewriter = document.getElementById("hiTypewriter");

let visitorName = "";
try {
  visitorName = localStorage.getItem("gjs-visitor-name") || "";
} catch (e) {
  visitorName = "";
}

function runLoader(callback) {
  if (!loader) {
    callback();
    return;
  }

  if (prefersReducedMotion) {
    loader.classList.add("hidden");
    callback();
    return;
  }

  loader.classList.remove("hidden");

  let pct = 0;
  const step = () => {
    pct += Math.random() * 22 + 10;
    if (loaderFill) loaderFill.style.width = `${Math.min(pct, 100)}%`;
    if (pct < 100) {
      setTimeout(step, 90);
    } else {
      setTimeout(() => {
        loader.classList.add("hidden");
        callback();
      }, 200);
    }
  };
  step();
}

function startTypewriter() {
  if (!hiTypewriter) return;

  const roles = ["Data Analyst.", "Football Obsessed.", "Creative.", "Music Nerd."];

  if (prefersReducedMotion) {
    hiTypewriter.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const cursorEl = document.createElement("span");
  cursorEl.className = "cursor-blink";

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      hiTypewriter.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        setTimeout(() => {
          deleting = true;
          tick();
        }, 1300);
        return;
      }
    } else {
      charIndex--;
      hiTypewriter.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    hiTypewriter.appendChild(cursorEl);
    setTimeout(tick, deleting ? 26 : 42);
  }

  tick();
}

function revealSite() {
  document.body.classList.add("site-ready");
  startTypewriter();
}

function proceedFromWelcome(name) {
  if (name) {
    visitorName = name;
    try {
      localStorage.setItem("gjs-visitor-name", name);
    } catch (e) {
      /* storage unavailable, skip */
    }
  }

  if (loaderText) {
    loaderText.textContent = name
      ? `WELCOME, ${name.toUpperCase()}.`
      : "LOADING GEORGIA J.";
  }

  if (welcome) welcome.classList.add("hidden");
  runLoader(revealSite);
}

if (welcome && welcomeForm) {
  if (prefersReducedMotion) {
    // Skip the welcome flow entirely for reduced-motion users
    proceedFromWelcome("");
  } else {
    if (welcomeName) welcomeName.focus();

    welcomeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      proceedFromWelcome(welcomeName ? welcomeName.value.trim() : "");
    });

    if (welcomeSkip) {
      welcomeSkip.addEventListener("click", () => proceedFromWelcome(""));
    }
  }
} else {
  runLoader(revealSite);
}

/* SKILLS — click-to-toast (empty state until projects exist) */

const skillButtons = document.querySelectorAll(".skill-big");
const skillToast = document.getElementById("skillToast");
let skillToastTimer = null;

skillButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const skill = btn.getAttribute("data-skill");
    if (!skillToast) return;
    skillToast.textContent = `Projects using ${skill} will link here once published.`;
    skillToast.classList.add("show");
    clearTimeout(skillToastTimer);
    skillToastTimer = setTimeout(() => {
      skillToast.classList.remove("show");
    }, 2600);
  });
});

/* FAQ ASSISTANT (scripted, not real AI) */

const faqToggle = document.getElementById("faqToggle");
const faqPanel = document.getElementById("faqPanel");
const faqClose = document.getElementById("faqClose");
const faqLog = document.getElementById("faqLog");
const faqForm = document.getElementById("faqForm");
const faqInput = document.getElementById("faqInput");
const faqChips = document.querySelectorAll(".faq-chip");

const faqAnswers = [
  {
    match: ["learn", "learning", "study", "studying"],
    answer:
      "Right now I'm building on what I picked up through Generation UK's Data Analytics programme — SQL, Python and Power BI — and moving towards AI and machine learning. Most recently: pandas, Streamlit and football event data, through my Lionesses Euro 2025 project.",
  },
  {
    match: ["interest", "interests", "into", "hobbies"],
    answer:
      "Football analytics and coaching, the growth of women's football, digital storytelling, plus film and photography on the creative side.",
  },
  {
    match: ["project", "projects", "portfolio", "dashboard", "euro", "lionesses"],
    answer:
      "My first big data project is Lionesses Euro 2025: an interactive dashboard on how England won Euro 2025, plus an animated data story on YouTube. The full write-up and development log is on the Logs page. Scrolling you to it now.",
    action: () => {
      const target = document.getElementById("lionesses");
      if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    },
  },
  {
    match: ["blog", "writing", "articles", "devlog", "log"],
    answer:
      "No blog, but every project gets a development log. Head to the Logs page in the menu: the Lionesses Euro 2025 build is written up session by session, including everything that confused me along the way.",
  },
  {
    match: ["youtube", "video", "channel"],
    answer:
      "My channel is Data with Georgia Jayy (@datawithgeorgiajayy), where I turn sport, music and culture into data stories. The link is in the top bar and the contact section.",
  },
  {
    match: ["contact", "hire", "email", "reach", "message", "work together", "get in touch"],
    answer:
      "Let's talk — click 'email' in the contact section, or use the message box down there. Scrolling you there now.",
    action: () => {
      const target = document.getElementById("contact");
      if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    },
  },
  {
    match: ["cv", "resume", "experience"],
    answer:
      "You can view or download my CV in the Experience section — jump there with the CV link up top.",
  },
  {
    match: ["skill", "skills", "sql", "python", "power bi", "excel", "javascript", "video"],
    answer:
      "Data side: SQL, Python, Power BI, Excel, HTML/CSS, JavaScript, Git. Creative side: production, editing, videography — more on all of that in the About section.",
  },
  {
    match: ["football", "club", "team", "arsenal"],
    answer:
      "Football's the thread through most of my work — content and campaigns with Arsenal FC, BBC Sport, ITV Sport, The FA, and more, plus weekly FPL analysis.",
  },
];

function faqRespond(question) {
  const q = question.toLowerCase();
  const found = faqAnswers.find((item) =>
    item.match.some((keyword) => q.includes(keyword)),
  );

  if (found) {
    if (found.action) found.action();
    return found.answer;
  }

  return "Good question — I don't have a scripted answer for that one. Best bet is to drop me an email and ask directly.";
}

function addFaqMessage(text, from) {
  if (!faqLog) return;
  const msg = document.createElement("div");
  msg.className = `faq-msg faq-msg-${from}`;
  msg.textContent = text;
  faqLog.appendChild(msg);
  faqLog.scrollTop = faqLog.scrollHeight;
}

function openFaq() {
  if (!faqPanel) return;
  faqPanel.classList.add("open");
  if (faqToggle) faqToggle.setAttribute("aria-expanded", "true");
  if (faqInput) faqInput.focus();
}

function closeFaq() {
  if (!faqPanel) return;
  faqPanel.classList.remove("open");
  if (faqToggle) faqToggle.setAttribute("aria-expanded", "false");
}

if (faqToggle) {
  faqToggle.addEventListener("click", () => {
    if (faqPanel && faqPanel.classList.contains("open")) {
      closeFaq();
    } else {
      openFaq();
    }
  });
}

if (faqClose) {
  faqClose.addEventListener("click", closeFaq);
}

faqChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const question = chip.textContent;
    addFaqMessage(question, "user");
    setTimeout(() => addFaqMessage(faqRespond(question), "bot"), 300);
  });
});

if (faqForm && faqInput) {
  faqForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const question = faqInput.value.trim();
    if (!question) return;
    addFaqMessage(question, "user");
    faqInput.value = "";
    setTimeout(() => addFaqMessage(faqRespond(question), "bot"), 300);
  });
}

/* CONTACT FORM — builds a pre-filled mailto (no backend on a static site) */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("cfName").value.trim();
    const email = document.getElementById("cfEmail").value.trim();
    const message = document.getElementById("cfMessage").value.trim();

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n—\n${name}\n${email}`,
    );

    window.location.href = `mailto:work.georgiajayy@gmail.com?subject=${subject}&body=${body}`;
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && faqPanel && faqPanel.classList.contains("open")) {
    closeFaq();
  }
});
