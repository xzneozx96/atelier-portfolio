import styles from "@/app/atelier.module.css";

const PROJECTS = [
  {
    number: "01 / 04",
    src: "/atelier/q-proj1.jpg",
    alt: "Áo tay phồng và quần đùi",
    title: (
      <>
        Áo tay phồng <em>&amp; quần đùi</em>
      </>
    ),
    summary:
      "Bộ đồ mặc nhà từ vải muslin — nhún cổ, tay phồng, khuy gỗ. Dự án đầu tiên mình đi trọn quy trình từ ý tưởng đến thành phẩm.",
    tags: ["Muslin", "Nhún cổ", "Khuy gỗ", "Tự vẽ rập"],
  },
  {
    number: "02 / 04",
    src: "/atelier/q-proj2.jpg",
    alt: "Pyjama cho bé",
    title: (
      <>
        Pyjama <em>cho bé</em>
      </>
    ),
    summary:
      "Bộ ngủ cho bé 9–12 tháng: vải muslin mềm nhẹ, khuy gỗ đóng trước ngực, chun em bé bản 1,2cm — dịu với làn da nhạy cảm.",
    tags: ["Muslin", "Khuy gỗ", "Baby 9–12 tháng"],
  },
  {
    number: "03 / 04",
    src: "/atelier/q-proj3.jpg",
    alt: "Áo baby doll linen",
    title: (
      <>
        Áo <em>baby doll</em>
      </>
    ),
    summary:
      "Áo hai dây dáng baby doll từ premium washed linen 180gsm — phóng khoáng, mỏng nhẹ, chui đầu, mặc được hàng ngày.",
    tags: ["Washed linen", "180 gsm", "Chui đầu"],
  },
  {
    number: "04 / 04",
    src: "/atelier/q-proj4.jpg",
    alt: "Passenger bag",
    title: (
      <>
        Passenger <em>bag</em>
      </>
    ),
    summary:
      "Túi đeo chéo từ vải canvas, lót cotton, nhiều ngăn nhỏ và quai chắc chắn — vừa laptop và tài liệu. Gắn sticker vẽ tay may riêng.",
    tags: ["Canvas", "Cotton lót", "36 × 30 cm", "Sticker tay"],
  },
];

export function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.projectsHeader}>
        <span className={`${styles.sectionLabel} ${styles.reveal}`} data-reveal>
          Dự án tiêu biểu
        </span>
        <h2 className={`${styles.sectionTitle} ${styles.reveal}`} data-reveal>
          Bốn dự án, <em>và cách chúng thành hình.</em>
        </h2>
        <p className={`${styles.sectionIntro} ${styles.reveal}`} data-reveal>
          Mỗi món bắt đầu từ một ảnh tham khảo, một bản phác, một mảnh vải,
          một tấm rập. Tất cả rập đều do mình tự thiết kế.
        </p>
      </div>
      <div className={styles.projectsStack}>
        {PROJECTS.map((p, i) => (
          <article
            className={styles.projectCard}
            key={p.number}
            data-project-card
            data-index={i}
          >
            <div className={styles.projectImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.alt}
                className={styles.editorialImg}
                width={700}
                height={860}
              />
            </div>
            <div className={styles.projectBody}>
              <span className={styles.projectNumber}>{p.number}</span>
              <h3 className={styles.projectTitle}>{p.title}</h3>
              <p className={styles.projectSummary}>{p.summary}</p>
              <div className={styles.projectTags}>
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <span className={styles.projectLink}>
                Xem quy trình đầy đủ →
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
