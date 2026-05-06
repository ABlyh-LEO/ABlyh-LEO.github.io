# Homepage + Resume Reorganization — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split current single-page homepage into a clean entry-point homepage + dedicated resume page, fix font-loading performance regression, and refresh visuals.

**Architecture:** 4 files changed. `index.html` trimmed to Hero + Skills + Blog Preview. New `resume/index.html` gets full academic details (Education, Awards, English, GPA). CSS drops Google Fonts for system font stack, adds dot-grid Hero background, softer shadows. JS updated for new nav link set.

**Tech Stack:** Static HTML5, vanilla CSS, vanilla JS. No frameworks, no build step.

---

### Task 1: Fix CSS — Remove Google Fonts, switch to system font stack

**Files:** Modify `css/style.css:6-7`

- [ ] **Step 1: Replace Google Fonts @import with system font stacks**

Edit `css/style.css`, replace lines 6-7:
```css
/* --- Google Fonts --- */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap');
```

With:
```css
/* --- System Fonts (zero external requests) --- */
```

Also update the CSS variable definitions on lines 24-26. Replace:
```css
  --font-heading: 'Playfair Display', 'Noto Serif SC', 'SimSun', serif;
  --font-body: 'Inter', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  --font-mono: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
```

With:
```css
  --font-heading: 'Georgia', 'Noto Serif SC', 'SimSun', 'Times New Roman', serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif;
  --font-mono: 'SF Mono', 'Cascadia Code', 'Consolas', 'Courier New', monospace;
```

- [ ] **Step 2: Visual refresh — CSS variable tweaks**

Update the color and shadow variables (lines 10-37). Replace the current `:root` block with sharper values:

```css
:root {
  --color-primary: #0f2b46;
  --color-primary-light: #1a4a7a;
  --color-accent: #b8860b;
  --color-accent-light: #d4a843;
  --color-bg: #fafaf8;
  --color-bg-alt: #f3f1ec;
  --color-surface: #ffffff;
  --color-text: #1e293b;
  --color-text-light: #475569;
  --color-text-muted: #94a3b8;
  --color-border: #e8e5df;

  /* rest unchanged */
}
```

- [ ] **Step 3: Add dot-grid background to Hero**

Append after the existing `.hero::before` rule (after line 234), add a second pseudo-element:

