import React, { useState } from "react";
import axios from "axios";
import styles from "./Contact.module.css";

import profileImg from "../../assets/Contact/myImg.png";
import linkIcon from "../../assets/Contact/linkedin.png";
import mailIcon from "../../assets/Contact/mail.png";
import gitIcon from "../../assets/Contact/github.png";

// BACKEND API
const API_URL =
  "https://my-portfolio-backend-2be6.onrender.com/api/contact";

export const Contact = () => {

  // FORM DATA
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // STATUS
  const [status, setStatus] = useState({
    loading: false,
    showPopup: false,
    type: "success",
    msg: "",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      loading: true,
      showPopup: false,
      type: "success",
      msg: "",
    });

    try {

      // SEND DATA TO BACKEND
      const response = await axios.post(
        API_URL,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },

          // Render free tier wake-up delay
          timeout: 60000,
        }
      );

      // SUCCESS
      if (response.data.success) {

        setStatus({
          loading: false,
          showPopup: true,
          type: "success",
          msg: "✅ Message sent successfully!",
        });

        // CLEAR FORM
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });

      } else {

        throw new Error("Server rejected request");

      }

    } catch (error) {

      console.error("SUBMISSION ERROR ❌");
      console.error(error);

      // DEFAULT ERROR
      let errorMsg =
        "❌ Something went wrong. Please try again later.";

      // SERVER SLEEPING
      if (error.code === "ECONNABORTED") {
        errorMsg =
          "⏳ Server is waking up. Please wait and try again.";
      }

      // BACKEND ERROR
      else if (error.response?.status === 500) {
        errorMsg =
          "❌ Backend server error. Check Render logs.";
      }

      // NETWORK ERROR
      else if (error.message === "Network Error") {
        errorMsg =
          "🌐 Cannot connect to server.";
      }

      setStatus({
        loading: false,
        showPopup: true,
        type: "error",
        msg: errorMsg,
      });

    } finally {

      // AUTO HIDE POPUP
      setTimeout(() => {

        setStatus((prev) => ({
          ...prev,
          showPopup: false,
        }));

      }, 5000);
    }
  };

  return (
    <footer className={styles.container} id="contact">

      <div className={styles.wrapper}>

        {/* LEFT SECTION */}
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
                href="https://www.linkedin.com/in/gargi-undefined-130b98400"
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

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >

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
          >
            {status.loading
              ? "Connecting to server..."
              : "Send Message"}
          </button>

          {status.loading && (
            <p className={styles.loadingNote}>
              Please wait, server may take some time to start.
            </p>
          )}

        </form>

      </div>

      {/* POPUP */}
      {status.showPopup && (

        <div
          className={`${styles.popup} ${
            status.type === "error"
              ? styles.errorPopup
              : ""
          }`}
        >
          {status.msg}
        </div>

      )}

    </footer>
  );
};