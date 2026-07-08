import styles from "@/app/atelier.module.css";

const MEMORIES = [
  {
    className: styles.memory1,
    depth: "0.25",
    src: "/atelier/q-keychains.jpg",
    alt: "Móc chìa khoá làm năm 13 tuổi",
    caption: "móc khoá, năm 13 tuổi",
  },
  {
    className: styles.memory2,
    depth: "0.45",
    src: "/atelier/q-havanana.jpg",
    alt: "Xưởng may havanana.mood",
    caption: "havanana.mood, tháng 3",
  },
  {
    className: styles.memory3,
    depth: "0.35",
    src: "/atelier/q-painting.jpg",
    alt: "Tranh vẽ ở lớp Hồng Xiêm",
    caption: "lớp Hồng Xiêm",
  },
  {
    className: styles.memory4,
    depth: "0.55",
    src: "/atelier/q-pattern.jpg",
    alt: "Bản vẽ rập",
    caption: "vẽ rập, tự học",
  },
];

export function Hero() {
  return (
    <section className={styles.hero} id="top" data-hero-section>
      {MEMORIES.map((m) => (
        <div
          key={m.src}
          className={`${styles.memory} ${m.className}`}
          data-memory
          data-depth={m.depth}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={m.src} alt={m.alt} width={252} height={252} />
          <div className={styles.memoryCaption}>{m.caption}</div>
        </div>
      ))}

      <div className={styles.heroContent}>
        <div className={styles.heroEyebrow}>
          <span className={styles.eyebrowDot} />
          Đặng Diễm Quỳnh &nbsp;·&nbsp; TP. Hồ Chí Minh &nbsp;·&nbsp; Từ 2025
        </div>

        <h1 className={styles.heroHeadline} data-hero-headline>
          Từ lớp học{" "}
          <span className={styles.inlinePhoto} data-inline-photo>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/atelier/q-hero.jpg"
              alt="Quỳnh bên bàn may"
              width={100}
              height={100}
            />
          </span>{" "}
          đến bàn may của riêng mình.
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

        <div className={styles.heroMeta}>
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
