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
          <span className={styles.scaleWordmark} aria-hidden="true">
            Quỳnh
          </span>
          <h2 className={styles.captionHeadline}>Mọi thứ bắt đầu ở đây.</h2>
          <span className={styles.captionLabel}>Bàn may tại nhà — 2025</span>
          <p className={styles.captionNote}>
            một chiếc máy may, một cuộn chỉ, và một chú mèo thích hóng hớt.
          </p>
        </div>
      </div>
    </section>
  );
}
