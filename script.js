/* =========================================================
   EDIT YOUR CONTENT HERE
   - Put images inside the "images" folder and update the paths.
   ========================================================= */

const projects = [
  {
    title: "Spothole",
    desc: "A Web and Mobile-based Road Pothole Reporting and Monitoring System for Local Government Units",
    thumb: "images/projects/SPOTHOLE.png",   // screenshot of your website
    live: "#",                                // link to live site
    code: "#"                                 // link to GitHub / source code
  },
  {
    title: "Survey Management System",
    desc: "The Survey Management System lets you securely collect, manage, and access survey information online, no more manual forms or scattered responses.",
    thumb: "images/projects/SURVEY.png",
    live: "#",
    code: "#"
  },

  {
    title: "PIXEL MERGE",
    desc: "PIXEL MERGE is a retro-style 2048 puzzle game where players combine matching pixel-art creatures to evolve them into new forms. The goal is to keep merging, earn points, and reach the final creature while enjoying a nostalgic pixel-art gaming experience.",
    thumb: "images/projects/2048.png",
    live: "#",
    code: "#"
  }
  
];

const certificates = [
  { title: "AI Alamin: Navigating the Future of Technology", issuer: "CICT LSC", year: "2024", img: "images/certs/alamin.png" },
  { title: "Cisco Certified Network Associate", issuer: "Cisco Networking Academy", year: "2026", img: "images/certs/cisco.png" },
  { title: "SkillFront", issuer: "SkillFront Certification", year: "2026", img: "images/certs/skillfront.png" }
];

const CONTACT_EMAIL = "youremail@example.com"; // used by the contact form

/* ========================================================= */

// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const navList = document.querySelector(".nav ul");
if (menuBtn) menuBtn.addEventListener("click", () => navList.classList.toggle("open"));

// Image with graceful fallback when the file is missing
function thumbHTML(src, alt) {
  return `<div class="thumb">
    <span style="position:absolute">${alt}</span>
    <img src="${src}" alt="${alt}" loading="lazy" style="position:relative"
         onerror="this.remove();" />
  </div>`;
}

// Render projects
const projectGrid = document.getElementById("projects");
if (projectGrid) {
  projectGrid.innerHTML = projects.map(p => `
    <article class="card reveal">
      ${thumbHTML(p.thumb, p.title)}
      <div class="card-body">
        <span class="label">Website</span>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="card-links">
          <a href="${p.live}" target="_blank" rel="noopener">Live Demo</a>
          <a href="${p.code}" target="_blank" rel="noopener">View Code</a>
        </div>
      </div>
    </article>`).join("");
}

// Render certificates
const certGrid = document.getElementById("certificates");
if (certGrid) {
  certGrid.innerHTML = certificates.map((c, i) => `
    <article class="card cert-card reveal" data-index="${i}">
      ${thumbHTML(c.img, c.title)}
      <div class="card-body">
        <span class="label">${c.year}</span>
        <h3>${c.title}</h3>
        <p>${c.issuer}</p>
      </div>
    </article>`).join("");

  // Lightbox to view a certificate in full
  const box = document.getElementById("lightbox");
  const boxImg = box.querySelector("img");
  certGrid.addEventListener("click", e => {
    const card = e.target.closest(".cert-card");
    if (!card) return;
    boxImg.src = certificates[card.dataset.index].img;
    box.classList.add("open");
  });
  box.addEventListener("click", () => box.classList.remove("open"));
  document.addEventListener("keydown", e => { if (e.key === "Escape") box.classList.remove("open"); });
}

// Contact form -> opens the visitor's email app with the message filled in
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(form);
    const subject = encodeURIComponent(d.get("subject") || "Portfolio inquiry");
    const body = encodeURIComponent(`Hi, I'm ${d.get("name")} (${d.get("email")}).\n\n${d.get("message")}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    document.getElementById("form-msg").textContent = "Opening your email app…";
  });
}

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("show"); io.unobserve(en.target); } });
}, { threshold: .12 });
function observeAll() { document.querySelectorAll(".reveal").forEach(el => io.observe(el)); }
observeAll();

// Animated counters
document.querySelectorAll("[data-count]").forEach(el => {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || "";
  let n = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const t = setInterval(() => {
    n = Math.min(target, n + step);
    el.textContent = n + suffix;
    if (n >= target) clearInterval(t);
  }, 35);
});

// Footer year
document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());
