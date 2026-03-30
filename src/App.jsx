import React from 'react'
import style from "./App.module.css";
import { Navbar } from './components/Navbar/Navbar';
import { Intro } from './components/Intro/Intro';
import { About } from './components/About/About';
import { Skill } from './components/Skill/Skill';
import { Projects } from './components/Project/Projects';
import { Contact } from './components/Contact/Contact';


function App() {
  return (
    <div className={style.App}>
      <Navbar/>
      <Intro/>
      <About/>
      <Skill/>
      <Projects/>
      <Contact/>
    </div> 
  )
}

export default App