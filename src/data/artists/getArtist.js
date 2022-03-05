import ArtistData from "./artists.json";

async function getArtist(name) {
  try {
    const artist = ArtistData.find((a) => a.name === name);
    return artist;
  } catch (error) {
    console.log(error);
  }
}

export default getArtist;
