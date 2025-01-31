import React, { useEffect, useState } from "react";
import { getQuitPlan } from "../services/api";
import "../styles/dashboard.css"; // ✅ Import styles

function Dashboard() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedDays, setCompletedDays] = useState([]); // ✅ Store completed days

  // ✅ Add body class for dashboard styling
  useEffect(() => {
    document.body.classList.add("dashboard-body");

    return () => {
      document.body.classList.remove("dashboard-body");
    };
  }, []);

  useEffect(() => {
    let userId = localStorage.getItem("user_num_id");

    console.log("📢 Retrieved user_id from localStorage:", userId);

    if (!userId || isNaN(userId)) {
      setError("No valid user ID found. Please log in again.");
      setLoading(false);
      return;
    }

    userId = parseInt(userId, 10);

    console.log(`📢 Sending request to fetch plan for user_id:`, userId);

    const fetchPlan = async () => {
      try {
        console.log(`📢 Fetching quit plan for User ID: ${userId}`);

        const response = await getQuitPlan(userId);

        console.log("✅ Quit Plan API Response:", response.data);
        setPlan(response.data);
      } catch (err) {
        console.error("❌ Error fetching quit plan:", err);

        if (err.response) {
          console.error("📢 API Response Status:", err.response.status);
          console.error("📢 API Response Data:", err.response.data);
        } else {
          console.error("❌ No response received from the server.");
        }

        setError("Failed to fetch quitting plan.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  // ✅ Toggle completed days
  const toggleCompletion = (index) => {
    setCompletedDays((prev) =>
      prev.includes(index) ? prev.filter((day) => day !== index) : [...prev, index]
    );
  };

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (error) return <h2 className="error">{error}</h2>;

  return (
    <div className="dashboard-container">
      <h1 className="title">YOU CAN DO IT </h1>
      {plan ? (
        <>
          <div className="plan-info">
            <p><strong>Start Date:</strong> {plan.start_date}</p>
            <p><strong>Quit Day:</strong> {plan.quit_day}</p>
          </div>

          {/* ✅ Calendar Layout for Daily Targets */}
          <div className="calendar">
            {plan.daily_targets.map((target, index) => (
              <div
                key={index}
                className={`day-card ${completedDays.includes(index) ? "completed" : ""}`}
                onClick={() => toggleCompletion(index)}
              >
                <span className="day-label">Day {index + 1}</span>
                <span className="cigarette-count">{target} cigarettes</span>
                {completedDays.includes(index) && <span className="completed-mark">X</span>}
              </div>
            ))}
          </div>

          {/* ✅ Additional Sections */}
          <div className="info-section">
            <h2>Strategies</h2>
            <ul>
              {plan.strategies.map((strategy, index) => (
                <li key={index}>{strategy}</li>
              ))}
            </ul>
          </div>

          <div className="info-section">
            <h2>Reminders</h2>
            <ul>
              {plan.reminders.map((reminder, index) => (
                <li key={index}>{reminder}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <h2 className="no-plan">No quitting plan found. Please fill out your questionnaire.</h2>
      )}
    </div>
  );
}

export default Dashboard;