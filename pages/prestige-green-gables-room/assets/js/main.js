/* ==========================================================
   EDIT HERE: your WhatsApp number and the prefilled message.
   Number = country code + number, digits only (e.g. 919876543210).
   ========================================================== */
const CONFIG = {
  whatsapp: "919993098893",
  message: "Hi! I saw your listing for the furnished room at Prestige Green Gables. Is it still available?"
};

/* WhatsApp buttons */
(() => {
  const valid = /^\d{10,15}$/.test(CONFIG.whatsapp);
  if (!valid) {
    console.warn("Set CONFIG.whatsapp in assets/js/main.js to enable WhatsApp links.");
    return; // buttons keep pointing at #contact until a real number is set
  }
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.message)}`;
  document.querySelectorAll("[data-whatsapp]").forEach((a) => {
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
  });
})();

/* Photo lightbox */
(() => {
  const items = [...document.querySelectorAll("[data-gallery] button")];
  const dialog = document.getElementById("lightbox");
  if (!items.length || !dialog || typeof dialog.showModal !== "function") return;

  const img = dialog.querySelector("img");
  const caption = dialog.querySelector("[data-caption]");
  let index = 0;

  const show = (n) => {
    index = (n + items.length) % items.length;
    const btn = items[index];
    const thumb = btn.querySelector("img");
    img.src = btn.dataset.full;
    img.alt = thumb.alt;
    caption.textContent = `${btn.dataset.title} (${index + 1} of ${items.length})`;
    // Preload the next photo so arrowing through feels instant
    new Image().src = items[(index + 1) % items.length].dataset.full;
  };

  items.forEach((btn, n) => btn.addEventListener("click", () => { show(n); dialog.showModal(); }));
  dialog.querySelector("[data-prev]").addEventListener("click", () => show(index - 1));
  dialog.querySelector("[data-next]").addEventListener("click", () => show(index + 1));
  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  // Swipe on phones
  let startX = null;
  dialog.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  dialog.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();

/* Footer year */
document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
