import apiClient from "../client/apiClient";
import { marketplace } from "./helpers/marketplaceHelper";

async function getTopSellers(days, mrkt) {
  try {
    const response = await apiClient.post("/auctions/sellers", {
      marketplace: marketplace(mrkt),
      days: days,
      limit: 10,
    });
    return response.data.auctions;
  } catch (error) {
    console.log(error);
  }
}

export default getTopSellers;
