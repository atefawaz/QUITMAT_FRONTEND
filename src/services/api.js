import axios from "axios";

// API Clients for Services
const authAPI = axios.create({
  baseURL: "http://127.0.0.1:8000", // Auth Service
});

const questionnaireAPI = axios.create({
  baseURL: "http://127.0.0.1:8001", // Questionnaire Service
});

const planAPI = axios.create({
  baseURL: "http://127.0.0.1:8002", // Plan Service
});

// Add Token Interceptor for All APIs
const addAuthInterceptor = (apiInstance) => {
  apiInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

addAuthInterceptor(authAPI);
addAuthInterceptor(questionnaireAPI);
addAuthInterceptor(planAPI);

// Authentication Endpoints
export const registerUser = (data) => authAPI.post("/auth/register", data);
export const loginUser = (data) => authAPI.post("/auth/login", data);

// Questionnaire Endpoints
export const submitQuestionnaire = (data) => questionnaireAPI.post("/questionnaire/submit", data);
export const getQuestionnaire = () => questionnaireAPI.get("/questionnaire/get");

// Quit Plan Endpoints
export const generateQuitPlan = () => planAPI.post("/plan/generate_plan");

export const getQuitPlan = async (userId) => {
  if (!userId) {
    console.error("❌ Error: userId is missing in getQuitPlan()");
    return Promise.reject(new Error("User ID is missing"));
  }

  console.log(`📢 Sending API request to fetch plan for User ID: ${userId}`);

  try {
    const response = await planAPI.get(`/plan/get_plan/${parseInt(userId, 10)}`);
    console.log("✅ Quit Plan API Response:", response.data);
    return response;
  } catch (error) {
    console.error("❌ Error fetching quit plan:", error);
    if (error.response) {
      console.error("📢 API Response Status:", error.response.status);
      console.error("📢 API Response Data:", error.response.data);
    } else {
      console.error("❌ No response received from the server.");
    }
    throw error;
  }
};

// Export API instances for debugging if needed
export { authAPI, questionnaireAPI, planAPI };
