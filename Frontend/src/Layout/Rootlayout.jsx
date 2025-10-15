import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar"; // adjust path if needed

const Rootlayout = () => {
  const location = useLocation();

  // Hide Navbar ONLY when inside admin dashboard (not adminlogin)
  const hideNavbar =
    location.pathname.startsWith("/admin/") || location.pathname === "/admin";

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Rootlayout;


