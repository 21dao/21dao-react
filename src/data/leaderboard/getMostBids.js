import apiClient from "../client/apiClient";
import { marketplace } from "./helpers/marketplaceHelper";

async function getMostBids(mrkt) {
  try {
    const response = await apiClient.post("/auctions/most_bids", {
      marketplace: marketplace(mrkt),
      limit: 8,
    });
    return response.data.auctions;
  } catch (error) {
    console.log(error);
  }
}

export default getMostBids;
