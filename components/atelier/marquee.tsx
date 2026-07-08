import styles from "@/app/atelier.module.css";

const ITEMS = [
  "Vẽ rập 2D",
  "May đo",
  "Cắt may căn bản",
  "Linen & cotton",
  "Thủ công",
  "Thêu tay",
  "Hội hoạ",
  "Thiết kế rập",
];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        {doubled.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
