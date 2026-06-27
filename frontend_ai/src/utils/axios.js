import axios from "axios";

const deployedBackendUrl = "https://ai-resume-analyer-project.onrender.com";
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const instance = axios.create({
  baseURL,
});

export default instance;
