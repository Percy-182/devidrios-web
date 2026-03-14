document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll state
  const nav = document.getElementById("mainNav");
  const setNav = () => {
    if (window.scrollY > 30) nav.classList.add("nav-scrolled");
    else nav.classList.remove("nav-scrolled");
  };
  window.addEventListener("scroll", setNav, { passive: true });
  setNav();

  // Smooth scroll + close mobile menu
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const collapse = document.querySelector(".navbar-collapse");
      if (collapse && collapse.classList.contains("show")) {
        const toggler = document.querySelector(".navbar-toggler");
        if (toggler) toggler.click();
      }

      const y = target.getBoundingClientRect().top + window.pageYOffset - 84;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // Lightbox init (no API)
  if (window.GLightbox) {
    GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      openEffect: "zoom",
      closeEffect: "fade",
    });
  }

  // Copy address
  const btnCopy = document.getElementById("btnCopyAddr");
  const addrText = document.getElementById("addrText");
  const copyHint = document.getElementById("copyHint");

  if (btnCopy && addrText) {
    btnCopy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(addrText.textContent.trim());
        if (copyHint)
          copyHint.textContent = "Dirección copiada al portapapeles.";
        btnCopy.blur();
      } catch {
        if (copyHint)
          copyHint.textContent =
            "No se pudo copiar automáticamente. Copia manualmente la dirección.";
      }
    });
  }
});
