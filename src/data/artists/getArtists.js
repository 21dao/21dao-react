import ArtistData from "./artists.json";

async function getArtists() {
  try {
    return ArtistData;
  } catch (error) {
    console.log(error);
  }
}

export default getArtists;
