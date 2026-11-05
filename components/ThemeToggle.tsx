"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icons";

/**
 * Switches between light and dark. The page starts in the device's appearance; a choice is kept in
 * this browser (localStorage) and applied before the page paints by the script in app/layout.tsx.
 * Which icon shows is up to CSS (globals.css), so it's right even before this script runs.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const read = () => {
      const chosen = document.documentElement.dataset.theme;
      setDark(chosen ? chosen === "dark" : media.matches);
    };
    read();
    media.addEventListener("change", read);
    return () => media.removeEventListener("change", read);
  }, []);

  function toggle() {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing may refuse storage: the choice then lasts for this page only
    }
    setDark(!dark);
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Dark appearance" aria-pressed={dark}>
      <Icon name="moon" className="to-dark" />
      <Icon name="sun" className="to-light" />
    </button>
  );
}

/** Runs in <head> before the page paints, so a chosen appearance never flashes the other one first. */
export const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
