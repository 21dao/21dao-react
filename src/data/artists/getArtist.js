import apiClient from "../client/apiClient";

async function getArtist(name) {
  try {
    const response = await apiClient.post("/artist/by_name", {
      name: name,
    });
    return response.data.artist;
  } catch (error) {
    console.log(error);
  }
}

export default getArtist;
