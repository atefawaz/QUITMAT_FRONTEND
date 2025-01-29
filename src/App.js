import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Questionnaire from "./components/Questionnaire";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
    </Routes>
  );
}

export default App;