```css
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(26,54,93,0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 60% 60% at 70% 40%, black 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 60% 60% at 70% 40%, black 30%, transparent 70%);
}
```

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "perf: remove Google Fonts, switch to system fonts, visual refresh"
```

---

### Task 2: Simplify index.html to entry-point homepage

**Files:** Modify `index.html` (rewrite body content)

- [ ] **Step 1: Rewrite index.html**

Replace the `<body>` content with this structure (keep `<head>` unchanged):

```html
<body>

  <!-- Navigation -->
  <nav class="nav" id="nav">
    <div class="nav-inner">
      <a href="#" class="nav-logo">YL</a>
      <div class="nav-links" id="navLinks">
        <a href="blog/">Blog</a>
        <a href="resume/" class="nav-resume-btn">Resume</a>
      </div>
      <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- Hero -->
  <section class="hero">
    <div class="hero-inner">
      <div class="hero-text">
        <p class="hero-greeting">Hello, I am</p>
        <h1 class="hero-name-cn">刘彦宏</h1>
        <p class="hero-name-en">Yanhong Liu</p>
        <p class="hero-brief">
          USTC undergraduate · School of the Gifted Young<br>
          Embedded systems developer · ICPC contestant<br>
          Building things at the intersection of hardware and algorithms.
        </p>
        <div class="hero-contact">
          <span class="hero-contact-item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
            lyh@mail.ustc.edu.cn
          </span>
          <span class="hero-contact-item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            Weihai, Shandong
          </span>
        </div>
        <div class="hero-actions">
          <a href="resume/" class="btn btn-primary">View Resume</a>
          <a href="blog/" class="btn btn-outline">Read Blog</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-avatar-placeholder">刘</div>
        <div class="hero-deco-ring"></div>
        <div class="hero-deco-ring"></div>
      </div>
    </div>
    <div class="scroll-indicator">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
    </div>
  </section>

  <!-- Skills -->
  <section class="section" id="skills">
    <div class="section-inner">
      <div class="section-header">
        <span class="section-label">What I Do</span>
        <h2 class="section-title">Skills &amp; Interests</h2>
      </div>
      <div class="skills-tags-hero">
        <span class="skill-tag-lg">C++</span>
        <span class="skill-tag-lg">Python</span>
        <span class="skill-tag-lg">STM32</span>
        <span class="skill-tag-lg">Embedded Systems</span>
        <span class="skill-tag-lg">PCB Design</span>
        <span class="skill-tag-lg">CAN FD</span>
        <span class="skill-tag-lg">UART</span>
        <span class="skill-tag-lg">Git</span>
      </div>
    </div>
  </section>

  <!-- Blog Preview -->
  <section class="section section-alt" id="blog-preview">
    <div class="section-inner">
      <div class="section-header">
        <span class="section-label">Writing</span>
        <h2 class="section-title">Recent Posts</h2>
      </div>
      <div class="blog-preview-grid" id="blogPreview">
        <!-- Populated by JS -->
      </div>
      <div class="blog-preview-cta">
        <a href="blog/" class="btn btn-primary">
          View All Posts
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-name">Yanhong Liu</div>
      <div class="footer-links">
        <a href="#">Home</a>
        <a href="blog/">Blog</a>
        <a href="resume/">Resume</a>
        <a href="mailto:lyh@mail.ustc.edu.cn">Email</a>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; 2025 Yanhong Liu
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "refactor: simplify homepage to entry-point layout"
```

---

### Task 3: Create resume/index.html

**Files:** Create `resume/index.html`

- [ ] **Step 1: Create the resume directory and file**

```bash
mkdir -p resume
```

Write `resume/index.html`:

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Yanhong Liu — Resume. USTC undergraduate, embedded systems developer.">
  <title>Resume — Yanhong Liu</title>
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📄</text></svg>">
</head>
<body>

  <nav class="nav" id="nav">
    <div class="nav-inner">
      <a href="../" class="nav-logo">YL</a>
      <div class="nav-links" id="navLinks">
        <a href="../">Home</a>
        <a href="../blog/">Blog</a>
        <a href="index.html" class="nav-resume-btn active">Resume</a>
      </div>
      <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- Page header -->
  <section class="section resume-page">
    <div class="section-inner">
      <div class="section-header">
        <span class="section-label">Resume</span>
        <h2 class="section-title">Yanhong Liu · 刘彦宏</h2>
        <p class="section-subtitle">
          Born Oct 2006 · Weihai, Shandong · USTC, School of the Gifted Young<br>
          <a href="mailto:lyh@mail.ustc.edu.cn">lyh@mail.ustc.edu.cn</a> · +86 189 6318 7526
        </p>
      </div>
    </div>
  </section>

  <!-- Summary -->
  <section class="section section-alt">
    <div class="section-inner">
      <div class="section-header">
        <span class="section-label">Summary</span>
      </div>
      <p style="max-width:640px;font-size:1.05rem;color:var(--color-text-light);line-height:1.8;">
        Motivated undergraduate at USTC's School of the Gifted Young, studying Information &amp; Computational Science,
        a mathematics-oriented program, with a minor in Computer Science. Strong background in algorithmic problem
        solving and embedded systems development through ICPC-style contests and RoboMaster robotics competitions.
      </p>
    </div>
  </section>

  <!-- Education -->
  <section class="section">
    <div class="section-inner">
      <div class="section-header">
        <span class="section-label">Education</span>
        <h2 class="section-title">Academic Background</h2>
      </div>
      <div class="edu-card">
        <div class="edu-main">
          <h3>University of Science and Technology of China (USTC)</h3>
          <p class="program">Undergraduate in Information &amp; Computational Science</p>
          <p class="minor">Minor in Computer Science</p>
          <p style="margin-top:0.6rem;font-size:0.9rem;color:var(--color-text-light);">
            School of the Gifted Young (Mathematics track) · 2023 — Present
          </p>
        </div>
        <div class="edu-meta">
          <p class="gpa-big">3.69</p>
          <p class="gpa-label">GPA / 4.0</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Experience -->
  <section class="section section-alt">
    <div class="section-inner">
      <div class="section-header">
        <span class="section-label">Experience</span>
        <h2 class="section-title">Experience &amp; Competitions</h2>
      </div>
      <div class="timeline">

        <div class="timeline-item">
          <div class="timeline-header">
            <h3>RoboMaster — Embedded Developer (Sentinel Robot)</h3>
            <span class="date">2024 — 2025</span>
          </div>
          <p class="timeline-subtitle">Full-cycle embedded systems engineering</p>
          <div class="timeline-detail">
            <ul>
              <li>Led embedded development for the full vehicle system of the sentinel robot using STM32H7</li>
              <li>Became familiar with hardware connection standards and practical use of CAN FD, UART, and USB virtual serial ports</li>
              <li>Independently designed control algorithms for a special-configuration chassis and gimbal stabilization</li>
              <li>Learned PCB design and layout, circuit board soldering, basic 3D modeling, and 3D printer operation</li>
              <li>Strengthened C++ embedded development, team communication, and ability to read vendor manuals</li>
            </ul>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-header">
            <h3>ICPC Asia Regional — Nanjing</h3>
            <span class="date">2023</span>
          </div>
          <p class="timeline-subtitle">Competitive Programming</p>
          <div class="timeline-detail">
            <ul>
              <li>Participated in team training, problem-solving sessions, and contest preparation</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Awards -->
  <section class="section">
    <div class="section-inner">
      <div class="section-header">
        <span class="section-label">Awards &amp; Honors</span>
        <h2 class="section-title">Recognition</h2>
      </div>
      <div class="awards-grid">

        <div class="award-category">
          <h3>Competition Awards</h3>
          <div class="award-item">
            <span class="award-badge badge-gold">Champion</span>
            <span class="award-name">RMUL (Shandong) 2025</span>
          </div>
          <div class="award-item">
            <span class="award-badge badge-gold">Champion</span>
            <span class="award-name">RMUC Regional (Changsha) 2025</span>
          </div>
          <div class="award-item">
            <span class="award-badge badge-silver">Runner-up</span>
            <span class="award-name">RMUC Finals 2025</span>
          </div>
          <div class="award-item">
            <span class="award-badge badge-bronze">HM</span>
            <span class="award-name">ICPC Asia Regional (Nanjing) 2023</span>
          </div>
        </div>

        <div class="award-category">
          <h3>Scholarships</h3>
          <div class="award-item">
            <span class="award-badge badge-silver">Silver</span>
            <span class="award-name">Excellent Student Scholarship 2024</span>
          </div>
          <div class="award-item">
            <span class="award-badge badge-bronze">Bronze</span>
            <span class="award-name">Excellent Student Scholarship 2025</span>
          </div>
          <div class="award-item">
            <span class="award-name">Rose Fund Public Affairs Scholarship</span>
            <div class="award-detail">2024, 2025</div>
          </div>
        </div>

        <div class="award-category">
          <h3>Honors &amp; Leadership</h3>
          <div class="award-item">
            <span class="award-name">USTC Outstanding Communist Youth League Member</span>
            <div class="award-detail">2025</div>
          </div>
          <div class="award-item">
            <span class="award-name">Class Monitor</span>
            <div class="award-detail">2023 — Present</div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- English -->
  <section class="section section-alt">
    <div class="section-inner">
      <div class="section-header">
        <span class="section-label">English</span>
        <h2 class="section-title">Language Proficiency</h2>
      </div>
      <div class="english-card">
        <div class="english-score">
          <div class="score-num">104</div>
          <div class="score-label">TOEFL iBT</div>
        </div>
        <div class="english-detail">
          <p>Reading 29 &nbsp;|&nbsp; Listening 29 &nbsp;|&nbsp; Speaking 22 &nbsp;|&nbsp; Writing 24</p>
          <p style="margin-top:0.4rem;">CET-4 / CET-6: Passed</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Skills -->
  <section class="section">
    <div class="section-inner">
      <div class="section-header">
        <span class="section-label">Skills</span>
        <h2 class="section-title">Technical Skills</h2>
      </div>
      <div class="skills-grid">
        <div class="skill-card">
          <h3>Programming</h3>
          <div class="skill-tags">
            <span class="skill-tag">C++</span>
            <span class="skill-tag">Python</span>
            <span class="skill-tag">C</span>
          </div>
        </div>
        <div class="skill-card">
          <h3>Embedded Systems</h3>
          <div class="skill-tags">
            <span class="skill-tag">STM32</span>
            <span class="skill-tag">CAN FD</span>
            <span class="skill-tag">UART</span>
            <span class="skill-tag">USB</span>
            <span class="skill-tag">PCB Design</span>
          </div>
        </div>
        <div class="skill-card">
          <h3>Other</h3>
          <div class="skill-tags">
            <span class="skill-tag">AI-Assisted Coding</span>
            <span class="skill-tag">3D Printing</span>
            <span class="skill-tag">Circuit Soldering</span>
            <span class="skill-tag">Git</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-name">Yanhong Liu</div>
      <div class="footer-links">
        <a href="../">Home</a>
        <a href="../blog/">Blog</a>
        <a href="index.html">Resume</a>
        <a href="mailto:lyh@mail.ustc.edu.cn">Email</a>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; 2025 Yanhong Liu
    </div>
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add resume/index.html
git commit -m "feat: add dedicated resume page with full academic details"
```

