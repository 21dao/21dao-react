import apiClient from "../client/apiClient";

async function getNftsFromUsername(username) {
  try {
    const response = await apiClient.post("/user/nfts", {
      username: username,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default getNftsFromUsername;
