
/*import React from 'react'
import{ BrowserRouter as Router, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import TrainerLogin from './Pages/TrainerLogin'
//import Home from './Pages/Home'
import StudentLogin from './Pages/StudentLogin'
import AdminLogin from './Pages/AdminLogin'
import Contact from './Pages/Contact'
import Rootlayout from './Layout/Rootlayout'

const App = () => {
      
  const router = createBrowserRouter(
    createRoutesFromElements(
      
        <Route path='/' element={<Rootlayout/>}>
        
        <Route path='studentlogin' element={<StudentLogin/>}/>
        <Route path='adminlogin' element={<AdminLogin/>}/>
        <Route path='contact' element={<Contact/>}/>
        <Route path='trainerlogin' element={<TrainerLogin/>}/>

        </Route>
    )
  )
  return (
    <RouterProvider router={router}/>
  )
}

export default App */
// src/App.jsx
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  redirect,
} from "react-router-dom";
import "./index.css";

// ===================== Pages =====================
// Admin
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AddTrainer from "./Pages/Admin/AddTrainer";
import AddStudent from "./Pages/Admin/AddStudent";
import ManageCourse from "./Pages/Admin/ManageCourse";
import ReportsAnalytics from "./Pages/Admin/ReportsAnalytics";

// Trainer
import TrainerLogin from "./Pages/Trainer/TrainerLogin";
import TrainerDashboard from "./Pages/Trainer/TrainerDashboard";
import MyCourses from "./Pages/Trainer/MyCourses";
import MyBatches from "./Pages/Trainer/MyBatches";
import Attendance from "./Pages/Trainer/Attendance";
import Feedback from "./Pages/Trainer/Feedback";
import Schedule from "./Pages/Trainer/Schedule";

// Student
import StudentLogin from "./Pages/Student/StudentLogin";
import StudentDashboard from "./Pages/Student/StudentDashboard";
import SMyCourses from "./Pages/Student/SMyCourses";
import Sessions from "./Pages/Student/Sessions";
import Assignments from "./Pages/Student/Assignments";
import Certificates from "./Pages/Student/Certificates";
import TrainerFeedback from "./Pages/Student/TrainerFeedback";

// Others
import Contact from "./Pages/Contact";
import Rootlayout from "./Layout/Rootlayout";

// ===================== Services =====================
import authService from "./Services/authService";

// ✅ FIXED AUTH CHECK FUNCTION
const requireAuth = (expectedRole) => {
  const currentUser = authService.getCurrentUser();

  if (!currentUser) {
    throw redirect(`/${expectedRole}login`);
  }

  // ✅ If logged in but wrong role → redirect to correct dashboard
  if (currentUser.role !== expectedRole) {
    throw redirect(`/${currentUser.role}`);
  }

  // ✅ Otherwise continue
  return null;
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* ---------- Public Routes ---------- */}
        <Route path="/" element={<Rootlayout />}>
          <Route path="adminlogin" element={<AdminLogin />} />
          <Route path="trainerlogin" element={<TrainerLogin />} />
          <Route path="studentlogin" element={<StudentLogin />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* ---------- Admin Dashboard ---------- */}
        <Route
          path="admin"
          element={<AdminDashboard />}
          loader={() => requireAuth("admin")}
        >
          <Route path="addtrainer" element={<AddTrainer />} />
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="managecourse" element={<ManageCourse />} />
          <Route path="reportsanalytics" element={<ReportsAnalytics />} />
        </Route>

        {/* ---------- Trainer Dashboard ---------- */}
        <Route
          path="trainer"
          element={<TrainerDashboard />}
          loader={() => requireAuth("trainer")}
        >
          <Route path="mycourses" element={<MyCourses />} />
          <Route path="mybatches" element={<MyBatches />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>

        {/* ---------- Student Dashboard ---------- */}
        <Route
          path="student"
          element={<StudentDashboard />}
          loader={() => requireAuth("student")}
        >
          <Route path="smycourses" element={<SMyCourses />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="feedback" element={<TrainerFeedback />} />
        </Route>

        {/* ---------- 404 ---------- */}
        <Route
          path="*"
          element={<div className="text-center p-5">404 | Page Not Found</div>}
        />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
