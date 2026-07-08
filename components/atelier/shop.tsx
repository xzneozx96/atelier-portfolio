import styles from "@/app/atelier.module.css";

const PRODUCTS = [
  {
    rot: "-2deg",
    tagRot: "-8deg",
    src: "/atelier/q-linen.jpg",
    alt: "Váy linen",
    name: "Váy linen",
    meta: "May theo đơn · linen · nhiều màu",
  },
  {
    rot: "1.5deg",
    tagRot: "6deg",
    src: "/atelier/q-babydoll.jpg",
    alt: "Áo baby doll",
    name: "Áo baby doll",
    meta: "Washed linen 180gsm · chui đầu",
  },
  {
    rot: "-1deg",
    tagRot: "-4deg",
    src: "/atelier/q-chiffon.jpg",
    alt: "Chân váy chiffon",
    name: "Chân váy chiffon",
    meta: "Hai lớp chiffon · cạp chun",
  },
  {
    rot: "2deg",
    tagRot: "9deg",
    src: "/atelier/q-tote.jpg",
    alt: "Túi tote sticker mèo",
    name: "Túi tote sticker mèo",
    meta: "Canvas · sticker vẽ tay · thêu tay",
  },
  {
    rot: "-2.5deg",
    tagRot: "-7deg",
    src: "/atelier/q-milkmaid.jpg",
    alt: "Váy milkmaid",
    name: "Váy milkmaid",
    meta: "Caro nhún ngực · tùng xoè",
  },
  {
    rot: "1deg",
    tagRot: "5deg",
    src: "/atelier/q-crossbody.jpg",
    alt: "Túi đeo chéo",
    name: "Túi đeo chéo",
    meta: "Vải bố · lót cotton · nhiều ngăn",
  },
  {
    rot: "-1.5deg",
    tagRot: "-6deg",
    src: "/atelier/q-cami.jpg",
    alt: "Áo cami ren",
    name: "Áo cami",
    meta: "Ren trắng · nơ buộc ngực",
  },
  {
    rot: "2.5deg",
    tagRot: "8deg",
    src: "/atelier/q-quanhoa.jpg",
    alt: "Quần hoa ống rộng",
    name: "Quần hoa",
    meta: "Ống rộng · cạp chun · vải mát",
  },
];

export function Shop() {
  return (
    <section className={styles.shop} id="shop">
      <div className={styles.shopHeader}>
        <span className={`${styles.sectionLabel} ${styles.reveal}`} data-reveal>
          Cửa hàng
        </span>
        <h2 className={`${styles.sectionTitle} ${styles.reveal}`} data-reveal>
          Một tiệm may nhỏ, <em>hoàn toàn thủ công.</em>
        </h2>
        <p className={`${styles.sectionIntro} ${styles.reveal}`} data-reveal>
          Làm theo đơn, mỗi món một rập. Khi một mẫu hết, mình sẽ may lại khi
          có thời gian. Cuộn ngang để xem cả bộ sưu tập.
        </p>
      </div>
      <div className={styles.shopPin} data-shop-pin>
        <div className={styles.shopRail} data-shop-track>
          {PRODUCTS.map((p) => (
            <article
              className={styles.product}
              key={p.name}
              style={
                {
                  "--rot": p.rot,
                  "--tag-rot": p.tagRot,
                } as React.CSSProperties
              }
            >
              <div className={styles.productImage}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.alt}
                  className={styles.editorialImg}
                  width={340}
                  height={450}
                  loading="lazy"
                />
                <div className={styles.hangTag}>{p.name}</div>
              </div>
              <h3 className={styles.productName}>{p.name}</h3>
              <p className={styles.productMeta}>{p.meta}</p>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.shopCta}>
        <span className={styles.ctaSecondary}>Xem giỏ hàng &amp; đặt may →</span>
      </div>
    </section>
  );
}
