import { useState, useEffect } from "react";
import logoLight from "../assets/Techover-logo-dark.png";
import logoDark from "../assets/Techover-logo.png";

export default function Navbar() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
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
            <span className="icon">🌙</span> Dark Mode
          </>
        ) : (
          <>
            <span className="icon">☀️</span> Light Mode
          </>
        )}
      </button>
    </nav>
  );
}
