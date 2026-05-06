import React, { useState } from "react";
import styles from "./Contact.module.css";

import profileImg from "../../assets/Contact/myImg.png";
import linkIcon from "../../assets/Contact/linkedin.png";
import mailIcon from "../../assets/Contact/mail.png";
import gitIcon from "../../assets/Contact/github.png";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Render Backend API
      const res = await fetch(
        "https://my-portfolio-backend-466p.onrender.com/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
        }, 3000);

        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        alert("Failed to send message");
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <footer className={styles.container} id="contact">
      <div className={styles.wrapper}>

        {/* LEFT SIDE */}
        <div className={styles.left}>
          <h2>Contact Me</h2>

          <p>
            Let's connect and build something meaningful together.
          </p>

          <img
            src={profileImg}
            alt="Profile"
            className={styles.profileImg}
          />

          <ul className={styles.links}>

            <li>
              <img src={mailIcon} alt="mail" />

              <a href="mailto:gargi.singh.9310@gmail.com">
                gargi.singh.9310@gmail.com
              </a>
            </li>

            <li>
              <img src={linkIcon} alt="linkedin" />

              <a
                href="https://www.linkedin.com/in/gargi-undefined-130b98400?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>

            <li>
              <img src={gitIcon} alt="github" />

              <a
                href="https://github.com/gargisingh9310-ops"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>

          </ul>
        </div>

        {/* RIGHT SIDE FORM */}
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
            placeholder="Phone Number"
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

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className={styles.popup}>
          ✅ Message sent successfully!
        </div>
      )}
    </footer>
  );
};