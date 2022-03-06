import axios from "axios";

async function getListings(name) {
  try {
    let response = await getFromUrl(0, name);
    var total = response.data.totalCountOfResults;
    var results = [];
    for (const token of response.data.tokens) {
      if (token.isListed) results.push(token);
    }
    total -= 20;
    var from = 20;
    while (total > 0) {
      let response = await getFromUrl(from, name);
      for (const token of response.data.tokens) {
        if (token.isListed) results.push(token);
      }
      from += 20;
      total -= 20;
    }
    return results;
  } catch (error) {
    console.log(error);
  }
}

async function getFromUrl(from, name) {
  let url =
    "https://api.exchange.art/v1/public/tokens?limit=20&from=" +
    from +
    '&filters={"tokenStatus":["curated","certified","known"],"brands":["' +
    name +
    '"]}';
  let response = await axios.get(url);
  return response;
}

export default getListings;
