(() => {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.getElementById("main-nav");

  /* ---------- Header shadow once the page scrolls ---------- */

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ---------- Mobile menu ---------- */

  const setMenuOpen = (isOpen) => {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    nav.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  };

  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  window.matchMedia("(min-width: 1101px)").addEventListener("change", (query) => {
    if (query.matches) setMenuOpen(false);
  });

  /* ---------- Reveals (a few key moments only) ---------- */

  const revealTargets = [...document.querySelectorAll(".reveal")];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    for (const target of revealTargets) target.classList.add("is-visible");
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        for (const { target } of visibleEntries) {
          target.classList.add("is-visible");
          observer.unobserve(target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    for (const target of revealTargets) revealObserver.observe(target);
  }

  /* ---------- Testimonial carousel ---------- */

  const carousel = document.querySelector("[data-carousel]");

  if (carousel) {
    const slides = [...carousel.querySelectorAll(".testimonial")];
    const dotsContainer = carousel.querySelector("[data-carousel-dots]");

    const dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Show review ${index + 1} of ${slides.length}`);
      dot.addEventListener("click", () => showSlide(index));
      return dot;
    });

    dotsContainer.append(...dots);

    let activeIndex = 0;

    function showSlide(index) {
      activeIndex = (index + slides.length) % slides.length;

      for (const [slideIndex, slide] of slides.entries()) {
        const isActive = slideIndex === activeIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
        dots[slideIndex].setAttribute("aria-current", String(isActive));
      }
    }

    carousel.querySelector("[data-carousel-prev]").addEventListener("click", () => showSlide(activeIndex - 1));
    carousel.querySelector("[data-carousel-next]").addEventListener("click", () => showSlide(activeIndex + 1));

    showSlide(0);
  }

  /* ---------- Enquiry form (concept only: nothing is sent) ---------- */

  const enquiryForm = document.querySelector("[data-enquiry]");

  if (enquiryForm) {
    const status = enquiryForm.querySelector("[data-enquiry-status]");

    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const requiredFields = [...enquiryForm.querySelectorAll("[required]")];
      const missingFields = requiredFields.filter((field) => !field.value.trim());

      for (const field of requiredFields) {
        field.setAttribute("aria-invalid", String(missingFields.includes(field)));
      }

      if (missingFields.length > 0) {
        status.classList.add("is-error");
        status.textContent = "Please add your name and a phone number so we can reach you.";
        missingFields[0].focus();
        return;
      }

      const firstName = enquiryForm.elements.name.value.trim().split(" ")[0];

      status.classList.remove("is-error");
      status.textContent = `Thank you, ${firstName}! This is a design concept, so nothing was sent — on the live site the nursery team would be in touch to arrange your tour.`;
      enquiryForm.reset();
    });
  }
})();
