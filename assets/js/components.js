/* ========================================
   Farbschema
   ======================================== */

const themeStorageKey = "road-to-hamburg-theme";
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

const getStoredTheme = () => {
  try {
    const storedTheme = localStorage.getItem(themeStorageKey);

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch {
    /* Die Website funktioniert auch ohne Zugriff auf localStorage. */
  }

  return null;
};

const getSystemTheme = () => {
  return systemThemeQuery.matches ? "dark" : "light";
};

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
};

const storeTheme = (theme) => {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    /* Die Theme-Auswahl wird in diesem Fall nicht dauerhaft gespeichert. */
  }
};

/* Farbschema möglichst früh anwenden */
applyTheme(getStoredTheme() || getSystemTheme());

/* ========================================
   Kopfbereich
   ======================================== */

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <a id="page-top" class="site-brand" href="index.html">
          <img
            src="assets/img/road-to-hamburg-logo.webp"
            srcset="
              assets/img/road-to-hamburg-logo-320.webp 320w,
              assets/img/road-to-hamburg-logo-640.webp 640w,
              assets/img/road-to-hamburg-logo.webp 1774w
            "
            sizes="(min-width: 75rem) 13rem, (min-width: 48rem) 8rem, 11rem"
            alt="Road to Hamburg – zur Startseite"
            width="1774"
            height="887"
          />
        </a>

        <button
          class="theme-toggle"
          type="button"
          aria-pressed="false"
          title="Dunklen Modus aktivieren"
        >
          <span class="theme-toggle-icon" aria-hidden="true">☾</span>
          <span class="visually-hidden">Dunklen Modus aktivieren</span>
        </button>

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
    const menuButtonText = menuButton.querySelector(".visually-hidden");

    const navigation = this.querySelector("#main-navigation");
    const navigationLinks = navigation.querySelectorAll("a");

    const themeButton = this.querySelector(".theme-toggle");
    const themeButtonIcon = themeButton.querySelector(".theme-toggle-icon");
    const themeButtonText = themeButton.querySelector(".visually-hidden");

    const tabletMediaQuery = window.matchMedia("(min-width: 48rem)");

    /* Theme-Button passend zur Ansicht im DOM anordnen */
    const positionThemeButton = () => {
      if (tabletMediaQuery.matches) {
        navigation.after(themeButton);
      } else {
        menuButton.before(themeButton);
      }
    };

    positionThemeButton();

    /* Aktuelle Seite in der Navigation kennzeichnen */
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    navigationLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.setAttribute("aria-current", "page");
      }
    });

    /* Mobile Navigation öffnen und schließen */
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

    /* Theme-Button aktualisieren */
    const updateThemeButton = () => {
      const darkModeIsActive =
        document.documentElement.getAttribute("data-theme") === "dark";

      themeButton.setAttribute("aria-pressed", String(darkModeIsActive));

      if (darkModeIsActive) {
        themeButtonIcon.textContent = "☀";
        themeButtonText.textContent = "Hellen Modus aktivieren";
        themeButton.title = "Hellen Modus aktivieren";
      } else {
        themeButtonIcon.textContent = "☾";
        themeButtonText.textContent = "Dunklen Modus aktivieren";
        themeButton.title = "Dunklen Modus aktivieren";
      }
    };

    updateThemeButton();

    themeButton.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");

      const newTheme = currentTheme === "dark" ? "light" : "dark";

      applyTheme(newTheme);
      storeTheme(newTheme);
      updateThemeButton();
    });

    /* Änderungen der Systemdarstellung übernehmen,
       solange keine eigene Auswahl gespeichert wurde */
    systemThemeQuery.addEventListener("change", (event) => {
      if (getStoredTheme() !== null) {
        return;
      }

      applyTheme(event.matches ? "dark" : "light");
      updateThemeButton();
    });

    /* Header beim Wechsel der Bildschirmgröße anpassen */
    tabletMediaQuery.addEventListener("change", (event) => {
      positionThemeButton();

      if (event.matches) {
        closeMenu();
      }
    });
  }
}

/* ========================================
   Fußbereich und Back-to-top-Link
   ======================================== */

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

      <a
        class="back-to-top"
        href="#page-top"
        aria-label="Zurück zum Seitenanfang"
        aria-hidden="true"
        tabindex="-1"
      >
        <span aria-hidden="true">↑</span>
        <span class="back-to-top-text">Nach oben</span>
      </a>
    `;

    const backToTopLink = this.querySelector(".back-to-top");
    const pageHeader = document.querySelector("site-header");

    if (!backToTopLink || !pageHeader) {
      return;
    }

    const setBackToTopVisibility = (shouldBeVisible) => {
      backToTopLink.classList.toggle("is-visible", shouldBeVisible);
      backToTopLink.toggleAttribute("data-visible", shouldBeVisible);
      backToTopLink.setAttribute("aria-hidden", String(!shouldBeVisible));

      if (shouldBeVisible) {
        backToTopLink.removeAttribute("tabindex");
      } else {
        backToTopLink.setAttribute("tabindex", "-1");
      }
    };

    setBackToTopVisibility(false);

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        setBackToTopVisibility(!entry.isIntersecting);
      },
      {
        threshold: 0,
      },
    );

    headerObserver.observe(pageHeader);

    backToTopLink.addEventListener("click", () => {
      const pageTop = document.querySelector("#page-top");

      if (!pageTop) {
        return;
      }

      window.setTimeout(() => {
        pageTop.focus({
          preventScroll: true,
        });
      }, 500);
    });
  }
}

/* ========================================
   Web Components registrieren
   ======================================== */

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);
