# GitHub Pages Resume — ABlyh-LEO

This repository contains a simple static resume site suitable for GitHub Pages. Files added:

- `index.html` — the main resume HTML file you can edit.
- `assets/styles.css` — layout + print-friendly CSS.
- `resume.md` — a Markdown version of the resume (optional source).

How to use

1. Edit `index.html` (or `resume.md`) with your name, experience, links, and projects.
2. Commit and push to GitHub on the `main` branch.
3. On GitHub, go to the repository Settings → Pages and set the source to "main branch" (root).

Preview locally

You can preview the site locally with a simple HTTP server (Python). From the repo root run:

```powershell
py -3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Printing / PDF

- Use the browser Print → Save as PDF. The stylesheet includes a `@media print` section to remove UI noise and make the layout PDF-friendly.

Customization tips

- Replace font and colors in `assets/styles.css` as needed.
- For a custom domain, add a `CNAME` file at the repo root.

If you want, I can:

- convert `resume.md` into `index.html` automatically and add a small build script,
- add a printable one-page condensed layout,
- or apply a different visual template (Jekyll, Minimal Mistakes, or a Hugo theme).
