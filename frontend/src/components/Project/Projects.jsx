import React from "react";
import { projects } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./Project.module.css";

export const Projects = () => {
  return (
    <section className={styles.container} id="projects">

      <h2 className={styles.title}>
        My Projects
      </h2>

      <div className={styles.projects}>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
          />
        ))}
      </div>

    </section>
  );
};