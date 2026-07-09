"use client";

import { useEffect, useState } from "react";
import styles from "@/app/atelier.module.css";

const LINKS = [
  { href: "#journey", label: "Hành trình" },
  { href: "#story", label: "Câu chuyện" },
  { href: "#projects", label: "Dự án" },
  { href: "#shop", label: "Cửa hàng" },
  { href: "#contact", label: "Liên hệ" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <header className={styles.siteNav} data-site-nav>
      <a href="#top" className={styles.atelierName}>
        <span className={styles.atelierMark}>Q</span>
        <span className={styles.atelierText}>Đặng Diễm Quỳnh</span>
      </a>
      <nav className={styles.navLinks} aria-label="Điều hướng chính">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <button
        type="button"
        className={styles.menuToggle}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Đóng menu" : "Mở menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`${styles.menuToggleBar} ${open ? styles.menuToggleBarOpen : ""}`}
        />
        <span
          className={`${styles.menuToggleBar} ${open ? styles.menuToggleBarOpen : ""}`}
        />
        <span
          className={`${styles.menuToggleBar} ${open ? styles.menuToggleBarOpen : ""}`}
        />
      </button>
      <nav
        id="mobile-menu"
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!open}
        aria-label="Điều hướng di động"
      >
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
