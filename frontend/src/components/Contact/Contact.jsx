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
    type: "success",
    msg: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ...status, loading: true });

    try {
      // Added timeout for Render's slow wake-up time
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "application/json" },
        timeout: 60000 // 1 minute wait for server to wake up
      });

      if (response.data.success) {
        setStatus({
          loading: false,
          showPopup: true,
          type: "success",
          msg: "✅ Message sent successfully!"
        });
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        throw new Error("Server rejected the request");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      
      // Detailed error message based on error type
      let errorMsg = "❌ Server error. Please try again later.";
      if (error.code === 'ECONNABORTED') errorMsg = "⏳ Server is taking too long to respond. Try again.";
      if (error.response?.status === 500) errorMsg = "❌ Backend Configuration Error (Check Logs).";

      setStatus({
        loading: false,
        showPopup: true,
        type: "error",
        msg: errorMsg
      });
    } finally {
      setTimeout(() => setStatus((prev) => ({ ...prev, showPopup: false })), 5000);
    }
  };

  return (
    <footer className={styles.container} id="contact">
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <h2>Contact Me</h2>
          <p>Let's connect and build something meaningful together.</p>
          <img src={profileImg} alt="Profile" className={styles.profileImg} />
          <ul className={styles.links}>
            <li><img src={mailIcon} alt="mail" /> <a href="mailto:gargi.singh.9310@gmail.com">gargi.singh.9310@gmail.com</a></li>
            <li><img src={linkIcon} alt="linkedin" /> <a href="https://www.linkedin.com/in/gargi-undefined-130b98400" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><img src={gitIcon} alt="github" /> <a href="https://github.com/gargisingh9310-ops" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number (Optional)" value={formData.phone} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required />
          
          <button type="submit" disabled={status.loading}>
            {status.loading ? "Connecting to server..." : "Send Message"}
          </button>
          
          {status.loading && <p className={styles.loadingNote}>Please wait, the server may take up to 40 seconds to start.</p>}
        </form>
      </div>

      {status.showPopup && (
        <div className={`${styles.popup} ${status.type === "error" ? styles.errorPopup : ""}`}>
          {status.msg}
        </div>
      )}
    </footer>
  );
};