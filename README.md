# Riana Schultz — Portfolio Site

A multi-page portfolio built with plain HTML, CSS, and JavaScript — no
build step required.

## Running it locally

1. Open this folder in VS Code.
2. Install the **Live Server** extension if you don't have it.
3. Right-click `index.html` → **Open with Live Server**.

That's it — the site works with plain file links, so it'll also run fine
if you just double-click `index.html` (though Live Server gives you
auto-refresh while editing).

## File structure

```
riana/
├── index.html              Home
├── resume.html             Resume
├── about.html              About Me
├── contact.html            Contact (form + social links)
├── style.css                Shared styles for every page
├── script.js                 Shared behavior (nav, dropdown, lightbox, etc.)
├── portfolio/
│   ├── photographs.html    Filterable gallery + lightbox
│   ├── games.html          Game cards (Play / GitHub links)
│   ├── designs.html        Masonry gallery + lightbox
│   ├── videos.html         Video grid (placeholder players)
│   └── projects.html       Project cards (GitHub / Live demo links)
└── assets/
    └── images/              Put real photos/images here
```

## Things to customize before publishing

- **Photos & images** — every image is currently a colored placeholder
  block. Add real files to `assets/images/` and swap the placeholder
  `<div>`s for `<img>` tags.
- **Resume PDF** — the "Download PDF" button on `resume.html` points to
  `assets/riana-schultz-resume.pdf`. Add your actual PDF there (or update
  the `href`).
- **Contact form** — the form currently only shows a success message in
  the browser; it doesn't actually send email yet. Wire it up to a
  service like Formspree, Netlify Forms, or your own backend endpoint
  (see the comment in `script.js`, in the "CONTACT FORM" section).
- **Social links** — the `#` links in the footer and Contact page (GitHub,
  LinkedIn, Instagram) need your real profile URLs.
- **Placeholder copy** — text marked `[Placeholder]` on the About page
  is meant to be rewritten in your own voice.

## Notes on the design

- Single accent color (indigo) used sparingly — buttons, links, active
  states — everything else stays neutral.
- The "Portfolio" nav item is a dropdown on desktop (hover) and an
  expandable section on mobile (tap).
- Scroll-reveal animations, the gallery lightbox, filter buttons, and the
  "Back to top" button are all handled by `script.js` using vanilla JS
  (no libraries).
- Fully responsive: tested breakpoints at 960px (tablet) and 720px
  (mobile), where the nav collapses into a slide-out menu.
