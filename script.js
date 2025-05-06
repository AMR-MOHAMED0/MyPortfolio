(() => {
  // Starfield effect behind header
  const canvas = document.getElementById("starfield");
  const header = document.querySelector("header.hero");
  let mouseX = 0,
    mouseY = 0;
  if (canvas && header) {
    const ctx = canvas.getContext("2d");
    const stars = [];
    const numStars = 120;
    let w = (canvas.width = header.offsetWidth);
    let h = (canvas.height = header.offsetHeight);
    // initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
      });
    }
    // adjust on resize
    window.addEventListener("resize", () => {
      w = canvas.width = header.offsetWidth;
      h = canvas.height = header.offsetHeight;
    });
    // track mouse
    header.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    // animation loop
    const animateStars = () => {
      ctx.clearRect(0, 0, w, h);
      const offsetX = ((mouseX - w / 2) / w) * 30;
      const offsetY = ((mouseY - h / 2) / h) * 30;
      stars.forEach((st) => {
        ctx.beginPath();
        ctx.arc(st.x + offsetX, st.y + offsetY, st.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
      });
      requestAnimationFrame(animateStars);
    };
    animateStars();
  }

  // Debounce utility
  const debounce = (fn, delay = 100) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  // Scroll-to-top button logic
  const scrollBtn = document.getElementById("scrollToTopBtn");
  if (scrollBtn) {
    const toggleBtn = () =>
      scrollBtn.classList.toggle("visible", window.scrollY > 300);
    window.addEventListener("scroll", debounce(toggleBtn, 100));
    scrollBtn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  // Section reveal on scroll
  const sections = document.querySelectorAll(".section");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((sec) => observer.observe(sec));
  } else {
    sections.forEach((sec) => sec.classList.add("in-view"));
  }
})();
