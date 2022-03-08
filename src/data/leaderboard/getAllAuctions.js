import apiClient from "../client/apiClient";
import { marketplace } from "./helpers/marketplaceHelper";

async function getAllAuctions(mrkt, order) {
  try {
    const response = await apiClient.post("/auctions/all", {
      marketplace: marketplace(mrkt),
      limit: 8,
      order: order,
    });
    return response.data.auctions;
  } catch (error) {
    console.log(error);
  }
}

export default getAllAuctions;
