import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Questionnaire from "./components/Questionnaire";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
    </Routes>
  );
}

export default App;
