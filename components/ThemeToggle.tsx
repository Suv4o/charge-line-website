import { Icon } from "./Icons";

/**
 * Switches between light and dark: a plain button, run by public/theme.js. The page starts in the device's
 * appearance; a choice is kept in this browser (localStorage) and applied before the page paints by the
 * script below. Which icon shows is up to CSS (globals.css), so it's right before any script runs.
 */
export function ThemeToggle() {
  return (
    <button type="button" className="theme-toggle" aria-label="Dark appearance" aria-pressed="false">
      <Icon name="moon" className="to-dark" />
      <Icon name="sun" className="to-light" />
    </button>
  );
}

/** Runs in <head> before the page paints, so a chosen appearance never flashes the other one first. */
export const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
