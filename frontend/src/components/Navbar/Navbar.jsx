import React, { useState } from 'react';

import styles from "./Navbar.module.css";
import menuicon from '../../assets/nav/menu.png';
import closeicon from '../../assets/nav/close.png';

export const Navbar = () => {
    const[menuOpen, setMenuOpen]= useState(false)


  return (
    <nav className={styles.navbar}>

        <a className={styles.title} href="/">Porfolio</a>

        <div className={styles.menu}>

            <img className={styles.menuBtn} src={ menuOpen 
                ? closeicon 
                : menuicon } alt='menu-button' onClick={()=> setMenuOpen(!menuOpen)} />

            <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`} onClick={()=> setMenuOpen(false)}>


                <li>
                    <a href="#intro">Intro</a>
                </li>
                <li>
                    <a href="#about">About</a>
                </li>
                <li>
                    <a href="#skills">Skills</a>
                </li>
                <li>
                    <a href="#projects">Projects</a>
                </li>
                <li>
                    <a href="#contact">Contact</a>
                </li>

            </ul>
        </div>
    </nav>
  )
}
