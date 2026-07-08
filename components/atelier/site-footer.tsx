import styles from "@/app/atelier.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerMark}>Đặng Diễm Quỳnh</div>
      <div className={styles.footerMeta}>
        <span>Làm bằng tay tại TP. Hồ Chí Minh</span>
        <span>·</span>
        <span>Newsreader &amp; DM Sans</span>
        <span>·</span>
        <span>© 2025 Đặng Diễm Quỳnh</span>
      </div>
    </footer>
  );
}
