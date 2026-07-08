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
// Shared observer instance + helper so elements added to the DOM
// later (e.g. gallery items, video cards fetched async) can still
// be registered for the reveal animation. Previously this only
// ever observed the .reveal elements present at initial page load,
// so anything injected after fetch() resolved stayed invisible.
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

function observeReveal(el, i = 0) {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
  revealObserver.observe(el);
}

document.querySelectorAll(".reveal").forEach((el, i) => observeReveal(el, i));

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
   GALLERY (Photographs)
   ========================================================= */

const gallery = document.getElementById("galleryGrid");
const lightbox = document.querySelector(".lightbox");

if (gallery) {

    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const lightboxTitle = lightbox.querySelector(".lightbox-info h3");
    const lightboxDesc = lightbox.querySelector(".lightbox-info p");
    const closeBtn = lightbox.querySelector(".lightbox-close");

    fetch("../assets/photographs/manifest.json")
        .then(res => res.json())
        .then(images => {

            images.forEach((photo, i) => {

                const item = document.createElement("div");
                item.className = "gallery-item reveal";
                item.dataset.category = photo.category;

                item.innerHTML = `
                    <img
                        src="../assets/photographs/${photo.file}"
                        alt="${photo.title}"
                        loading="lazy"
                    >
                    <div class="gallery-caption">
                        <h4>${photo.title}</h4>
                    </div>
                `;

                item.addEventListener("click", () => {

                    lightboxImage.innerHTML = `
                        <img
                            src="../assets/photographs/${photo.file}"
                            alt="${photo.title}"
                        >
                    `;

                    lightboxTitle.textContent = photo.title;
                    lightboxDesc.textContent = photo.description || "";

                    lightbox.classList.add("is-open");
                });

                gallery.appendChild(item);
                observeReveal(item, i);

            });

        })
        .catch(error => console.error("Gallery failed to load:", error));

    /* ==========================
       Filter Buttons
    ========================== */

    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("is-active")
            );

            button.classList.add("is-active");

            const filter = button.dataset.filter;

            document.querySelectorAll(".gallery-item").forEach(item => {

                const show =
                    filter === "all" ||
                    item.dataset.category === filter;

                item.style.display = show ? "" : "none";

            });

        });

    });

    /* ==========================
       Lightbox Close
    ========================== */

    function closeLightbox() {
        lightbox.classList.remove("is-open");
    }

    closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });

}

/* =========================================================
   VIDEOS
   ========================================================= */

const videoGrid = document.getElementById("videoGrid");

if (videoGrid) {

    fetch("../assets/videos/manifest.json")
        .then(res => res.json())
        .then(videos => {

            videos.forEach((video, i) => {

                const card = document.createElement("article");
                card.className = "video-card reveal";

                card.innerHTML = `
                    <div class="video-thumb">
                        <img
                            src="../assets/videos/${video.thumbnail}"
                            alt="${video.title}"
                            loading="lazy"
                        >
                    </div>

                    <div class="video-info">
                        <span class="video-category">${video.category}</span>

                        <h3>${video.title}</h3>

                        <p>${video.description}</p>

                        <button class="play-video">
                            ▶ Play Video
                        </button>
                    </div>
                `;

                const button = card.querySelector(".play-video");

                button.addEventListener("click", () => {

                    card.innerHTML = `
                        <video controls autoplay playsinline>
                            <source
                                src="../assets/videos/${video.video}"
                                type="video/mp4">
                        </video>

                        <div class="video-info">
                            <span class="video-category">${video.category}</span>
                            <h3>${video.title}</h3>
                            <p>${video.description}</p>
                        </div>
                    `;

                });

                videoGrid.appendChild(card);
                observeReveal(card, i);

            });

        })
        .catch(err => console.error("Couldn't load videos:", err));

}