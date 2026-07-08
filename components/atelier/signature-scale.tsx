import styles from "@/app/atelier.module.css";

export function SignatureScale() {
  return (
    <section className={styles.signatureScale} data-scale-section>
      <div className={styles.scaleFrame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/atelier/q-home.jpg"
          className={`${styles.scaleImage} ${styles.editorialImg}`}
          data-scale-image
          alt="Bàn may tại nhà của Quỳnh"
          width={455}
          height={475}
        />
        <div className={styles.scaleCaption} data-scale-caption>
          <span className={styles.captionLabel}>Bàn may tại nhà — 2025</span>
          <span className={styles.captionText}>
            Mọi thứ bắt đầu ở đây: một chiếc máy may, một cuộn chỉ, và rất
            nhiều buổi tối.
          </span>
        </div>
      </div>
    </section>
  );
}
