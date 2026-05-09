import React, { useState } from "react";
import axios from "axios";

import styles from "./Contact.module.css";

import profileImg from "../../assets/Contact/myImg.png";
import linkIcon from "../../assets/Contact/linkedin.png";
import mailIcon from "../../assets/Contact/mail.png";
import gitIcon from "../../assets/Contact/github.png";

const API_URL = "https://my-portfolio-backend-2be6.onrender.com/api/contact";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    showPopup: false,
    type: "success", // 'success' or 'error'
    msg: ""
  });

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // UI ko loading state mein daalein
    setStatus({ ...status, loading: true });

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "application/json" }
      });

      if (response?.data?.success) {
        setStatus({
          loading: false,
          showPopup: true,
          type: "success",
          msg: "✅ Message sent successfully!"
        });

        // Form reset karein
        setFormData({ name: "", phone: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("ERROR:", error);
      setStatus({
        loading: false,
        showPopup: true,
        type: "error",
        msg: "❌ Failed to send. Please try again."
      });
    } finally {
      // 4 seconds baad popup gayab karein
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, showPopup: false }));
      }, 4000);
    }
  };

  return (
    <footer className={styles.container} id="contact">
      <div className={styles.wrapper}>
        {/* LEFT SECTION */}
        <div className={styles.left}>
          <h2>Contact Me</h2>
          <p>Let's connect and build something meaningful together.</p>
          <img src={profileImg} alt="Profile" className={styles.profileImg} />

          <ul className={styles.links}>
            <li>
              <img src={mailIcon} alt="mail" />
              <a href="mailto:gargi.singh.9310@gmail.com">gargi.singh.9310@gmail.com</a>
            </li>
            <li>
              <img src={linkIcon} alt="linkedin" />
              <a href="https://www.linkedin.com/in/gargi-undefined-130b98400" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </li>
            <li>
              <img src={gitIcon} alt="github" />
              <a href="https://github.com/gargisingh9310-ops" target="_blank" rel="noopener noreferrer">GitHub</a>
            </li>
          </ul>
        </div>

        {/* RIGHT SECTION (FORM) */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (Optional)"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button 
            type="submit" 
            disabled={status.loading}
            className={status.loading ? styles.disabledBtn : ""}
          >
            {status.loading ? "Waking up server..." : "Send Message"}
          </button>
          
          {/* Render Delay Info (Optional but helpful) */}
          {status.loading && (
            <p className={styles.loadingNote}>Note: Render free tier might take 30-50s to wake up.</p>
          )}
        </form>
      </div>

      {/* POPUP NOTIFICATION */}
      {status.showPopup && (
        <div className={`${styles.popup} ${status.type === "error" ? styles.errorPopup : ""}`}>
          {status.msg}
        </div>
      )}
    </footer>
  );
};