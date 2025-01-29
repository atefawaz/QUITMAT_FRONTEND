import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitQuestionnaire } from "../services/api";
import "../styles/questionnaire.css"; // Ensure styles are linked

function Questionnaire() {
  const [formData, setFormData] = useState({
    daily_cigarettes: 1, // Default value
    quitting_speed: "",
    high_risk_times: [],
    notification_preference: "",
    first_cigarette_time: "",
    smoking_triggers: [],
    previous_quit_attempts: false,
    previous_methods: [],
    health_goals: [],
    preferred_timeline: "",
    smoking_context: [],
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle Toggle Button Selections for multi-choice fields
  const handleToggle = (field, value) => {
    setFormData((prev) => {
      let updatedValue;
      if (Array.isArray(prev[field])) {
        // Multi-select toggle logic
        updatedValue = prev[field].includes(value)
          ? prev[field].filter((item) => item !== value) // Remove if selected
          : [...prev[field], value]; // Add if not selected
      } else {
        updatedValue = value; // Single-select fields
      }
      return { ...prev, [field]: updatedValue };
    });
  };

  // Handle checkbox for Previous Quit Attempts
  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle increment and decrement for daily cigarettes
  const handleIncrement = () => {
    setFormData((prev) => ({ ...prev, daily_cigarettes: prev.daily_cigarettes + 1 }));
  };

  const handleDecrement = () => {
    setFormData((prev) => ({ ...prev, daily_cigarettes: Math.max(prev.daily_cigarettes - 1, 0) }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await submitQuestionnaire(formData);
      console.log("Questionnaire submitted:", response.data);

      setMessage("Questionnaire submitted successfully! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error Response:", error.response?.data);

      const errorMsg = error.response?.data?.detail || "An unexpected error occurred.";
      setMessage(typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-card">
        <h2 className="questionnaire-title">Fill Your Questionnaire</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Daily Cigarettes */}
          <div className="increment-container">
            <label className="questionnaire-label">Daily Cigarettes:</label>
            <button type="button" className="increment-btn" onClick={handleDecrement}>-</button>
            <span className="increment-value">{formData.daily_cigarettes}</span>
            <button type="button" className="increment-btn" onClick={handleIncrement}>+</button>
          </div>

          {/* Quitting Speed */}
          <label className="questionnaire-label">Quitting Speed:</label>
          <div className="toggle-group">
            {["gradual", "cold_turkey"].map((option) => (
              <button
                type="button"
                key={option}
                className={`toggle-btn ${formData.quitting_speed === option ? "selected" : ""}`}
                onClick={() => handleToggle("quitting_speed", option)}
              >
                {option.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* High Risk Times */}
          <label className="questionnaire-label">High Risk Times:</label>
          <div className="toggle-group">
            {["morning", "after_meals", "evening", "social_events"].map((option) => (
              <button
                type="button"
                key={option}
                className={`toggle-btn ${formData.high_risk_times.includes(option) ? "selected" : ""}`}
                onClick={() => handleToggle("high_risk_times", option)}
              >
                {option.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Notification Preference */}
          <label className="questionnaire-label">Notification Preference:</label>
          <div className="toggle-group">
            {["email", "sms", "none"].map((option) => (
              <button
                type="button"
                key={option}
                className={`toggle-btn ${formData.notification_preference === option ? "selected" : ""}`}
                onClick={() => handleToggle("notification_preference", option)}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>

          {/* First Cigarette Time */}
          <label className="questionnaire-label">First Cigarette Time:</label>
          <input type="time" name="first_cigarette_time" value={formData.first_cigarette_time} onChange={handleChange} className="questionnaire-input" required />

          {/* Smoking Triggers */}
          <label className="questionnaire-label">Smoking Triggers:</label>
          <div className="toggle-group">
            {["stress", "habit", "peer_pressure"].map((option) => (
              <button
                type="button"
                key={option}
                className={`toggle-btn ${formData.smoking_triggers.includes(option) ? "selected" : ""}`}
                onClick={() => handleToggle("smoking_triggers", option)}
              >
                {option.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Previous Quit Attempts */}
          <div className="questionnaire-checkbox-container">
            <input type="checkbox" name="previous_quit_attempts" checked={formData.previous_quit_attempts} onChange={handleCheckboxChange} className="questionnaire-checkbox" />
            <label className="questionnaire-checkbox-label">Previous Quit Attempts</label>
          </div>

          {/* Previous Methods */}
          <label className="questionnaire-label">Previous Methods:</label>
          <div className="toggle-group">
            {["nicotine_patch", "therapy", "medication"].map((option) => (
              <button
                type="button"
                key={option}
                className={`toggle-btn ${formData.previous_methods.includes(option) ? "selected" : ""}`}
                onClick={() => handleToggle("previous_methods", option)}
              >
                {option.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button type="submit" className="questionnaire-button" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
        {message && <p className="auth-error">{message}</p>}
      </div>
    </div>
  );
}

export default Questionnaire;
