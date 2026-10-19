class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <a class="site-brand" href="index.html">
          <img
            src="assets/img/road-to-hamburg-logo.png"
            alt="Road to Hamburg – zur Startseite"
            width="2048"
            height="1024"
          />
        </a>

        <button
          class="menu-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="main-navigation"
        >
          <span class="visually-hidden">Menü</span>
        </button>

        <nav id="main-navigation" aria-label="Hauptnavigation">
          <ul>
            <li><a href="index.html">Start</a></li>
            <li><a href="mein-weg.html">Mein Weg</a></li>
            <li><a href="training.html">Training</a></li>
            <li><a href="wettkaempfe.html">Wettkämpfe</a></li>
            <li><a href="ausruestung.html">Ausrüstung</a></li>
          </ul>
        </nav>
      </header>
    `;

    const menuButton = this.querySelector(".menu-toggle");
    const menuButtonText = menuButton.querySelector("span");
    const navigationLinks = this.querySelectorAll("#main-navigation a");
    const tabletMediaQuery = window.matchMedia("(min-width: 48rem)");

    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    navigationLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.setAttribute("aria-current", "page");
      }
    });

    const openMenu = () => {
      this.setAttribute("data-menu-open", "");
      menuButton.setAttribute("aria-expanded", "true");
      menuButtonText.textContent = "Menü schließen";
    };

    const closeMenu = () => {
      this.removeAttribute("data-menu-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButtonText.textContent = "Menü";
    };

    menuButton.addEventListener("click", () => {
      const menuIsOpen = menuButton.getAttribute("aria-expanded") === "true";

      if (menuIsOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navigationLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      const menuIsOpen = menuButton.getAttribute("aria-expanded") === "true";

      if (event.key === "Escape" && menuIsOpen) {
        closeMenu();
        menuButton.focus();
      }
    });

    tabletMediaQuery.addEventListener("change", (event) => {
      if (event.matches) {
        closeMenu();
      }
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <p>&copy; 2026 Pascal Wellmann</p>

        <nav aria-label="Rechtliche Informationen">
          <ul>
            <li><a href="impressum.html">Impressum</a></li>
            <li><a href="datenschutz.html">Datenschutz</a></li>
          </ul>
        </nav>
      </footer>
    `;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);
