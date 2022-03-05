import apiClient from "../client/apiClient";
import { marketplace } from "./helpers/marketplaceHelper";

async function getTopBuyers(days, mrkt) {
  try {
    const response = await apiClient.post("/auctions/buyers", {
      marketplace: marketplace(mrkt),
      limit: 10,
      days: days,
    });
    return response.data.auctions;
  } catch (error) {
    console.log(error);
  }
}

export default getTopBuyers;
