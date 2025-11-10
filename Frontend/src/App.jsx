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
import ManageBatches from "./Pages/Admin/ManageBatches";
import ManageCourse from "./Pages/Admin/ManageCourse";
import ReportsAnalytics from "./Pages/Admin/ReportsAnalytics";

// Admin View Pages
import ViewTrainers from "./Pages/Admin/ViewTrainers";
import ViewCourses from "./Pages/Admin/ViewCourses";
import ViewBatches from "./Pages/Admin/ViewBatches";

// Trainer
import TrainerLogin from "./Pages/Trainer/TrainerLogin";
import TrainerDashboard from "./Pages/Trainer/TrainerDashboard";
import MyCourses from "./Pages/Trainer/MyCourses";
import MyBatches from "./Pages/Trainer/MyBatches";
import TrainerSessions from "./Pages/Trainer/TrainerSessions";
import AddSession from "./Pages/Trainer/AddSession";
import TrainerReports from "./Pages/Trainer/TrainerReports";

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


// ✅ Role-based authentication
const requireAuth = (role) => {
  const adminId = localStorage.getItem("adminId");
  const trainerId = localStorage.getItem("trainerId");
  const studentId = localStorage.getItem("studentId");

  if (role === "admin" && !adminId) throw redirect("/adminlogin");
  if (role === "trainer" && !trainerId) throw redirect("/trainerlogin");
  if (role === "student" && !studentId) throw redirect("/studentlogin");

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
          <Route path="addcourse" element={<ManageCourse />} />
          <Route path="addbatch" element={<ManageBatches />} />
          <Route path="viewtrainers" element={<ViewTrainers />} />
          <Route path="viewcourses" element={<ViewCourses />} />
          <Route path="viewbatches" element={<ViewBatches />} />
          <Route path="reportsanalytics" element={<ReportsAnalytics />} />
        </Route>

        {/* ---------- Trainer Dashboard ---------- */}
        <Route
          path="trainer"
          element={<TrainerDashboard />}
          loader={() => requireAuth("trainer")}
        >
          <Route index element={<MyCourses />} />
          <Route path="mycourses" element={<MyCourses />} />
          <Route path="mybatches" element={<MyBatches />} />
          <Route path="trainersessions" element={<TrainerSessions />} />
          <Route path="sessions/add" element={<AddSession />} />
          <Route path="reports" element={<TrainerReports />} />
        </Route>

        {/* ---------- Student Dashboard ---------- */}
        <Route
          path="student"
          element={<StudentDashboard />}
          loader={() => requireAuth("student")}
        >
          <Route index element={<SMyCourses />} />
          <Route path="smycourses" element={<SMyCourses />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="feedback" element={<TrainerFeedback />} />
        </Route>

        {/* ---------- 404 ---------- */}
        <Route
          path="*"
          element={
            <div className="text-center p-5 text-xl font-semibold text-gray-600">
              404 | Page Not Found
            </div>
          }
        />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

