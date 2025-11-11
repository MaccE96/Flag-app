import { useState, useEffect } from "react";
import logoLight from "../assets/techover-logo-dark.png";
import logoDark from "../assets/techover-logo.png";
import moon from "../assets/moon.svg";
import moonBordered from "../assets/moon-bordered.svg";

export default function Navbar() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <nav className="navbar">
      <h1 className="navbar-title">The Flag App</h1>

      <div className="navbar-logo">
        <img
          src={theme === "light" ? logoLight : logoDark}
          alt="Techover logga"
        />
      </div>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? (
          <>
            <img src={moonBordered} alt="Moon icon" className="icon" />
            Dark Mode
          </>
        ) : (
          <>
            <img src={moon} alt="Sun icon" className="icon" />
            Light Mode
          </>
        )}
      </button>
    </nav>
  );
}
