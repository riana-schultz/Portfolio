/* =========================================================
   MOBILE NAV TOGGLE
   ========================================================= */
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

/* =========================================================
   PORTFOLIO DROPDOWN (click-to-toggle for touch/mobile,
   CSS :hover already handles desktop)
   ========================================================= */
const navDropdown = document.querySelector(".nav-dropdown");
const dropdownToggle = document.querySelector(".nav-dropdown-toggle");

if (navDropdown && dropdownToggle) {
  dropdownToggle.addEventListener("click", (e) => {
    // Only intercept on small screens where hover isn't available
    if (window.matchMedia("(max-width: 720px)").matches) {
      e.preventDefault();
      navDropdown.classList.toggle("is-open");
    }
  });
}

/* =========================================================
   MARK ACTIVE NAV LINK
   ========================================================= */
(function highlightActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a, .nav-dropdown-menu a").forEach((link) => {
    const href = link.getAttribute("href").split("/").pop();
    if (href === path) link.classList.add("is-active");
  });
})();

/* =========================================================
   SCROLL REVEAL
   ========================================================= */
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
    revealObserver.observe(el);
  });
}

/* =========================================================
   BACK TO TOP
   ========================================================= */
function initBackToTop() {
  const backToTop = document.querySelector(".back-to-top");
  if (!backToTop || backToTop.dataset.bound === "true") return;

  backToTop.dataset.bound = "true";
  const onScroll = () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 500);
  };

  window.addEventListener("scroll", onScroll);
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  onScroll();
}

window.initBackToTop = initBackToTop;
initBackToTop();

/* =========================================================
   CONTACT FORM — client-side only, shows a success message
   ========================================================= */

/* =========================================================
   FILTER BUTTONS — used on Photographs / Designs / Games pages
   ========================================================= */
const filterBar = document.querySelector(".filter-bar");
if (filterBar) {
  const buttons = filterBar.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll("[data-category]");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.dataset.filter;
      items.forEach((item) => {
        const match = filter === "all" || item.dataset.category === filter;
        item.style.display = match ? "" : "none";
      });
    });
  });
}

/* =========================================================
   LIGHTBOX — used on Photographs / Designs pages
   ========================================================= */
const lightbox = document.querySelector(".lightbox");
if (lightbox) {
  const lightboxTitle = lightbox.querySelector(".lightbox-info h3");
  const lightboxDesc = lightbox.querySelector(".lightbox-info p");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll("[data-lightbox-title]").forEach((item) => {
    item.addEventListener("click", () => {
      lightboxTitle.textContent = item.dataset.lightboxTitle;
      lightboxDesc.textContent = item.dataset.lightboxDesc || "";
      lightbox.classList.add("is-open");
    });
  });

  const closeLightbox = () => lightbox.classList.remove("is-open");
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

/* =========================================================
   VIDEO PLAY BUTTON — placeholder click feedback
   ========================================================= */
document.querySelectorAll(".video-embed").forEach((embed) => {
  embed.addEventListener("click", () => {
    embed.innerHTML =
      '<p style="color:#fff;font-size:14px;opacity:0.7;padding:0 24px;text-align:center;">Replace this placeholder with a real embed — e.g. a YouTube or Vimeo &lt;iframe&gt;.</p>';
  });
});
