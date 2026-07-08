import styles from "@/app/atelier.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerMark}>Đặng Diễm Quỳnh</div>
      <div className={styles.footerMeta}>
        <span>Tiệm may nhỏ tại TP. Hồ Chí Minh</span>
        <span>·</span>
        <span>© 2025 Đặng Diễm Quỳnh</span>
      </div>
    </footer>
  );
}
