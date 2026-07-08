import styles from "@/app/atelier.module.css";

export function IntroCurtain() {
  return (
    <div className={styles.introCurtain} data-intro-curtain>
      <span className={styles.introMark} data-intro-mark>
        Q
      </span>
      <div className={styles.introName} data-intro-name>
        <span>Đặng</span>
        <span>Diễm</span>
        <span>Quỳnh</span>
      </div>
      <span className={styles.introSub} data-intro-sub>
        may thủ công · hội hoạ
      </span>
      <span className={styles.introProgress} data-intro-progress />
    </div>
  );
}
