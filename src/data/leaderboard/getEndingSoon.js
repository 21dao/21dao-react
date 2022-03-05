import apiClient from "../client/apiClient";
import { marketplace } from "./helpers/marketplaceHelper";

async function getEndingSoon(mrkt) {
  try {
    const response = await apiClient.post("/auctions/ending", {
      marketplace: marketplace(mrkt),
      limit: 8,
    });
    return response.data.auctions;
  } catch (error) {
    console.log(error);
  }
}

export default getEndingSoon;
