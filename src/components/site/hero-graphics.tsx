import React from "react";
import styles from "./hero-graphics.module.css";

export default function HeroGraphics() {
  return (
    <>
      {/* שלוש קופסאות כהות */}
      {/* קופסאות כהות ברקע */}
      <div className={styles.box} style={{ left: 60, top: 80, width: 420, height: 440, opacity: 0.5, zIndex: 1 }} />
      <div className={styles.box} style={{ left: 540, top: 40, width: 430, height: 450, opacity: 0.4, zIndex: 1 }} />
      <div className={styles.box} style={{ left: 1050, top: 80, width: 420, height: 440, opacity: 0.5, zIndex: 1 }} />

      {/* עיגולים צבעוניים מעל הקופסאות */}
      <div
        className={styles.circle}
        style={{ left: 110, top: 110, width: 120, height: 120, background: "linear-gradient(90deg, #96FFA7 0%, #4FDAB3 100%)", opacity: 0.7, zIndex: 2 }}
      />
      <div
        className={styles.circle}
        style={{ left: 720, top: 40, width: 110, height: 110, background: "#FFF", opacity: 0.5, zIndex: 2 }}
      />
      <div
        className={styles.circle}
        style={{ left: 1200, top: 110, width: 120, height: 120, background: "#FF7458", opacity: 0.6, zIndex: 2 }}
      />
      {/* שלושה עיגולים עם תמונה */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/10a7d9a1d40a0158ac428eb5d865b2c86da437b3?width=252"
        className={styles.circle}
        style={{ left: 120, top: 120, width: 100, height: 100, opacity: 0.35, background: "linear-gradient(90deg, #96FFA7 0%, #4FDAB3 100%)" }}
        alt="Ellipse 95"
      />
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/9693804a03e522ba91080db94ae49f74a2478471?width=252"
        className={styles.circle}
        style={{ left: 700, top: 60, width: 90, height: 90, opacity: 0.25, background: "#FFF" }}
        alt="Ellipse 96"
      />
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/a8c15f11a046f7b2c61bb6d600a1fa0ad31da2f0?width=252"
        className={styles.circle}
        style={{ left: 1200, top: 120, width: 100, height: 100, opacity: 0.35, background: "#FF7458" }}
        alt="Ellipse 97"
      />
    </>
  );
}
