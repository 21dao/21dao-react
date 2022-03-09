import apiClient from "../client/apiClient";

async function getListings() {
  try {
    const response = await apiClient.post("/listings/all", {
      marketplace: ["exchange", "holaplex", "formfunction"],
    });
    return response.data.listings;
  } catch (error) {
    console.log(error);
  }
}

export default getListings;
