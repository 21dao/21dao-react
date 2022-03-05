import apiClient from "../client/apiClient";
import ArtistData from "../artists/artists.json";

async function getListings(name) {
  try {
    const response = await apiClient.post("/listings/all", {
      marketplace: ["exchange", "holaplex", "formfunction"],
      names: ArtistData.map((a) => {
        return a.name;
      }),
    });
    return response.data.listings;
  } catch (error) {
    console.log(error);
  }
}

export default getListings;
