import styles from "@/app/atelier.module.css";

export function SiteNav() {
  return (
    <header className={styles.siteNav} data-site-nav>
      <a href="#top" className={styles.atelierName}>
        <span className={styles.atelierMark}>Q</span>
        <span className={styles.atelierText}>Đặng Diễm Quỳnh</span>
      </a>
      <nav className={styles.navLinks}>
        <a href="#journey">Hành trình</a>
        <a href="#projects">Dự án</a>
        <a href="#shop">Cửa hàng</a>
        <a href="#story">Câu chuyện</a>
        <a href="#contact">Liên hệ</a>
      </nav>
    </header>
  );
}
