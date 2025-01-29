import axios from "axios";

// API Clients for Both Services
const authAPI = axios.create({
  baseURL: "http://127.0.0.1:8000", // Auth Service
});

const questionnaireAPI = axios.create({
  baseURL: "http://127.0.0.1:8001", // Questionnaire Service
});

// Add Token Interceptor for Both APIs
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

// Authentication Endpoints
export const registerUser = (data) => authAPI.post("/auth/register", data);
export const loginUser = (data) => authAPI.post("/auth/login", data);

// Questionnaire Endpoints
export const submitQuestionnaire = (data) => questionnaireAPI.post("/questionnaire/submit", data);
export const getQuestionnaire = () => questionnaireAPI.get("/questionnaire/get");

// Export API instances for debugging if needed
export { authAPI, questionnaireAPI };
