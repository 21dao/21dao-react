async function sortOrderTokens(tokens) {
  let ordered = 1;
  // Make sure every visible token has an order_id
  for (let i = 0; i < tokens.length; i += 1) {
    if (tokens[i].visible === false) continue;

    if (!tokens[i].order_id) {
      tokens[i].order_id = ordered;
      ordered += 1;
    }
  }
  // Sort by order_id
  tokens = tokens.sort((a, b) =>
    a.order_id > b.order_id ? 1 : b.order_id > a.order_id ? -1 : 0
  );
  return tokens;
}

export default sortOrderTokens;
