import apiClient from "../client/apiClient";
import ArtistData from "../artists/artists.json";

async function getAuctions() {
  try {
    const response = await apiClient.post("/auctions/all", {
      marketplace: ["exchange", "holaplex", "formfunction"],
      names: ArtistData.map((a) => {
        return a.name;
      }),
    });
    return response.data.auctions;
  } catch (error) {
    console.log(error);
  }
}

export default getAuctions;
