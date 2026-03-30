import React from "react";
import styles from "./Project.module.css";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills = [], demo, source },
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={imageSrc}
          alt={`Image of ${title}`}
          className={styles.image}
        />
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
    </div>
  );
};