---

### Task 4: Add new CSS styles for homepage & resume

**Files:** Modify `css/style.css` — append new styles

- [ ] **Step 1: Add hero-actions, nav-resume-btn, skill-tag-lg, resume-page, gpa-big styles**

Append before the Responsive section (before line 998 `/* --- Responsive --- */`):

```css
/* --- Homepage Skills Tags (large) --- */
.skills-tags-hero {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
}

.skill-tag-lg {
  display: inline-block;
  padding: 0.5rem 1.3rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-primary);
  transition: all 0.25s;
}

.skill-tag-lg:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

/* --- Hero Action Buttons --- */
.hero-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

/* --- Nav Resume Button --- */
.nav-resume-btn {
  padding: 0.45rem 1.2rem;
  border: 1.5px solid var(--color-accent);
  border-radius: 50px;
  font-weight: 600 !important;
  color: var(--color-accent) !important;
  transition: all 0.25s !important;
}

.nav-resume-btn:hover {
  background: var(--color-accent);
  color: #fff !important;
}

.nav-resume-btn::after { display: none !important; }

/* --- Resume Page Top Spacing --- */
.resume-page {
  padding-top: calc(var(--nav-height) + 3rem);
}

/* --- GPA Big Number --- */
.gpa-big {
  font-family: var(--font-heading);
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1;
}

/* --- Education Card year inline --- */
.edu-card .edu-main .years-inline {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

/* --- Hero Actions Responsive --- */
@media (max-width: 1024px) {
  .hero-actions { justify-content: center; }
}

@media (max-width: 480px) {
  .hero-actions { flex-direction: column; align-items: center; }
}
```

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "style: add homepage skill tags, hero actions, resume styles"
```

---

### Task 5: Update nav and blog link paths in JS

**Files:** Modify `js/main.js` — small updates

- [ ] **Step 1: No major JS changes needed — verify nav selector compatibility**

The `updateActiveNavLink` function selects `a[href^="#"]` anchors. This still works because both the homepage (no hash sections) and blog pages (hash links to `../#about` etc.) match this pattern. No code changes required.

