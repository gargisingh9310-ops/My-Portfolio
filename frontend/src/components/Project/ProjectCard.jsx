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
  const [showPopup, setShowPopup] = useState(false);

  const handleDemoClick = (e) => {
    if (comingSoon) {
      e.preventDefault();
      setShowPopup(true);
    }
  };

  return (
    <div className={styles.card}>
      
      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <img
          src={imageSrc}
          alt={title}
          className={styles.image}
        />

        {comingSoon && (
          <span className={styles.badge}>
            Coming Soon
          </span>
        )}
      </div>

      {/* TITLE */}
      <h3 className={styles.projectTitle}>
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className={styles.description}>
        {description}
      </p>

      {/* SKILLS */}
      <ul className={styles.skills}>
        {skills.map((skill, index) => (
          <li key={index} className={styles.skill}>
            {skill}
          </li>
        ))}
      </ul>

      {/* LINKS */}
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
            <p>This project is under development</p>
            <button onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};