# Homepage + Resume Reorganization

## Goal
Split current single-page homepage into: (A) a clean entry-point homepage, (B) a
dedicated resume page with full academic/personal details. Fix font-loading
performance regression. Refresh visual design.

## Scope
- `index.html` — simplify to Hero + Skills tags + Blog Preview + Footer
- `resume/index.html` — new page: Education, Awards, Scholarships, English, full
  personal details
- `css/style.css` — remove Google Fonts @import, add resume-specific styles,
  visual refresh
- `js/main.js` — no logic changes needed (blog preview/list already works)

## Homepage content plan
- **Nav**: YL logo | Blog (link) | Resume (link)
- **Hero**: name (ZH/EN), one-line intro, contact (email, phone, location)
- **Skills**: condensed tag cloud (6-8 tags) — C++, Python, STM32, Embedded
  Systems, PCB Design, CAN FD, UART, Git
- **Blog Preview**: latest 2 posts via JS
- **Footer**: name + Blog / Resume / Email links
- **Removed from homepage**: About cards with GPA/birth/hometown, Education card
  with GPA, Awards section (all 3 categories), TOEFL/English card, Scholarships

## Resume page content plan (`resume/index.html`)
- Education: USTC, School of the Gifted Young, major, minor, GPA, years
- Personal info: born Oct 2006, Weihai Shandong
- Awards: RoboMaster (3), ICPC HM, scholarships (3), honors (2)
- English: TOEFL 104 with breakdown, CET-4/6
- Skills: same tag cloud as homepage (intentional duplication for completeness)

## Performance fix
- Remove Google Fonts `@import(url(...))` from CSS
- Use system font stack: `-apple-system, 'Segoe UI', 'PingFang SC', 'Microsoft
  YaHei', sans-serif` for body; serif stack for headings
- No external font requests — zero render-blocking

## Visual refresh
- Larger whitespace, better rhythm
- Subtle geometric background pattern in Hero (CSS grid-dot)
- Softer card shadows, slightly larger border-radius
- Refined hover transitions
- Keep existing color scheme: navy primary (#1a365d), gold accent (#c8943e)
