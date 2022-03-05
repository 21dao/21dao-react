import apiClient from "./client/apiClient";
import { environment } from "../utils/environment";

async function triggerRefresh() {
  let apiKey = localStorage.getItem(environment + "_api_key");
  const response = await apiClient.post("/user/refresh", {
    api_key: apiKey,
  });
  return response;
}

export default triggerRefresh;
