import cloneDeep from "lodash/cloneDeep";

export function sortListings(sortBy, itemsToSort) {
  const clonedItems = cloneDeep(itemsToSort);
  if (sortBy === "newest") {
    let results = clonedItems.sort((a, b) =>
      a.lastListedAt > b.lastListedAt
        ? 1
        : b.lastListedAt > a.lastListedAt
        ? -1
        : 0
    );
    return results;
  } else if (sortBy === "oldest") {
    let results = clonedItems.sort((a, b) =>
      a.lastListedAt < b.lastListedAt
        ? 1
        : b.lastListedAt < a.lastListedAt
        ? -1
        : 0
    );
    return results;
  } else if (sortBy === "asc") {
    let results = clonedItems.sort((a, b) =>
      a.lastListedPrice > b.lastListedPrice
        ? 1
        : b.lastListedPrice > a.lastListedPrice
        ? -1
        : 0
    );
    return results;
  } else if (sortBy === "desc") {
    let results = clonedItems.sort((a, b) =>
      a.lastListedPrice < b.lastListedPrice
        ? 1
        : b.lastListedPrice < a.lastListedPrice
        ? -1
        : 0
    );
    return results;
  } else {
    console.error("This sort type is not supported");
    return clonedItems;
  }
}
