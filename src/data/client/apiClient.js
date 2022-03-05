import axios from "axios";
import { apiHost } from "../../config/settings";

const apiClient = axios.create({
  baseURL: apiHost,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
