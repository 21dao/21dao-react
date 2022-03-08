import apiClient from "../client/apiClient";
import { marketplace } from "./helpers/marketplaceHelper";

async function getHighestBid(mrkt) {
  try {
    const response = await apiClient.post("/auctions/highest_bid", {
      marketplace: marketplace(mrkt),
      limit: 8,
    });
    return response.data.auctions;
  } catch (error) {
    console.log(error);
  }
}

export default getHighestBid;
