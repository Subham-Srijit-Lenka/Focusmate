import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage.jsx";
import Register from "./components/user/Register.jsx";
import Login from "./components/user/Login.jsx";
import TaskManager from "./components/pages/TaskManager.jsx";
import Pomodoro from "./components/pages/Pomodoro.jsx";
import Contact from "./components/pages/Contact.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/taskmanager" element={<TaskManager />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
