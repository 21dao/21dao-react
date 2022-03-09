import cloneDeep from "lodash/cloneDeep";

export function sortListings(sortBy, itemsToSort) {
  const clonedItems = cloneDeep(itemsToSort);
  if (sortBy === "newest") {
    let results = clonedItems.sort((a, b) =>
      a.last_listed > b.last_listed ? 1 : b.last_listed > a.last_listed ? -1 : 0
    );
    return results;
  } else if (sortBy === "oldest") {
    let results = clonedItems.sort((a, b) =>
      a.last_listed < b.last_listed ? 1 : b.last_listed < a.last_listed ? -1 : 0
    );
    return results;
  } else if (sortBy === "asc") {
    let results = clonedItems.sort((a, b) =>
      a.last_listed_price > b.last_listed_price
        ? 1
        : b.last_listed_price > a.last_listed_price
        ? -1
        : 0
    );
    return results;
  } else if (sortBy === "desc") {
    let results = clonedItems.sort((a, b) =>
      a.last_listed_price < b.last_listed_price
        ? 1
        : b.last_listed_price < a.last_listed_price
        ? -1
        : 0
    );
    return results;
  } else {
    console.error("This sort type is not supported");
    return clonedItems;
  }
}
