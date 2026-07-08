import styles from "@/app/atelier.module.css";

const MILESTONES = [
  {
    year: "Đầu 2025",
    title: "Tìm lại sở thích",
    text: "Mình bắt đầu tìm lại những gì từ nhỏ rất mê nhưng chưa có dịp theo đuổi: may vá, thủ công và vẽ.",
    src: "/atelier/q-keychains.jpg",
    alt: "Móc chìa khoá tự làm",
  },
  {
    year: "Tháng 3",
    title: "Thợ may bán thời gian",
    text: "Xin vào làm thợ may ở một xưởng nhỏ. Ba tháng, mình may hoàn thiện đồ theo rập có sẵn và nắm chắc các đường may cơ bản.",
    src: "/atelier/q-havanana.jpg",
    alt: "Xưởng may havanana.mood",
  },
  {
    year: "Tháng 8",
    title: "Học cắt may bài bản",
    text: "Hoàn thành 2 khoá Cắt may căn bản tại Nhà văn hoá Phụ nữ TP.HCM — vẽ rập 2D, may đo sơ mi, quần tây, váy.",
    src: "/atelier/q-class.jpg",
    alt: "Lớp cắt may",
  },
  {
    year: "Tháng 9",
    title: "Góc may tại nhà",
    text: "Dựng góc may riêng ở nhà, tự vẽ rập và may những món đầu tiên cho chính mình — mỗi món một bài học.",
    src: "/atelier/q-pattern.jpg",
    alt: "Vẽ rập tại nhà",
  },
  {
    year: "Tháng 10",
    title: "Hội hoạ ngây thơ",
    text: "Đăng ký lớp vẽ tại Lớp học Hồng Xiêm — hoà sắc, bố cục, thực hành bút line, màu chì, màu nước, gouache.",
    src: "/atelier/q-painting.jpg",
    alt: "Tranh ở lớp hội hoạ",
  },
  {
    year: "Hôm nay",
    title: "May theo đơn",
    text: "Nhận may theo số đo và làm quà thủ công. Mình muốn làm ít nhưng làm kỹ — mỗi món một câu chuyện.",
    src: "/atelier/q-nhun.jpg",
    alt: "Áo nhún tự may",
  },
];

export function Journey() {
  return (
    <section className={styles.journey} id="journey">
      <div className={styles.journeyHeader}>
        <span className={`${styles.sectionLabel} ${styles.reveal}`} data-reveal>
          Con đường tới đây
        </span>
        <h2 className={`${styles.sectionTitle} ${styles.reveal}`} data-reveal>
          Năm năm trên bục giảng, <em>rồi một chiếc bàn may.</em>
        </h2>
        <p className={`${styles.sectionIntro} ${styles.reveal}`} data-reveal>
          Một hành trình không thẳng hàng — từ lớp học đến chiếc máy may đầu
          tiên. Cuộn ngang để đi tiếp.
        </p>
      </div>
      <div className={styles.journeyPin} data-journey-pin>
        <div className={styles.journeyTrack} data-journey-track>
          {MILESTONES.map((m) => (
            <article className={styles.milestone} key={m.year + m.title}>
              <span className={styles.milestoneYear}>{m.year}</span>
              <h3 className={styles.milestoneTitle}>{m.title}</h3>
              <p className={styles.milestoneText}>{m.text}</p>
              <div className={styles.milestoneImgWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.src}
                  alt={m.alt}
                  className={styles.editorialImg}
                  width={400}
                  height={480}
                />
              </div>
            </article>
          ))}
        </div>
        <div className={styles.journeyProgress}>
          <span className={styles.progressBar} data-progress-bar />
        </div>
        <div className={styles.journeyHint}>Cuộn</div>
      </div>
    </section>
  );
}
