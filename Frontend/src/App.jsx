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
import ManageBatches from "./Pages/Admin/ManageBatches";
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


// ✅ Add this function (no authService needed)
const requireAuth = (role) => {
  const adminToken = localStorage.getItem("adminToken");
  const trainerToken = localStorage.getItem("trainerToken");
  const studentToken = localStorage.getItem("studentToken");

  // check based on role
  if (role === "admin" && !adminToken) throw redirect("/adminlogin");
  if (role === "trainer" && !trainerToken) throw redirect("/trainerlogin");
  if (role === "student" && !studentToken) throw redirect("/studentlogin");

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
          <Route path="managebatches" element={<ManageBatches />} />
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
