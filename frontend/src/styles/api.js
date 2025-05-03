import axios from "axios";
// Replace this with your backend's local IP address and port
const baseURL = "http://192.168.29.228:5000"; // <-- Change '192.168.x.x' to your PC's IP

// Create an Axios instance
const api = axios.create({
  baseURL: baseURL, // Base URL for all API calls
  timeout: 10000, // Optional: Set a timeout for requests (10 seconds)
});

// You can also add headers if needed:
api.defaults.headers = {
  "Content-Type": "application/json",
  // Add more headers if needed (e.g., Authorization)
};

export default api;
