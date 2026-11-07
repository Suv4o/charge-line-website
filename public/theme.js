// The light and dark switch in the header: the only script the site's pages need (see scripts/static-only.mjs).
// A saved choice is applied earlier, before the page paints, by the script in app/layout.tsx.
(() => {
  const root = document.documentElement;
  const button = document.querySelector(".theme-toggle");
  if (!button) return;

  const device = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : device.matches);
  const show = () => button.setAttribute("aria-pressed", String(isDark()));

  button.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing may refuse storage: the choice then lasts for this page only
    }
    show();
  });
  device.addEventListener("change", show);
  show();
})();
