import apiClient from "../client/apiClient";
import { marketplace } from "./helpers/marketplaceHelper";

async function getTopSales(days, mrkt) {
  try {
    const response = await apiClient.post("/auctions/sales", {
      marketplace: marketplace(mrkt),
      days: days,
      limit: 8,
    });
    return response.data.auctions;
  } catch (error) {
    console.log(error);
  }
}

export default getTopSales;
