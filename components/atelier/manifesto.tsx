import styles from "@/app/atelier.module.css";

export function Manifesto() {
  return (
    <section className={styles.manifestoSection}>
      <div className={styles.manifestoContainer}>
        <span className={`${styles.sectionLabel} ${styles.reveal}`} data-reveal>
          Điều mình tin
        </span>
        <p className={styles.manifestoText} data-manifesto-text>
          Đồ làm bằng tay mang một điều mà đồ sản xuất hàng loạt không có —
          dấu vết của người làm ra nó. Mình rời một lớp học đông người để
          ngồi vào một chiếc bàn của riêng mình, với kéo, với vải linen, với
          ô cửa sổ hướng đông. Mỗi món ở đây đều do mình cắt, may và hoàn
          thiện, cho một người mình rất có thể sẽ gặp.
        </p>
        <div className={styles.manifestoSig} data-manifesto-sig>
          — Đặng Diễm Quỳnh
        </div>
      </div>
    </section>
  );
}
