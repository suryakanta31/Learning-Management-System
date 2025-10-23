import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../index.css";

const Rootlayout = () => {
  const location = useLocation();

  // Only hide Navbar on admin dashboard, not admin login
  const hideNavbar =
    location.pathname.startsWith("/admin/dashboard");

  return (
    <div className="root-container">
      {!hideNavbar && <Navbar />}

      {/* Frontpage/LMS hero & features only show on home page */}
      {location.pathname === "/" && (
        <>
          <div className="lms-hero-section">
            <div className="hero-content">
              <h1>Welcome to Your LMS</h1>
              <p>
                Track your courses, assignments, and progress all in one place. Learn
                at your own pace and achieve your goals!
              </p>
              <button className="explore-btn">Explore Courses</button>
            </div>
            <div className="hero-image">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Learning illustration"
              />
            </div>
          </div>

          <div className="lms-features">
            <h2>Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>My Courses</h3>
                <p>Access all your enrolled courses anytime, anywhere.</p>
              </div>
              <div className="feature-card">
                <h3>Course Progress</h3>
                <p>Track progress and see which modules are completed.</p>
              </div>
              <div className="feature-card">
                <h3>Assignments & Tests</h3>
                <p>Submit assignments and take tests seamlessly.</p>
              </div>
              <div className="feature-card">
                <h3>Certificates</h3>
                <p>Download your completion certificates instantly.</p>
              </div>
              <div className="feature-card">
                <h3>Trainer Feedback</h3>
                <p>View personalized feedback from your trainers.</p>
              </div>
              <div className="feature-card">
                <h3>Notifications</h3>
                <p>Get updates about courses, tests, and announcements.</p>
              </div>
            </div>
          </div>

          <div className="lms-footer">
            <p>© 2025 Your LMS Platform. All rights reserved.</p>
          </div>
        </>
      )}

      {/* Nested routes like login, dashboard, etc */}
      <Outlet />
    </div>
  );
};

export default Rootlayout;



