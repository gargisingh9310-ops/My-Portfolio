import React from 'react'
import styles from '../Intro/intro.module.css'
import introicon from '../../assets/intro/info.png'

export const Intro = () => {
  return (
    <section className={styles.container} id='intro'> 
        <div className={styles.content}>
            <h1 className={styles.title}>
  Hi! I'm <span className={styles.name}>Gargi</span>
</h1>

<p className={styles.description}>
  A passionate <span className={styles.highlight}>Full-Stack Developer</span> learning every day  
  and building projects with <span className={styles.highlight}>React</span> and  
  <span className={styles.highlight}>modern web tools</span>.
</p>
<a href="#contact" className={styles.contactBtn}>Contact Me</a>
        </div>
        <img src={introicon} alt="intro image of me" className={styles.introimg}/>
        <div className={styles.topBlur}/>
        <div className={styles.bottomBlur}/>
    </section>
  )
}
