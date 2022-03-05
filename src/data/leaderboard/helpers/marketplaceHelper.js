export function marketplace(marketplace) {
  if (marketplace === "all") {
    marketplace = ["exchange", "holaplex", "formfunction"];
  } else {
    marketplace = [marketplace];
  }
  return marketplace;
}
