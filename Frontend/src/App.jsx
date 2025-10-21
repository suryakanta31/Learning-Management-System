
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


import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// ===================== Pages =====================
// Admin
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AddTrainer from "./Pages/Admin/AddTrainer";
import AddStudent from "./Pages/Admin/AddStudent";
import ManageCourse from "./Pages/Admin/ManageCourse";

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

// Others
import Contact from "./Pages/Contact";

// Layout
import Rootlayout from "./Layout/Rootlayout";

// ===================== App Component =====================
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Rootlayout />}>
        {/* ---------- Public Routes ---------- */}
        <Route path="adminlogin" element={<AdminLogin />} />
        <Route path="trainerlogin" element={<TrainerLogin />} />
        <Route path="studentlogin" element={<StudentLogin />} />
        <Route path="contact" element={<Contact />} />

        {/* ---------- Admin Protected Routes ---------- */}
        <Route path="admin" element={<AdminDashboard />}>
          <Route path="addtrainer" element={<AddTrainer />} />
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="managecourse" element={<ManageCourse />} />
        </Route>

        {/* ---------- Trainer Protected Routes ---------- */}
        <Route path="trainer" element={<TrainerDashboard />}>
          <Route path="mycourses" element={<MyCourses />} />
          <Route path="mybatches" element={<MyBatches />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>

        {/* ---------- 404 Fallback ---------- */}
        <Route
          path="*"
          element={<div className="text-center p-5">404 | Page Not Found</div>}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
