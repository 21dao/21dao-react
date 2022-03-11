export function nameOpts(ArtistData) {
  const artist_names = new Set();
  for (const artist of ArtistData) {
    if (artist.name !== undefined) {
      artist_names.add(artist.name);
    }
  }
  const nameOpt = [];
  for (const artist of Array.from(artist_names)) {
    let obj = {};
    obj["label"] = artist;
    obj["value"] = artist;
    nameOpt.push(obj);
  }
  return nameOpt;
}

export function tagOpts(ArtistData) {
  const artist_tags = new Set();
  for (const artist of ArtistData) {
    for (const tag of artist.tags) {
      if (tag !== null) artist_tags.add(tag);
    }
  }
  const tagOpt = [];
  for (const tag of Array.from(artist_tags)) {
    let obj = {};
    obj["label"] = tag;
    obj["value"] = tag;
    tagOpt.push(obj);
  }
  return tagOpt;
}

export function searchResultSet(ArtistData, searchNames, searchTags) {
  var results = [];
  if (searchNames.length === 0 && searchTags.length === 0) {
    results = ArtistData;
  } else {
    for (const sel of searchNames) {
      const items = ArtistData.filter((item) => item.name === sel["label"]);
      for (const item of items) {
        results.push(item);
      }
    }
    for (const sel of searchTags) {
      const items = ArtistData.filter((item) =>
        item.tags.includes(sel["label"])
      );
      for (const item of items) {
        results.push(item);
      }
    }
  }
  return results;
}
