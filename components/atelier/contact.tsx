import styles from "@/app/atelier.module.css";

export function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.contactHeader}>
        <span className={`${styles.sectionLabel} ${styles.reveal}`} data-reveal>
          Chào bạn
        </span>
        <h2 className={`${styles.sectionTitle} ${styles.reveal}`} data-reveal>
          Đặt may một món, <em>hoặc chỉ để nhắn hỏi.</em>
        </h2>
        <p className={`${styles.sectionIntro} ${styles.reveal}`} data-reveal>
          Mình đọc mọi tin nhắn. Nếu muốn đặt may, cho mình biết bạn cần gì —
          chất liệu, dịp mặc, thời gian. Mình sẽ trả lời trong 1–2 ngày.
        </p>
      </div>
      <div className={styles.contactRows}>
        <a href="mailto:dangdquynh.225@gmail.com" className={styles.contactRow}>
          <span className={styles.contactLabel}>Email</span>
          <span className={styles.contactValue}>dangdquynh.225@gmail.com</span>
          <span className={styles.contactArrow}>→</span>
        </a>
        <a href="tel:0357570465" className={styles.contactRow}>
          <span className={styles.contactLabel}>Điện thoại</span>
          <span className={styles.contactValue}>0357 570 465</span>
          <span className={styles.contactArrow}>→</span>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener"
          className={styles.contactRow}
        >
          <span className={styles.contactLabel}>Instagram / Facebook</span>
          <span className={styles.contactValue}>Nhắn để đặt hoặc hỏi</span>
          <span className={styles.contactArrow}>→</span>
        </a>
        <div className={styles.contactRow}>
          <span className={styles.contactLabel}>Địa chỉ</span>
          <span className={styles.contactValue}>
            TP. Hồ Chí Minh,
            <br />
            nhận khách hẹn trước
          </span>
        </div>
      </div>
    </section>
  );
}
