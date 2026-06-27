import axios from "axios";

const deployedBackendUrl = "https://ai-resume-analyer-project.onrender.com";
const localBackendUrl = "http://localhost:4000";

const isLocalHost =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  (isLocalHost ? localBackendUrl : deployedBackendUrl);

const instance = axios.create({
  baseURL,
});

export default instance;
