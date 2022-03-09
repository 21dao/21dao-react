import apiClient from "../client/apiClient";

async function getArtists() {
  try {
    const response = await apiClient.post("/artists/all");
    return response.data.artists;
  } catch (error) {
    console.log(error);
  }
}

export default getArtists;
