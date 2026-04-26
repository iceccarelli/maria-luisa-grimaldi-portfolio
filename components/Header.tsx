"use client";
import { useState, useEffect, useCallback } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#architecture" },
  { label: "Listings", href: "#flagship" },
  { label: "Market Hub", href: "#live-intelligence" },
  { label: "Experience", href: "#experience" },
  { label: "Connect", href: "#connect" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastY, setLastY] = useState(0);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 40);
    setHidden(y > lastY && y > 200);
    setLastY(y);
  }, [lastY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`site-header${scrolled ? " scrolled" : ""}${hidden ? " header-hidden" : ""}`}
    >
      <div className="header-inner">
        <a href="#hero" className="header-logo">
          <span className="logo-accent">MLG</span> Realty
        </a>
        <nav className={`header-nav${menuOpen ? " nav-open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="#connect" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Free Consultation
          </a>
        </nav>
        <button
          className={`menu-toggle${menuOpen ? " menu-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
