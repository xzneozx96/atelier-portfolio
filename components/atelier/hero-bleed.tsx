import styles from "@/app/atelier.module.css";

export function HeroBleed() {
  return (
    <section className={styles.heroBleed} id="top" data-hero-section>
      <div className={styles.heroBleedImage} data-hero-image>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/atelier/q-hero.jpg"
          alt="Quỳnh bên bàn may"
          width={770}
          height={1081}
        />
      </div>

      <div className={styles.heroBleedDecor} aria-hidden="true">
        <span className={styles.heroBleedFrame} />
        <span className={styles.heroBleedSpine}>
          Atelier · Sài Gòn · Thủ công
        </span>
        <div className={styles.heroBleedSeal}>
          <span className={styles.heroBleedSealStar}>✶</span>
          <span className={styles.heroBleedSealText}>thủ công</span>
        </div>
      </div>

      <span className={styles.heroBleedTag}>tự tay cắt &amp; may</span>

      <div className={styles.heroBleedContent}>
        <div className={styles.heroEyebrow}>
          <span className={styles.eyebrowDot} />
          Đặng Diễm Quỳnh &nbsp;·&nbsp; TP. Hồ Chí Minh &nbsp;·&nbsp; Từ 2026
        </div>

        <h1 className={styles.heroBleedHeadline} data-hero-headline>
          Từ lớp học đến bàn may của riêng mình.
        </h1>

        <div className={styles.heroSub}>
          <p>
            Mình là Quỳnh. Sau 5 năm làm trong ngành giáo dục, mình rẽ sang
            may mặc — thiết kế. Mỗi món đồ ở đây đều do mình tự cắt, may và
            hoàn thiện bằng tay.
          </p>
        </div>

        <div className={styles.heroCtas}>
          <a href="#contact" className={styles.ctaPrimary}>
            Liên hệ đặt may
          </a>
          <a href="#shop" className={styles.ctaSecondary}>
            Ghé cửa hàng
          </a>
        </div>

        <div className={styles.heroBleedMeta}>
          <div>
            <span className={styles.metaLabel}>Hiện đang nhận</span>
            <span className={styles.metaValue}>May theo số đo</span>
          </div>
          <div>
            <span className={styles.metaLabel}>Chứng chỉ</span>
            <span className={styles.metaValue}>2 khoá cắt may · Giỏi</span>
          </div>
          <div>
            <span className={styles.metaLabel}>Thời gian may</span>
            <span className={styles.metaValue}>5 – 7 ngày</span>
          </div>
        </div>
      </div>
    </section>
  );
}
