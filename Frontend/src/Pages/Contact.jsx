import React from "react";

const Contact = () => {
  return (
    <div className="main-content with-sidebar">
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-description">
          Have questions or need support? Reach out to us via the form below.
        </p>

        <form className="contact-form">
          <label>
            Name
            <input type="text" placeholder="Your Name" />
          </label>

          <label>
            Email
            <input type="email" placeholder="Your Email" />
          </label>

          <label>
            Message
            <textarea placeholder="Your Message" rows="5"></textarea>
          </label>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
