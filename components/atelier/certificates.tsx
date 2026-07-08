import styles from "@/app/atelier.module.css";

const SELF_STUDY = [
  "Pattern Studio 101",
  "Coraline Street",
  "Ae PooiM",
  "Metric Pattern Cutting — W. Aldrich",
];

const CERTS = [
  {
    rot: "-3deg",
    src: "/atelier/q-cert1.jpg",
    alt: "Giấy chứng nhận cắt may khoá 08/2025",
    course: "Cắt may căn bản — Khoá 1",
    year: "2025",
    score: "10đ",
    grade: "Giỏi",
    issuer: "Nhà văn hoá Phụ nữ TP.HCM",
  },
  {
    rot: "2.5deg",
    src: "/atelier/q-cert2.jpg",
    alt: "Giấy chứng nhận cắt may khoá 09/2025",
    course: "Cắt may căn bản — Khoá 2",
    year: "2025",
    score: "10đ",
    grade: "Giỏi",
    issuer: "Nhà văn hoá Phụ nữ TP.HCM",
  },
];

export function Certificates() {
  return (
    <section className={styles.certificates}>
      <div className={styles.certHeader}>
        <span className={`${styles.sectionLabel} ${styles.reveal}`} data-reveal>
          Chứng chỉ
        </span>
        <h2 className={`${styles.sectionTitle} ${styles.reveal}`} data-reveal>
          Những gì mình đã <br /> <em>thật sự được học</em>.
        </h2>
        <p className={`${styles.sectionIntro} ${styles.reveal}`} data-reveal>
          Không phải huy hiệu. Chứng chỉ thật, chụp lại như chúng đang nằm đó
          — hai khoá cắt may căn bản, 10 điểm, xếp loại Giỏi.
        </p>
      </div>
      <div className={styles.certWall}>
        {CERTS.map((c) => (
          <article
            className={styles.certificate}
            key={c.src}
            style={{ "--rot": c.rot } as React.CSSProperties}
            data-certificate
          >
            <span className={styles.certClip} aria-hidden="true" />
            <div className={styles.certPhoto}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.src}
                alt={c.alt}
                className={styles.editorialImg}
                width={320}
                height={240}
                loading="lazy"
              />
              <span className={styles.certStamp}>
                <span className={styles.certStampScore}>{c.score}</span>
                <span className={styles.certStampGrade}>{c.grade}</span>
              </span>
            </div>
            <div className={styles.certBody}>
              <span className={styles.certYear}>{c.year}</span>
              <h3 className={styles.certName}>{c.course}</h3>
              <span className={styles.certIssuer}>{c.issuer}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
