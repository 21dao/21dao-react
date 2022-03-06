import axios from "axios";
import ArtistData from "../artists/artists.json";

async function getListings() {
  try {
    let names = ArtistData.map((artist) => {
      return artist.name;
    });
    let response = await getFromUrl(0, names);
    var results = [];
    for (const token of response.data.tokens) {
      if (token.isListed) results.push(token);
    }
    return results;
  } catch (error) {
    console.log(error);
  }
}

async function getFromUrl(from, names) {
  let url =
    "https://api.exchange.art/v1/public/tokens?limit=10000&from=" +
    from +
    '&filters={"tokenStatus":["curated","certified","known"],"brands":["' +
    names.join('","') +
    '"]}';
  let response = await axios.get(url);
  return response;
}

export default getListings;
