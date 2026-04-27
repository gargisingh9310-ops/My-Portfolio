import React, { useState } from "react";
import styles from "./ProjectCard..module.css";

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
  const [showPopup, setShowPopup] = useState(false);

  const handleDemoClick = (e) => {
    if (comingSoon) {
      e.preventDefault(); // link open na ho
      setShowPopup(true);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={imageSrc}
          alt={`Image of ${title}`}
          className={styles.image}
        />

        {/* optional badge */}
        {comingSoon && (
          <span className={styles.badge}>Coming Soon</span>
        )}
      </div>

      <h3 className={styles.projectTitle}>{title}</h3>

      <p className={styles.description}>{description}</p>

      <ul className={styles.skills}>
        {skills.map((skill, id) => (
          <li key={id} className={styles.skill}>
            {skill}
          </li>
        ))}
      </ul>

      <div className={styles.links}>
        {demo && (
          <a
            href={demo}
            onClick={handleDemoClick}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Demo
          </a>
        )}

        {source && (
          <a
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkSecondary}
          >
            Source
          </a>
        )}
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>🚧 Coming Soon</h2>
            <p>This demo is under development</p>
            <button onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};