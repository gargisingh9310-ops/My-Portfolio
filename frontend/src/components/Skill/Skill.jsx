import React from "react";
import styles from "./Skill.module.css";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaGit,
  FaGithub,
} from "react-icons/fa";

import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiPostman,
  SiRedux,
} from "react-icons/si";

import { VscCode } from "react-icons/vsc";

const skills = [
  { name: "JavaScript", icon: <FaJs /> },
  { name: "React.js", icon: <FaReact /> },
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Express.js", icon: <SiExpress /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Git", icon: <FaGit /> },
  { name: "GitHub", icon: <FaGithub /> },
  { name: "Python", icon: <FaPython /> },
  { name: "VS Code", icon: <VscCode/> },
  { name: "Postman", icon: <SiPostman /> },
  { name: "Redux", icon: <SiRedux /> },
  { name: "RESTful API", icon: <FaNodeJs /> },
];

export const Skill = () => {
  return (
    <section className={styles.container} id="skills">
      <h2 className={styles.title}>Skills</h2>

      <div className={styles.skillGrid}>
        {skills.map((skill, index) => (
          <div key={index} className={styles.skillCard}>
            <div className={styles.icon}>{skill.icon}</div>
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};