The blog preview JS inserts `'blog/' + post.url` — this still resolves correctly from the root `index.html`.

The blog list JS inserts `post.url` directly — this still resolves correctly from `blog/index.html`.

- [ ] **Step 2: Commit**

No changes needed — skip commit.

---

### Task 6: Update blog page nav to include Resume link

**Files:** Modify `blog/index.html`

- [ ] **Step 1: Update nav in blog/index.html**

Replace the nav section:
```html
  <nav class="nav" id="nav">
    <div class="nav-inner">
      <a href="../" class="nav-logo">YL</a>
      <div class="nav-links" id="navLinks">
        <a href="../">Home</a>
        <a href="../resume/">Resume</a>
        <a href="index.html" class="nav-blog-btn active">Blog</a>
      </div>
      <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
```

Also update footer links to add Resume:
```html
    <div class="footer-links">
      <a href="../">Home</a>
      <a href="index.html">Blog</a>
      <a href="../resume/">Resume</a>
      <a href="mailto:lyh@mail.ustc.edu.cn">Email</a>
    </div>
```

- [ ] **Step 2: Update nav in blog/posts/hello-world.html similarly**

Same nav and footer updates:
```html
      <div class="nav-links" id="navLinks">
        <a href="../../">Home</a>
        <a href="../../resume/">Resume</a>
        <a href="../" class="nav-blog-btn">Blog</a>
      </div>
```

Footer:
```html
      <a href="../../">Home</a>
      <a href="../">Blog</a>
      <a href="../../resume/">Resume</a>
```

- [ ] **Step 3: Verify all page cross-links**

Open locally and verify:
- Homepage → Blog link works
- Homepage → Resume link works
- Blog → Home link works
- Blog → Resume link works
- Resume → Home link works
- Resume → Blog link works
- Blog post → Home / Resume / Blog links work

- [ ] **Step 4: Commit**

```bash
git add blog/index.html blog/posts/hello-world.html
git commit -m "fix: add Resume link to blog page navigation"
```

---

### Task 7: Final verification

- [ ] **Step 1: List all changed files**

```bash
git status
```

Expected: index.html, resume/index.html, css/style.css, blog/index.html, blog/posts/hello-world.html modified (js/main.js unchanged).

- [ ] **Step 2: Verify no broken paths**

```bash
grep -r "href=" --include="*.html" | grep -v "http" | grep -v "mailto"
```

Manual check: all relative paths resolve correctly.

- [ ] **Step 3: Final commit if needed**
