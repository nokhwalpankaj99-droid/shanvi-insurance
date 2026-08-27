
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }));
  }

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === current);
  });

  const form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const labels = [
        ["Name", "name"], ["Mobile", "mobile"], ["Email", "email"],
        ["Insurance Type", "type"], ["Vehicle Type", "vehicle"],
        ["Registration No.", "reg"], ["City", "city"], ["Pin Code", "pin"]
      ];
      const lines = labels
        .filter(([, key]) => String(data.get(key) || "").trim())
        .map(([label, key]) => `${label}: ${String(data.get(key)).trim()}`);
      const message = "Hello Shanvi Insurance Services,%0A%0AI need insurance assistance.%0A" +
        encodeURIComponent(lines.join("\n"));
      window.open("https://wa.me/919664029638?text=" + message, "_blank", "noopener");
    });
  }
});
