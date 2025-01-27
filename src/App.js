import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const token = localStorage.getItem("access_token");

  return (
    <Routes>
      {!token ? (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      ) : (
        // Remove the Dashboard route or replace it with any other component if needed
        <Route path="/" element={<div>Welcome to the app!</div>} />
      )}
    </Routes>
  );
}

export default App;
