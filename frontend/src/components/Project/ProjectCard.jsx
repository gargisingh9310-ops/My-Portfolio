import React, { useState } from "react";
import styles from "./ProjectCard.module.css";

export const ProjectCard = ({
  project: {
    title,
    imageSrc,
    description,
    skills = [],
    demo,
    source,
    comingSoon,
  },
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleDemoClick = (e) => {
    if (comingSoon) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  return (
    <>
      {/* CARD */}
      <div className={styles.card} onClick={() => setShowModal(true)}>

        <div className={styles.imageWrapper}>
          <img src={imageSrc} alt={title} className={styles.image} />

          {comingSoon && (
            <span className={styles.badge}>Coming Soon</span>
          )}
        </div>

        <h3 className={styles.title}>{title}</h3>

        <p className={styles.shortDesc}>
          {description?.slice(0, 80) || "Click to view details..."}
        </p>

        <div className={styles.skillRow}>
          {skills.slice(0, 3).map((skill, i) => (
            <span key={i} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className={styles.overlay} onClick={() => setShowModal(false)}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{title}</h2>

            <img src={imageSrc} alt={title} className={styles.modalImg} />

            <p className={styles.fullDesc}>
              {description}
            </p>

            <h4>Skills</h4>
            <div className={styles.skillWrap}>
              {skills.map((skill, i) => (
                <span key={i} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>

            <div className={styles.buttons}>
              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.demoBtn}
                  onClick={handleDemoClick}
                >
                  Live Demo
                </a>
              )}

              {source && (
                <a
                  href={source}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.sourceBtn}
                >
                  Source Code
                </a>
              )}
            </div>

            <button
              className={styles.closeBtn}
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};