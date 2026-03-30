import React from 'react'
import styles from "../About/About.module.css";
import cursoricon from "../../assets/about/cursor.png";
import serverIcon from "../../assets/about/server.png";
import microIcon from "../../assets/about/microsoft.png";
import pythonIcon from "../../assets/about/python.png";

export const About = () => {
  return (
    <section className={styles.container} id='about'>
        <h2 className={styles.title}>About</h2>
        <div className={styles.content}>
            <ul className={styles.aboutItems}>

                <li className={styles.aboutItem}>
                    <img src={cursoricon} alt="Cursor Icon" />
                    <div className={styles.aboutItemText}>
                        <h3>Frontend Developer</h3>
                        <p>Frontend Developer passionate about modern UI design and continuously learning new web technologies.</p>

                        <ul className={styles.tags}>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>JavaScript</li>
                            <li>React</li>
                            <li>Vite</li>
                        </ul>
                    </div>
                </li>

                <li className={styles.aboutItem}>
                    <img src={serverIcon} alt="Server" />
                    <div className={styles.aboutItemText}>
                        <h3>Backend Developer</h3>
                        <p>Backend Developer focused on building secure, scalable, and efficient server-side applications.</p>

                        <ul className={styles.tags}>
                            <li>Node.js</li>
                            <li>Express.js</li>
                            <li>Rest APIs</li>
                            <li>MongoDB</li>
                            <li>Postman</li>
                        </ul>
                    </div>
                </li>

                <li className={styles.aboutItem}>
                    <img src={microIcon} alt="microsoft" />
                    <div className={styles.aboutItemText}>
                        <h3>Microsoft Office Basics</h3>
                        <p>Basic knowledge of Microsoft Office tools for creating documents, spreadsheets, and presentations efficiently.</p>

                        <ul className={styles.tags}>
                            <li>MS Word</li>
                            <li>MS Excel</li>
                            <li>MS PowerPoint</li>
                        </ul>
                    </div>
                </li>

                <li className={styles.aboutItem}>
                    <img src={pythonIcon} alt="python" />
                    <div className={styles.aboutItemText}>
                        <h3>Python & SQL (Basic)</h3>
                        <p>Basic knowledge of Python programming, data visualization using Matplotlib, data manipulation with Pandas, and database operations using MySQL.</p>

                        <ul className={styles.tags}>
                            <li>Pandas</li>
                            <li>Matplotlib</li>
                            <li>MySQL</li>
                        </ul>
                    </div>
                </li>

            </ul>
        </div>
    </section>
  )
}