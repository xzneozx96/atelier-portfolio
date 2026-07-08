import styles from "@/app/atelier.module.css";

const CHAPTERS = [
  {
    chapter: "1",
    tint: "#EFE3CC",
    num: "Chương 01",
    title: "Bắt đầu ở một lớp học nhỏ.",
    src: "/atelier/q-painting.jpg",
    alt: "Bức tranh ở lớp Hồng Xiêm",
    paragraphs: [
      "Tháng 10 năm 2025, mình đăng ký lớp «Hội hoạ ngây thơ» ở Lớp học Hồng Xiêm — nơi đầu tiên dạy mình nhìn màu như một người làm nghề: hoà sắc, bố cục, và cả sự kiên nhẫn.",
      "Lớp học ấy truyền cho mình tình yêu với ngành sáng tạo — thứ mà bao năm đứng lớp mình chưa từng cho phép mình theo đuổi.",
    ],
  },
  {
    chapter: "2",
    tint: "#F2E1CE",
    num: "Chương 02",
    title: "Luyện mắt nhìn mỗi ngày.",
    src: "/atelier/q-sketch.jpg",
    alt: "Ký hoạ trong chuyến đi bảo tàng",
    paragraphs: [
      "Ký hoạ trong những chuyến đi bảo tàng, bài tập hoà sắc mỗi tuần. Mình hoàn thành khoá học với đầy đủ bài tập — và nhiều lời khen của cô giáo.",
      "Bút line, màu chì, màu nước, gouache — mỗi chất liệu dạy mình một cách quan sát khác nhau.",
    ],
  },
  {
    chapter: "3",
    tint: "#E6E7DA",
    num: "Chương 03",
    title: "Nét vẽ đi vào đường may.",
    src: "/atelier/q-tote-detail.jpg",
    alt: "Sticker mèo vẽ tay trên túi tote",
    paragraphs: [
      "Hội hoạ không dừng ở trang giấy. Sticker mèo trên chiếc túi tote được vẽ từ hình chụp, cắt vải dạ, khâu từng phần lên túi — chữ «A day dreamer» thêu tay.",
      "Giờ mỗi lần chọn vải hay phối màu, mình nhìn bằng con mắt của một người đã học vẽ. Đó là món quà lớn nhất lớp học để lại.",
    ],
  },
];

export function CraftStory() {
  return (
    <section className={styles.craftStory} id="story" data-craft-story>
      <div className={styles.storyHeader}>
        <span className={`${styles.sectionLabel} ${styles.reveal}`} data-reveal>
          Nơi điều này bắt đầu
        </span>
        <h2 className={`${styles.sectionTitle} ${styles.reveal}`} data-reveal>
          Hội hoạ đã dẫn mình <em>tới đường may.</em>
        </h2>
      </div>
      <div className={styles.storyTrack}>
        <div className={styles.storyStageCol}>
          <div className={styles.storyStage} data-story-stage>
            {CHAPTERS.map((c, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={c.chapter}
                className={`${styles.storyImg} ${i === 0 ? styles.active : ""}`}
                data-story-img
                data-chapter={c.chapter}
                src={c.src}
                alt={c.alt}
                width={857}
                height={863}
              />
            ))}
          </div>
        </div>
        <div className={styles.storyChapters}>
          {CHAPTERS.map((c) => (
            <article
              className={styles.chapter}
              key={c.chapter}
              data-chapter-section
              data-chapter={c.chapter}
              data-tint={c.tint}
            >
              <span className={styles.chapterNum}>{c.num}</span>
              <h3 className={styles.chapterTitle}>{c.title}</h3>
              {c.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
