import apiClient from "../client/apiClient";

async function getAuctions() {
  try {
    const response = await apiClient.post("/auctions/twentyone_dao", {
      marketplace: ["exchange", "holaplex", "formfunction"],
    });
    return response.data.auctions;
  } catch (error) {
    console.log(error);
  }
}

export default getAuctions;
