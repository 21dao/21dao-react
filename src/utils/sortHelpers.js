import cloneDeep from "lodash/cloneDeep";

export function sortListings(sortBy, itemsToSort) {
  const clonedItems = cloneDeep(itemsToSort);
  if (sortBy === "newest") {
    let results = clonedItems.sort((a, b) =>
      a.created_at > b.created_at ? 1 : b.created_at > a.created_at ? -1 : 0
    );
    return results;
  } else if (sortBy === "oldest") {
    let results = clonedItems.sort((a, b) =>
      a.created_at < b.created_at ? 1 : b.created_at < a.created_at ? -1 : 0
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
