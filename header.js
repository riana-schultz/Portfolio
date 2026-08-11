(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const root = window.location.pathname.includes('/portfolio/') ? '../' : '';
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  header.innerHTML = `
    <a class="logo" href="${root}index.html">Riana Schultz</a>
    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <nav class="site-nav">
      <a href="${root}index.html" class="${currentPath === 'index.html' ? 'is-active' : ''}">Home</a>
      <a href="${root}resume.html" class="${currentPath === 'resume.html' ? 'is-active' : ''}">Resume</a>
      <a href="${root}about.html" class="${currentPath === 'about.html' ? 'is-active' : ''}">About Me</a>
      <div class="nav-dropdown">
        <button class="nav-dropdown-toggle">
          Portfolio
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.6"/></svg>
        </button>
        <div class="nav-dropdown-menu">
          <a href="${root}portfolio/games.html" class="${currentPath === 'games.html' ? 'is-active' : ''}">Games</a>
          <!-- <a href="${root}portfolio/projects.html" class="${currentPath === 'projects.html' ? 'is-active' : ''}">Projects</a> -->
          <!-- <a href="${root}portfolio/designs.html" class="${currentPath === 'designs.html' ? 'is-active' : ''}">Designs</a> -->
          <a href="${root}portfolio/photographs.html" class="${currentPath === 'photographs.html' ? 'is-active' : ''}">Photographs</a>
          <a href="${root}portfolio/videos.html" class="${currentPath === 'videos.html' ? 'is-active' : ''}">Videos</a>
        </div>
      </div>
      <a href="${root}contact.html" class="${currentPath === 'contact.html' ? 'is-active' : ''}">Contact</a>
    </nav>
  `;

  if (window.initMobileNav) {
    window.initMobileNav();
  }
})();
